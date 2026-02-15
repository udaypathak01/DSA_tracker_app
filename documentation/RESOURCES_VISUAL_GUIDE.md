# Resources Feature - Visual Architecture & Screenshots

## 🏗️ Page Layout Structure

### Desktop View (1200px+)
```
┌─────────────────────────────────────────────────────────────────┐
│ Navbar (with progress bar)                                      │
├──────────────┬────────────────────────────────────────────────────┤
│              │                                                    │
│  Sidebar     │  📚 Learning Resources                            │
│              │  Curated content to master DSA...                 │
│  Dashboard   │                                                    │
│  Topics      │  [🔍 Search bar with results count]              │
│  Resources   │                                                    │
│  Settings    │  [Show Filters] [View Mode] [X resources]        │
│              │                                                    │
│              │  ┌─────────────────┬──────────────────────────┐   │
│              │  │                 │                          │   │
│              │  │  Filters (Sticky) │  📺 YouTube Channels  │   │
│              │  │                 │                          │   │
│              │  │  Level          │  ┌─────────────────────┐│   │
│              │  │  ☑ Beginner     │  │ ResourceCard        ││   │
│              │  │  ☐ Intermediate│  │ [Thumbnail]         ││   │
│              │  │  ☐ Advanced     │  │ Striver A2Z DSA...  ││   │
│              │  │                 │  │ 450k 👁️              │   │
│              │  │  Type           │  │ [🔗 Open] [☆ Book]  ││   │
│              │  │  ☑ YouTube      │  └─────────────────────┘   │
│              │  │  ☐ Website      │                          │   │
│              │  │  ☐ Roadmap      │  ┌─────────────────────┐│   │
│              │  │                 │  │ ResourceCard        ││   │
│              │  │  Topic          │  │ [Thumbnail]         ││   │
│              │  │  ☐ Arrays       │  │ CodeHelp Series...  ││   │
│              │  │  ☐ DP           │  │ 380k 👁️              │   │
│              │  │  ☐ Graphs       │  │ [🔗 Open] [⭐ Book] ││   │
│              │  │  ... (scrollable)│ └─────────────────────┘   │
│              │  │                 │                          │   │
│              │  │ [Clear Filters] │  More cards...         │   │
│              │  │                 │                          │   │
│              │  └─────────────────┴──────────────────────────┘   │
│              │                                                    │
│              │  🌐 Websites              🗺️ Roadmaps           │
│              │  [Cards...]               [Cards...]             │
│              │                                                    │
│              │  💡 Tip: Bookmark resources...                   │
└──────────────┴────────────────────────────────────────────────────┘
```

### Tablet View (768px - 1199px)
```
┌─────────────────────────────────────────────────┐
│ Navbar                                          │
├─────────────────────────────────────────────────┤
│                                                 │
│  📚 Learning Resources                          │
│  [🔍 Search bar]                               │
│                                                 │
│  [Show Filters] [View Mode]                     │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │ ≡ Filters        Resources Grid          │   │
│  │                  ┌────────────┬────────┐ │   │
│  │ Level            │ Card       │ Card   │ │   │
│  │ ☑ Beginner       └────────────┴────────┘ │   │
│  │ ☐ Intermediate   ┌────────────┬────────┐ │   │
│  │ ☐ Advanced       │ Card       │ Card   │ │   │
│  │                  └────────────┴────────┘ │   │
│  │ Type             More cards...           │   │
│  │ ... (options)                            │   │
│  │                                          │   │
│  │ [Clear Filters]                          │   │
│  └──────────────────────────────────────────┘   │
│                                                 │
│  💡 Tip...                                      │
└─────────────────────────────────────────────────┘
```

### Mobile View (< 768px)
```
┌─────────────────────┐
│ [☰] Navbar      [🌙]│
├─────────────────────┤
│ [🔗] Resources      │
│                     │
│ 📚 Learning Res...  │
│ [🔍 Search...]      │
│                     │
│ [Show Filters]      │
│ [View Mode]         │
│ [18 resources]      │
│                     │
│ ┌────────────────┐  │
│ │ Card          │  │
│ │ [Thumbnail]   │  │
│ │ Title...      │  │
│ │ [Open][Book]  │  │
│ └────────────────┘  │
│                     │
│ ┌────────────────┐  │
│ │ Card          │  │
│ │ ...           │  │
│ └────────────────┘  │
│                     │
│ [Filters Expanded   │
│  when toggled]      │
│                     │
│ 💡 Tip block        │
└─────────────────────┘
```

---

## 🎨 ResourceCard Component

### Visual States

