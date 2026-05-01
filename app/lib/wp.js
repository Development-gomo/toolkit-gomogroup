// lib/wp.js

const API_BASE = 'https://tools.gomogroup.com/wp-json';

// 🧱 Pages with ACF
export async function getPageWithACF(slug) {
  try {
    const url = `${API_BASE}/wp/v2/pages?slug=${slug}`;
    
    const res = await fetch(url, {
      cache: 'no-store',
    });

    const data = await res.json();
    
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
    console.error('Error fetching page:', error);
    return null;
  }
}

async function fetchOptionsEndpoint(path) {
  const response = await fetch(`${API_BASE}${path}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed options request: ${path}`);
  }

  return response.json();
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
    const res = await fetch(`${API_BASE}/wp/v2/posts?include=${idString}`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error('Error fetching news posts:', error);
    return [];
  }
}
