const BASE_URL = 'https://modernpaciran.sch.id/wp-json/wp/v2';

// Fetch posts
export async function fetchPosts(page = 1, perPage = 6) {
  const res = await fetch(`${BASE_URL}/posts?_embed&page=${page}&per_page=${perPage}`);
  return await res.json();
}

// Fetch total posts
export async function fetchTotalPostCount() {
  const res = await fetch(`${BASE_URL}/posts?per_page=1`);
  return parseInt(res.headers.get("X-WP-Total") || "0");
}

// Fetch categories
export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/categories`);
  return await res.json();
}

// Fetch tags
export async function fetchTags() {
  const res = await fetch(`${BASE_URL}/tags`);
  return await res.json();
}

// Fetch posts by category
export async function fetchPostsByCategory(categoryId: number, page = 1, perPage = 6) {
  const res = await fetch(`${BASE_URL}/posts?_embed&categories=${categoryId}&page=${page}&per_page=${perPage}`);
  return await res.json();
}

// Fetch total posts by category
export async function fetchTotalPostCountByCategory(categoryId: number) {
  const res = await fetch(`${BASE_URL}/posts?categories=${categoryId}&per_page=1`);
  return parseInt(res.headers.get("X-WP-Total") || "0");
}

// Fetch posts by tag
export async function fetchPostsByTag(tagId: number, page = 1, perPage = 6) {
  const res = await fetch(`${BASE_URL}/posts?_embed&tags=${tagId}&page=${page}&per_page=${perPage}`);
  return await res.json();
}

// Fetch total posts by tag
export async function fetchTotalPostCountByTag(tagId: number) {
  const res = await fetch(`${BASE_URL}/posts?tags=${tagId}&per_page=1`);
  return parseInt(res.headers.get("X-WP-Total") || "0");
}

// Fetch category by slug
export async function fetchCategoryBySlug(slug: string) {
  const res = await fetch(`${BASE_URL}/categories?slug=${slug}`);
  const data = await res.json();
  return data[0];
}

// Fetch tag by slug
export async function fetchTagBySlug(slug: string) {
  const res = await fetch(`${BASE_URL}/tags?slug=${slug}`);
  const data = await res.json();
  return data[0];
}

// Static paths for blog pagination
export async function getStaticPaths() {
  const totalPosts = await fetchTotalPostCount();
  const postsPerPage = 6;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const paths = [];
  for (let i = 2; i <= totalPages; i++) {
    paths.push({ params: { page: i.toString() } });
  }

  return paths;
}

// Static paths for category pagination
export async function getStaticPathsByCategory(categoryId: number) {
  const totalPosts = await fetchTotalPostCountByCategory(categoryId);
  const postsPerPage = 6;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const paths = [];
  for (let i = 2; i <= totalPages; i++) {
    paths.push({ params: { category: categoryId.toString(), page: i.toString() } });
  }

  return paths;
}

// Static paths for tag pagination
export async function getStaticPathsByTag(tagId: number) {
  const totalPosts = await fetchTotalPostCountByTag(tagId);
  const postsPerPage = 6;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const paths = [];
  for (let i = 2; i <= totalPages; i++) {
    paths.push({ params: { tag: tagId.toString(), page: i.toString() } });
  }

  return paths;
}