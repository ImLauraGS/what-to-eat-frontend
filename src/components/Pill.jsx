import React from 'react'

export default function Pill({text}) {
    text = 'pollo'

  return (
    <>
    <label className='flex items-center justify-center text-center border-4 border-bg-dark-green rounded-2xl p-2' htmlFor="">
        {text}
        <input className='appearance-none checked:bg-blue-500' type='radio'/>
    </label>
    
    </>
    
  )
}
