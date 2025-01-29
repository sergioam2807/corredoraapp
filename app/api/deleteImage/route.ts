import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? '', 'public/uploads')

export const POST = async (req: NextRequest) => {
  const { fileName } = await req.json()

  if (fileName) {
    const filePath = path.resolve(UPLOAD_DIR, fileName)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: 'File not found' })
    }
  } else {
    return NextResponse.json({ success: false, error: 'No file name provided' })
  }
}
