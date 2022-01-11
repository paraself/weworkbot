import crypto from 'crypto'
export function md5(data: any) {
  return crypto.createHash("md5").update(Buffer.from(data)).digest("hex")
}