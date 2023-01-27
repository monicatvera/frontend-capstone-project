import React, {useEffect, useState} from 'react'
import Logo from '../assets/Logo.svg'
import { NavLink, Link, useLocation } from "react-router-dom"
import Hamburger from '../assets/icon _hamburger menu.svg'
const Header = () => {
    const [position, setPosition] = useState(window.pageYOffset)
    const [visible, setVisible] = useState(true) 
    const [hs, setHs] = useState('close') 
    useEffect(()=> {
       const handleScroll = () => {
       let moving = window.pageYOffset
 
       setVisible(position > moving);
       setPosition(moving)
        };
        window.addEventListener("scroll", handleScroll);
        return(() => {
           window.removeEventListener("scroll", handleScroll);
        })
    })
  
    const cls = visible ? "visible" : "hidden";
return(
        <header className={cls}>
            <nav>
                <Link to='/'><img src={Logo} fetchpriority="high" alt='logo' className='topLogo'/></Link>
                 {window.innerWidth <= 700 ?<> <img src={Hamburger} onClick={() => hs === 'close' ? setHs('open') : setHs('close')}/> <div className={hs}> 
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/menu'>Menu</NavLink>
                    <NavLink id='book-a-table' to='/book-a-table' >Reservations</NavLink>
                    <NavLink to='/about'>About</NavLink>
                    </div></> :
                <> 
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/menu'>Menu</NavLink>
                    <NavLink id='book-a-table' to='/book-a-table' >Reservations</NavLink>
                    <NavLink to='/about'>About</NavLink>
                    </>
               }
            </nav>
        </header>
        )
}

export default Header       