'use client'

import { useState, useCallback, useEffect } from 'react'
import type { OGData } from './api/og/route'

const DEFAULT_URL = 'https://www.kingscross.co.uk/whats-on'
const FETCH_TIMEOUT_MS = 25_000

function SafeImage({
  src,
  alt,
  style,
  fallback,
}: {
  src: string
  alt: string
  style?: React.CSSProperties
  fallback?: React.ReactNode
}) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return <>{fallback ?? null}</>
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />
}

function OGCardView({ d }: { d: OGData }) {
  return (
    <a href={d.url} target="_blank" rel="noopener noreferrer" style={S.ogCard}>
      <SafeImage
        src={d.image}
        alt={d.title}
        style={S.ogImage}
        fallback={<div style={{ ...S.ogImage, background: 'var(--surface2)' }} />}
      />
      <div style={S.ogBody}>
        <div style={S.ogDomain}>
          <SafeImage src={d.favicon} alt="" style={S.favicon} />
          {d.domain}
        </div>
        <div style={S.ogTitle}>{d.title}</div>
        {d.description && <div style={S.ogDesc}>{d.description}</div>}
      </div>
    </a>
  )
}

function EmbedView({ d }: { d: OGData }) {
  return (
    <div style={S.embedWrap}>
      <div style={S.embedHeader}>
        <div style={S.embedDots}>
          <div style={{ ...S.dot, background: '#ff5f57' }} />
          <div style={{ ...S.dot, background: '#febc2e' }} />
          <div style={{ ...S.dot, background: '#28c840' }} />
        </div>
        <div style={S.embedUrl}>{d.url}</div>
      </div>
      {d.canEmbed ? (
        <iframe
          src={d.url}
          style={S.iframe}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          title="Preview"
        />
      ) : (
        <div style={S.embedBlocked}>
          <span style={{ fontSize: 32 }}>🚫</span>
          <strong>Site blocks embedding</strong>
          <span style={{ color: 'var(--muted)', fontSize: 13 }}>
            This site uses X-Frame-Options or CSP headers to prevent iframes.
          </span>
          <a
            href={d.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent2)', textDecoration: 'none', fontSize: 13 }}
          >
            Open in browser →
          </a>
        </div>
      )}
    </div>
  )
}

export default function Page() {
  const [url, setUrl] = useState(DEFAULT_URL)
  const [data, setData] = useState<OGData | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState<'card' | 'embed'>('card')

  const load = useCallback(async (targetUrl: string) => {
    if (!targetUrl.trim()) return
    setLoading(true)
    setError('')
    setData(null)

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    try {
      const res = await fetch(`/api/og?url=${encodeURIComponent(targetUrl.trim())}`, {
        signal: controller.signal,
      })
      const json = await res.json()
      if (json.error) setError(json.error)
      else setData(json)
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') {
        setError('Request timed out — the site took too long to respond.')
      } else {
        setError('Network error — could not reach the server.')
      }
    } finally {
      clearTimeout(timer)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load(DEFAULT_URL)
  }, [load])

  return (
    <main style={S.main}>
      {/* URL bar */}
      <div style={S.topbar}>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && load(url)}
          placeholder="Paste a URL…"
          style={S.input}
        />
        <button onClick={() => load(url)} style={S.btn} disabled={loading}>
          {loading ? '…' : 'Load'}
        </button>
      </div>

      {/* Tabs */}
      <div style={S.tabs}>
        <button
          onClick={() => setTab('card')}
          style={tab === 'card' ? S.tabActive : S.tab}
        >
          OG Card
        </button>
        <button
          onClick={() => setTab('embed')}
          style={tab === 'embed' ? S.tabActive : S.tab}
        >
          Embed
        </button>
      </div>

      {/* States */}
      {loading && (
        <div style={S.state}>
          <div style={S.spinner} />
          Fetching…
        </div>
      )}
      {error && !loading && (
        <div style={S.state}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
          {error}
        </div>
      )}
      {!data && !loading && !error && (
        <div style={S.state}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔗</div>
          Enter a URL to preview
        </div>
      )}

      {/* Views */}
      {data && !loading && (
        <>
          {tab === 'card' && <OGCardView d={data} />}
          {tab === 'embed' && <EmbedView d={data} />}
        </>
      )}
    </main>
  )
}

/* ---- Styles ---- */
const S: Record<string, React.CSSProperties> = {
  main: { padding: 16, paddingBottom: 40, maxWidth: 480, margin: '0 auto' },

  topbar: { display: 'flex', gap: 10, marginBottom: 20 },
  input: {
    flex: 1, background: 'var(--surface)', border: '1.5px solid var(--border)',
    borderRadius: 12, color: 'var(--text)', fontSize: 13, padding: '11px 14px', outline: 'none',
  },
  btn: {
    background: 'var(--accent)', border: 'none', borderRadius: 12, color: '#fff',
    cursor: 'pointer', fontSize: 13, fontWeight: 600, padding: '11px 18px', whiteSpace: 'nowrap',
  },

  tabs: { display: 'flex', gap: 6, marginBottom: 18 },
  tab: {
    background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 20,
    color: 'var(--muted)', cursor: 'pointer', fontSize: 12, fontWeight: 500, padding: '6px 14px',
  },
  tabActive: {
    background: 'var(--accent)', border: '1.5px solid var(--accent)', borderRadius: 20,
    color: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 500, padding: '6px 14px',
  },

  state: { textAlign: 'center', padding: '60px 20px', color: 'var(--muted)', fontSize: 14 },
  spinner: {
    width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--accent)',
    borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto 12px',
  },

  // OG Card
  ogCard: {
    borderRadius: 'var(--radius)', border: '1.5px solid var(--border)', overflow: 'hidden',
    background: 'var(--surface)', display: 'block', textDecoration: 'none', color: 'inherit',
  },
  ogImage: { width: '100%', aspectRatio: '1.91/1', objectFit: 'cover', display: 'block' },
  ogBody: { padding: '14px 16px' },
  ogDomain: {
    color: 'var(--muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em',
    marginBottom: 5, display: 'flex', alignItems: 'center', gap: 6,
  },
  favicon: { width: 14, height: 14, borderRadius: 3, objectFit: 'contain' },
  ogTitle: { fontSize: 15, fontWeight: 600, lineHeight: 1.3, marginBottom: 6 },
  ogDesc: { fontSize: 13, color: 'var(--muted)', lineHeight: 1.45 },

  // Embed
  embedWrap: { borderRadius: 'var(--radius)', overflow: 'hidden', border: '1.5px solid var(--border)', background: 'var(--surface)' },
  embedHeader: { padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--border)', background: 'var(--surface2)' },
  embedDots: { display: 'flex', gap: 5 },
  dot: { width: 10, height: 10, borderRadius: '50%' },
  embedUrl: { flex: 1, background: 'var(--bg)', borderRadius: 6, padding: '4px 10px', fontSize: 11, color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  iframe: { width: '100%', height: 500, border: 'none', display: 'block' },
  embedBlocked: { height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: 13, gap: 8, padding: 20, textAlign: 'center' },
}
