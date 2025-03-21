import { NextResponse } from 'next/server'
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

const bucketName: string = process.env.GCP_BUCKET_NAME || ''

if (!bucketName) {
  throw new Error('GCP_BUCKET_NAME environment variable is not set')
}

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: '20mb',
//     },
//   },
// }

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const fileType = searchParams.get('fileType') // ej: image/png

    if (!fileType) {
      return NextResponse.json(
        { error: 'No fileType provided' },
        { status: 400 }
      )
    }

    const fileName = `${uuidv4()}.${fileType.split('/')[1]}`
    const bucket = storage.bucket(bucketName)
    const file = bucket.file(fileName)

    const [url] = await file.getSignedUrl({
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutos
      contentType: fileType,
    })

    return NextResponse.json({ url, fileName })
  } catch (error) {
    console.error('Error generating signed URL:', error)

    return NextResponse.json(
      { error: 'Failed to generate signed URL' },
      { status: 500 }
    )
  }
}
