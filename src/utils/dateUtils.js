/**
 * Check if a given date is today
 * @param {string} dateString - ISO date string
 * @returns {boolean}
 */
export const isToday = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if a date is yesterday
 * @param {string} dateString - ISO date string
 * @returns {boolean}
 */
export const isYesterday = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
};

/**
 * Get yesterday's date as ISO string
 * @returns {string} - Yesterday's date in YYYY-MM-DD format
 */
export const getYesterdayDate = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
};

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (isToday(dateString)) {
    return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  } else if (isYesterday(dateString)) {
    return `Yesterday at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
    });
  }
};

/**
 * Calculate streak from completed questions
 * @param {Array} questions - Array of question objects
 * @param {string} lastActivityDate - Last activity date
 * @returns {Object} - streak count and last date
 */
export const calculateStreak = (questions, lastActivityDate) => {
  const completedDates = new Set();

  // Get all unique dates when questions were completed
  questions.forEach(q => {
    if (q.completed && q.completedDate) {
      const dateOnly = q.completedDate.split('T')[0];
      completedDates.add(new Date(dateOnly).getTime());
    }
  });

  if (completedDates.size === 0) {
    return { streak: 0, lastDate: null };
  }

  const sortedDates = Array.from(completedDates).sort((a, b) => b - a);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTime = today.getTime();

  // Check if most recent completion was today or yesterday
  const mostRecentTime = sortedDates[0];
  const mostRecentDate = new Date(mostRecentTime);
  mostRecentDate.setHours(0, 0, 0, 0);

  const daysSinceRecent = Math.floor((todayTime - mostRecentDate.getTime()) / (1000 * 60 * 60 * 24));

  // Streak is broken if no activity in last 2 days
  if (daysSinceRecent > 1) {
    return { streak: 1, lastDate: new Date(mostRecentTime).toISOString() };
  }

  // Calculate consecutive days
  let streak = 1;
  let currentDate = new Date(mostRecentTime);
  currentDate.setHours(0, 0, 0, 0);

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i]);
    prevDate.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === 1) {
      streak++;
      currentDate = prevDate;
    } else {
      break;
    }
  }

  return {
    streak,
    lastDate: new Date(mostRecentTime).toISOString(),
  };
};

/**
 * Get days until next milestone
 * @param {number} currentValue - Current value
 * @param {number} milestone - Target milestone
 * @returns {number} - Days remaining
 */
export const getDaysUntilMilestone = (currentValue, milestone) => {
  return Math.max(0, milestone - currentValue);
};
