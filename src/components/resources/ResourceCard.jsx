import { motion } from 'framer-motion';

/**
 * ResourceCard Component
 * Displays individual resource with details and actions
 */
function ResourceCard({ resource, onBookmark, isBookmarked }) {
  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300';
      case 'Intermediate':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300';
      case 'Advanced':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      default:
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'YouTube Playlist':
        return 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800';
      case 'Website':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800';
      case 'Roadmap':
        return 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800';
      default:
        return 'bg-slate-100 dark:bg-slate-900/20 text-slate-600 dark:text-slate-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      whileHover={{ y: -2 }}
      className="h-full bg-white dark:bg-dark-card rounded-lg sm:rounded-xl shadow-md hover:shadow-lg dark:shadow-lg dark:hover:shadow-2xl transition-shadow border border-slate-200 dark:border-dark-border overflow-hidden flex flex-col"
    >
      {/* Thumbnail - Optimized for mobile */}
      <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 overflow-hidden relative group">
        <img
          src={resource.thumbnail}
          alt={resource.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        {/* Views Badge */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-md sm:rounded-lg backdrop-blur-sm">
          👁️ {(resource.views / 1000).toFixed(0)}k
        </div>
      </div>

      {/* Content - Mobile optimized padding */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-xs sm:text-sm md:text-base font-bold text-slate-900 dark:text-white mb-1 sm:mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400">
          {resource.title}
        </h3>

        {/* Creator - Smaller on mobile */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 sm:mb-3 truncate">
          by <span className="font-medium text-slate-700 dark:text-slate-300">{resource.creator}</span>
        </p>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-2 sm:mb-3 line-clamp-2 flex-1">
          {resource.description}
        </p>

        {/* Badges */}
        <div className="space-y-2 mb-2 sm:mb-3">
          {/* Level & Type Row */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <span
              className={`text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-medium ${getLevelColor(
                resource.level
              )}`}
            >
              {resource.level}
            </span>
            <span className={`text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-medium ${getTypeColor(resource.type)}`}>
              {resource.type}
            </span>
          </div>

          {/* Topics - Hidden on very small screens, show only 2 on mobile */}
          <div className="flex flex-wrap gap-1">
            {resource.topic.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded"
              >
                {tag}
              </span>
            ))}
            {resource.topic.length > 2 && (
              <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                +{resource.topic.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Actions - Mobile optimized with collapse on extra small screens */}
        <div className="flex gap-1.5 sm:gap-2 pt-2 sm:pt-3 border-t border-slate-200 dark:border-dark-border">
          <motion.a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md sm:rounded-lg font-medium text-xs sm:text-sm transition-colors min-h-[32px] sm:min-h-[40px]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="hidden xs:inline">🔗</span>
            <span className="hidden sm:inline">Open</span>
            <span className="inline sm:hidden">Go</span>
          </motion.a>

          <motion.button
            onClick={() => onBookmark(resource.id)}
            className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-md sm:rounded-lg font-medium text-xs sm:text-sm transition-colors min-h-[32px] sm:min-h-[40px] whitespace-nowrap flex items-center justify-center gap-1 ${
              isBookmarked
                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                : 'bg-slate-100 dark:bg-dark-border text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
          >
            <span>{isBookmarked ? '⭐' : '☆'}</span>
            <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ResourceCard;
