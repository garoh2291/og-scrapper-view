import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'
import { launchBrowser, BROWSER_UA } from '@/lib/browser'

export interface OGData {
  url: string
  domain: string
  title: string
  description: string
  image: string
  siteName: string
  type: string
  favicon: string
  themeColor: string
}

async function fetchWithAxios(url: string): Promise<string> {
  const axios = (await import('axios')).default
  const parsed = new URL(url)
  const res = await axios.get(url, {
    headers: {
      'User-Agent': BROWSER_UA,
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-GB,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Cache-Control': 'no-cache',
      Referer: `${parsed.protocol}//${parsed.hostname}/`,
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Upgrade-Insecure-Requests': '1',
    },
    timeout: 15000,
    maxRedirects: 5,
  })
  return res.data
}

async function fetchWithBrowser(url: string): Promise<string> {
  const browser = await launchBrowser()
  try {
    const page = await browser.newPage()
    await page.setUserAgent(BROWSER_UA)
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-GB,en;q=0.9' })
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 })
    return await page.content()
  } finally {
    await browser.close()
  }
}

const isBotChallenge = (html: string) =>
  /cf-browser-verification|challenge-platform|jschl[-_]answer|cf_clearance|Just a moment/i.test(html)

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  let html: string

  try {
    const axiosHtml = await fetchWithAxios(url)
    if (isBotChallenge(axiosHtml)) throw new Error('bot_challenge')
    html = axiosHtml
  } catch {
    try {
      html = await fetchWithBrowser(url)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch URL'
      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  const $ = cheerio.load(html)
  const getMeta = (name: string) =>
    $(`meta[property="${name}"]`).attr('content') ||
    $(`meta[name="${name}"]`).attr('content') ||
    ''

  const parsedUrl = new URL(url)
  const domain = parsedUrl.hostname.replace('www.', '')

  const faviconHref =
    $('link[rel="icon"], link[rel="shortcut icon"]').first().attr('href') || '/favicon.ico'
  const favicon = faviconHref.startsWith('http')
    ? faviconHref
    : `${parsedUrl.protocol}//${parsedUrl.hostname}${faviconHref.startsWith('/') ? '' : '/'}${faviconHref}`

  const rawImage = getMeta('og:image')
  const absoluteImage = rawImage
    ? rawImage.startsWith('http')
      ? rawImage
      : `${parsedUrl.protocol}//${parsedUrl.hostname}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`
    : ''

  // Proxy image through our own route to bypass hotlink protection
  const image = absoluteImage
    ? `/api/image?url=${encodeURIComponent(absoluteImage)}`
    : ''

  const data: OGData = {
    url,
    domain,
    title: getMeta('og:title') || $('title').text().trim() || domain,
    description: getMeta('og:description') || getMeta('description') || '',
    image,
    siteName: getMeta('og:site_name') || domain,
    type: getMeta('og:type') || 'website',
    favicon,
    themeColor: $('meta[name="theme-color"]').attr('content') || '#000000',
  }

  return NextResponse.json(data)
}
