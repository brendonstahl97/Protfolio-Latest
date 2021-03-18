import React, { useState } from 'react'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

export default function CustomNavbar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar expand="md" className='text-white'>
                <NavbarBrand className='mr-4' href="/">Brendon Stahl</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink href="/">About Me</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/projects">Projects</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/contact">Contact Me</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 100 1440 180">

                <path fill="#0099ff" fillOpacity="1"
                    d="M0,128L48,160C96,192,192,256,288,256C384,256,480,192,576,154.7C672,117,768,107,864,117.3C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z">
                </path>
            </svg>
        </div>
    )
}
