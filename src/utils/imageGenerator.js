import { toPng } from 'html-to-image';

/**
 * Download a DOM element as PNG image with improved handling
 * @param {HTMLElement} element - The DOM element to convert
 * @param {string} filename - The filename for the downloaded image
 * @param {Object} options - Optional configuration
 * @param {number} options.pixelRatio - Image quality multiplier (default: 2)
 * @param {number} options.margin - Margin around element in pixels (default: 25)
 * @param {string} options.backgroundColor - Background color (default: '#f5f5f5')
 * @param {number} options.quality - Image quality 0-1 (default: 1)
 * @returns {Promise<void>}
 */
export const downloadAsImage = async (element, filename, options = {}) => {
  const {
  
    pixelRatio = 2,
    margin = 25,
    backgroundColor = '#f5f5f5',
    quality = 1,
  } = options;

  try {
    if (!element) {
      console.error('Element not found for download');
      throw new Error('Element reference is null or undefined');
    }

    // Ensure filename has .png extension
    const finalFilename = filename.endsWith('.png') ? filename : `${filename}.png`;
    console.log('Starting image download for:', finalFilename);

    // Wait for any pending renders and animations
    await new Promise(resolve => setTimeout(resolve, 200));

    // Get accurate dimensions using getBoundingClientRect for rendered size
    const rect = element.getBoundingClientRect();
    const totalMargin = margin * 2;
    
    // Detect viewport and adjust card size accordingly for consistent downloads across devices
    let baseWidth;
    if (window.innerWidth < 640) {
      // Mobile: responsive based on actual viewport
      baseWidth = Math.min(window.innerWidth - 40, 320);
    } else if (window.innerWidth < 768) {
      // Small tablet
      baseWidth = 320;
    } else if (window.innerWidth < 1024) {
      // Medium screens
      baseWidth = 400;
    } else {
      // Desktop
      baseWidth = 500;
    }

    // Use responsive base width instead of rendered width for consistency
    const width = baseWidth + totalMargin;
    const height = Math.ceil(rect.height) + totalMargin;

    console.log(`Viewport width: ${window.innerWidth}, Base card width: ${baseWidth}`);
    console.log(`Download size with ${margin}px margins all sides: ${width}x${height}`);


    
    // Convert element to PNG with optimized settings
    const image = await toPng(element, {
      quality,
      pixelRatio,
      width,
      height,
      cacheBust: true,
      backgroundColor,
      canvasWidth: width,
      canvasHeight: height,
      fontEmbedCSS: true,
      logging: false,
      // Add style to handle margin
      style: {
        
        padding: `${margin}px`,
      },
    });

    if (!image) {
      throw new Error('Failed to generate image from element');
    }

    console.log('Image generated successfully, size:', width, 'x', height);

    // Create download link
    const link = document.createElement('a');
    link.href = image;
    link.download = finalFilename;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      // Only revoke blob URLs
      if (image.startsWith('blob:')) {
        URL.revokeObjectURL(image);
      }
    }, 100);

    console.log('Download initiated successfully for:', finalFilename);
  } catch (error) {
    console.error('Error downloading image:', error);
    console.error('Error message:', error.message);
    const errorMsg = error.message || 'Failed to download image. Please try again.';
    throw new Error(`Image download failed: ${errorMsg}`);
  }
};

/**
 * Get image blob from DOM element (useful for sharing APIs)
 * @param {HTMLElement} element - The DOM element to convert
 * @param {Object} options - Optional configuration
 * @returns {Promise<Blob>}
 */
export const elementToBlob = async (element, options = {}) => {
  const {
    pixelRatio = 2,
    margin = 25,
    backgroundColor = '#f5f5f5',
  } = options;

  if (!element) {
    throw new Error('Element reference is null or undefined');
  }

  await new Promise(resolve => setTimeout(resolve, 200));

  const rect = element.getBoundingClientRect();
  const totalMargin = margin * 2;
  const width = Math.ceil(rect.width) + totalMargin;
  const height = Math.ceil(rect.height) + totalMargin;

  const dataUrl = await toPng(element, {
    quality: 1,
    pixelRatio,
    width,
    height,
    cacheBust: true,
    backgroundColor,
    canvasWidth: width,
    canvasHeight: height,
    fontEmbedCSS: true,
    style: {
      padding: `${margin}px`,
    },
  });

  // Convert data URL to blob
  const response = await fetch(dataUrl);
  return await response.blob();
};

/**
 * Copy text to clipboard with fallback
 * @param {string} text - The text to copy
 * @returns {Promise<boolean>}
 */
