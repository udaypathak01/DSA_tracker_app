# Solve & Share Engine - Quick Reference

## 🚀 Quick Start

### Install
```bash
npm install html-to-image
```

### Test It
1. `npm run dev`
2. Go to Topics page
3. Check any problem ✓
4. Share modal opens! 🎉

---

## 📁 File Structure at a Glance

```
src/
├── components/share/
│   ├── ShareCard.jsx          # Card component (pretty UI)
│   └── ShareModal.jsx          # Modal component (interactions)
├── utils/
│   ├── quotes.js              # Array of 30 quotes
│   └── imageGenerator.js      # Helper functions
└── context/
    └── DSAProvider.jsx        # Updated with share logic
```

---

## 🔌 Key Hooks & Imports

### In Any Component
```jsx
import { useDSA } from '../hooks/useDSA';

const { 
  completedProblem,     // Problem data
  shareQuote,          // Selected quote  
  currentStreak,       // Streak count
  userName,            // User name
  showModal,           // Modal visibility
  toggleComplete,      // Mark as done + open modal
} = useDSA();
```

### In Utilities
```javascript
// Get random quote
import { getRandomQuote } from '../utils/quotes';
const quote = getRandomQuote();

// Download image
import { downloadAsImage } from '../utils/imageGenerator';
await downloadAsImage(ref, 'filename.png');

// Copy to clipboard
import { copyToClipboard } from '../utils/imageGenerator';
await copyToClipboard('Text');

// LinkedIn caption
import { generateLinkedInCaption } from '../utils/imageGenerator';
const caption = generateLinkedInCaption(problem);
```

---

## 🎯 Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│ User marks problem as complete (checkbox)            │
└──────────────┬──────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────┐
│ toggleComplete(questionId) called                    │
└──────────────┬──────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────┐
│ 1. Mark problem as completed                        │
│ 2. Select random quote via getRandomQuote()         │
│ 3. Set completedProblem state                       │
│ 4. Set shareQuote state                             │
│ 5. Open modal: showModal.share = true               │
└──────────────┬──────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────┐
│ ShareModal component renders                        │
│ ├─ Shows beautiful card preview                     │
│ ├─ Download PNG button → downloadAsImage()          │
│ ├─ LinkedIn button → generateLinkedInCaption()      │
│ ├─ Copy button → copyToClipboard()                  │
│ └─ Edit quote → update shareQuote state             │
└──────────────┬──────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────┐
│ User selects action and shares achievement ✨       │
└─────────────────────────────────────────────────────┘
```

---

## 🎨 Component Props Reference

### ShareCard
```jsx
<ShareCard
  problem={{
    title: "Two Sum",
    difficulty: "Easy",    // Easy | Medium | Hard
    topic: "Arrays"
  }}
  streak={12}             // Number
  quote="..."            // String
  userName="John"        // String
  cardRef={ref}          // React.Ref
/>
```

### ShareModal
```jsx
<ShareModal
  isOpen={true}
  problem={problemObj}
  streak={12}
  quote="..."
  userName="John"
  onClose={() => {}}
/>
```

---

## 💾 State Added to DSAProvider

```javascript
// New states
const [completedProblem, setCompletedProblem] = useState(null);
const [shareQuote, setShareQuote] = useState('');
const [userName, setUserName] = useState('Developer');

// New showModal key
showModal.share = false  // Opens when problem completed
```

---

## 🎬 Animation Classes Used

All animations use Framer Motion:

```jsx
// Modal appears with
<motion.div
  initial={{ opacity: 0, y: 50, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.4, type: 'spring' }}
>

// Card fades in
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
>

// Buttons hover effect
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
```

---

## 📥 Download Implementation

```javascript
// Converts DOM element to PNG and downloads
const handleDownloadImage = async () => {
  const image = await toPng(cardRef.current, {
    quality: 1,
    pixelRatio: 2,  // High quality
    cacheBust: true,
  });
  
  const link = document.createElement('a');
  link.href = image;
  link.download = `${problemTitle}-${date}.png`;
  link.click();
};
```

---

## 📤 LinkedIn Share Implementation

```javascript
// Generates caption and opens LinkedIn share dialog
const handleLinkedInShare = async () => {
  // Generate caption
  const caption = generateLinkedInCaption({
    title: problem.title,
    difficulty: problem.difficulty,
    streak,
    topic: problem.topic,
  });
  
  // Copy to clipboard
  await copyToClipboard(caption);
  
  // Open LinkedIn share
  const url = generateLinkedInShareURL(caption);
  window.open(url, '_blank');
};
```

---

## 🎓 Quote System

```javascript
// 30 developer-focused motivational quotes stored in array

