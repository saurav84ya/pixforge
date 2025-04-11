import { NextResponse } from 'next/server'
import sharp from 'sharp'

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get('image')
    const convertTo = formData.get('convertTo') || 'jpeg'

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const image = sharp(buffer)

    let outputBuffer
    let mimeType = 'image/jpeg'
    let filename = `converted.${convertTo}`

    switch (convertTo) {
      case 'png':
        outputBuffer = await image.png().toBuffer()
        mimeType = 'image/png'
        break
      case 'webp':
        outputBuffer = await image.webp().toBuffer()
        mimeType = 'image/webp'
        break
      case 'avif':
        outputBuffer = await image.avif().toBuffer()
        mimeType = 'image/avif'
        break
      case 'tiff':
        outputBuffer = await image.tiff().toBuffer()
        mimeType = 'image/tiff'
        break
      default:
        outputBuffer = await image.jpeg().toBuffer()
        mimeType = 'image/jpeg'
    }

    return new NextResponse(outputBuffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (err) {
    console.error('Conversion error:', err)
    return NextResponse.json({ error: 'Conversion failed' }, { status: 500 })
  }
}
