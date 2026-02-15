import { useState } from 'react';
import { motion } from 'framer-motion';
import { useResources } from '../hooks/useResources';
import ResourceCard from '../components/resources/ResourceCard';
import ResourceSearch from '../components/resources/ResourceSearch';
import ResourceFilters from '../components/resources/ResourceFilters';
import { getCategories } from '../data/resources';

/**
 * Resources Page
 * Curated learning resources for DSA and interview preparation
 */
function Resources() {
  const {
    filteredResources,
    groupedByCategory,
    searchQuery,
    setSearchQuery,
    filters,
    updateFilters,
    toggleBookmark,
    clearFilters,
  } = useResources();

  const [viewMode, setViewMode] = useState('grouped'); // 'grouped' or 'all'
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = filters.topic.length > 0 || filters.type.length > 0 || filters.level.length > 0;
  const categories = getCategories();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="space-y-3 sm:space-y-4 md:space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-1 sm:mb-2">
          📚 Learning Resources
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400">
          Curated content to master DSA & crack placements
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div variants={itemVariants}>
        <ResourceSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          resultsCount={filteredResources.length}
        />
      </motion.div>

      {/* Controls Bar - Responsive Stack */}
      <motion.div 
        variants={itemVariants} 
        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3"
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="px-2 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-card border border-slate-300 dark:border-dark-border rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2 hover:bg-slate-50 dark:hover:bg-dark-border transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>🔽</span>
            <span className="hidden xs:inline">{showFilters ? 'Hide' : 'Show'} Filters</span>
            <span className="inline xs:hidden">Filter</span>
          </motion.button>

          <motion.button
            onClick={() => setViewMode(viewMode === 'grouped' ? 'all' : 'grouped')}
            className="px-2 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-dark-card border border-slate-300 dark:border-dark-border rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2 hover:bg-slate-50 dark:hover:bg-dark-border transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{viewMode === 'grouped' ? '🔀' : '📂'}</span>
            <span className="hidden xs:inline">{viewMode === 'grouped' ? 'All' : 'Grouped'}</span>
            <span className="inline xs:hidden">View</span>
          </motion.button>
        </div>

        <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium text-center sm:text-right">
          {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
        </span>
      </motion.div>

      {/* Main Grid - Full Width on Mobile */}
      <div className="w-full grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 lg:grid-cols-4">
        {/* Filters Sidebar - Full Width on Mobile when open */}
        {showFilters && (
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1 col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="sticky top-2 lg:top-4">
              <ResourceFilters
                filters={filters}
                onFiltersChange={updateFilters}
                onClearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </div>
          </motion.div>
        )}

        {/* Resources Grid */}
        <motion.div
          variants={itemVariants}
          className={showFilters ? 'lg:col-span-3 col-span-1' : 'lg:col-span-4 col-span-1'}
        >
          {filteredResources.length === 0 ? (
            // Empty State
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8 sm:py-12 md:py-16 px-2"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🔍</div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">
                No resources found
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 mb-4 sm:mb-6">
                Try adjusting your filters or search query
              </p>
              {hasActiveFilters && (
                <motion.button
                  onClick={clearFilters}
                  className="px-3 sm:px-4 py-2 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-xs sm:text-sm transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear Filters
                </motion.button>
              )}
            </motion.div>
          ) : viewMode === 'grouped' ? (
            // Grouped by Category View
            <motion.div
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {categories.map((category) => {
                const categoryResources = groupedByCategory[category] || [];
                if (categoryResources.length === 0) return null;

                const getCategoryEmoji = (cat) => {
                  switch (cat) {
                    case 'YouTube Channels':
                      return '📺';
                    case 'Websites':
                      return '🌐';
                    case 'Roadmaps':
                      return '🗺️';
                    case 'Interview Preparation':
                      return '🎯';
                    default:
                      return '📚';
                  }
                };

                return (
                  <motion.div key={category} variants={itemVariants}>
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
                      <span className="text-lg sm:text-2xl flex-shrink-0">{getCategoryEmoji(category)}</span>
                      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">
                        {category}
                      </h2>
                      <span className="ml-auto text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex-shrink-0">
                        {categoryResources.length}
                      </span>
                    </div>

                    <motion.div
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {categoryResources.map((resource) => (
                        <ResourceCard
                          key={resource.id}
                          resource={resource}
                          onBookmark={toggleBookmark}
                          isBookmarked={resource.bookmarked}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            // All Resources Grid View
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onBookmark={toggleBookmark}
                  isBookmarked={resource.bookmarked}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Footer Info - Responsive Padding */}
      <motion.div
        variants={itemVariants}
        className="mt-6 sm:mt-8 md:mt-12 p-3 sm:p-4 md:p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
      >
        <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-300">
          <span className="block sm:inline">💡 <strong>Tip:</strong> </span>
          <span className="block sm:inline">Bookmark your favorite resources to access them quickly later. Mix and match resources from different types!</span>
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Resources;
