/**
 * Mock AI Data
 * Realistic dummy data for AI Quiz Generator and Doubt Solver
 */

export const completedTopics = [
  { id: 1, name: 'Arrays', completed: true, lessons: 12 },
  { id: 2, name: 'Strings', completed: true, lessons: 10 },
  { id: 3, name: 'Recursion', completed: true, lessons: 8 },
  { id: 4, name: 'Linked Lists', completed: false, lessons: 9 },
  { id: 5, name: 'Trees', completed: false, lessons: 15 },
  { id: 6, name: 'Graphs', completed: false, lessons: 18 },
  { id: 7, name: 'Dynamic Programming', completed: false, lessons: 20 },
  { id: 8, name: 'Sorting', completed: true, lessons: 7 },
];

export const mockQuizzes = {
  easy: [
    {
      id: 1,
      question: 'What is the time complexity of accessing an element in an array by index?',
      options: ['O(n)', 'O(1)', 'O(log n)', 'O(n log n)'],
      correctAnswer: 1,
      explanation:
        'Array indexing is a direct memory access operation. Regardless of the array size, accessing any element takes constant time because arrays are stored contiguously in memory.',
    },
    {
      id: 2,
      question: 'Which of the following is NOT a stable sorting algorithm?',
      options: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Insertion Sort'],
      correctAnswer: 1,
      explanation:
        'Quick Sort is not a stable sorting algorithm. A stable sort maintains the relative order of equal elements. Quick Sort partitions elements which can change their relative positions.',
    },
    {
      id: 3,
      question: 'What does the base case in recursion do?',
      options: [
        'Defines the problem size',
        'Prevents infinite recursion',
        'Calculates the final answer',
        'Initializes variables',
      ],
      correctAnswer: 1,
      explanation:
        'The base case is the condition that stops the recursive function from calling itself infinitely. Without it, the recursion would continue forever, causing a stack overflow.',
    },
    {
      id: 4,
      question: 'What is a palindrome string?',
      options: [
        'A string with all same characters',
        'A string that reads the same forwards and backwards',
        'A string with no vowels',
        'A string with alternating characters',
      ],
      correctAnswer: 1,
      explanation:
        'A palindrome is a string that reads the same forwards and backwards. Examples: "racecar", "madam", "level". The string can be checked by comparing it with its reverse.',
    },
    {
      id: 5,
      question: 'What is the space complexity of binary search?',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
      correctAnswer: 2,
      explanation:
        'Binary search has O(1) space complexity for the iterative approach. Even the recursive approach typically has O(log n) space due to the call stack, but the iterative version uses constant space.',
    },
  ],
  medium: [
    {
      id: 1,
      question:
        'In a two-pointer approach for finding a pair with a given sum in a sorted array, what is the main advantage?',
      options: [
        'Requires less code',
        'Achieves O(n) time complexity without extra space',
        'Works only for positive numbers',
        'Eliminates the need for sorting',
      ],
      correctAnswer: 1,
      explanation:
        'The two-pointer technique efficiently finds pairs in O(n) time with O(1) space. Start one pointer at the beginning and another at the end. Move them towards each other based on whether the sum is too small or too large.',
    },
    {
      id: 2,
      question: 'What is the key insight in the Sliding Window technique?',
      options: [
        'Always use nested loops',
        'Avoid using extra space',
        'Maintain a window of elements and adjust its size dynamically',
        'Sort the array first',
      ],
      correctAnswer: 2,
      explanation:
        'The sliding window technique maintains a contiguous subarray and slides it across the input. This avoids redundant comparisons and reduces time complexity from O(n²) to O(n).',
    },
    {
      id: 3,
      question:
        'In dynamic programming, what is the difference between memoization and tabulation?',
      options: [
        'They are the same thing',
        'Memoization is top-down, tabulation is bottom-up',
        'Memoization uses more memory',
        'Tabulation is slower',
      ],
      correctAnswer: 1,
      explanation:
        'Memoization is top-down (recursive with caching), while tabulation is bottom-up (iterative). Both optimize overlapping subproblems, but they differ in approach and implementation style.',
    },
    {
      id: 4,
      question:
        'What is the time complexity of finding the lowest common ancestor (LCA) in a binary search tree?',
      options: ['O(n)', 'O(log n) on average', 'O(h) where h is height', 'O(1)'],
      correctAnswer: 2,
      explanation:
        'In a BST, LCA can be found in O(h) time where h is the height. You start from root and traverse left if both values are smaller, right if both are larger, otherwise you found the LCA.',
    },
    {
      id: 5,
      question: 'What does the Union-Find (Disjoint Set Union) data structure optimize?',
      options: [
        'Sorting queries',
        'Graph connectivity and cycle detection',
        'Array searching',
        'Tree traversal',
      ],
      correctAnswer: 1,
      explanation:
        'Union-Find efficiently handles operations like checking if two elements are in the same set and merging sets. It\'s crucial for detecting cycles in graphs and Kruskal\'s algorithm.',
    },
  ],
  hard: [
    {
      id: 1,
      question:
        'What is the optimal approach for the "Longest Increasing Subsequence" problem?',
      options: [
        'Brute force with backtracking O(2^n)',
        'Dynamic programming with binary search O(n log n)',
        'Greedy algorithm',
        'Graph traversal',
      ],
      correctAnswer: 1,
      explanation:
        'The optimal solution uses DP with binary search. Maintain an array of the smallest tail elements for each LIS length. For each number, use binary search to find its position and update accordingly.',
    },
    {
      id: 2,
      question:
        'In the "Edit Distance" (Levenshtein) problem, what are the three allowed operations?',
      options: [
        'Insert, Delete, Replace',
        'Insert, Delete, Swap',
        'Only Replace',
        'Insert, Delete, Reverse',
      ],
      correctAnswer: 0,
      explanation:
        'The three operations are: Insert a character, Delete a character, Replace a character. The edit distance is the minimum number of these operations needed to transform one string to another.',
    },
    {
      id: 3,
      question:
        'What is the time complexity of Dijkstra\'s algorithm with a binary heap?',
      options: ['O(V²)', 'O(E log V)', 'O(V + E)', 'O(V * E)'],
      correctAnswer: 1,
      explanation:
        'With a binary heap (min-heap), Dijkstra\'s algorithm runs in O((V + E) log V), often simplified as O(E log V) since E ≥ V in connected graphs. Each edge relaxation and vertex extraction takes logarithmic time.',
    },
    {
      id: 4,
      question: 'What is the purpose of the "Suffix Array" data structure?',
      options: [
        'Speed up sorting',
        'Pattern matching and string queries in O(log² n) with preprocessing',
        'Find prime numbers',
        'Optimize memory allocation',
      ],
      correctAnswer: 1,
      explanation:
        'Suffix arrays store all suffixes of a string in sorted order. Combined with LCP (Longest Common Prefix) arrays, they enable efficient pattern matching, finding repeated substrings, and other string problems.',
    },
    {
      id: 5,
      question:
        'In "Maximum Flow" problems, what does the Ford-Fulkerson method rely on?',
      options: [
        'Greedy selection',
        'Finding augmenting paths repeatedly',
        'Topological sorting',
        'Binary search',
      ],
      correctAnswer: 1,
      explanation:
        'Ford-Fulkerson finds augmenting paths from source to sink in the residual graph, adds their flow, and updates residual capacities. Repeat until no augmenting path exists. The method finds the maximum flow.',
    },
  ],
};

