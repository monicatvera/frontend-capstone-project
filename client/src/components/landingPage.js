import React, {useEffect, useState} from 'react'
import Banner from '../assets/restauranfood.jpg'
import Delivery from '../assets/basket .svg'
import Logo2 from '../assets/Asset 20@4x.png'
import Header from './header'
import {NavLink} from 'react-router-dom'

const Main = () => {
    let specials = []
    let [dish, setDish] = useState([])
    let arr = []
    useEffect(() => {
       
        fetch("http://localhost:3001/menu", {
            headers : { 
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            method: 'get',
            mode: 'cors'
        })
        .then(function (response) {
              if (!response.ok) {
                 const error = new Error(response.message)
                  throw error
              } else {
                   return response.json()
                  
                  
              }
              
        })
        .then(dat => {
            specials = dat.specials
            let dishes = dat.dishes
            let res = Object.keys(dishes).filter(e => specials.includes(e)).map(a => dishes[a])
           
            res =Object.values(res).map(e => { 
                            let image = e.image
                            return <div className='section' key={e.name}>
                        
                            <img src={require(`../assets/${image}`)} alt={e.name}/>
                            <div className='dish'><h3>{e.name}  </h3><p className='price'>{e.price}</p></div>
                            <p className='description'>{e.description}</p>
                            </div> })
                          
            arr.push(res)
            setDish(arr)
        })
        .catch((error) => {
                console.log(error)
        })
    }, [])
    
if(dish) return(
    <div className='App'>
       <Header />
        <main>
            <div className='banner'>
                <div className='lemon'>
                    <h1>Little Lemon</h1>
                    <h3>Chicago</h3>
                    <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                    <NavLink to='/book-a-table'><button className='reserve'>Reserve a Table</button></NavLink>
              
            </div>
            <img src={Banner} fetchpriority="high" alt='banner' className={window.innerWidth <= 700 ? 'close' : 'open'}/>
            </div>
            <div className='specials'>
                <h1>This weeks specials!</h1>
                <NavLink to='/menu'><button className='reserve'>Online Menu</button></NavLink>
            </div>
            <div className='columns'>
            {dish}
            </div>
        </main> 
      
        <footer>
            <img src={Logo2} alt='logo'/>
            <div className='copyright'>Copyright Little Lemon</div>
        </footer>
        </div>
        )
}

export default Main       