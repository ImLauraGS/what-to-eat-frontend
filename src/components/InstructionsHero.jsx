import React from 'react'

export default function InstructionsHero() {
  return (
    <section className=' bg-bg-dark-green px-5 py-8'>
        <h2 className='text-2xl text-center font-bold'>¿Como funciona?</h2>
        <ul className='flex flex-col gap-5 mt-4'>
            <li className='flex items-center gap-2 text-lg'><span className='font-odor text-6xl font-extrabold text-background-green'>1</span> ¡Registrate!</li>
            <li className='flex items-center gap-2 text-lg'><span className='font-odor text-6xl font-extrabold text-background-green'>2</span> Simplemente selecciona los ingredientes que tienes a mano en el buscador.</li>
            <li className='flex items-center gap-2 text-lg'><span className='font-odor text-6xl font-extrabold text-background-green'>3</span> Elige la receta que más te guste. Puedes guardarla en tus favoritas! </li>
        </ul>
    </section>
  )
}
