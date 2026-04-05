'use client'

import { useState, useCallback, useEffect } from 'react'
import type { OGData } from './api/og/route'

const DEFAULT_URL = 'https://www.kingscross.co.uk/whats-on'

type Tab = { label: string; id: number }
const TABS: Tab[] = [
  { label: 'OG Card', id: 0 },
  { label: 'Hero', id: 1 },
  { label: 'Compact', id: 2 },
  { label: 'Messenger', id: 3 },
  { label: 'Embed', id: 4 },
  { label: 'Metadata', id: 5 },
]

function SafeImage({
  src,
  alt,
  style,
  className,
  fallback,
}: {
  src: string
  alt: string
  style?: React.CSSProperties
  className?: string
  fallback?: React.ReactNode
}) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return <>{fallback ?? null}</>
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} style={style} className={className} onError={() => setFailed(true)} />
  )
}

function OGCardView({ d }: { d: OGData }) {
  return (
    <a href={d.url} target="_blank" rel="noopener noreferrer" style={S.ogCard}>
      <SafeImage
        src={d.image}
        alt={d.title}
        style={S.ogImage}
        fallback={<div style={{ ...S.ogImage, ...S.placeholder }} />}
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

function HeroCardView({ d }: { d: OGData }) {
  return (
    <a href={d.url} target="_blank" rel="noopener noreferrer" style={S.heroCard}>
      {d.image && (
        <div style={{ ...S.heroBg, backgroundImage: `url('${d.image}')` }} />
      )}
      <div style={S.heroBlur} />
      <div style={S.heroContent}>
        <div style={S.heroBadge}>
          <SafeImage src={d.favicon} alt="" style={{ width: 12, height: 12, borderRadius: 2 }} />
          {d.siteName}
        </div>
        <div style={S.heroTitle}>{d.title}</div>
        {d.description && <div style={S.heroDesc}>{d.description}</div>}
        <div style={S.heroCta}>Open →</div>
      </div>
    </a>
  )
}

function CompactCardView({ d }: { d: OGData }) {
  return (
    <a href={d.url} target="_blank" rel="noopener noreferrer" style={S.compactCard}>
      <SafeImage
        src={d.image}
        alt={d.title}
        style={S.compactThumb}
        fallback={<div style={{ ...S.compactThumb, ...S.placeholder }} />}
      />
      <div style={S.compactInfo}>
        <div style={S.compactDomain}>{d.domain}</div>
        <div style={S.compactTitle}>{d.title}</div>
        {d.description && <div style={S.compactDesc}>{d.description}</div>}
      </div>
    </a>
  )
}

function MessengerView({ d }: { d: OGData }) {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return (
    <div style={S.messengerWrap}>
      <div style={S.messengerBubble}>
        <a href={d.url} target="_blank" rel="noopener noreferrer" style={S.messengerCard}>
          <SafeImage src={d.image} alt={d.title} style={S.messengerImage} />
          <div style={S.messengerBody}>
            <div style={S.messengerSite}>{d.siteName}</div>
            <div style={S.messengerTitle}>{d.title}</div>
            {d.description && <div style={S.messengerDesc}>{d.description}</div>}
          </div>
        </a>
        <div style={S.messengerTime}>{time}</div>
      </div>
    </div>
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
            This site uses X-Frame-Options or CSP to prevent iframes.
          </span>
          <a href={d.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent2)', textDecoration: 'none', fontSize: 13 }}>
            Open in browser →
          </a>
        </div>
      )}
    </div>
  )
}

function MetadataView({ d }: { d: OGData }) {
  const rows: [string, string][] = [
    ['Title', d.title],
    ['Description', d.description],
    ['Site', d.siteName],
    ['Domain', d.domain],
    ['Type', d.type],
    ['Image', d.image],
    ['Favicon', d.favicon],
    ['Theme', d.themeColor],
    ['URL', d.url],
  ].filter(([, v]) => v) as [string, string][]

  return (
    <div>
      <div style={S.metaCard}>
        {d.image && (
          <SafeImage src={d.image} alt={d.title} style={{ width: '100%', aspectRatio: '1.91/1', objectFit: 'cover', display: 'block' }} />
        )}
        <div>
          {rows.map(([key, val]) => (
            <div key={key} style={S.metaRow}>
              <div style={S.metaKey}>{key}</div>
              <div style={S.metaVal}>
                {key === 'Theme' ? (
                  <>
                    <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: 3, background: val, verticalAlign: 'middle', marginRight: 6 }} />
                    {val}
                  </>
                ) : val}
              </div>
            </div>
          ))}
        </div>
      </div>
      <a href={d.url} target="_blank" rel="noopener noreferrer" style={S.openBtn}>
        Open in browser ↗
      </a>
    </div>
  )
}

