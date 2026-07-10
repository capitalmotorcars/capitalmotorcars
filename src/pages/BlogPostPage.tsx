import { useEffect, useState, type ReactNode } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { JsonLd, createArticleSchema, createPersonSchema } from '@/components/JsonLd';
import { SEO } from '@/components/SEO';
import { getBlogPostBySlug, getActiveBlogPosts } from '@/services/blogService';
import type { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft, ArrowRight, Phone, Search, ChevronRight } from 'lucide-react';
import NotFound from '@/pages/NotFound';

const BLOG_REFRESH_DATE = new Date('2026-04-01T00:00:00Z');
const BLOG_REFRESH_LABEL = 'Last Updated: April 2026';

function formatDate(value?: string | null) {
  if (!value) return '';
  const date = new Date(value);
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date);
}

function parseKeywords(value?: string) {
  if (!value) return undefined;
  return value.split(',').map((keyword) => keyword.trim()).filter(Boolean);
}

function isOlderThanSixMonths(value?: string | null) {
  if (!value) return false;
  const publishedDate = new Date(value);
  if (Number.isNaN(publishedDate.getTime())) return false;

  const threshold = new Date(BLOG_REFRESH_DATE);
  threshold.setMonth(threshold.getMonth() - 6);

  return publishedDate < threshold;
}

/** Allow internal routes or https: only (blocks javascript:, data:, etc.). */
function sanitizeMarkdownHref(raw: string): string | null {
  const href = raw.trim();
  if (href.startsWith('/') && !href.startsWith('//')) {
    return href;
  }
  try {
    const u = new URL(href);
    if (u.protocol === 'https:') {
      return u.toString();
    }
  } catch {
    return null;
  }
  return null;
}

const BRAND_LINKS: Record<string, string> = {
  'BMW': '/brand/bmw',
  'Porsche': '/brand/porsche',
  'Mercedes-Benz': '/brand/mercedes-benz',
  'Mercedes': '/brand/mercedes-benz',
  'Lexus': '/brand/lexus',
  'Land Rover': '/brand/land-rover',
  'Range Rover': '/brand/land-rover',
  'Jeep': '/brand/jeep',
  'Honda': '/brand/honda',
  'Ford': '/brand/ford',
  'Chevrolet': '/brand/chevrolet',
  'Chevy': '/brand/chevrolet',
  'Volkswagen': '/brand/volkswagen',
  'VW': '/brand/volkswagen',
  'Audi': '/brand/audi'
};

function linkBrandsInText(text: string, linkedBrands: Set<string>): ReactNode {
  const unlinked = Object.keys(BRAND_LINKS).filter(k => !linkedBrands.has(BRAND_LINKS[k]));
  if (unlinked.length === 0) return text;

  // Sort by length descending so "Mercedes-Benz" matches before "Mercedes"
  unlinked.sort((a, b) => b.length - a.length);

  const regex = new RegExp(`\\b(${unlinked.join('|')})\\b`, 'i');
  const match = text.match(regex);
  if (!match) return text;

  const matchedText = match[1];
  const canonicalKey = unlinked.find(k => k.toLowerCase() === matchedText.toLowerCase())!;
  const slug = BRAND_LINKS[canonicalKey];

  linkedBrands.add(slug);

  const prefix = text.slice(0, match.index);
  const suffix = text.slice((match.index || 0) + matchedText.length);

  return (
    <>
      {prefix}
      <Link to={slug} className="text-accent underline underline-offset-4 font-bold hover:text-accent/80 transition-colors">
        {matchedText}
      </Link>
      {linkBrandsInText(suffix, linkedBrands)}
    </>
  );
}

