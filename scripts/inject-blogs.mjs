import fs from 'fs';
import path from 'path';

function inject() {
  const b1 = JSON.parse(fs.readFileSync(path.resolve('scripts/b1.json'), 'utf-8'));
  const b2 = JSON.parse(fs.readFileSync(path.resolve('scripts/b2.json'), 'utf-8'));
  const b3 = JSON.parse(fs.readFileSync(path.resolve('scripts/b3.json'), 'utf-8'));
  const b4 = JSON.parse(fs.readFileSync(path.resolve('scripts/b4.json'), 'utf-8'));
  const b5 = JSON.parse(fs.readFileSync(path.resolve('scripts/b5.json'), 'utf-8'));

  const allNewBlogs = [...b1, ...b2, ...b3, ...b4, ...b5];
  
  // Format the objects nicely as a string
  const newBlogsStr = allNewBlogs.map(blog => {
    return `  {
    title: ${JSON.stringify(blog.title)},
    slug: '${blog.slug}',
    category: '${blog.category}',
    content: \`${blog.content.replace(/`/g, '\\`')}\`,
    cover_image_url: '${blog.cover_image_url}',
    seo_title: ${JSON.stringify(blog.seo_title)},
    seo_description: ${JSON.stringify(blog.seo_description)},
    seo_keywords: ${JSON.stringify(blog.seo_keywords)},
    display_order: ${blog.display_order},
    is_active: ${blog.is_active},
    is_featured: ${blog.is_featured},
    published_at: '${blog.published_at}',
    created_at: '${blog.created_at}',
    updated_at: '${blog.updated_at}',
    author: '${blog.author}'
  }`;
  }).join(',\n');

  const mockBlogsPath = path.resolve('src/data/mockBlogs.ts');
  let content = fs.readFileSync(mockBlogsPath, 'utf-8');
  
  // Replace the closing bracket
  const closingRegex = /\n  \}\n\];\n?$/;
  
  if (closingRegex.test(content)) {
    content = content.replace(closingRegex, `\n  },\n${newBlogsStr}\n];\n`);
    fs.writeFileSync(mockBlogsPath, content, 'utf-8');
    console.log("Successfully injected 10 blogs into mockBlogs.ts!");
  } else {
    console.log("Could not find the closing bracket pattern in mockBlogs.ts");
    content = content.replace(/\];\s*$/, `,\n${newBlogsStr}\n];\n`);
    fs.writeFileSync(mockBlogsPath, content, 'utf-8');
    console.log("Used fallback replace to inject blogs.");
  }
}

inject();
