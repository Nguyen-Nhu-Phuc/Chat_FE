import io from 'socket.io-client';

const baseurl = process.env.NEXT_PUBLIC_FRAPPE_URL ?? '';

export const socket = io(baseurl, {
  autoConnect: false,
});