export default function Page() {
  const [url, setUrl] = useState(DEFAULT_URL)
  const [data, setData] = useState<OGData | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState(0)

  const load = useCallback(async (targetUrl: string) => {
    if (!targetUrl.trim()) return
    setLoading(true)
    setError('')
    setData(null)
    try {
      const res = await fetch(`/api/og?url=${encodeURIComponent(targetUrl.trim())}`)
      const json = await res.json()
      if (json.error) setError(json.error)
      else setData(json)
    } catch {
      setError('Network error — could not reach the server.')
    } finally {
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
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={tab === t.id ? S.tabActive : S.tab}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
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
      {data && !loading && (
        <>
          {tab === 0 && <OGCardView d={data} />}
          {tab === 1 && <HeroCardView d={data} />}
          {tab === 2 && <CompactCardView d={data} />}
          {tab === 3 && <MessengerView d={data} />}
          {tab === 4 && <EmbedView d={data} />}
          {tab === 5 && <MetadataView d={data} />}
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

  tabs: { display: 'flex', gap: 6, marginBottom: 18, overflowX: 'auto', paddingBottom: 2 },
  tab: {
    background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 20,
    color: 'var(--muted)', cursor: 'pointer', fontSize: 12, fontWeight: 500,
    padding: '6px 14px', whiteSpace: 'nowrap',
  },
  tabActive: {
    background: 'var(--accent)', border: '1.5px solid var(--accent)', borderRadius: 20,
    color: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 500,
    padding: '6px 14px', whiteSpace: 'nowrap',
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
  ogImage: { width: '100%', aspectRatio: '1.91/1', objectFit: 'cover', display: 'block', background: 'var(--surface2)' },
  ogBody: { padding: '14px 16px' },
  ogDomain: { color: 'var(--muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 5, display: 'flex', alignItems: 'center', gap: 6 },
  favicon: { width: 14, height: 14, borderRadius: 3, objectFit: 'contain' },
  ogTitle: { fontSize: 15, fontWeight: 600, lineHeight: 1.3, marginBottom: 6 },
  ogDesc: { fontSize: 13, color: 'var(--muted)', lineHeight: 1.45 },

  // Hero
  heroCard: {
    borderRadius: 'var(--radius)', overflow: 'hidden', position: 'relative',
    minHeight: 420, display: 'block', textDecoration: 'none', color: 'inherit',
  },
  heroBg: { position: 'absolute', inset: 0, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.45) saturate(1.2)' },
  heroBlur: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.92) 100%)' },
  heroContent: { position: 'relative', padding: '24px 20px 28px', minHeight: 420, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' },
  heroBadge: { display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 20, padding: '4px 10px', fontSize: 11, color: 'rgba(255,255,255,0.85)', marginBottom: 12, width: 'fit-content' },
  heroTitle: { fontSize: 22, fontWeight: 700, lineHeight: 1.25, marginBottom: 10, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.5)' },
  heroDesc: { fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: 18 },
  heroCta: { display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff', color: '#111', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 600, width: 'fit-content' },

  // Compact
  compactCard: { background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1.5px solid var(--border)', display: 'flex', gap: 12, padding: 14, textDecoration: 'none', color: 'inherit' },
  compactThumb: { width: 72, height: 72, borderRadius: 10, objectFit: 'cover', background: 'var(--surface2)', flexShrink: 0 },
  compactInfo: { flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  compactDomain: { color: 'var(--accent2)', fontSize: 11, fontWeight: 500, marginBottom: 4 },
  compactTitle: { fontSize: 14, fontWeight: 600, lineHeight: 1.3, marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  compactDesc: { fontSize: 12, color: 'var(--muted)', lineHeight: 1.4 },
  placeholder: { display: 'flex', alignItems: 'center', justifyContent: 'center' },

  // Messenger
  messengerWrap: { display: 'flex', justifyContent: 'flex-start' },
  messengerBubble: { maxWidth: '85%' },
  messengerCard: { borderRadius: '4px 18px 18px 18px', border: '1.5px solid var(--border)', overflow: 'hidden', display: 'block', textDecoration: 'none', color: 'inherit', background: 'var(--surface)' },
  messengerImage: { width: '100%', aspectRatio: '1.91/1', objectFit: 'cover', display: 'block' },
  messengerBody: { padding: '10px 13px 13px', borderLeft: '3px solid var(--accent)' },
  messengerSite: { fontSize: 10, color: 'var(--accent2)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 },
  messengerTitle: { fontSize: 14, fontWeight: 600, lineHeight: 1.3, marginBottom: 4 },
  messengerDesc: { fontSize: 12, color: 'var(--muted)', lineHeight: 1.4 },
  messengerTime: { fontSize: 11, color: 'var(--muted)', marginTop: 5, paddingLeft: 4 },

  // Embed
  embedWrap: { borderRadius: 'var(--radius)', overflow: 'hidden', border: '1.5px solid var(--border)', background: 'var(--surface)' },
  embedHeader: { padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--border)', background: 'var(--surface2)' },
  embedDots: { display: 'flex', gap: 5 },
  dot: { width: 10, height: 10, borderRadius: '50%' },
  embedUrl: { flex: 1, background: 'var(--bg)', borderRadius: 6, padding: '4px 10px', fontSize: 11, color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  iframe: { width: '100%', height: 500, border: 'none', display: 'block' },
  embedBlocked: { height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: 13, gap: 8, padding: 20, textAlign: 'center' },

  // Metadata
  metaCard: { background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1.5px solid var(--border)', overflow: 'hidden' },
  metaRow: { display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 16px', borderBottom: '1px solid var(--border)' },
  metaKey: { fontSize: 11, color: 'var(--accent2)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', minWidth: 80, paddingTop: 1 },
  metaVal: { fontSize: 13, color: 'var(--text)', lineHeight: 1.4, wordBreak: 'break-all' },
  openBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 12, color: 'var(--text)', fontSize: 13, fontWeight: 500, padding: 11, textDecoration: 'none', marginTop: 12 },
}
