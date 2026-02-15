import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDSA } from '../hooks/useDSA';
import SearchBox from '../components/filters/SearchBox';
import FilterBar from '../components/filters/FilterBar';
import SearchResults from '../components/filters/SearchResults';
import TopicAccordion from '../components/topics/TopicAccordion';

/**
 * Topics Page
 * Displays all DSA topics with questions organized by difficulty
 */
function Topics() {
  const location = useLocation();
  const { getFilteredQuestions, getTopics, setSearchQuery } = useDSA();
  const [expandedTopic, setExpandedTopic] = useState(null);

  // Auto-expand topic if coming from dashboard
  useEffect(() => {
    if (location.state?.selectedTopic) {
      setExpandedTopic(location.state.selectedTopic);
    }
  }, [location.state?.selectedTopic]);

  const filteredQuestions = getFilteredQuestions();
  const topics = getTopics();

  // Group questions by topic
  const questionsByTopic = topics.reduce((acc, topic) => {
    acc[topic] = filteredQuestions.filter(q => q.topic === topic);
    return acc;
  }, {});

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          📚 Topics
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Organize your DSA learning by topics and track progress
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div variants={itemVariants} className="space-y-4">
        <SearchBox onChange={setSearchQuery} />
        <FilterBar />
      </motion.div>

      {/* Search Results Section */}
      <motion.div variants={itemVariants}>
        <SearchResults />
      </motion.div>

      {/* Topics List */}
      <motion.div variants={itemVariants} className="space-y-3">
        {topics.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400">No topics available</p>
          </div>
        ) : (
          topics.map((topic) => (
            <TopicAccordion
              key={topic}
              topic={topic}
              questions={questionsByTopic[topic] || []}
              isExpanded={expandedTopic === topic}
              onToggle={() =>
                setExpandedTopic(expandedTopic === topic ? null : topic)
              }
            />
          ))
        )}
      </motion.div>

      {/* Empty State */}
      {filteredQuestions.length === 0 && topics.length > 0 && (
        <motion.div className="text-center py-12 card">
          <p className="text-slate-600 dark:text-slate-400">
            No questions match your filters. Try adjusting your search!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Topics;
