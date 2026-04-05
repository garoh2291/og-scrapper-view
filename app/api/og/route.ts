import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

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
  canEmbed: boolean
}

// Chromium release URL — pin to a stable version
const CHROMIUM_URL =
  'https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar'

async function fetchWithPuppeteer(url: string): Promise<string> {
  const chromium = (await import('@sparticuz/chromium-min')).default
  const puppeteer = (await import('puppeteer-core')).default

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(CHROMIUM_URL),
    headless: true,
  })

  try {
    const page = await browser.newPage()
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
    )
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-GB,en;q=0.9',
    })
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 })
    return await page.content()
  } finally {
    await browser.close()
  }
}

async function fetchWithAxios(url: string): Promise<string> {
  const axios = (await import('axios')).default
  const parsedUrl = new URL(url)
  const res = await axios.get(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-GB,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Cache-Control': 'no-cache',
      Referer: `${parsedUrl.protocol}//${parsedUrl.hostname}/`,
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

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  let html: string

  try {
    // Try simple fetch first (fast, works for most sites)
    html = await fetchWithAxios(url)
  } catch {
    try {
      // Fall back to real headless Chrome (bypasses bot detection)
      html = await fetchWithPuppeteer(url)
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
  const image = rawImage
    ? rawImage.startsWith('http')
      ? rawImage
      : `${parsedUrl.protocol}//${parsedUrl.hostname}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`
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
    canEmbed: false,
  }

  return NextResponse.json(data)
}
