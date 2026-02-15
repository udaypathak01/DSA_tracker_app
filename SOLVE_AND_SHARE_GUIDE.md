# Solve & Share Engine - Feature Guide

## Overview

The "Solve & Share Engine" is a social sharing feature that automatically generates beautiful achievement cards when users mark problems as completed in the DSA Tracker.

## Features

✨ **Dynamic Card Generation**
- Beautiful gradient-based achievement cards
- Auto-generated with problem details
- Instagram-friendly 1080x1080 format
- Responsive preview for all screen sizes

🔥 **Social Sharing**
- Download as PNG image
- Share on LinkedIn with auto-generated captions
- Copy caption to clipboard for manual sharing
- Edit motivational quotes before sharing

💬 **Motivational Quotes**
- 30+ developer-focused motivational quotes
- Random quote selection on completion
- Editable quotes in the share modal
- Stored with completion data

📊 **Data Tracking**
- Problem name and difficulty
- Current streak
- Topic information
- Completion date and user name

---

## Installation

### Dependencies

The feature requires `html-to-image` for converting cards to downloadable PNG images.

```bash
npm install html-to-image
```

This has already been installed in your project.

---

## File Structure

```
src/
├── components/
│   ├── share/
│   │   ├── ShareCard.jsx       # Achievement card component
│   │   └── ShareModal.jsx      # Share modal with download/share options
│   └── layout/
│       └── MainLayout.jsx      # Updated with ShareModal integration
├── utils/
│   ├── quotes.js              # Motivational quotes database
│   └── imageGenerator.js      # Image generation utilities
└── context/
    └── DSAProvider.jsx        # Updated with share state management
```

---

## How It Works

### 1. **Trigger**

When a user marks a problem as completed:
```jsx
// In any QuestionCard or similar component
const handleCheckbox = () => {
  toggleComplete(questionId);
  // ShareModal automatically opens!
};
```

The `toggleComplete` function in DSAProvider:
- Marks the problem as completed
- Selects a random motivational quote
- Opens the ShareModal automatically
- Passes problem data, streak, and quote

### 2. **Share Modal Steps**

```
User marks problem complete
↓
System selects random quote
↓
ShareModal opens with preview
↓
User can:
  - Download PNG
  - Share on LinkedIn
  - Copy caption
  - Edit quote
  - Close
```

### 3. **Download Process**

Using `html-to-image`:
```javascript
// In imageGenerator.js
export const downloadAsImage = async (element, filename) => {
  const image = await toPng(element, {
    quality: 1,
    pixelRatio: 2, // High quality
    cacheBust: true,
  });
  
  // Create download link and trigger download
  const link = document.createElement('a');
  link.href = image;
  link.download = filename;
  link.click();
};
```

Filename format:
```
problem-title-YYYY-MM-DD.png
```

Example:
```
trapping-rain-water-2026-02-15.png
```

---

## Component APIs

### ShareCard Component

```jsx
<ShareCard
  problem={{
    id: "1",
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays"
  }}
  streak={12}
  quote="The only way to do great work is to love what you do."
  userName="Uday Sharma"
  cardRef={cardRef}
/>
```

**Props:**
- `problem` (Object): Problem details
  - `title` (string): Problem name
  - `difficulty` (string): Easy|Medium|Hard
  - `topic` (string): Topic name
- `streak` (number): Current streak count
- `quote` (string): Motivational quote
- `userName` (string): User's name
- `cardRef` (React.Ref): Reference for DOM conversion

### ShareModal Component

```jsx
<ShareModal
  isOpen={true}
  problem={problemData}
  streak={currentStreak}
  quote={selectedQuote}
  userName={userName}
  onClose={() => handleClose()}
/>
```

**Props:**
- `isOpen` (boolean): Modal visibility
- `problem` (Object): Problem details
- `streak` (number): Current streak
- `quote` (string): Motivational quote
- `userName` (string): User's name
- `onClose` (function): Close callback

---

## Utility Functions

### quotes.js

```javascript
// Get random quote
import { getRandomQuote } from './utils/quotes';
const quote = getRandomQuote();

// Get specific quote by index
import { getQuoteAtIndex } from './utils/quotes';
const quote = getQuoteAtIndex(5);

// Access all quotes
import { motivationalQuotes } from './utils/quotes';
console.log(motivationalQuotes); // Array of 30 quotes
```

### imageGenerator.js

```javascript
// Download element as PNG
import { downloadAsImage } from './utils/imageGenerator';
await downloadAsImage(elementRef.current, 'filename.png');

// Copy text to clipboard
import { copyToClipboard } from './utils/imageGenerator';
const success = await copyToClipboard('Text to copy');

// Generate LinkedIn caption
import { generateLinkedInCaption } from './utils/imageGenerator';
const caption = generateLinkedInCaption({
  title: "Two Sum",
  difficulty: "Easy",
  streak: 12,
  topic: "Arrays"
});

// Generate LinkedIn share URL
import { generateLinkedInShareURL } from './utils/imageGenerator';
const url = generateLinkedInShareURL(caption);
window.open(url, '_blank');
```

---

## Context Integration

### DSAProvider State

