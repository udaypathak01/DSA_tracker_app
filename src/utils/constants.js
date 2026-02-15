// Topics
export const TOPICS = [
  'Arrays',
  'Strings',
  'Linked List',
  'Stack',
  'Queue',
  'Recursion',
  'Sorting',
  'Searching',
  'Binary Search',
  'Trees',
  'BST',
  'Heaps',
  'Graphs',
  'Dynamic Programming',
  'Greedy',
  'Backtracking',
  'Sliding Window',
  'Two Pointer',
  'Bit Manipulation',
  'Interview Problems',
];

// Difficulty levels
export const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

// Platforms
export const PLATFORMS = ['LeetCode', 'GFG', 'CodeStudio'];

// Motivation quotes
export const MOTIVATION_QUOTES = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi"
  },
  {
    text: "Success is not final, failure is not fatal.",
    author: "Winston Churchill"
  },
  {
    text: "Coding is the language of the future.",
    author: "Unknown"
  },
  {
    text: "Every expert was once a beginner.",
    author: "Unknown"
  },
  {
    text: "The only limit is your imagination.",
    author: "Unknown"
  },
  {
    text: "Keep coding, keep learning, keep growing.",
    author: "Unknown"
  },
  {
    text: "Consistency is the key to success.",
    author: "Unknown"
  },
  {
    text: "Your hard work will pay off.",
    author: "Unknown"
  },
];

// Color by difficulty
export const DIFFICULTY_COLORS = {
  Easy: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
  Medium: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
  Hard: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
};

// Color by platform
export const PLATFORM_COLORS = {
  LeetCode: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
  GFG: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
  CodeStudio: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200',
};

// Local storage keys
export const STORAGE_KEYS = {
  QUESTIONS: 'dsa-tracker-data',
  THEME: 'dsa-theme',
  USER_PREFERENCES: 'dsa-preferences',
};

// Toast messages
export const TOAST_MESSAGES = {
  QUESTION_COMPLETED: 'Question marked as completed! 🎉',
  QUESTION_UNCOMPLETED: 'Question marked as incomplete.',
  QUESTION_ADDED: 'Question added successfully!',
  QUESTION_UPDATED: 'Question updated successfully!',
  QUESTION_DELETED: 'Question deleted successfully.',
  NOTES_SAVED: 'Notes saved!',
  DATA_EXPORTED: 'Data exported successfully!',
  DATA_IMPORTED: 'Data imported successfully!',
  PROGRESS_RESET: 'Progress reset. All questions marked as incomplete.',
  FAVORITE_ADDED: 'Added to favorites!',
  FAVORITE_REMOVED: 'Removed from favorites.',
  TOPIC_COMPLETED: 'Congratulations! You completed this topic! 🚀',
  ERROR_GENERIC: 'Something went wrong. Please try again.',
};
