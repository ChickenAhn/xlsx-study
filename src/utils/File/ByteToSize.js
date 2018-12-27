export default function BytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 0)
  const base = 1024 ** i
  return `${Math.round(bytes / base, 2)} ${sizes[i]}`
}