#### Unbookmarked State
```
┌──────────────────────────────┐
│  [Thumbnail]        👁️ 450k  │
│                              │
│  Striver A2Z DSA Course      │
│  by Striver                  │
│                              │
│  Complete DSA roadmap...     │
│                              │
│  [Beginner] [YouTube Pl...]  │
│  [Arrays] [DP] [Graphs] [+2] │
│                              │
│ [🔗 Open]    [☆ Bookmark]   │
└──────────────────────────────┘
```

#### Bookmarked State
```
┌──────────────────────────────┐
│  [Thumbnail]        👁️ 450k  │
│                              │
│  Striver A2Z DSA Course      │
│  by Striver                  │
│                              │
│  Complete DSA roadmap...     │
│                              │
│  [Beginner] [YouTube Pl...]  │
│  [Arrays] [DP] [Graphs] [+2] │
│                              │
│ [🔗 Open]    [⭐ Bookmarked]│
└──────────────────────────────┘
```

---

## 🔄 Data Flow

### Search & Filter Flow
```
ResourceSearch Input
        ↓
    setSearchQuery() ──→ useResources hook
                              ↓
                   ┌──────────┴──────────┐
                   ↓                     ↓
              filteredResources    groupedByCategory
                   ↓                     ↓
              Grid Display       Categorical Display
                   ↓                     ↓
            ResourceCard components shown
```

### Bookmark Flow
```
User clicks ⭐ Bookmark button
        ↓
toggleBookmark(resourceId) in useResources
        ↓
    Update resource.bookmarked state
        ↓
    Save to localStorage['resourceBookmarks']
        ↓
    Re-render with updated UI
```

### Filter Flow
```
User selects filter checkboxes
        ↓
handleFilterToggle() ──→ updateFilters() in useResources
        ↓
    Update filters state
        ↓
    useMemo recalculates filteredResources
        ↓
    Display updated grid
```

---

## 🎭 View Mode Toggle

### Grouped View (Default)
```
📺 YouTube Channels          (4 resources)
  ├─ ResourceCard 1
  ├─ ResourceCard 2
  ├─ ResourceCard 3
  └─ ResourceCard 4

🌐 Websites                   (6 resources)
  ├─ ResourceCard 5
  ├─ ResourceCard 6
  └─ ...

🗺️ Roadmaps                   (3 resources)
  └─ ...

🎯 Interview Preparation      (5 resources)
  └─ ...
```

### All View (Flat Grid)
```
Grid of 2-3 columns with all resources:
[Card 1] [Card 2] [Card 3]
[Card 4] [Card 5] [Card 6]
[Card 7] [Card 8] [Card 9]
...
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Grid Cols | Filter | View                |
|------------|-----------|--------|---------------------|
| < 768px   | 1 col     | Hidden | Toggle show/hide    |
| 768-1023px| 2 cols    | Hidden | Toggle show/hide    |
| ≥ 1024px  | 3 cols    | Sticky | Always visible      |

---

## 🎨 Color Scheme

### Level Badges
- **Beginner**: 🟢 Emerald (Green)
- **Intermediate**: 🟡 Amber (Orange)
- **Advanced**: 🔴 Red

### Type Badges
- **YouTube Playlist**: Red background
- **Website**: Blue background
- **Roadmap**: Purple background

### Theme Support
- Light mode: White cards, dark text
- Dark mode: dark-card background, light text
- Smooth transitions on theme switch

---

## 🔍 Filter Panel Components

```
┌─ ResourceFilters ─────────────┐
│                               │
│  [Clear All Filters] (if any) │
│                               │
│  📊 Level                     │
│  ☑ Beginner  (5)             │
│  ☐ Intermediate (8)          │
│  ☐ Advanced   (5)            │
│                               │
│  🏷️ Type                      │
│  ☑ YouTube Playlist (6)      │
│  ☐ Website (6)              │
│  ☐ Roadmap (3)              │
│  (scrollable if > 3 items)    │
│                               │
│  🎯 Topic (scrollable)       │
│  ☐ Arrays                     │
│  ☐ Strings                    │
│  ☐ DP                         │
│  ☐ Graphs                     │
│  ☐ Trees                      │
│  ... and more                 │
│                               │
└───────────────────────────────┘
```

---

## 🔗 Navigation Items Added

### Sidebar Navigation (Desktop)
```
📊 Dashboard   ← Existing
📚 Topics      ← Existing
🔗 Resources   ← NEW (Added)
⚙️ Settings    ← Existing
```

### Mobile Navbar Menu
```
📊 Dashboard   ← Existing
📚 Topics      ← Existing
🔗 Resources   ← NEW (Added)
⚙️ Settings    ← Existing
```

---

## 📊 Filter Statistics

With 18 resources:
- **Topics**: 15 unique topics
- **Types**: 3 types
- **Levels**: 3 levels
- **Categories**: 4 categories
- **Possible filter combinations**: 100+ 

---

This visual guide should help you understand the complete layout and data flow of the Resources feature! 🎨
