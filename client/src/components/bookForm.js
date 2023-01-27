import Flatpickr from 'react-flatpickr'
import {useEffect, useState, useRef} from 'react'

import Header from './header'
require("flatpickr/dist/themes/material_green.css")
const BookForm = () => {
    const selectGuests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((a) => <option value={a} key={a}>{a}</option>)
    const [booking, setBooking]=useState({date:new Date().toLocaleString('en-GB', { year: "numeric", month: "long", day: "numeric"}), from:"14:00", to:"16:00", guests: 1, name:''})
    const[available, setAvailable] = useState(true)
    const[disabled, setDisabled] = useState(false)
    
    let refTo = useRef("16:00")
    let refFrom = useRef()
    const date = booking.date
    const [alertMessage, setAlertMessage] = useState('hide')
     const [confirmation, setConfirmation] = useState('hide')
     useEffect(() => {
         setAlertMessage('hide') 
         setConfirmation('hide')
         setAvailable(true)
         setDisabled(false)
         fetch("http://localhost:3001/api", {
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
        .then(data => {
            if(data.booked[booking.date]) {
                const booked = data.booked[booking.date]
                let hours = booked.map(e => booking.from >= e[1] && booking.to <= e[2] ? e[0] :
                                              booking.from <= e[1] && booking.to >= e[2] ? e[0] : 
                                              booking.from < e[2] ? e[0] :'')
                hours = hours.reduce((a, b) => +a + +b, +booking.guests)
                if(hours >= 50)  { 
                    setAvailable(false)
                    setDisabled(true)
                    setAlertMessage('show')
                }
            }
        })
        .catch((error) => {
                console.log(error)
        })
      
     }, [booking])
    
    function handleBooking() {
       
        if(available) {
            
            fetch("http://localhost:3001/api", {
            headers : { 
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(booking)
            })
            .then(function (response) {
                  if (!response.ok) {
                     const error = new Error(response.message)
                      throw error
                  } else {
                      
                  }
                  
            })
            
            .catch((error) => {
                    console.log(error)
            })
            
           
        }
    
  }
    function updateTo() {
    refTo.current.flatpickr.setDate(booking.to)
    }
return(
    <form method="post" onSubmit={(e) => e.preventDefault()}  className='reservation'>    
        <div className='time'>
        <div>
        <label htmlFor='date'> 
            
            <Flatpickr
                name='date'
                placeholder= 'Select Date'
                className='form-control flat-picker bg-transparent border-0 shadow-none'
                options={{
                    inline:true,
                    minDate: 'today',
                    defaultDate: 'today',
                    dateFormat: "d-m-Y",
                    onChange: (selectedDates) => {
                        booking.date=new Date(selectedDates[0]).toLocaleString('en-GB', { year: "numeric", month: "long", day: "numeric"})
                        setBooking({...booking, date: booking.date})

                    }
                }}
                
                style={{textIndent: '15px' }}
                 />
            </label>
            </div>
            <div>
            <label htmlFor='from'> 
                <Flatpickr
                    name= 'from'
                    placeholder= 'From'
                   // className='form-control flat-picker bg-transparent border-0 shadow-none'
                    options={{
                        inline:true,
                        noCalendar: true,
                        enableTime: true,
                        time_24hr: true,
                        minDate: "14:00",
                        maxDate: "20:00",
                        
                        selectedDates: [booking.from],
                        onChange: (selectedDates) => {
                            booking.from = new Date(selectedDates[0]).toTimeString().slice(0,5)
                            booking.to = `${+booking.from.slice(0,2) + +2}:${booking.from.slice(3)}`
                            refTo.current.flatpickr.set('minDate', `${+booking.from.slice(0,2) + +2}:${booking.from.slice(3)}`)
                            updateTo()
                            
                            setBooking({...booking, from: booking.from})      
                           
                        },
                        
                    }}
                   ref = {refFrom}
                 />
            </label>
             
            <label htmlFor='to'> 
                <Flatpickr
                    name= 'to'
                    placeholder= 'To'
                   // className='form-control flat-picker bg-transparent border-0 shadow-none'
                    options={{
                        inline:true,
                        noCalendar: true,
                        enableTime: true,
                        time_24hr: true,
                        selectedDates: [ booking.to],
                        minDate:  "16:00",
                        maxDate: "22:00",
                        onChange: (selectedDates) => {
                            booking.to=new Date(selectedDates[0]).toTimeString().slice(0,5)
                            setBooking({...booking, to: booking.to})
                        }
                    }}
                    ref = {refTo}
                     />
            </label>
            </div></div> 
            <div className='time'>
            <label htmlFor="guests">
                   Number of guests
                <select name='guests' onChange={e => setBooking({...booking, guests: e.target.value})} className='input'>
                   {selectGuests}
                </select>
            </label>
           
            <label htmlFor='name'>Full Name
                <input required name='name' onChange={e => setBooking({...booking, name: e.target.value})} className='input'/>
            </label>
            </div>
            <div style={{'display' : 'flex'}}>
                <button className="confirm" type="submit" onClick={() => setConfirmation('show')} disabled = {disabled}>
                            Reserve
                </button>
                
                <div className={`${alertMessage} + alert`}> Sorry, not available at selected time</div>
            </div>
           {booking.name.length ?  <div className={`${confirmation} + confirmation`}> 
                Reserve a table at Little Lemon<br/> <br/>{booking.date} From {booking.from} to {booking.to}<br/><br/>Number of guests: {booking.guests}<br/><br/> Name: {booking.name} 
                    <button className='confirm' type="submit" onClick={() => (handleBooking(), setConfirmation('hide'))} disabled = {disabled}>
                            Confirm
                    </button> 
                    <button className='confirm red' onClick={() => setConfirmation('hide')}>
                            Cancel
                    </button>
                     </div>
                    : ''}
               
    </form>
    )
}

export default BookForm       