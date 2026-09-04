import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { BlogCard } from '@/components/blog/BlogCard';
import { getActiveBlogPosts } from '@/services/blogService';
import type { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Search, X, Sparkles, BookOpen } from 'lucide-react';

const POSTS_PER_PAGE = 12;

const CATEGORIES = [
  'All Articles',
  'Leasing Guides',
  'Reliability & Reviews',
  'Problems & Maintenance',
  'Electric & Hybrid',
  'SUVs & Trucks'
] as const;

type Category = typeof CATEGORIES[number];

function matchesCategory(post: BlogPost, cat: Category): boolean {
  if (cat === 'All Articles') return true;
  const text = (post.title + ' ' + post.slug + ' ' + (post.seo_keywords || '') + ' ' + (post.excerpt || '')).toLowerCase();
  
  if (cat === 'Leasing Guides') {
    return /lease|leasing|broker|tax|credit|money factor|down payment|sign and drive|contract/i.test(text);
  }
  if (cat === 'Reliability & Reviews') {
    return /reliability|review|dependability|reliable|good cars|longevity/i.test(text);
  }
  if (cat === 'Problems & Maintenance') {
    return /squeak|problem|issue|repair|maintenance|broken|fault|noise|key|ignition|skidding|wear/i.test(text);
  }
  if (cat === 'Electric & Hybrid') {
    return /ev|electric|hybrid|ioniq|blazer ev|battery|plug-in|lyriq|phev/i.test(text);
  }
  if (cat === 'SUVs & Trucks') {
    return /suv|crossover|truck|f150|ram|silverado|traverse|telluride|atlas|grand cherokee|wrangler|cx-5|cx-9|sienna/i.test(text);
  }
  return true;
}

function matchesSearch(post: BlogPost, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.toLowerCase().trim();
  return (
    post.title.toLowerCase().includes(q) ||
    post.slug.toLowerCase().includes(q) ||
    (post.excerpt ? post.excerpt.toLowerCase().includes(q) : false) ||
    (post.seo_keywords ? post.seo_keywords.toLowerCase().includes(q) : false)
  );
}

