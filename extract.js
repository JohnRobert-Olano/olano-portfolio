const ffmpeg = require('ffmpeg-static');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const inputVideo = path.join(__dirname, 'public', 'Smartphone_components_expanding_…_202605182141.mp4');
const outputDir = path.join(__dirname, 'public', 'sequence-optitrace');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Using ffmpeg at: ${ffmpeg}`);
console.log(`Extracting from: ${inputVideo}`);
console.log(`To directory: ${outputDir}`);

try {
  // Extract to .webp at 30fps. Ultra HD means no scaling and higher quality
  execFileSync(ffmpeg, [
    '-i', inputVideo,
    '-vf', 'fps=30', // Extract at 30fps, no scale filter to keep original Ultra HD resolution
    '-c:v', 'libwebp',
    '-quality', '100', // Max quality for webp
    path.join(outputDir, '%04d.webp')
  ], { stdio: 'inherit' });
  
  console.log("Extraction completed successfully!");
} catch (e) {
  console.error("Error during extraction:", e.message);
}
