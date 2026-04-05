import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { BROWSER_UA } from '@/lib/browser'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')

  if (!url || !/^https?:\/\//i.test(url)) {
    return new NextResponse('Missing or invalid url', { status: 400 })
  }

  try {
    const parsed = new URL(url)
    const upstream = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': BROWSER_UA,
        Referer: `${parsed.protocol}//${parsed.hostname}/`,
        Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
      },
      timeout: 10000,
    })

    return new NextResponse(upstream.data as ArrayBuffer, {
      headers: {
        'Content-Type': (upstream.headers['content-type'] as string) ?? 'image/jpeg',
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    })
  } catch {
    return new NextResponse('Failed to fetch image', { status: 502 })
  }
}
