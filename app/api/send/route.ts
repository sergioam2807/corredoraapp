import { EmailTemplate } from '@/components/email-template'
import { Resend } from 'resend'

const resend = new Resend('re_HBAYjstV_MDdYJ74eY3FHezafdKg9U8Q5')

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['sergioam2807@gmail.com'],
      subject: 'Enviado desde nextjs a mi mail mendiante resend',
      react: EmailTemplate({ firstName: 'Sergio' }),
    })

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message || 'Error desconocido' }),
        { status: 500 }
      )
    }

    // Devolver los datos de manera que el cliente pueda manejarlos
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
