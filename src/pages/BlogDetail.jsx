import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBlogBySlug, getRelatedPosts } from '../data/blogData';
import TableOfContents from '../components/blog/TableOfContents';
import ShareButtons from '../components/blog/ShareButtons';
import BlogCard from '../components/blog/BlogCard';

/**
 * BlogDetail Page
 * Displays individual blog post with full SEO optimization
 */
function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const blogPost = getBlogBySlug(slug);
    if (!blogPost) {
      navigate('/blog');
      return;
    }
    setPost(blogPost);
    setRelatedPosts(getRelatedPosts(blogPost.id));
    
    // Scroll to top on post change
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  useEffect(() => {
    if (!post) return;

    // Add IDs to headings for Table of Contents
    const contentElement = document.querySelector('.blog-content');
    if (contentElement) {
      const headings = contentElement.querySelectorAll('h2, h3');
      headings.forEach((heading) => {
        const id = heading.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        heading.id = id;
      });
    }
  }, [post]);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="loading-skeleton w-32 h-32 rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading article...</p>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const currentUrl = `https://dsa-orbit.vercel.app/blog/${post.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "image": post.thumbnail,
    "author": {
      "@type": "Organization",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "DSAOrbit",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dsa-orbit.vercel.app/logo.png"
      }
    },
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    }
  };

  return (
    <>
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <meta name="author" content={post.author} />
        <link rel="canonical" href={currentUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content={post.thumbnail} />
        <meta property="article:published_time" content={post.publishDate} />
        <meta property="article:author" content={post.author} />
        {post.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.metaTitle} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={post.thumbnail} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <li>
              <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="text-slate-900 dark:text-white font-medium truncate max-w-xs">
              {post.title}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3">
            {/* Header */}
            <header className="mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                {post.title}
              </h1>
              
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-6">
                <div className="flex items-center gap-2">
                  <span>✍️</span>
                  <span>{post.author}</span>
                </div>
                <span>•</span>
                <time dateTime={post.publishDate}>📅 {formattedDate}</time>
                <span>•</span>
                <span>⏱️ {post.readingTime} min read</span>
              </div>

              {/* Featured Image */}
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img
                  src={post.thumbnail}
                  alt={post.thumbnailAlt}
                  className="w-full h-64 sm:h-80 md:h-96 object-cover"
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="badge badge-info"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Share Buttons */}
              <ShareButtons url={currentUrl} title={post.title} />
            </header>

            {/* Blog Content */}
            <motion.div
              className="blog-content prose prose-slate dark:prose-invert max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

  

            {/* CTA Section */}
            <section className="card p-8 my-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Start Tracking Your DSA Progress with DSAOrbit
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Join thousands of students who are preparing smarter, not harder. Track your progress, 
                build streaks, and identify weak areas with our intelligent analytics platform.
              </p>
              <Link
                to="/dashboard"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors"
              >
                Get Started Free →
              </Link>
            </section>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="my-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <BlogCard key={relatedPost.id} post={relatedPost} />
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sidebar - Table of Contents */}
          <aside className="lg:col-span-1">
            <TableOfContents content={post.content} />
          </aside>
        </div>
      </div>
    </>
  );
}

export default BlogDetail;
