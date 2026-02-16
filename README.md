# DSAOrbit 📚

A comprehensive React.js web application for students to track their DSA sheet progress for placement preparation.

## Quick Start 🚀

```bash
# Install & Run
npm install
npm run dev
# Open http://localhost:5173
```

## Features ✨

- **Dashboard**: Overall progress, streak tracker, activity log
- **Topics**: 20 DSA topics with 160+ pre-loaded questions
- **Progress Tracking**: Real-time animated progress bars
- **Streak System**: Track daily consistency
- **Question Management**: Complete, favorite, add notes
- **Advanced Filtering**: By difficulty, platform, topic
- **Search**: Quick question lookup
- **Dark/Light Mode**: Theme toggle with persistence
- **Data Export/Import**: JSON backup and restore
- **Responsive Design**: Works on all devices
- **Smooth Animations**: Framer Motion throughout

## Tech Stack 🛠️

- React 18 + Vite
- Tailwind CSS 3 
- React Router v6
- Context API (State)
- Framer Motion (Animations)
- Sonner (Toast notifications)
- LocalStorage (Persistence)

## Project Structure 📁

```
src/
├── components/       # UI components
├── pages/           # Page routes
├── context/         # Global state
├── hooks/           # Custom hooks
├── data/            # Question data
├── utils/           # Utilities
├── styles/          # CSS
└── App.jsx
```

## 20 Topics Covered 📚

1. Arrays (10Q) - 2. Strings (10Q) - 3. Linked List (9Q) - 4. Stack (8Q) - 5. Queue (8Q)
6. Recursion (9Q) - 7. Sorting (10Q) - 8. Searching (9Q) - 9. Binary Search (8Q) - 10. Trees (10Q)
11. BST (9Q) - 12. Heaps (8Q) - 13. Graphs (10Q) - 14. DP (10Q) - 15. Greedy (9Q)
16. Backtracking (8Q) - 17. Sliding Window (9Q) - 18. Two Pointer (8Q) - 19. Bit Manipulation (9Q) - 20. Interview (10Q)

**Total: ~160 Questions**

## How to Use 📖

### Dashboard
- View overall progress percentage
- See topic-wise statistics  
- Track daily streak
- Check recent activity
- Get motivation quotes

### Topics Page
- Click topics to expand/collapse
- ✓ Mark questions complete
- ⭐ Add/remove favorites
- 📝 Write solution notes
- 🔗 Open problem links

### Filtering & Search
- Search by question title
- Filter by difficulty (Easy/Medium/Hard)
- Filter by platform (LeetCode/GFG/CodeStudio)
- Filter by completion status

### Settings
- 📥 Export progress (JSON)
- 📤 Import progress (restore)
- 🔄 Reset all progress
- About app info

### Theme
- Click sun/moon icon in navbar
- Auto-saves your preference

## Data Model 💾

Each question has:
```javascript
{
  id, topic, algorithm, title,
  difficulty, platform, link,
  completed, completedDate,
  favorite, notes,
  createdAt, updatedAt
}
```

All data stored in browser's LocalStorage - no backend needed!

## Browser Support 🌐

Chrome, Firefox, Safari, Edge (Latest versions)

## Performance ⚡

- Lazy loaded routes
- Memoized components
- Optimized calculations
- Smooth Frame Motion animations

## Troubleshooting 🔧

**Data not saving?**
- Ensure localStorage is enabled
- Clear cache and try again

**Components missing?**
- Run: `npm install && npm run dev`
- Check browser console

**Build issues?**
- Clear cache: `rm -rf node_modules && npm install`

## Development Scripts 📝

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview build
```

## Future Enhancements 🚀

### SaaS Features
- User authentication
- Cloud sync
- Leaderboards
- Video solutions
- Mock interviews
- AI recommendations
- Discussion forums
- Curated problem sets

### Technical
- TypeScript migration
- Unit tests
- PWA support
- Offline mode
- Analytics

## Contributing 🤝

Fork, improve, and share! Help other students!

## License 📄

Open source - Free for personal/educational use

## Made With ❤️

Built for students preparing for placement interviews.

**Happy Learning! 🚀**
=======
# DSA_tracker_app
>>>>>>> fd4f205e90f1eefa5df110d9b0359d11ed4af389