export const sampleChatMessages = [
  {
    id: 1,
    type: 'user',
    text: 'How do I reverse a linked list?',
    timestamp: new Date(Date.now() - 5 * 60000),
  },
  {
    id: 2,
    type: 'ai',
    text: `Great question! Let me break down how to reverse a linked list step by step.

**Understanding the Problem:**
You need to change the direction of pointers so that each node points to the previous node instead of the next one.

**Key Intuition:**
Imagine dominoes falling in reverse order. You need to flip each pointer to point backwards.

**Step-by-Step Approach:**
1. Keep track of three pointers: previous, current, and next
2. For each node: save the next node, reverse the current pointer, move to the next node
3. Continue until you reach the end

**Visualization (text-based):**
\`\`\`
Original:  1 -> 2 -> 3 -> None
Reversed:  None <- 1 <- 2 <- 3
\`\`\`

**Time Complexity:** O(n) - visit each node once
**Space Complexity:** O(1) - only use a few pointers

**Why this works:**
By maintaining three pointers, you can safely redirect each node's pointer without losing references to the rest of the list.`,
    timestamp: new Date(Date.now() - 3 * 60000),
  },
  {
    id: 3,
    type: 'user',
    text: 'Can you give me a hint on the approach?',
    timestamp: new Date(Date.now() - 2 * 60000),
  },
  {
    id: 4,
    type: 'ai',
    text: `**Hint:** Think of it as a 3-pointer problem:
- Keep a "previous" pointer starting at None
- Keep a "current" pointer starting at the head
- Save the "next" node before you change the pointer

In each iteration:
- The current node points to the previous node (reversing direction)
- Move all pointers forward one step
- Stop when current becomes None

This is like reversing the order of dominoes - one domino at a time! 🎯`,
    timestamp: new Date(Date.now() - 60000),
  },
];

export const aiHintModeExamples = {
  beginner:
    'Break down complex concepts into simple analogies. Use real-world examples. Avoid jargon.',
  intermediate: 'Explain the intuition behind the algorithm. Focus on why it works, not just how.',
  advanced: 'Discuss trade-offs, optimizations, and edge cases. Include complexity analysis.',
};

export const quickSuggestions = [
  '💡 Ask about two-pointer technique',
  '🔄 How does recursion work?',
  '📊 Explain dynamic programming',
  '🎯 Struggling with tree problems?',
  '⚡ Fast sorting algorithms explained',
];

export const userProgress = {
  totalTopics: 8,
  completedTopics: 3,
  currentStreak: 7,
  totalPoints: 2450,
  level: 'Advanced Beginner',
  nextMilestone: 3000,
};
