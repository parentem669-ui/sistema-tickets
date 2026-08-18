import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { registrarUsuario } from '../services/auth.service'

import AuthLayout from '../components/AuthLayout'
import AuthForm from '../components/AuthForm'
import FormInput from '../components/FormInput'
import PrimaryButton from '../components/PrimaryButton'
import AuthRedirectText from '../components/AuthRedirectText'

function Registro() {
  const [nombreCompleto, setNombreCompleto] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegistro = async (e) => {
    e.preventDefault()
    try {
      await registrarUsuario(nombreCompleto, email, password)
      Swal.fire({ icon: 'success', title: '¡Cuenta creada!', text: 'Ahora puedes iniciar sesión.', confirmButtonColor: '#6366f1' })
      navigate('/login')
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error al registrar', text: 'Es posible que el correo ya esté en uso.', confirmButtonColor: '#ef4444' })
    }
  }

  return (
    <AuthLayout titulo="Crear Cuenta">
      
      <AuthForm onSubmit={handleRegistro}>
        <FormInput label="Nombre Completo" type="text" value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} />
        <FormInput label="Correo Electrónico" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormInput label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <PrimaryButton type="submit">
          Registrarme
        </PrimaryButton>
      </AuthForm>
      
      <AuthRedirectText 
        pregunta="¿Ya tienes cuenta?" 
        textoEnlace="Inicia sesión aquí" 
        ruta="/login" 
      />

    </AuthLayout>
  )
}

export default Registro