import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { iniciarSesion } from '../services/auth.service'

import AuthLayout from '../components/AuthLayout'
import AuthForm from '../components/AuthForm'
import FormInput from '../components/FormInput'
import PrimaryButton from '../components/PrimaryButton'
import AuthRedirectText from '../components/AuthRedirectText'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const usuario = await iniciarSesion(email, password)
      
      
      localStorage.setItem('usuario', JSON.stringify(usuario))
      
      
      navigate(usuario.rol === 'admin' || usuario.rol === 'staff' ? '/admin' : '/dashboard')
    } catch (error) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Acceso Denegado', 
        text: 'Correo o contraseña incorrectos.', 
        confirmButtonColor: '#6366f1' 
      })
    }
  }

  return (
    <AuthLayout titulo="Iniciar Sesión">
      
      <AuthForm onSubmit={handleLogin}>
        <FormInput label="Correo Electrónico" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormInput label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <PrimaryButton type="submit">
          Ingresar
        </PrimaryButton>
      </AuthForm>
      
      <AuthRedirectText 
        pregunta="¿No tienes cuenta?" 
        textoEnlace="Regístrate aquí" 
        ruta="/registro" 
      />

    </AuthLayout>
  )
}

export default Login