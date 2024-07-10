import React from 'react'

export default function ButtonCustom({text, onClick, type}) {
  return (
    <button onClick={onClick} type={type} className='bg-green-btn text-[#FFFF] px-5 py-1 text-xl font-medium rounded-lg'>
        {text}
    </button>
  )
}
