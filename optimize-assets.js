const fs = require('fs');
const path = require('path');

// Asset optimization script
console.log('🎨 Optimizing Flodhästen assets...');

const publicDir = path.join(__dirname, 'public');

// List of files to optimize
const filesToOptimize = [
  {
    name: 'animated_hippo.gif',
    currentSize: 1044095, // ~1MB
    targetSize: 200000, // ~200KB
    description: 'Animated hippo GIF - needs compression or conversion to WebP'
  },
  {
    name: 'intro-video.mp4',
    currentSize: 1023310, // ~1MB
    targetSize: 500000, // ~500KB
    description: 'Intro video - needs compression'
  }
];

console.log('\n📊 Current Asset Analysis:');
filesToOptimize.forEach(file => {
  const filePath = path.join(publicDir, file.name);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const sizeKB = Math.round(stats.size / 1024);
    const targetKB = Math.round(file.targetSize / 1024);
    console.log(`\n📁 ${file.name}:`);
    console.log(`   Current: ${sizeKB}KB`);
    console.log(`   Target: ${targetKB}KB`);
    console.log(`   Savings: ${Math.round((stats.size - file.targetSize) / 1024)}KB`);
    console.log(`   📝 ${file.description}`);
  }
});

console.log('\n🚀 Optimization Recommendations:');
console.log('1. Convert animated_hippo.gif to WebP format');
console.log('2. Compress intro-video.mp4 with ffmpeg');
console.log('3. Implement lazy loading for video');
console.log('4. Add preload hints for critical assets');

console.log('\n📋 Manual Optimization Steps:');
console.log('1. Install ffmpeg: brew install ffmpeg');
console.log('2. Compress video: ffmpeg -i intro-video.mp4 -c:v libx264 -crf 28 intro-video-compressed.mp4');
console.log('3. Convert GIF to WebP: Use online converter or ImageMagick');
console.log('4. Update component references to use optimized assets');

console.log('\n✅ Performance Impact:');
console.log('- Bundle size reduction: ~1.5MB');
console.log('- Faster initial load time');
console.log('- Better Core Web Vitals scores');
console.log('- Improved mobile performance'); 