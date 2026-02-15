/**
 * Calculate overall progress percentage
 * @param {Array} questions - Array of question objects
 * @returns {number} - Progress percentage (0-100)
 */
export const calculateOverallProgress = (questions) => {
  if (questions.length === 0) return 0;
  const completed = questions.filter(q => q.completed).length;
  return Math.round((completed / questions.length) * 100);
};

/**
 * Calculate progress for a specific topic
 * @param {Array} questions - Array of question objects
 * @param {string} topic - Topic name
 * @returns {number} - Progress percentage (0-100)
 */
export const calculateTopicProgress = (questions, topic) => {
  const topicQuestions = questions.filter(q => q.topic === topic);
  if (topicQuestions.length === 0) return 0;
  const completed = topicQuestions.filter(q => q.completed).length;
  return Math.round((completed / topicQuestions.length) * 100);
};

/**
 * Calculate progress for a specific algorithm
 * @param {Array} questions - Array of question objects
 * @param {string} topic - Topic name
 * @param {string} algorithm - Algorithm name
 * @returns {number} - Progress percentage (0-100)
 */
export const calculateAlgorithmProgress = (questions, topic, algorithm) => {
  const algoQuestions = questions.filter(
    q => q.topic === topic && q.algorithm === algorithm
  );
  if (algoQuestions.length === 0) return 0;
  const completed = algoQuestions.filter(q => q.completed).length;
  return Math.round((completed / algoQuestions.length) * 100);
};

/**
 * Get topic-wise statistics
 * @param {Array} questions - Array of question objects
 * @returns {Array} - Array of topic stats
 */
export const getTopicStats = (questions) => {
  const topics = [...new Set(questions.map(q => q.topic))];

  return topics.map(topic => {
    const topicQuestions = questions.filter(q => q.topic === topic);
    const completed = topicQuestions.filter(q => q.completed).length;
    const progress = calculateTopicProgress(questions, topic);

    const difficultyBreakdown = {
      easy: topicQuestions.filter(q => q.difficulty === 'Easy').length,
      medium: topicQuestions.filter(q => q.difficulty === 'Medium').length,
      hard: topicQuestions.filter(q => q.difficulty === 'Hard').length,
    };

    return {
      topic,
      total: topicQuestions.length,
      completed,
      progress,
      difficultyBreakdown,
    };
  });
};

/**
 * Get difficulty statistics
 * @param {Array} questions - Array of question objects
 * @returns {Object} - Difficulty stats
 */
export const getDifficultyStats = (questions) => {
  return {
    easy: {
      total: questions.filter(q => q.difficulty === 'Easy').length,
      completed: questions.filter(q => q.difficulty === 'Easy' && q.completed).length,
    },
    medium: {
      total: questions.filter(q => q.difficulty === 'Medium').length,
      completed: questions.filter(q => q.difficulty === 'Medium' && q.completed).length,
    },
    hard: {
      total: questions.filter(q => q.difficulty === 'Hard').length,
      completed: questions.filter(q => q.difficulty === 'Hard' && q.completed).length,
    },
  };
};

/**
 * Get statistics for a topic
 * @param {Array} questions - Array of question objects
 * @param {string} topic - Topic name
 * @returns {Object} - Detailed topic stats
 */
export const getDetailedTopicStats = (questions, topic) => {
  const topicQuestions = questions.filter(q => q.topic === topic);
  const algorithms = [...new Set(topicQuestions.map(q => q.algorithm))];

  const algorithmStats = algorithms.map(algo => {
    const algoQuestions = topicQuestions.filter(q => q.algorithm === algo);
    const completed = algoQuestions.filter(q => q.completed).length;
    return {
      algorithm: algo,
      total: algoQuestions.length,
      completed,
      progress: Math.round((completed / algoQuestions.length) * 100),
    };
  });

  return {
    topic,
    total: topicQuestions.length,
    completed: topicQuestions.filter(q => q.completed).length,
    progress: calculateTopicProgress(questions, topic),
    algorithms: algorithmStats,
  };
};

/**
 * Calculate completion time estimate
 * @param {Array} questions - Array of questions
 * @param {number} questionsPerDay - Questions to solve per day
 * @returns {Object} - Days remaining and target date
 */
export const calculateCompletionEstimate = (questions, questionsPerDay = 3) => {
  const remaining = questions.filter(q => !q.completed).length;
  const daysNeeded = Math.ceil(remaining / questionsPerDay);

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + daysNeeded);

  return {
    questionsRemaining: remaining,
    daysRemaining: daysNeeded,
    targetDate: targetDate.toISOString().split('T')[0],
  };
};
