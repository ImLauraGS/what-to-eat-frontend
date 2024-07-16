import React, {useEffect} from 'react'
import RegisterForm from '../components/RegisterForm';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      navigate('/');
    }
  }, []);

  return (
    <RegisterForm/>
  )
}
