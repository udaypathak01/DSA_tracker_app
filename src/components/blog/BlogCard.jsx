import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * BlogCard Component
 * Displays individual blog post card with thumbnail, title, excerpt, and metadata
 */
function BlogCard({ post }) {
  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.article
      className="card overflow-hidden group cursor-pointer h-full flex flex-col"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-48 bg-slate-200 dark:bg-dark-border">
        <img
          src={post.thumbnail}
          alt={post.thumbnailAlt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
          {post.readingTime} min read
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Meta Info */}
        <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 mb-3">
          <time dateTime={post.publishDate}>📅 {formattedDate}</time>
          <span>•</span>
          <span>✍️ {post.author}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Read More Button */}
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group/link"
        >
          Read Full Article
          <svg
            className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}

export default BlogCard;
