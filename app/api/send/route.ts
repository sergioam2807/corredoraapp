import { EmailTemplate } from '@/components/email-template'
import { Resend } from 'resend'

const resend = new Resend('re_HBAYjstV_MDdYJ74eY3FHezafdKg9U8Q5')

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    const { data, error } = await resend.emails.send({
      from: 'LorenaSoto.cl<onboarding@resend.dev>',
      to: ['sergioam2807@gmail.com'],
      subject: `Hola Lorena ${formData.nombre} intenta contactarte`,
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
