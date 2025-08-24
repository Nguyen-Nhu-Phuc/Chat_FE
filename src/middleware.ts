import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decodeJsonEndcoding } from '@/libs/crypto'

// Danh sách các đường dẫn không cần auth
const publicPaths = ['/login', '/register', '/_next', '/api/public']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Bỏ qua public routes
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Lấy cookie accessToken và user
  const accessToken = req.cookies.get('accessToken')?.value
  const encodedUser = req.cookies.get('user')?.value

  // Nếu không có token -> redirect về login
  if (!accessToken || !encodedUser) {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  // Giải mã thông tin user
  let user
  try {
    user = decodeJsonEndcoding(encodedUser)
  } catch (error) {
    console.error('Middleware decode user error:', error)
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  // Thêm thông tin user vào headers để các API route có thể dùng
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-user-id', user?.id || '')
  requestHeaders.set('x-user-phone', user?.phone || '')

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

// Cấu hình áp dụng middleware
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'], // tất cả routes trừ các static file
}
