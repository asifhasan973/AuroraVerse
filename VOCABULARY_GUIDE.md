# Vocabulary Slider Guide

This guide explains how to add vocabulary content to the Story2 vocabulary slider.

## How to Add Vocabulary Content

### 1. Edit the Vocabulary Data

Open `/src/data/vocabulary.js` and modify the `STORY2_VOCABULARY` array. Each dialogue has its own array of vocabulary items.

### 2. Vocabulary Item Structure

Each vocabulary item should have this structure:

```javascript
{
  word: "word-to-explain",
  explanation: "Simple explanation for children",
  media: [
    {
      type: "image", // or "video"
      src: "path/to/image.jpg", // or video URL
      alt: "Description of image", // for images only
      title: "Video Title" // for videos only
    }
    // Add more media items for carousel
  ],
  showMore: {
    link: "https://educational-link.com",
    text: "Learn more about this topic"
  }
}
```

### 3. Media Types Supported

#### Images
```javascript
{
  type: "image",
  src: "images/Story2/example.jpg",
  alt: "Description of the image"
}
```

#### Videos (Embedded)
```javascript
{
  type: "video", 
  src: "https://www.youtube.com/embed/VIDEO_ID",
  title: "Video Title"
}
```

#### Direct Video Files
```javascript
{
  type: "video",
  src: "videos/example.mp4",
  title: "Video Title"
}
```

### 4. Adding Multiple Media Items

To create a carousel for one vocabulary word, add multiple media items:

```javascript
{
  word: "rocket",
  explanation: "A vehicle that uses engines to push itself up into space",
  media: [
    {
      type: "image",
      src: "images/Story2/rocket-exterior.jpg",
      alt: "Rocket from outside"
    },
    {
      type: "video",
      src: "https://www.youtube.com/embed/rocket-launch",
      title: "Rocket Launch"
    },
    {
      type: "image", 
      src: "images/Story2/rocket-interior.jpg",
      alt: "Inside a rocket"
    }
  ],
  showMore: {
    link: "https://www.nasa.gov/learn-about-rockets",
    text: "Learn about rockets"
  }
}
```

### 5. Example: Adding to Dialogue 1

```javascript
// In STORY2_VOCABULARY[0] (first dialogue)
[
  {
    word: "space",
    explanation: "The area beyond Earth's atmosphere where stars and planets are",
    media: [
      {
        type: "image",
        src: "images/Story2/space-view.jpg", 
        alt: "View of space with stars"
      }
    ],
    showMore: {
      link: "https://www.nasa.gov/audience/forstudents/k-4/stories/what-is-space-k4.html",
      text: "Explore space"
    }
  }
  // ... other vocabulary items
]
```

### 6. Tips for Child-Friendly Content

- Keep explanations simple and short
- Use familiar words in explanations
- Choose clear, high-quality images
- Make sure videos are appropriate for children
- Test that all image paths exist
- Use educational links from trusted sources like NASA

### 7. Responsive Design

The vocabulary slider automatically adapts to different screen sizes:
- Mobile: Takes up 3/4 of screen width when expanded
- Tablet: Takes up 1/2 of screen width
- Desktop: Takes up 1/5 of screen width

### 8. Testing

After adding vocabulary content:
1. Start the development server
2. Navigate to Story2
3. Check that vocabulary appears for each dialogue
4. Test the carousel functionality
5. Verify all images load correctly
6. Test on different screen sizes
