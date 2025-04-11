import { NextResponse } from 'next/server'
import sharp from 'sharp'

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get('image')
    const quality = parseInt(formData.get('quality')) || 70

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    console.log("quality",quality)

    const processedImage = await sharp(buffer)
    //   .resize({ width: 500 }) // Optional: remove if you want original size
      .jpeg({ quality})      // 👈 Use frontend quality
      .toBuffer()

    return new NextResponse(processedImage, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': 'attachment; filename=compressed.jpg',
      },
    })
  } catch (err) {
    console.error('Sharp error:', err)
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}
