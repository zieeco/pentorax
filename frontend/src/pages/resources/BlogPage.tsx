import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useBlogPosts, useBlogCategories } from '@/hooks/useApi';
import SEO from '@/components/SEO';

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const { data: posts = [], isLoading } = useBlogPosts({ category: selectedCategory });
  const { data: categories = [] } = useBlogCategories();

  // Get featured post (first post or most recent)
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1, 4); // Show 3 posts after featured

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Energy Insights | PentoraX Blog"
        description="Latest updates from our labs, success stories, and expert takes on the clean energy revolution. Solar energy tips, guides, and industry news."
        keywords="solar blog, renewable energy news, solar energy tips, solar installation guide, energy insights"
        ogImage="/blog-header.png"
      />
      
      <div className="animate-in fade-in bg-white py-24 duration-700">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="mb-6 text-5xl font-extrabold">
              Energy <span className="text-primary">Insights</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Latest updates from our labs, success stories, and expert takes on
              the clean energy revolution.
            </p>
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="mb-12 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedCategory(undefined)}
                className={`rounded-full px-6 py-2 text-sm font-bold transition-all ${
                  !selectedCategory
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Posts
              </button>
              {categories.map((category: any) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`rounded-full px-6 py-2 text-sm font-bold transition-all ${
                    selectedCategory === category.slug
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}

          {/* Featured Post */}
          {featuredPost && (
            <Link to={`/blog/${featuredPost.slug}`}>
              <div className="group relative mb-20 flex h-[500px] items-end overflow-hidden rounded-[3rem] bg-gray-900 text-white shadow-2xl">
                <img
                  src={featuredPost.featured_image || 'https://images.unsplash.com/photo-1466611653911-954ffaa13b6f?auto=format&fit=crop&w=1200&q=80'}
                  alt={featuredPost.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="relative z-10 max-w-3xl p-12">
                  <span className="mb-6 inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-black uppercase tracking-widest text-gray-900">
                    Featured Story
                  </span>
                  <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mb-6 text-lg text-blue-100">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center text-lg font-bold text-secondary hover:underline">
                    Read the Full Article <ArrowRight className="ml-2 h-6 w-6" />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Post Grid */}
          {regularPosts.length > 0 ? (
            <div className="grid gap-12 md:grid-cols-3">
              {regularPosts.map((post: any) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group cursor-pointer"
                >
                  <div className="mb-6 h-64 overflow-hidden rounded-3xl shadow-sm transition-all group-hover:shadow-xl">
                    <img
                      src={post.featured_image || `https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80`}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="mb-4 flex items-center space-x-4 text-xs font-bold uppercase tracking-wider text-primary">
                    <span>{post.category?.name || 'Uncategorized'}</span>
                    <span className="text-gray-300">|</span>
                    <span className="flex items-center uppercase tracking-normal text-gray-500">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <h3 className="mb-4 text-2xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mb-6 leading-relaxed text-gray-600">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center space-x-3 text-sm font-bold text-gray-500">
                    <User className="h-5 w-5 text-gray-300" />
                    <span>{post.author?.name || 'PentoraX Team'}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            !featuredPost && (
              <div className="py-20 text-center">
                <p className="text-xl text-gray-500">
                  No blog posts available yet. Check back soon!
                </p>
              </div>
            )
          )}

          {/* Load More / Pagination (if needed) */}
          {posts.length > 4 && (
            <div className="mt-16 text-center">
              <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                Load More Articles
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