export const copyToClipboard = async (text) => {
  try {
    // Modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);

    return successful;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
};

/**
 * Copy image to clipboard (useful for pasting in social media)
 * @param {HTMLElement} element - The DOM element to convert
 * @param {Object} options - Optional configuration
 * @returns {Promise<boolean>}
 */
export const copyImageToClipboard = async (element, options = {}) => {
  try {
    if (!navigator.clipboard || !navigator.clipboard.write) {
      console.warn('Clipboard API not supported');
      return false;
    }

    const blob = await elementToBlob(element, options);
    const item = new ClipboardItem({ 'image/png': blob });
    await navigator.clipboard.write([item]);
    
    return true;
  } catch (error) {
    console.error('Error copying image to clipboard:', error);
    return false;
  }
};

/**
 * Generate LinkedIn share caption
 * @param {Object} problemData - Problem information
 * @returns {string} Share caption
 */
export const generateLinkedInCaption = (problemData) => {
  const { title, difficulty, streak, topic, tags } = problemData;
  
  const difficultyEmoji = {
    Easy: '🟢',
    Medium: '🟡',
    Hard: '🔴',
  }[difficulty] || '🔥';

  const hashtags = [
    '#DSA',
    '#DataStructuresAndAlgorithms',
    '#Coding',
    '#PlacementPrep',
    '#CodingInterview',
    '#LeetCode',
    '#DeveloperJourney',
  ];

  // Add topic-specific hashtags
  if (tags && Array.isArray(tags)) {
    tags.slice(0, 3).forEach(tag => {
      const hashtagName = tag.replace(/\s+/g, '');
      hashtags.push(`#${hashtagName}`);
    });
  }

  return `Just solved ${title} ${difficultyEmoji}

${streak ? `${streak} Day Streak 🚀` : '✅ Completed'}
${topic ? `Topic: ${topic}` : ''}

${hashtags.join(' ')}`;
};

/**
 * Generate Twitter/X share caption
 * @param {Object} problemData - Problem information
 * @returns {string} Share caption
 */
export const generateTwitterCaption = (problemData) => {
  const { title, difficulty, streak, topic } = problemData;
  
  const difficultyEmoji = {
    Easy: '🟢',
    Medium: '🟡',
    Hard: '🔴',
  }[difficulty] || '🔥';

  return `${difficultyEmoji} Solved: ${title}
${streak ? `🔥 ${streak} day streak!` : ''}
${topic ? `📚 ${topic}` : ''}

#DSA #Coding #100DaysOfCode`;
};

/**
 * Generate LinkedIn share URL
 * @param {string} caption - The caption to share (optional)
 * @returns {string} LinkedIn share URL
 */
export const generateLinkedInShareURL = (caption = '') => {
  const appUrl = window.location.origin;
  const encodedUrl = encodeURIComponent(appUrl);
  
  // LinkedIn's share URL format
  // Note: LinkedIn may not always use the text parameter
  const baseUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  
  return baseUrl;
};

/**
 * Generate Twitter/X share URL
 * @param {string} caption - The caption to share
 * @returns {string} Twitter share URL
 */
export const generateTwitterShareURL = (caption) => {
  const appUrl = window.location.origin;
  const text = encodeURIComponent(caption);
  const url = encodeURIComponent(appUrl);
  
  return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
};

/**
 * Format date for display
 * @param {Date|string} date - The date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date
 */
export const formatDate = (date, options = {}) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  };
  
  return new Intl.DateTimeFormat('en-US', defaultOptions).format(dateObj);
};

/**
 * Format streak display
 * @param {number} streak - Streak count
 * @returns {string} Formatted streak text
 */
export const formatStreak = (streak) => {
  if (!streak || streak === 0) return 'Start your streak!';
  if (streak === 1) return '1 day streak 🔥';
  return `${streak} days streak 🔥`;
};

/**
 * Debounce function to limit rate of function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Validate filename for safe download
 * @param {string} filename - The filename to validate
 * @returns {string} Safe filename
 */
export const sanitizeFilename = (filename) => {
  // Remove or replace invalid characters
  return filename
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '_')
    .replace(/\s+/g, '_')
    .substring(0, 255); // Max filename length
};

/**
 * Check if device supports Web Share API
 * @returns {boolean}
 */
export const canWebShare = () => {
  return navigator.share !== undefined;
};

/**
 * Share using native Web Share API
 * @param {Object} data - Share data {title, text, url}
 * @returns {Promise<boolean>}
 */
export const nativeShare = async (data) => {
  try {
    if (!canWebShare()) {
      console.warn('Web Share API not supported');
      return false;
    }

    await navigator.share(data);
    return true;
  } catch (error) {
    // User cancelled or share failed
    if (error.name !== 'AbortError') {
      console.error('Error sharing:', error);
    }
    return false;
  }
};

/**
 * Generate a random color from predefined palette
 * @returns {string} Hex color code
 */
export const getRandomColor = () => {
  const colors = [
    '#3B82F6', '#8B5CF6', '#EC4899', '#10B981', 
    '#F59E0B', '#EF4444', '#06B6D4', '#6366F1'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Local storage helpers with error handling
 */
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },
};