export function utf8ByteToUnicodeStr(utf8Bytes: Array<number>) {
  let unicodeStr = ''
  for (let pos = 0; pos < utf8Bytes.length; ) {
    const flag = utf8Bytes[pos]
    let unicode = 0
    if (flag >>> 7 === 0) {
      unicodeStr += String.fromCharCode(utf8Bytes[pos])
      pos += 1
    } else if ((flag & 0xfc) === 0xfc) {
      unicode = (utf8Bytes[pos] & 0x3) << 30
      unicode |= (utf8Bytes[pos + 1] & 0x3f) << 24
      unicode |= (utf8Bytes[pos + 2] & 0x3f) << 18
      unicode |= (utf8Bytes[pos + 3] & 0x3f) << 12
      unicode |= (utf8Bytes[pos + 4] & 0x3f) << 6
      unicode |= utf8Bytes[pos + 5] & 0x3f
      unicodeStr += String.fromCharCode(unicode)
      pos += 6
    } else if ((flag & 0xf8) === 0xf8) {
      unicode = (utf8Bytes[pos] & 0x7) << 24
      unicode |= (utf8Bytes[pos + 1] & 0x3f) << 18
      unicode |= (utf8Bytes[pos + 2] & 0x3f) << 12
      unicode |= (utf8Bytes[pos + 3] & 0x3f) << 6
      unicode |= utf8Bytes[pos + 4] & 0x3f
      unicodeStr += String.fromCharCode(unicode)
      pos += 5
    } else if ((flag & 0xf0) === 0xf0) {
      unicode = (utf8Bytes[pos] & 0xf) << 18
      unicode |= (utf8Bytes[pos + 1] & 0x3f) << 12
      unicode |= (utf8Bytes[pos + 2] & 0x3f) << 6
      unicode |= utf8Bytes[pos + 3] & 0x3f
      unicodeStr += String.fromCharCode(unicode)
      pos += 4
    } else if ((flag & 0xe0) === 0xe0) {
      unicode = (utf8Bytes[pos] & 0x1f) << 12
      unicode |= (utf8Bytes[pos + 1] & 0x3f) << 6
      unicode |= utf8Bytes[pos + 2] & 0x3f
      unicodeStr += String.fromCharCode(unicode)
      pos += 3
    } else if ((flag & 0xc0) === 0xc0) {
      //110
      unicode = (utf8Bytes[pos] & 0x3f) << 6
      unicode |= utf8Bytes[pos + 1] & 0x3f
      unicodeStr += String.fromCharCode(unicode)
      pos += 2
    } else {
      unicodeStr += String.fromCharCode(utf8Bytes[pos])
      pos += 1
    }
  }
  return unicodeStr
}
