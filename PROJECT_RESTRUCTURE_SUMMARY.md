# Project Restructure Summary

## ✅ Completed Restructuring

### Data Structure (`app/data/projects.js`)

**Combined Arrays:**

- Merged `projects` and `paintings` arrays into a single `projects` array
- All 42 items (9 code projects + 33 visual art pieces)

**New Structure for Each Project:**

```javascript
{
  title: "Project Title",
  slug: "project-slug",
  year: "2024",
  completionDate: "12/15/2024",
  tags: ["code"] or ["visual-art"] or ["installation"],
  path: "/work/project-slug" or null,
  component: "component-name" or null,  // For custom pages
  image: "/projects/folder/image.jpg",
  status: "Brief description",
  links: [...],  // Optional
  artMetadata: {  // Only for visual art
    medium: "Oil on canvas",
    size: '24" x 30"',
    tags: ["Painting", "Drawing", etc.],
    exhibitions: ["Gallery Name"],
    description: "Artist statement...",
    images: [...],  // For multiple images
    video: "/path/to/video.mp4"  // Optional
  }
}
```

### Tag System

**Three main tags for filtering:**

- `code` - Code/tech projects (9 items)
- `visual-art` - Paintings, drawings, digital art, video (33 items)
- `installation` - Installation works (ready for future content)

### Page Logic (`/work/[slug]/page.jsx`)

**Routing Priority:**

1. Find project by slug
2. If project has `artMetadata` → Render painting display page
3. Else if project has `component` → Render custom component
4. Else → Show "No page available"

**This means:**

- Projects with `artMetadata` automatically get painting pages
- Projects with `component` get custom interactive pages
- Projects with neither (like "prl", "journaling.ink") don't have detail pages but appear in grids

### Grid Pages (Filtered Views)

**`/code` page:**

- Filters: `getProjectsByTag("code")`
- Shows: All code/tech projects

**`/visual-art` page:**

- Filters: `getProjectsByTag("visual-art")`
- Shows: All visual art pieces
- Displays: Image, title, medium, year, exhibitions

**`/installation` page:**

- Filters: `getProjectsByTag("installation")`
- Currently empty, ready for content

### Helper Functions

```javascript
// Get all projects with a specific tag
getProjectsByTag(tag); // "code", "visual-art", "installation"

// Find project by slug
getProjectBySlug(slug);

// Get projects with routes
getProjectRoutes();

// Get project by path
getProjectByPath(path);
```

## Project Breakdown

### Code Projects (9)

1. journaling.ink (no page)
2. what do you dream about? (custom component)
3. Letters to my Mom (custom component)
4. emily-diffusion (custom component)
5. prl (no page)
6. prl iOS (no page)
7. Tangent (no page)
8. StyleScape (no page)
9. Portrait of You (no page)

### Visual Art Projects (33)

All have automatic painting display pages with:

- Full image(s) display
- Metadata (medium, size, year, exhibitions)
- Artist statements (where available)
- Proper image loading optimization

## URLs

**Grid Views:**

- `/code` - All code projects
- `/visual-art` - All visual art
- `/installation` - Installation works

**Individual Works:**

- `/work/[slug]` - Dynamic route for all projects with pages
  - Examples: `/work/dissociation`, `/work/emily-diffusion`, `/work/drunk`

## Benefits

1. **Single Source of Truth** - One array for all projects
2. **Flexible Routing** - Easy to add new projects with or without pages
3. **Tag-Based Filtering** - Simple to filter by medium/category
4. **Maintainable** - Clear structure for artwork metadata
5. **Scalable** - Easy to add new categories (installation, sculpture, etc.)

## Image Optimization

Added loading attributes to all images:

- Gallery images: `loading="eager"` (loads immediately)
- Detail page images: `loading="lazy"` for images after the first
- All images: `decoding="async"` + background color placeholders
