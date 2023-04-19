export async function load() {
  const article = await import(`./article.md`)
  const content = article.default

  return {
    content
  }
}
