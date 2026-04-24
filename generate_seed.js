const fs = require('fs');

// We will recreate the seed data based on the structure we know
const MOCK_BLOGS = require('./temp_blog_data.json');

let sql = `-- Seed script for Capital Motor Cars Blog Posts (April 2026)
-- Run this in your Supabase SQL Editor to populate the blog_posts table

TRUNCATE TABLE blog_posts;

INSERT INTO blog_posts (
  id, title, slug, excerpt, content, cover_image_url, 
  seo_title, seo_description, seo_keywords, 
  display_order, is_active, published_at, created_at, updated_at
) VALUES
`;

const values = MOCK_BLOGS.map(post => {
  const escapeString = (str) => {
    if (!str) return 'NULL';
    return "'" + str.replace(/'/g, "''") + "'";
  };
  
  return `(
  ${escapeString(post.id)}, 
  ${escapeString(post.title)}, 
  ${escapeString(post.slug)}, 
  ${escapeString(post.excerpt)}, 
  ${escapeString(post.content)}, 
  ${escapeString(post.cover_image_url)}, 
  ${escapeString(post.seo_title)}, 
  ${escapeString(post.seo_description)}, 
  ${escapeString(post.seo_keywords)}, 
  ${post.display_order}, 
  ${post.is_active}, 
  ${escapeString(post.published_at)}, 
  ${escapeString(post.created_at)}, 
  ${escapeString(post.updated_at)}
)`;
});

sql += values.join(',\n') + ';\n';
fs.writeFileSync('supabase/seed_blogs.sql', sql);
