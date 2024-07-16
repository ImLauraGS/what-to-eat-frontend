import React, {useEffect} from 'react'
import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      navigate('/');
    }
  }, []);

  return (
    <div><LoginForm/></div>
  )
}
