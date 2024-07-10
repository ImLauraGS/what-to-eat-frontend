import React from 'react'

export default function Footer() {
  return (
    <footer className='bottom-0 w-full bg-background-green flex flex-col items-center gap-5 p-5 mt-5'>
        <img src="/logo-sm.svg" alt="" />
        <ul className='flex items-center justify-center gap-2'>
            <li><a href="#"><img src="/wa.svg" alt="whatsapp icon" /></a></li>
            <li><a href="#"><img src="/mdi_instagram.svg" alt="" /></a></li>
            <li><a href="#"><img src="/tiktok.svg" alt="" /></a></li>
            <li><a href="#"><img src="/mdi_instagram.svg" alt=""/></a></li>
        </ul>
        <ul className='flex flex-col items-center justify-center'>
            <li><a href="">Contactos</a></li>
            <li><a href="">F.A.Q</a></li>
            <li><a href="">Términos del Servicio</a></li>
        </ul>
    </footer>
  )
}
