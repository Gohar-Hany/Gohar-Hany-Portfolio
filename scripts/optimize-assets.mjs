import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.resolve(__dirname, '../public');

async function optimizeImages(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await optimizeImages(filePath);
    } else if (file.match(/\.(png|jpe?g)$/i)) {
      const isHero = file.toLowerCase() === 'hero.jpg';
      const ext = path.extname(file);
      const outputName = file.replace(new RegExp(`${ext}$`), '.webp');
      const outputPath = path.join(dir, outputName);
      
      console.log(`Optimizing: ${file}...`);
      
      try {
        let pipeline = sharp(filePath);
        
        // Resize Hero image which is huge (6.5MB)
        if (isHero) {
          pipeline = pipeline.resize(1920, null, {
            withoutEnlargement: true,
            fit: 'inside'
          });
        }
        
        await pipeline
          .webp({ quality: 80, effort: 6 })
          .toFile(outputPath);
          
        const oldSize = (stat.size / 1024).toFixed(2);
        const newSize = (fs.statSync(outputPath).size / 1024).toFixed(2);
        console.log(`✅ ${file}: ${oldSize}KB -> ${newSize}KB. Saved to ${outputName}`);
        
        // Delete original file to save space and ensure we use the webp
        fs.unlinkSync(filePath);
        console.log(`🗑️ Deleted original ${file}`);
        
      } catch (err) {
        console.error(`❌ Error optimizing ${file}:`, err);
      }
    }
  }
}

console.log('Starting image optimization...');
optimizeImages(PUBLIC_DIR).then(() => console.log('Optimization complete!'));
