import { NavLink} from "react-router-dom"
const Navigation = () => {
    return (
        <> 
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/menu'>Menu</NavLink>
            <NavLink id='book-a-table' to='/book-a-table' >Reservations</NavLink>
            <NavLink to='/about'>About</NavLink>
        </> 
    )
}

export default Navigation