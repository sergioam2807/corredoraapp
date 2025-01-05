import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? '', 'public/uploads')

export const POST = async (req: NextRequest) => {
  const formData = await req.formData()
  const files = formData.getAll('file') as File[]

  if (files.length > 0) {
    const urls = []

    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true })
    }

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const filePath = path.resolve(UPLOAD_DIR, file.name)
      fs.writeFileSync(
        filePath,
        buffer as unknown as string | NodeJS.ArrayBufferView
      )
      urls.push(`/uploads/${file.name}`)
    }

    return NextResponse.json({
      success: true,
      urls,
    })
  } else {
    return NextResponse.json({
      success: false,
    })
  }
}
