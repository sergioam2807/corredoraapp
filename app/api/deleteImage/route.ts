import { NextRequest, NextResponse } from 'next/server'
import { Storage } from '@google-cloud/storage'

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GCP_KEY_FILE,
})

const bucketName = process.env.GCP_BUCKET_NAME

if (!bucketName) {
  throw new Error('GCP_BUCKET_NAME environment variable is not set')
}

const bucket = storage.bucket(bucketName)

export const POST = async (req: NextRequest) => {
  const { fileName } = await req.json()

  if (fileName) {
    const file = bucket.file(fileName)

    try {
      await file.delete()

      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('Error deleting file:', error)

      return NextResponse.json({ success: false, error: 'Error deleting file' })
    }
  } else {
    return NextResponse.json({ success: false, error: 'No file name provided' })
  }
}
