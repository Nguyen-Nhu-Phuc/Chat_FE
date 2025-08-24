import CryptoJS from 'crypto-js'

export const encodeToken = (token: string) => {
  try {
    if (!process.env.NEXT_PUBLIC_CRYPTO_KEY) {
      throw new Error('NEXT_PUBLIC_CRYPTO_KEY is not defined');
    }

    return CryptoJS?.AES?.encrypt(token, process.env.NEXT_PUBLIC_CRYPTO_KEY).toString()
  } catch (error) {
    console.log(error, 'encodeToken')
  }
}

export const decodeToken = (token: string) => {
  try {
    if (!process.env.NEXT_PUBLIC_CRYPTO_KEY) {
      throw new Error('NEXT_PUBLIC_CRYPTO_KEY is not defined');
    }

    const bytes = CryptoJS?.AES?.decrypt(token, process.env.NEXT_PUBLIC_CRYPTO_KEY)

    return bytes.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.log(error, 'decodeToken')
  }
}

export const encodeJsonData = (json: any) => {
  try {
    if (!process.env.NEXT_PUBLIC_CRYPTO_KEY) {
      throw new Error('NEXT_PUBLIC_CRYPTO_KEY is not defined');
    }


    return CryptoJS.AES.encrypt(JSON.stringify(json), process.env.NEXT_PUBLIC_CRYPTO_KEY).toString()
  } catch (error) {
    console.log(error, 'encodeJsonData')
  }
}

export const decodeJsonEndcoding = (jsonEncoding : string) => {
  try {
    if (!process.env.NEXT_PUBLIC_CRYPTO_KEY) {
      throw new Error('NEXT_PUBLIC_CRYPTO_KEY is not defined');
    }

    const bytes = CryptoJS.AES.decrypt(jsonEncoding, process.env.NEXT_PUBLIC_CRYPTO_KEY)
    const originalData = bytes.toString(CryptoJS.enc.Utf8)

    return JSON.parse(originalData)
  } catch (error) {
    console.log(error, 'decodeJsonData')
  }
}
