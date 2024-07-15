import React, { useState } from 'react';
import Navbar from './Navbar';
import { useUser } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const { user } = useUser();
    const navigate = useNavigate();
    const [navbarVisible, setNavbarVisible] = useState(false);

    const toggleNavbar = () => {
        setNavbarVisible(!navbarVisible);
    };

    const handleButtonClick = () => {
          navigate('/search') 
    };

    return (
        <>
            <header className='bg-background-green w-full p-3 flex justify-between items-center shadow-md'>
                <a href="/"><img src="./logo-lg.svg" alt="logo What to Eat" /></a>
                <ul className='flex justify-end gap-2 items-center'>
                    {user && (
                        <li onClick={handleButtonClick}>
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
