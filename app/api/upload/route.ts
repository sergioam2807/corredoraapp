import { NextRequest, NextResponse } from 'next/server'
import { Storage } from '@google-cloud/storage'
import { v4 as uuidv4 } from 'uuid'

const serviceAccount = {
  type: process.env.GCP_TYPE,
  project_id: process.env.GCP_PROJECT_ID,
  private_key_id: process.env.GCP_PRIVATE_KEY_ID,
  private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.GCP_CLIENT_EMAIL,
  client_id: process.env.GCP_CLIENT_ID,
  auth_uri: process.env.GCP_AUTH_URI,
  token_uri: process.env.GCP_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GCP_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.GCP_CLIENT_X509_CERT_URL,
}

const storage = new Storage({
  credentials: serviceAccount,
})

const bucketName = process.env.GCP_BUCKET_NAME

if (!bucketName) {
  throw new Error('GCP_BUCKET_NAME environment variable is not set')
}

const bucket = storage.bucket(bucketName)

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: '50mb',
//     },
//   },
// }

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData()
    const files = formData.getAll('file') as File[]

    if (files.length > 0) {
      const urls: string[] = []

      const uploadPromises = files.map(async (file) => {
        console.log(
          'Processing file:',
          file.name,
          'Size:',
          file.size,
          'Type:',
          file.type
        )

        if (file.size > 10 * 1024 * 1024) {
          // 10 MB
          throw new Error(`File ${file.name} exceeds the size limit of 10MB`)
        }

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        if (!buffer || buffer.length === 0) {
          throw new Error(`Failed to generate buffer for file: ${file.name}`)
        }

        const fileName = `${uuidv4()}-${file.name}`
        const blob = bucket.file(fileName)
        const blobStream = blob.createWriteStream({
          resumable: true,
          gzip: true,
          contentType: file.type,
        })

        return new Promise<void>((resolve, reject) => {
          blobStream.on('error', (err) => {
            console.error('Stream error:', err)
            reject(new Error(`Stream error: ${err.message}`))
          })

          blobStream.on('finish', () => {
            console.log('File uploaded successfully:', blob.name)
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`

            urls.push(publicUrl)
            resolve()
          })

          try {
            blobStream.end(buffer)
          } catch (err) {
            console.error('Error al finalizar el stream:', err)
            reject(new Error('Error al finalizar el stream'))
          }
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
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
