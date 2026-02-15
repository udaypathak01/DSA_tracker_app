import { useState, useCallback, useMemo } from 'react';
import { resources } from '../data/resources';

/**
 * Custom hook for managing resources
 * Handles filtering, searching, and bookmarking
 */
export const useResources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    topic: [],
    type: [],
    level: [],
  });
  const [allResources, setAllResources] = useState(() => {
    // Load bookmarks from localStorage
    const savedBookmarks = JSON.parse(localStorage.getItem('resourceBookmarks') || '{}');
    return resources.map((res) => ({
      ...res,
      bookmarked: savedBookmarks[res.id] || false,
    }));
  });

  /**
   * Toggle bookmark for a resource
   */
  const toggleBookmark = useCallback(
    (resourceId) => {
      setAllResources((prev) => {
        const updated = prev.map((res) =>
          res.id === resourceId ? { ...res, bookmarked: !res.bookmarked } : res
        );

        // Save to localStorage
        const bookmarks = {};
        updated.forEach((res) => {
          if (res.bookmarked) {
            bookmarks[res.id] = true;
          }
        });
        localStorage.setItem('resourceBookmarks', JSON.stringify(bookmarks));

        return updated;
      });
    },
    []
  );

  /**
   * Filter resources based on search and filters
   */
  const filteredResources = useMemo(() => {
    return allResources.filter((resource) => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          resource.title.toLowerCase().includes(query) ||
          resource.creator.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query) ||
          resource.topic.some((t) => t.toLowerCase().includes(query));

        if (!matchesSearch) return false;
      }

      // Topic filter
      if (filters.topic.length > 0) {
        const matchesTopic = resource.topic.some((t) => filters.topic.includes(t));
        if (!matchesTopic) return false;
      }

      // Type filter
      if (filters.type.length > 0) {
        if (!filters.type.includes(resource.type)) return false;
      }

      // Level filter
      if (filters.level.length > 0) {
        if (!filters.level.includes(resource.level)) return false;
      }

      return true;
    });
  }, [allResources, searchQuery, filters]);

  /**
   * Get bookmarked resources only
   */
  const bookmarkedResources = useMemo(() => {
    return allResources.filter((res) => res.bookmarked);
  }, [allResources]);

  /**
   * Group resources by category
   */
  const groupedByCategory = useMemo(() => {
    const grouped = {};
    filteredResources.forEach((resource) => {
      if (!grouped[resource.category]) {
        grouped[resource.category] = [];
      }
      grouped[resource.category].push(resource);
    });
    return grouped;
  }, [filteredResources]);

  /**
   * Sort by popularity (views)
   */
  const sortedByPopularity = useMemo(() => {
    return [...filteredResources].sort((a, b) => b.views - a.views);
  }, [filteredResources]);

  /**
   * Update filters
   */
  const updateFilters = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  /**
   * Clear all filters
   */
  const clearFilters = useCallback(() => {
    setFilters({
      topic: [],
      type: [],
      level: [],
    });
    setSearchQuery('');
  }, []);

  return {
    allResources,
    filteredResources,
    bookmarkedResources,
    groupedByCategory,
    sortedByPopularity,
    searchQuery,
    setSearchQuery,
    filters,
    updateFilters,
    toggleBookmark,
    clearFilters,
  };
};
