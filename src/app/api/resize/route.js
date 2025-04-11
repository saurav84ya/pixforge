import { NextResponse } from 'next/server'
import sharp from 'sharp'

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get('image')
    const width = parseInt(formData.get('width'))
    const height = parseInt(formData.get('height'))
    const quality = parseInt(formData.get('quality')) || 70

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    let image = sharp(buffer)

    // Resize only if width or height provided
    if (width || height) {
      image = image.resize({
        width: width || null,
        height: height || null,
      })
    }

    const processedImage = await image
      .jpeg({ quality })
      .toBuffer()

    return new NextResponse(processedImage, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': 'attachment; filename=resized.jpg',
      },
    })
  } catch (err) {
    console.error('Sharp resize error:', err)
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}
