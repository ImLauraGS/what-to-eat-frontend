import React, { useState } from 'react';
import Navbar from './Navbar';
import { useUser } from '../context/userContext';

export default function Header() {
    const { user } = useUser();
    const [navbarVisible, setNavbarVisible] = useState(false);

    const toggleNavbar = () => {
        setNavbarVisible(!navbarVisible);
    };

    return (
        <>
            <header className='bg-background-green w-full p-3 flex justify-between items-center shadow-md'>
                <img src="./logo-lg.svg" alt="logo What to Eat" />
                <ul className='flex justify-end gap-2 items-center'>
                    {user && (
                        <li onClick={toggleNavbar}>
                            <img src="/subway_search.svg" alt="Search" />
                        </li>
                    )}
                    <li onClick={toggleNavbar}>
                        <img src="/mingcute_user-4-fill.svg" alt="User" />
                    </li>
                </ul>
            </header>
            {navbarVisible && <Navbar />}
        </>
    );
}