/** Renders **bold** text and [links](/url) */
function renderInline(text: string, linkedBrands?: Set<string>) {
  // Matches [text](url) or **bold**
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="text-foreground font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    
    if (part.startsWith('[') && part.includes('](')) {
      const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        const [, linkText, linkUrl] = linkMatch;
        const safe = sanitizeMarkdownHref(linkUrl);
        if (!safe) {
          return <span key={idx}>{linkText}</span>;
        }
        if (safe.startsWith('/')) {
          return (
            <Link
              key={idx}
              to={safe}
              className="text-accent underline underline-offset-4 font-bold hover:text-accent/80 transition-colors"
            >
              {linkText}
            </Link>
          );
        }
        return (
          <a
            key={idx}
            href={safe}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-4 font-bold hover:text-accent/80 transition-colors"
          >
            {linkText}
          </a>
        );
      }
    }
    
    if (linkedBrands && part.length > 0) {
      return <span key={idx}>{linkBrandsInText(part, linkedBrands)}</span>;
    }
    
    return part;
  });
}

function BlogCtaBlock({ variant }: { variant: 'mid' | 'end' }) {
  const eyebrow = variant === 'mid' ? 'Ready for a better lease?' : 'Talk to Capital Motor Cars';
  const title = variant === 'mid'
    ? 'Compare lease options without dealership pressure.'
    : 'Get expert help with leasing or your next upgrade.';
  const description = variant === 'mid'
    ? 'We help NJ and NY drivers find the right vehicle, review offers clearly, and move faster with less stress.'
    : 'Speak with our team for zero-down options, trade-in guidance, and a simpler car leasing process from start to finish.';

  return (
    <div className="my-10 overflow-hidden rounded-3xl border border-accent/20 bg-accent/[0.06] shadow-[0_0_40px_-20px_rgba(59,130,246,0.35)]">
      <div className="p-6 sm:p-8 md:p-10">
        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-accent">{eyebrow}</p>
        <h3 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          {description}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 rounded-xl">
            <Link to="/contact" className="inline-flex items-center gap-2">
              Schedule a Call
              <Phone className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-accent/30 text-accent hover:bg-accent/10 font-semibold px-8 py-6 rounded-xl">
            <Link to="/quiz" className="inline-flex items-center gap-2">
              Start the Vehicle Quiz
              <Search className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function BlogTableOfContents({ content }: { content: string }) {
  const headings = content
    .split('\n')
    .filter((line) => line.trim().startsWith('###'))
    .map((line) => line.replace('###', '').trim());

  if (headings.length === 0) return null;

  return (
    <div className="mb-10 p-8 rounded-3xl border border-accent/10 bg-accent/[0.02] shadow-sm">
      <h4 className="text-sm font-black uppercase tracking-[0.2em] text-accent mb-6">Table of Contents</h4>
      <ul className="space-y-3">
        {headings.map((heading, i) => (
          <li key={i} className="flex items-start gap-3 group">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/30 mt-2 transition-colors group-hover:bg-accent" />
            <a
              href={`#${heading.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`}
              className="text-[15px] font-medium text-muted-foreground hover:text-accent transition-colors"
            >
              {heading}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Renders plain text with section headings and bullet lists styled properly */
function BlogContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const blocks: ReactNode[] = [];
  const linkedBrands = new Set<string>();
  let i = 0;
  let key = 0;
  let insertedMidCta = false;

  const insertMidCtaIfNeeded = () => {
    if (!insertedMidCta && blocks.length >= 3) {
      blocks.push(<BlogCtaBlock key={`cta-mid-${key++}`} variant="mid" />);
      insertedMidCta = true;
    }
  };

  blocks.push(<BlogTableOfContents key="toc" content={content} />);

  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Bullet list (lines starting with - or *)
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, '').trim());
        i++;
      }
      blocks.push(
        <ul key={key++} className="list-disc pl-6 space-y-2 my-4 text-muted-foreground leading-relaxed">
          {items.map((item, j) => (
            <li key={j}>{renderInline(item, linkedBrands)}</li>
          ))}
        </ul>
      );
      insertMidCtaIfNeeded();
      continue;
    }

    // Section heading: ## H2, ### H3, or short line ending with :
    const trimmed = line.trim();
    const isH2 = trimmed.startsWith('## ') && trimmed.length < 120;
    const isH3 = trimmed.startsWith('### ') && trimmed.length < 120;
    const isColonHeading = trimmed.endsWith(':') && !trimmed.startsWith('http') && trimmed.length < 120;
    if (isH2 || isH3 || isColonHeading) {
      const headingText = isH2 ? trimmed.replace(/^##\s+/, '') : isH3 ? trimmed.replace(/^###\s+/, '') : trimmed;
      const id = (isH2 || isH3) ? headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') : undefined;
      blocks.push(
        isH2
          ? <h2 key={key++} id={id} className="text-2xl font-black text-foreground mt-12 mb-4 first:mt-0 tracking-tight scroll-mt-24">{renderInline(headingText)}</h2>
          : <h3 key={key++} id={id} className="text-xl font-black text-foreground mt-10 mb-4 first:mt-0 tracking-tight scroll-mt-24">{renderInline(headingText)}</h3>
      );
      insertMidCtaIfNeeded();
      i++;
      continue;
    }

    // Table: detect lines starting with |
    if (line.trim().startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      
      // Parse table
      const headers = tableLines[0].split('|').map(cell => cell.trim()).filter(Boolean);
      const rows = tableLines.slice(2).map(row => row.split('|').map(cell => cell.trim()).filter(Boolean));

      blocks.push(
        <div key={key++} className="overflow-x-auto my-8 border border-accent/20 rounded-2xl shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-accent/[0.03] border-b border-accent/10">
                {headers.map((header, idx) => (
                  <th key={idx} className="p-4 text-sm font-bold tracking-wider text-foreground uppercase">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className="border-b border-accent/5 last:border-0 hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="p-4 text-sm text-muted-foreground whitespace-nowrap">
                      {renderInline(cell, linkedBrands)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      insertMidCtaIfNeeded();
      continue;
    }

    // Paragraph
    const paraLines: string[] = [];
    while (i < lines.length) {
      const l = lines[i];
      if (l.trim() === '') break;
      if (/^[-*]\s+/.test(l)) break;
      if (l.trim().startsWith('|')) break;
      if ((l.trim().endsWith(':') || l.trim().startsWith('###')) && l.trim().length < 80) break;
      paraLines.push(l);
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push(
        <p key={key++} className="text-muted-foreground leading-[1.8] mb-6 text-[17px] text-justify">
          {renderInline(paraLines.join('\n'), linkedBrands)}
        </p>
      );
      insertMidCtaIfNeeded();
    }
  }

  if (!insertedMidCta && blocks.length > 0) {
    const insertIndex = Math.max(1, Math.ceil(blocks.length / 2));
    blocks.splice(insertIndex, 0, <BlogCtaBlock key={`cta-mid-fallback-${key++}`} variant="mid" />);
  }

  blocks.push(<BlogCtaBlock key={`cta-end-${key++}`} variant="end" />);

  return <div className="blog-body">{blocks}</div>;
}

function extractFAQSchema(content: string) {
  const lines = content.split('\n');
  const faqs = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('### ') || line.startsWith('## ') || (line.endsWith(':') && line.length < 120 && !line.startsWith('http'))) {
      const question = line.replace(/^###\s+/, '').replace(/^##\s+/, '').replace(/:$/, '');
      
      let j = i + 1;
      const answerLines = [];
      while (j < lines.length) {
        const nextLine = lines[j].trim();
        if (nextLine.startsWith('###') || nextLine.startsWith('##') || nextLine.endsWith(':')) {
           break;
        }
        if (nextLine !== '') {
           answerLines.push(nextLine);
        } else if (answerLines.length > 0) {
           break;
        }
        j++;
      }
      
      if (answerLines.length > 0) {
         const text = answerLines.join(' ').replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\|/g, '');
         if (text.length > 10) {
           faqs.push({
             "@type": "Question",
             "name": question,
             "acceptedAnswer": {
               "@type": "Answer",
               "text": text
             }
           });
         }
      }
    }
  }

  if (faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs
  };
}

export default function BlogPostPage() {
  const { slug: urlSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // If slug is not in URL params, check the pathname (for top-level routes)
  // Handle trailing slashes correctly by filtering out empty segments
  const actualSlug = urlSlug || location.pathname.split('/').filter(Boolean).pop() || '';

  useEffect(() => {
    async function loadData() {
      if (!actualSlug) return;
      setLoading(true);

      const [postResult, allPostsResult] = await Promise.all([
        getBlogPostBySlug(actualSlug),
        getActiveBlogPosts()
      ]);

      if (postResult.success && postResult.data) {
        setPost(postResult.data);
      } else {
        setPost(null);
      }

      if (allPostsResult.success && allPostsResult.data) {
        setAllPosts(allPostsResult.data);
      }

      setLoading(false);
    }

    loadData();
    window.scrollTo(0, 0);
  }, [actualSlug]);

  if (loading) {
    return (
      <Layout>
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4 lg:px-8 text-muted-foreground">
            Loading post...
          </div>
        </section>
      </Layout>
    );
  }

  if (!post) {
    return <NotFound />;
  }

  const publishDate = post.published_at || post.created_at;
  const showRefreshLabel = isOlderThanSixMonths(publishDate);

  // Find next and previous posts
  const currentIndex = allPosts.findIndex(p => p.id === post.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Sidebar posts (recent, excluding current)
  const recentPosts = allPosts.filter(p => p.id !== post.id).slice(0, 5);

  const faqSchema = extractFAQSchema(post.content);

  return (
    <Layout
      breadcrumbItems={[
        { name: 'Home', url: 'https://www.capitalmotorcars.com/' },
        { name: 'Blog', url: 'https://www.capitalmotorcars.com/blog' },
        { name: post.title, url: `https://www.capitalmotorcars.com/${post.slug}` },
      ]}
    >
      <SEO
        title={post.seo_title || post.title}
        description={post.seo_description || post.excerpt || 'Capital Motor Cars blog post'}
        canonicalPath={`/${post.slug}`}
        seoKeywords={parseKeywords(post.seo_keywords)}
        ogTitle={post.seo_title || post.title}
        ogDescription={post.seo_description || post.excerpt || post.title}
        ogImage={post.cover_image_url}
        ogType="article"
      />
      <JsonLd
        data={[
          createArticleSchema({
            headline: post.seo_title || post.title,
            description: post.seo_description || post.excerpt || 'Capital Motor Cars blog post',
            url: `https://www.capitalmotorcars.com/${post.slug}`,
            image: post.cover_image_url,
            publishedAt: post.published_at || post.created_at,
            modifiedAt: post.updated_at,
            authorName: 'Capital Motor Cars Editorial Team',
          }),
          createPersonSchema({
            name: 'Capital Motor Cars Editorial Team',
            jobTitle: 'Automotive Leasing Specialists',
            description: 'The Capital Motor Cars editorial team consists of automotive leasing experts with over 30 years of combined industry experience, covering car leasing, financing, and vehicle services in New Jersey and New York.',
            sameAs: ['https://www.capitalmotorcars.com/about'],
          }),
          ...(faqSchema ? [faqSchema] : []),
          ...(post.slug.startsWith('car-leasing-') ? [
            {
              '@context': 'https://schema.org',
              '@type': 'AutoBroker',
              name: post.title,
              description: post.seo_description || post.excerpt,
              url: `https://www.capitalmotorcars.com/${post.slug}`,
              image: post.cover_image_url,
              telephone: '+1-201-509-5555',
              priceRange: '$$',
              address: {
                '@type': 'PostalAddress',
                addressLocality: post.slug.replace('car-leasing-', '').replace('-nj', '').split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
                addressRegion: 'NJ',
                addressCountry: 'US',
              },
              areaServed: {
                '@type': 'City',
                name: post.slug.replace('car-leasing-', '').replace('-nj', '').split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
              },
            }
          ] : [])
        ]}
      />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 relative">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <Button asChild variant="ghost" className="mb-6 -ml-4 text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5">
                <Link to="/blog" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to blog
                </Link>
              </Button>

              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(publishDate)}</span>
                  </div>
                  {showRefreshLabel && (
                    <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.07] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
                      <span>{BLOG_REFRESH_LABEL}</span>
                    </div>
                  )}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.1]">
                    {post.title}
                  </h1>
                  {post.excerpt && (
                    <p className="text-xl text-muted-foreground leading-relaxed border-l-4 border-accent/30 pl-6 py-2 italic font-medium">
                      {post.excerpt}
                    </p>
                  )}
                </div>

                {post.cover_image_url && (
                  <div className="overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl shadow-accent/5">
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className="w-full h-auto object-cover aspect-video"
                      fetchpriority="high"
                    />
                  </div>
                )}

                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <BlogContent content={post.content} />
                </div>

                {/* Next/Prev Navigation */}
                <div className="mt-16 pt-10 border-t border-accent/10 flex flex-col sm:flex-row justify-between gap-6">
                  {prevPost ? (
                    <Link
                      to={`/${prevPost.slug}`}
                      className="group flex-1 flex flex-col gap-2 p-6 rounded-2xl border border-accent/10 bg-accent/[0.02] hover:bg-accent/[0.05] transition-all"
                    >
                      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                        Previous Post
                      </span>
                      <span className="text-lg font-bold text-foreground leading-tight line-clamp-2">
                        {prevPost.title}
                      </span>
                    </Link>
                  ) : <div className="flex-1" />}

                  {nextPost ? (
                    <Link
                      to={`/${nextPost.slug}`}
                      className="group flex-1 flex flex-col gap-2 p-6 rounded-2xl border border-accent/10 bg-accent/[0.02] hover:bg-accent/[0.05] transition-all text-right"
                    >
                      <span className="flex items-center justify-end gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Next Post
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="text-lg font-bold text-foreground leading-tight line-clamp-2">
                        {nextPost.title}
                      </span>
                    </Link>
                  ) : <div className="flex-1" />}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:w-1/3 space-y-8">
              {/* Recent Posts — scrolls normally */}
              <div className="p-8 rounded-[2rem] border border-accent/10 bg-accent/[0.02] shadow-sm">
                <h2 className="text-2xl font-black text-foreground tracking-tight mb-6">
                  Recent Stories
                </h2>
                <div className="space-y-6">
                  {recentPosts.slice(0, 4).map((rPost) => (
                    <Link
                      key={rPost.id}
                      to={`/${rPost.slug}`}
                      className="group block space-y-2"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-widest text-accent/70">
                        {formatDate(rPost.published_at)}
                      </span>
                      <h3 className="text-[17px] font-bold text-foreground leading-snug group-hover:text-accent transition-colors">
                        {rPost.title}
                      </h3>
                      <div className="h-px w-full bg-accent/5 mt-4" />
                    </Link>
                  ))}
                </div>
                <Button asChild variant="link" className="mt-6 p-0 text-accent font-bold hover:no-underline flex items-center gap-2">
                  <Link to="/blog">
                    View all posts
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

              {/* Schedule a Call — sticky so it stays visible while scrolling */}
              <div className="sticky top-28">
                <div className="relative overflow-hidden p-1 rounded-[2.5rem] bg-gradient-to-br from-accent via-accent to-blue-600 shadow-2xl shadow-accent/30">
                  <div className="relative p-8 rounded-[2.3rem] bg-accent/10 backdrop-blur-sm border border-white/20">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl" />

                    <div className="relative z-10">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                        <Phone className="w-7 h-7 text-accent animate-pulse" />
                      </div>

                      <h2 className="text-3xl font-black text-white tracking-tight mb-4 leading-tight">
                        Ready for Your <br />
                        <span className="text-white/70">Next Upgrade?</span>
                      </h2>

                      <p className="text-white/90 text-[15px] leading-relaxed mb-8 font-medium">
                        Get a custom quote in minutes. We handle the negotiation so you get the best lease deals in NJ &amp; NY.
                      </p>

                      <Button asChild className="w-full bg-white text-accent hover:bg-white/95 font-black text-lg py-8 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] transition-all hover:scale-[1.03] active:scale-[0.97] group">
                        <Link to="/contact" className="flex items-center justify-center gap-3">
                          Schedule a Call
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>

                      <div className="mt-6 flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
                          Now Accepting Inquiries
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </Layout>
  );
}
