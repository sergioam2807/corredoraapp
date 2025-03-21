import { NextRequest, NextResponse } from 'next/server'
import { Storage } from '@google-cloud/storage'
import { v4 as uuidv4 } from 'uuid'

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    type: process.env.GCP_TYPE,
    project_id: process.env.GCP_PROJECT_ID,
    private_key_id: process.env.GCP_PRIVATE_KEY_ID,
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.GCP_CLIENT_EMAIL,
    client_id: process.env.GCP_CLIENT_ID,
    token_url: process.env.GCP_TOKEN_URI,
    universe_domain: process.env.GCP_UNIVERSE_DOMAIN,
  },
})

const bucketName = process.env.GCP_BUCKET_NAME

if (!bucketName) {
  throw new Error('GCP_BUCKET_NAME environment variable is not set')
}

const bucket = storage.bucket(bucketName)

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
}

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData()
    const files = formData.getAll('file') as File[]

    if (files.length > 0) {
      const urls: string[] = []

      const uploadPromises = files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const fileName = `${uuidv4()}-${file.name}`
        const blob = bucket.file(fileName)
        const blobStream = blob.createWriteStream({
          resumable: false,
        })

        return new Promise<void>((resolve, reject) => {
          blobStream.on('error', (err) => {
            console.error('Stream error:', err)
            reject(err)
          })

          blobStream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`

            urls.push(publicUrl)
            resolve()
          })

          blobStream.end(buffer)
        })
      })

      await Promise.all(uploadPromises)

      return NextResponse.json({
        success: true,
        urls,
      })
    } else {
      return NextResponse.json({
        success: false,
        error: 'No files uploaded',
      })
    }
  } catch (error) {
    console.error('Error in POST handler:', error)

    return NextResponse.json({
      success: false,
      error: 'Error processing request',
    })
  }
}
