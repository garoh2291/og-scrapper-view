import { NextRequest, NextResponse } from 'next/server'
import { launchBrowser, BROWSER_UA } from '@/lib/browser'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')

  if (!url || !/^https?:\/\//i.test(url)) {
    return new NextResponse('Missing or invalid url', { status: 400 })
  }

  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()
    await page.setUserAgent(BROWSER_UA)
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-GB,en;q=0.9' })

    // networkidle2 waits for Cloudflare JS challenge to complete + redirect
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })

    // Extra buffer for any second-phase CF redirect
    await new Promise((r) => setTimeout(r, 2000))

    const buffer = await page.screenshot({ type: 'jpeg', quality: 80, fullPage: false })

    return new NextResponse(buffer as Buffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=300',
      },
    })
  } finally {
    await browser.close()
  }
}
