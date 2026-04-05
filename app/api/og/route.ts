import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
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

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OGScraper/1.0)',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      timeout: 10000,
      maxRedirects: 5,
    })

    const $ = cheerio.load(response.data)

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

    const xfo = response.headers['x-frame-options']
    const csp = response.headers['content-security-policy'] || ''
    const canEmbed = !xfo && !csp.includes('frame-ancestors')

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
      canEmbed,
    }

    return NextResponse.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch URL'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
