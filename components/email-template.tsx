import * as React from 'react'

interface EmailTemplateProps {
  firstName: string
  correo: string
  telefono: string
  mensaje: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  correo,
  telefono,
  mensaje,
}) => (
  <div
    style={{
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6',
      color: '#333',
    }}
  >
    <div
      style={{
        backgroundColor: '#f8f8f8',
        padding: '20px',
        borderRadius: '8px',
      }}
    >
      <h1>Hola Lorena, {firstName} intenta contactarse contigo!👌</h1>
      <p>Los datos del cliente son:</p>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={{ padding: '8px', border: '1px solid #ddd' }}>
              <strong>Email:</strong>
            </td>
            <td style={{ padding: '8px', border: '1px solid #ddd' }}>
              {correo}
            </td>
          </tr>
          <tr>
            <td style={{ padding: '8px', border: '1px solid #ddd' }}>
              <strong>Teléfono:</strong>
            </td>
            <td style={{ padding: '8px', border: '1px solid #ddd' }}>
              {telefono}
            </td>
          </tr>
          <tr>
            <td style={{ padding: '8px', border: '1px solid #ddd' }}>
              <strong>Mensaje:</strong>
            </td>
            <td style={{ padding: '8px', border: '1px solid #ddd' }}>
              {mensaje}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)
