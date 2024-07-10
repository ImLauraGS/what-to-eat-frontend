import React from 'react'
import Navbar from './Navbar'

export default function Header() {
  return (
    <>
    <header className='bg-background-green w-full p-3 flex justify-between items-center shadow-md'>
        <img src="./logo-lg.svg" alt="logo What to Eat" />
            <ul className='flex justify-end gap-2 items-center'>
                <li><img src="/subway_search.svg" alt="" /></li>
                <li><img src="/mingcute_user-4-fill.svg" alt="" /></li>
            </ul>
    </header>
    <Navbar/>
    </>
  )
}
