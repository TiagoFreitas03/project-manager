export function isValidHttpUrl(str: string) {
  let url: URL

  try {
    url = new URL(str)
  } catch (error) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}
