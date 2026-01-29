
# Chuwei Guo (郭楚惟) Memorial Website

## Overview
A warm, celebratory static memorial website honoring Chuwei's life (郭楚惟), featuring his biography, life timeline with photos, photo gallery, and visitor tributes — all available in both Chinese and English.

---

## Pages & Features

### 1. Home Page - Biography
- Warm hero section with Chuwei's photo and name (郭楚惟 / Chuwei Guo)
- Language toggle button (中文/English) in the header, persisted across pages
- Biographical content telling his story (you'll provide this text)
- Embedded YouTube playlist with visible controls
- Welcoming message for visitors

### 2. Timeline Page - Life Journey
- Beautiful vertical timeline showing key milestones
- Each event includes: date, title, description, and **selected photos from the gallery**
- Events like: birth, childhood, moving to the US, school years, achievements, special moments
- All content available in both Chinese and English
- Photos displayed inline with timeline events for richer storytelling

### 3. Photo Gallery
- Single gallery displaying 200+ photos hosted on Cloudinary
- Masonry/grid layout for visual appeal
- Lightbox for full-screen viewing with navigation
- Lazy loading for fast performance
- Photos configured via a simple data file

### 4. Comments & Eulogies
- Embedded Google Form for visitors to submit their name and message
- Embedded Google Sheet displaying all tributes
- Simple, heartfelt layout for reading messages

---

## Design
- **Warm & celebratory** color palette: soft golds, warm creams, gentle earth tones
- Clean typography supporting both English and Chinese characters
- Subtle fade-in animations for a peaceful feel
- Fully mobile-responsive

---

## Technical Approach

### Static Architecture
- Pure React/TypeScript with no backend
- All content stored in data files within the project
- Easy to update by editing files and redeploying

### Photo Hosting (Cloudinary)
- Upload photos to your free Cloudinary account
- Reference photos via URLs in data files
- Same photos can be referenced in both gallery and timeline

### Music (YouTube Playlist)
- Embedded YouTube playlist player
- Visible controls for pause/skip/volume

### Comments (Google Sheets)
- Google Form for submissions
- Google Sheet to display comments

### Bilingual Support
- Language toggle stores preference in browser
- All text in both Chinese and English

---

## Content You'll Provide
| Content | Notes |
|---------|-------|
| Biography text | I'll ask you for this when we start building |
| Timeline events | Dates, titles, descriptions + which photos to show |
| Photos | Upload to Cloudinary, provide URLs |
| YouTube playlist | Link to the playlist |
| Google Form/Sheet | Links after you create them |

---

## Hosting
- Deploy to GitHub Pages, Netlify, or Vercel for free
- Connect custom domain if desired
- All code exportable via GitHub
