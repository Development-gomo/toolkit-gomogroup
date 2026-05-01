// lib/wp.js

const API_BASE = process.env.WP_API_BASE || 'https://tools.gomogroup.com/wp-json';

async function fetchJSON(path) {
  const url = `${API_BASE}${path}`;
  const response = await fetch(url, {
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `WordPress request failed (${response.status} ${response.statusText}) for ${url}: ${body.slice(0, 240)}`,
    );
  }

  return response.json();
}

// 🧱 Pages with ACF
export async function getPageWithACF(slug) {
  try {
    const data = await fetchJSON(`/wp/v2/pages?slug=${encodeURIComponent(slug)}`);
    
    const [page] = data;
    
    if (!page) {
      return null;
    }

    // Handle ACF data - could be array or object
    const acfData = Array.isArray(page.acf) && page.acf.length === 0 ? {} : page.acf || {};

    return {
      id: page.id,
      slug: page.slug,
      title: page.title?.rendered,
      content: page.content?.rendered,
      acf: acfData,
    };
  } catch (error) {
    console.error(`Error fetching page "${slug}" from ${API_BASE}:`, error);
    return null;
  }
}

async function fetchOptionsEndpoint(path) {
  return fetchJSON(path);
}

export async function getToolkitSettings() {
  const endpoints = [
    '/gomo/v1/toolkit-settings',
    '/acf/v3/options/toolkit-settings',
    '/acf/v3/options/options',
  ];

  for (const endpoint of endpoints) {
    try {
      const data = await fetchOptionsEndpoint(endpoint);
      const fields = data?.acf || data;

      if (fields && typeof fields === 'object') {
        return fields;
      }
    } catch {
      continue;
    }
  }

  return null;
}

// 📰 Fetch posts by IDs
export async function getNewsPostsByIdsServer(ids = []) {
  if (!ids.length) return [];
  try {
    const idString = ids.join(',');
    return await fetchJSON(`/wp/v2/posts?include=${idString}`);
  } catch (error) {
    console.error('Error fetching news posts:', error);
    return [];
  }
}
