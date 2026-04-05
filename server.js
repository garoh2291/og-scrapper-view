const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 8002;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/og', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OGScraper/1.0; +https://example.com)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      timeout: 10000,
      maxRedirects: 5,
    });

    const html = response.data;
    const $ = cheerio.load(html);

    const getMeta = (name) =>
      $(`meta[property="${name}"]`).attr('content') ||
      $(`meta[name="${name}"]`).attr('content') ||
      '';

    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname.replace('www.', '');
    const faviconPath = $('link[rel="icon"], link[rel="shortcut icon"]').first().attr('href') || '/favicon.ico';
    const favicon = faviconPath.startsWith('http') ? faviconPath : `${parsedUrl.protocol}//${parsedUrl.hostname}${faviconPath.startsWith('/') ? '' : '/'}${faviconPath}`;

    const ogData = {
      url,
      domain,
      title: getMeta('og:title') || $('title').text().trim() || domain,
      description: getMeta('og:description') || getMeta('description') || '',
      image: (() => {
        const img = getMeta('og:image');
        if (!img) return '';
        if (img.startsWith('http')) return img;
        return `${parsedUrl.protocol}//${parsedUrl.hostname}${img.startsWith('/') ? '' : '/'}${img}`;
      })(),
      siteName: getMeta('og:site_name') || domain,
      type: getMeta('og:type') || 'website',
      favicon,
      themeColor: $('meta[name="theme-color"]').attr('content') || '#000000',
      canEmbed: !response.headers['x-frame-options'] && !response.headers['content-security-policy']?.includes('frame-ancestors'),
    };

    res.json(ogData);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch URL' });
  }
});

app.listen(PORT, () => {
  console.log(`OG Scraper running at http://localhost:${PORT}`);
});
