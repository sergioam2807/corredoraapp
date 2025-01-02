import { EmailTemplate } from '@/components/email-template'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const userName = process.env.NEXT_PUBLIC_RECIPIENT_NAME
export async function POST(request: Request) {
  try {
    const formData = await request.json()

    const { data, error } = await resend.emails.send({
      from: 'Lorenasoto.cl<onboarding@resend.dev>',
      to: ['sergioam2807@gmail.com'],
      subject: `Hola ${userName}! ${formData.nombre} intenta contactarte`,
      react: EmailTemplate({
        firstName: formData.nombre,
        correo: formData.correo,
        telefono: formData.telefono,
        mensaje: formData.mensaje,
      }),
    })

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message || 'Error desconocido' }),
        { status: 500 }
      )
    }
    return new Response(
      JSON.stringify({ success: 'Correo enviado exitosamente!', data }),
      { status: 200 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Hubo un error al intentar enviar el correo.' }),
      { status: 500 }
    )
  }
}
