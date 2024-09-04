import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; 
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/login');
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='nav'>
            <Link to={'/'}><h1>Inventory</h1></Link>
            <div className='nav-part desktop'>
                <Link to={'/QR-generate'}> <h3>Generate QR Code</h3></Link>
                <Link to={'/QR-scan'}> <h3>Scan QR Code</h3></Link>
            </div>
            <div className='nav-part desktop'>
                {isAuthenticated ? (
                    <button onClick={handleLogout} className='btn1'>Logout</button>
                ) : (
                    <>
                        <Link to={'/login'} className='btn'>Sign-in</Link>
                        <Link to={'/register'} className='btn1'>Register</Link>
                    </>
                )}
            </div>
            <div className='mobile-icon' onClick={toggleSidebar}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </div>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className='nav-part'>
                    <Link to={'/QR-generate'} onClick={toggleSidebar}> <h3>Generate QR Code</h3></Link>
                    <Link to={'/QR-scan'} onClick={toggleSidebar}> <h3>Scan QR Code</h3></Link>
                </div>
                <div className='nav-part'>
                    {isAuthenticated ? (
                        <button onClick={() => { handleLogout(); toggleSidebar(); }} className='btn1'>Logout</button>
                    ) : (
                        <>
                            <Link to={'/login'} className='btn' onClick={toggleSidebar}>Sign-in</Link>
                            <Link to={'/register'} className='btn1' onClick={toggleSidebar}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