motivationalQuotes = [
  "The only way to do great work is to love what you do.",
  "Discipline compounds faster than talent.",
  // ... 28 more quotes
]

// Get random quote (called on completion)
getRandomQuote() → Returns random quote from array

// Get specific quote by index (for reproducibility)
getQuoteAtIndex(index) → Returns quote at position
```

---

## 🌙 Dark Theme Support

All components fully support dark theme via:
```jade
dark:text-white
dark:bg-dark-card
dark:border-dark-border
// etc.
```

Controlled by:
```javascript
const { theme } = useDSA(); // 'dark' or 'light'
```

---

## 📊 Colors by Difficulty

```javascript
Easy   → from-emerald-600 to-emerald-700  🟢
Medium → from-amber-600 to-amber-700     🟡
Hard   → from-red-600 to-red-700        🔴
```

---

## 🧪 Testing Checklist

```
✓ Mark problem complete
✓ Modal opens
✓ Card displays all data
✓ Quote shows randomly
✓ Download works (file appears)
✓ Filename correct format
✓ Copy caption works (toast)
✓ Edit quote updates card
✓ LinkedIn button works
✓ Mobile responsive
✓ Dark theme works
✓ Close button works
```

---

## 🔧 Common Tweaks

### Change default user name
In DSAProvider.jsx:
```javascript
const [userName, setUserName] = useState('Your Name Here');
```

### Add more quotes
In quotes.js:
```javascript
export const motivationalQuotes = [
  // ... existing
  "Your new quote!",
];
```

### Change colors
In ShareCard.jsx:
```javascript
const getDifficultyColor = (difficulty) => {
  case 'Easy':
    return { 
      bg: 'from-yourColor-600 to-yourColor-700',
      text: 'text-yourColor-100'
    };
};
```

### Adjust image quality
In imageGenerator.js:
```javascript
pixelRatio: 3,  // Higher = better quality
```

---

## 🐛 Debug Tips

Check these if feature isn't working:

```javascript
// 1. Check if modal opens
console.log(showModal.share); // Should be true

// 2. Check problem data
console.log(completedProblem); // Should have title, etc

// 3. Check quote
console.log(shareQuote); // Should be a string

// 4. Check HTML-to-image installed
npm list html-to-image

// 5. Check ref is valid
console.log(cardRef.current); // Should be DOM element
```

---

## 📦 Dependency: html-to-image

**Why?** Converts DOM elements to PNG images

**Installation:**
```bash
npm install html-to-image
```

**Usage:**
```javascript
import { toPng } from 'html-to-image';

const image = await toPng(element, { options });
```

**Alternatives:**
- `html2canvas` - More features
- `dom-to-image` - Similar to html-to-image
- Canvas API - Manual approach

---

## 🚀 Feature Highlights

✨ **What Makes It Special:**
1. Auto-triggers on completion (no extra clicks)
2. Beautiful gradient cards (Instagram-ready)
3. One-click download as PNG
4. LinkedIn integration with caption
5. Edit quotes before sharing
6. Works on mobile
7. Dark theme support
8. Fully animated with Framer Motion

---

## 📈 User Journey

```
1. User solves problem
   ↓
2. Checks checkbox ✓
   ↓ 
3. ShareModal opens 🎉
   ↓
4. Sees beautiful card
   ↓
5. Chooses action:
   - Download → PNG saved
   - LinkedIn → Share with caption
   - Edit → Customize quote
   ↓
6. Posts achievement online
   ↓
7. Feels motivated 💪
   ↓
8. Solves more problems 🚀
```

---

## 📞 Need Help?

**Check these files:**
- Feature Guide: `SOLVE_AND_SHARE_GUIDE.md`
- Implementation: `IMPLEMENTATION_CHECKLIST.md`
- This file: `QUICK_REFERENCE.md`

**Look at code:**
- Modal: `src/components/share/ShareModal.jsx`
- Card: `src/components/share/ShareCard.jsx`
- Utils: `src/utils/imageGenerator.js`
- Quotes: `src/utils/quotes.js`

---

## Summary

**In One Sentence:** When users complete a problem, a beautiful shareable card pops up with their achievement, social sharing buttons, and motivational quotes.

**That's it!** The feature is ready to use! 🎉
