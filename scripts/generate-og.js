import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const svgPath = path.join(__dirname, '..', 'public', 'images', 'og-image.svg')
const outPath = path.join(__dirname, '..', 'public', 'images', 'og-image.png')

async function main() {
    if (!fs.existsSync(svgPath)) {
        console.error('SVG source not found:', svgPath)
        process.exit(1)
    }

    try {
        await sharp(svgPath)
            .resize(1200, 630, { fit: 'cover' })
            .png({ quality: 90 })
            .toFile(outPath)
        console.log('Generated', outPath)
    } catch (err) {
        console.error('Failed to generate PNG:', err)
        process.exit(1)
    }
}

main()
