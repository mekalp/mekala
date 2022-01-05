import React, { Fragment,useState,useEffect } from 'react'
import {Link} from "react-router-dom"
import ConnectNav from '../components/ConnectNav'
import DashboardNav from '../components/DashboardNav'
import {userHotelBookings} from "../actions/hotel"
import {useSelector} from "react-redux"
import BookingCard from "../components/cards/BookingCard"



const Dashboard = () => {

const {auth: {token}} = useSelector(state=>({...state}))

const [booking, setBooking] = useState([])


useEffect(() => {
  
loadUserBookings()


}, [])



const loadUserBookings = async()=>{

const res = await userHotelBookings(token)
console.log(res)

setBooking(res.data)



}









    return (
        <Fragment>

      <div className="container-fluid bg-secondary p-5">

        <ConnectNav/>

<div className="container-fluid p-4"><DashboardNav/></div>


      </div>

     <div className="container-fluid">

      <div className="row p-2">
 
       <div className="col-md-10">

        <h2>Bookings</h2>

       </div>

       <div className="col-md-2">

       <Link className="btn btn-primary" to="/">Browse Hotels</Link>

       </div>

      </div>

<div className="row">

 {booking.map(b=> (

<BookingCard key={b._id} hotel={b.hotel} session={b.session} orderedBy={b.orderedBy} />

 ))}

</div>

     </div>


            
        </Fragment>
    )
}

export default Dashboard