function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis', total];
  }

  if (current >= total - 3) {
    return [1, 'ellipsis', total - 4, total - 3, total - 2, total - 1, total];
  }

  return [1, 'ellipsis', current - 1, current, current + 1, 'ellipsis', total];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All Articles');

  // Read current page from URL query
  const rawPage = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  useEffect(() => {
    async function loadPosts() {
      const result = await getActiveBlogPosts();
      if (result.success && result.data) {
        setPosts(result.data);
      }
      setLoading(false);
    }
    loadPosts();
  }, []);

  // Featured post: displayed as hero only on Page 1 when no search/category filter is active
  const featuredPost = useMemo(() => {
    return posts.find((p) => p.is_featured) ?? posts[0];
  }, [posts]);

  // Filtered post list
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Exclude featured hero on Page 1 if no active filter
      const isHero = currentPage === 1 && !searchQuery && selectedCategory === 'All Articles' && post.id === featuredPost?.id;
      if (isHero) return false;
      return matchesCategory(post, selectedCategory) && matchesSearch(post, searchQuery);
    });
  }, [posts, searchQuery, selectedCategory, currentPage, featuredPost]);

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    const targetPage = Math.max(1, Math.min(newPage, totalPages));
    const nextParams = new URLSearchParams(searchParams);
    if (targetPage <= 1) {
      nextParams.delete('page');
    } else {
      nextParams.set('page', String(targetPage));
    }
    setSearchParams(nextParams);

    const gridEl = document.getElementById('blog-grid');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (cat: Category) => {
    setSelectedCategory(cat);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('page');
    setSearchParams(nextParams);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (currentPage > 1) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('page');
      setSearchParams(nextParams);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Articles');
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('page');
    setSearchParams(nextParams);
  };

  const pageNumbers = getPageNumbers(safeCurrentPage, totalPages);

  const seoTitle = safeCurrentPage > 1
    ? `Capital Motor Cars Blog (Page ${safeCurrentPage}) | Leasing Tips & Auto Insights`
    : 'Capital Motor Cars Blog | Leasing Tips & Auto Insights';

  return (
    <Layout>
      <SEO
        title={seoTitle}
        description="Car leasing blog for New Jersey and New York drivers from Capital Motor Cars. Read lease tips, credit guides, and vehicle insights."
        canonicalPath="/blog"
        seoKeywords={['car leasing blog New Jersey', 'car leasing blog New York', 'lease tips', 'auto leasing guides', 'Capital Motor Cars blog']}
        ogType="website"
        ogImage="https://www.capitalmotorcars.com/shared-img.png"
      />
      <JsonLd
        data={createWebPageSchema({
          name: seoTitle,
          description: 'Car leasing blog for New Jersey and New York drivers from Capital Motor Cars. Read lease tips, credit guides, and vehicle insights.',
          url: safeCurrentPage > 1 ? `https://www.capitalmotorcars.com/blog?page=${safeCurrentPage}` : 'https://www.capitalmotorcars.com/blog',
        })}
      />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accent/10 text-accent mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              Automotive Knowledge Base
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
              Capital Motor Cars Blog
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Expert advice, model reliability breakdowns, and money-saving lease guides curated by 30-year automotive specialist Christopher Amico.
            </p>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="mb-12 max-w-4xl mx-auto space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search by vehicle model, problem, or topic (e.g. Audi A3, Wheel Squeak, Zero Down, Tax)..."
                className="pl-11 pr-10 py-6 rounded-2xl bg-card border-border/80 focus-visible:ring-accent text-sm md:text-base shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-full"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-accent text-accent-foreground shadow-md shadow-accent/20'
                        : 'bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/50'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center text-muted-foreground flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              <span>Loading articles...</span>
            </div>
          ) : posts.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">No posts available yet.</div>
          ) : (
            <div className="space-y-12 md:space-y-16">
              {/* Featured Post Hero - Only on Page 1 with no active search/category filter */}
              {safeCurrentPage === 1 && !searchQuery && selectedCategory === 'All Articles' && featuredPost && (
                <div className="relative group">
                  <BlogCard
                    post={featuredPost}
                    className="!bg-transparent !border-none !shadow-none p-0 overflow-visible"
                    isFeatured
                  />
                  <div className="mt-12 h-px w-full bg-border/40" />
                </div>
              )}

              {/* Grid Header Info */}
              <div id="blog-grid" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="text-sm text-muted-foreground font-medium">
                  Showing <strong className="text-foreground">{filteredPosts.length > 0 ? startIndex + 1 : 0}</strong>–<strong className="text-foreground">{Math.min(startIndex + POSTS_PER_PAGE, filteredPosts.length)}</strong> of{' '}
                  <strong className="text-foreground">{filteredPosts.length}</strong> articles
                  {selectedCategory !== 'All Articles' && (
                    <span> in <span className="text-accent font-semibold">{selectedCategory}</span></span>
                  )}
                  {searchQuery && (
                    <span> matching &quot;<span className="text-foreground font-semibold">{searchQuery}</span>&quot;</span>
                  )}
                </div>

                {(searchQuery || selectedCategory !== 'All Articles') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-xs text-muted-foreground hover:text-foreground self-start sm:self-auto h-8 px-2"
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>

              {/* Paginated Grid */}
              {paginatedPosts.length === 0 ? (
                <div className="py-16 text-center rounded-3xl border border-dashed border-border/60 p-8">
                  <p className="text-base text-muted-foreground mb-4">No articles found matching your criteria.</p>
                  <Button onClick={clearFilters} variant="outline" className="rounded-xl">
                    Reset Search &amp; Show All
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="pt-6 pb-4">
                  <Pagination>
                    <PaginationContent className="flex-wrap justify-center gap-1.5">
                      {/* Previous */}
                      <PaginationItem>
                        <PaginationPrevious
                          href={`/blog${safeCurrentPage > 2 ? `?page=${safeCurrentPage - 1}` : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (safeCurrentPage > 1) handlePageChange(safeCurrentPage - 1);
                          }}
                          className={safeCurrentPage === 1 ? 'pointer-events-none opacity-40' : 'cursor-pointer'}
                        />
                      </PaginationItem>

                      {/* Numbered Page Links */}
                      {pageNumbers.map((pageItem, idx) => {
                        if (pageItem === 'ellipsis') {
                          return (
                            <PaginationItem key={`ellipsis-${idx}`}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }

                        const pageNum = pageItem as number;
                        const isCurrent = pageNum === safeCurrentPage;
                        const href = pageNum === 1 ? '/blog' : `/blog?page=${pageNum}`;

                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink
                              href={href}
                              isActive={isCurrent}
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(pageNum);
                              }}
                              className={`cursor-pointer rounded-xl font-bold ${
                                isCurrent
                                  ? '!bg-accent !text-accent-foreground !border-accent shadow-sm'
                                  : 'hover:bg-muted/80'
                              }`}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}

                      {/* Next */}
                      <PaginationItem>
                        <PaginationNext
                          href={`/blog?page=${Math.min(totalPages, safeCurrentPage + 1)}`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (safeCurrentPage < totalPages) handlePageChange(safeCurrentPage + 1);
                          }}
                          className={safeCurrentPage === totalPages ? 'pointer-events-none opacity-40' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
