export function isValidHttpUrl(str: string) {
  let url: URL

  try {
    url = new URL(str)
  } catch (error) {
    return false
  }

  console.log(url.hostname)

  return url.protocol === 'http:' || url.protocol === 'https:'
}
