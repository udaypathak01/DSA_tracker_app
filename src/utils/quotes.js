/**
 * Motivational quotes for developers
 * Randomly selected when a problem is completed
 */
export const motivationalQuotes = [
  "The only way to do great work is to love what you do.",
  "Discipline compounds faster than talent.",
  "Every expert was once a beginner.",
  "Your hard work will pay off.",
  "Consistency is the key to success.",
  "The only limit is your imagination.",
  "Keep coding, keep learning, keep growing.",
  "Success is not final, failure is not fatal.",
  "Don't watch the clock; do what it does. Keep going.",
  "The future depends on what you do today.",
  "Code is poetry written for computers.",
  "Debug your mind before you debug your code.",
  "A bug in your life is a feature you haven't discovered yet.",
  "Keep calm and commit your code.",
  "I'm not a great programmer; I'm just a good programmer with great habits.",
  "First, solve the problem. Then, write the code.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "The best code is no code at all.",
  "Refactoring is not about rewriting; it's about improving.",
  "In coding, as in life, simplicity is the ultimate sophistication.",
  "Strive for 1% improvement every day.",
  "Your competition is sleeping. Are you?",
  "The hardest part of programming is thinking about what to code.",
  "Algorithms are just organized common sense.",
  "Master DSA, master the interview.",
  "One problem solved is one step closer to mastery.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Success is a journey, not a destination.",
  "Every line of code is a step towards excellence.",
  "You don't have to be great to start, but you have to start to be great.",
];

/**
 * Get a random motivational quote
 * @returns {string} A random quote
 */
export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
};

/**
 * Get a quote at a specific index (for reproducibility if needed)
 * @param {number} index - The index of the quote
 * @returns {string} The quote at that index
 */
export const getQuoteAtIndex = (index) => {
  return motivationalQuotes[index % motivationalQuotes.length];
};
