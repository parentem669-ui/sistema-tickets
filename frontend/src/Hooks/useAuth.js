import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginService, registerService } from '../services/auth.service';

export const useAuth = (type, closeModal, switchType) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });
  const isLogin = type === 'login';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const data = await loginService(formData.email, formData.password);
        
        // Guardamos las credenciales obtenidas
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        
        closeModal();
        
        // Evaluamos el rol devolviendo en minúsculas ('admin' o 'cliente')
        const rol = data.usuario?.rol?.toLowerCase();
        navigate(rol === 'admin' ? '/admin' : '/dashboard');
      } else {
        await registerService(formData.nombre, formData.email, formData.password);
        Swal.fire('¡Éxito!', 'Te has registrado correctamente. Ahora inicia sesión.', 'success');
        switchType('login');
      }
    } catch (error) {
      Swal.fire('Error', error.response?.data?.error || 'Credenciales inválidas o error en el servidor', 'error');
    }
  };

  return {
    formData,
    isLogin,
    handleChange,
    handleSubmit
  };
};