```javascript
// New state added:
const [completedProblem, setCompletedProblem] = useState(null);
const [shareQuote, setShareQuote] = useState('');
const [userName, setUserName] = useState('Developer');

// In showModal:
showModal: {
  notes: false,
  addQuestion: false,
  editQuestion: false,
  delete: false,
  settings: false,
  share: false,  // NEW
}
```

### Using in Components

```jsx
import { useDSA } from '../hooks/useDSA';

function MyComponent() {
  const {
    currentStreak,
    completedProblem,
    shareQuote,
    userName,
    setUserName,
  } = useDSA();

  // Use data...
}
```

---

## Design Details

### Color Scheme

**Difficulty Colors:**
- Easy: Emerald/Green (`from-emerald-600 to-emerald-700`)
- Medium: Amber/Yellow (`from-amber-600 to-amber-700`)
- Hard: Red (`from-red-600 to-red-700`)

**Card Design:**
- Gradient background based on difficulty
- White/translucent overlays
- Rounded corners (2xl)
- Soft shadows
- Responsive layout (mobile, tablet, desktop)

### Animations

- **Modal**: Slide up + fade in (spring animation)
- **Card**: Fade in + scale animation
- **Buttons**: Hover scale effects
- **Quote**: Fade and slide entrance

---

## User Experience Flow

### 1. **Completion**
```
User checks problem checkbox
↓
Confetti animation (optional)
↓
Share modal automatically opens
```

### 2. **Preview**
```
User sees beautiful achievement card with:
- Problem name
- Difficulty badge
- Topic
- Current streak
- Motivational quote
- User name
- Date
```

### 3. **Download**
```
User clicks "Download PNG"
↓
Card converts to high-quality PNG
↓
Auto-downloads with naming:
  {problem-name}-{date}.png
```

### 4. **Share on LinkedIn**
```
User clicks "Share on LinkedIn"
↓
Caption copies to clipboard
↓
LinkedIn share dialog opens
↓
User can paste caption and share
```

### 5. **Edit & Customize**
```
User clicks "Edit Quote"
↓
Quote text area appears
↓
User edits quote
↓
Quote updates in card preview
↓
User can download updated version
```

---

## Configuration

### Add Custom User Name

In Settings or Profile page:

```jsx
import { useDSA } from '../hooks/useDSA';

function Settings() {
  const { userName, setUserName } = useDSA();
  const [name, setName] = useState(userName);

  const handleSave = () => {
    setUserName(name);
    localStorage.setItem('user-name', name);
  };

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter your name"
    />
  );
}
```

### Add Custom Quotes

Edit `src/utils/quotes.js`:

```javascript
export const motivationalQuotes = [
  // ... existing quotes
  "Your custom motivational quote here!",
];
```

---

## Troubleshooting

### Image Download Not Working

**Issue**: Download button doesn't trigger download

**Solution**:
1. Check browser console for errors
2. Ensure `html-to-image` is properly installed
3. Check element ref is valid
4. Try with a different browser

```bash
npm install html-to-image --save
```

### Clipboard Copy Fails

**Issue**: "Copy to clipboard" button doesn't work

**Solution**:
- Only works on HTTPS or localhost
- Some browsers need user interaction
- Check browser clipboard permissions

### Modal Doesn't Open

**Issue**: ShareModal doesn't appear

**Solution**:
1. Check `showModal.share` is true
2. Verify `completedProblem` has data
3. Check MainLayout includes ShareModal component
4. Open browser DevTools console for errors

---

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Image Download | ✅ | ✅ | ✅ | ✅ |
| Clipboard API | ✅ | ✅ | ✅ | ✅ |
| Modal/Animation | ✅ | ✅ | ✅ | ✅ |
| LinkedIn Share | ✅ | ✅ | ✅ | ✅ |

---

## Performance Optimization

The feature is optimized for performance:

**Lazy Loading:**
- ShareModal only rendered when needed
- Images generated on-demand

**Memoization:**
- Components wrapped with React.memo where applicable
- useCallback for function stability

**Image Quality:**
- pixelRatio: 2 for high quality
- Configurable in imageGenerator.js
- Reduce if file size is concern

```javascript
// In imageGenerator.js - adjust as needed
const image = await toPng(element, {
  quality: 1,
  pixelRatio: 2, // Increase for higher quality, decrease for smaller files
  cacheBust: true,
});
```

---

## Future Enhancements

Planned features:

✨ **Phase 2:**
- [ ] Theme switcher (Dark/Blue/Purple backgrounds)
- [ ] Achievement badges (e.g., "Hard Solver", "100 Day Streak")
- [ ] Confetti animation on completion
- [ ] Social media watermark with app logo
- [ ] Animated gradient backgrounds
- [ ] Share to Twitter/Instagram links

📱 **Phase 3:**
- [ ] Mobile app integration
- [ ] Push notifications for milestones
- [ ] Leaderboard visibility
- [ ] Achievement gallery/portfolio

---

## Support

For issues or feature requests:
1. Check troubleshooting section above
2. Review browser console for errors
3. Ensure all dependencies are installed
4. Test in different browsers

---

## Summary

The Solve & Share Engine transforms problem completion into a shareable achievement, motivating users to:
- ✨ Celebrate wins
- 🚀 Share progress
- 💪 Build consistency
- 🎯 Stay motivated

Enjoy sharing your DSA journey! 🎉
