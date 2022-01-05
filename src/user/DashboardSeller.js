import React, { Fragment, useState,useEffect } from 'react'
import {Link} from "react-router-dom"
import ConnectNav from '../components/ConnectNav'
import DashboardNav from '../components/DashboardNav'
import {useSelector} from "react-redux"
import {HomeOutlined} from "@ant-design/icons"
import {createConnectAccount} from "../actions/stripe"
import {sellerHotels,deleteHotel} from "../actions/hotel"
import { toast } from 'react-toastify'
import SmallCard from "../components/cards/SmallCard"

const DashboardSeller = () => {

    const {auth}= useSelector(state=>({...state}))

    const [hotels, setHotels] = useState([])
    const [loading, setLoading]= useState(false)


useEffect(() => {
 
loadSellersHotels()

}, [])



const loadSellersHotels = async()=>{

let {data} = await sellerHotels(auth.token)
 setHotels(data)

}









  const handleClick= async ()=>{

    setLoading(true)

    try{

        let res= await createConnectAccount(auth.token)
       console.log(res) ////To get the login link
       window.location.href = res.data;

    }catch(err){

        console.log(err)
        toast.error("stripe connect failed and try again")
        setLoading(false)
    }
     

  }



  const handleHotelDelete = async(hotelId)=>{

   if(!window.confirm("Are you sure")) return
   
     deleteHotel(auth.token,hotelId).then((res)=>{

       toast.success("Hotel Deleted")
       loadSellersHotels()

     })


  }







    return (


        <Fragment>

      <div className="container-fluid bg-secondary p-5"><ConnectNav/></div>
      <div className="container-fluid p-4"><DashboardNav/></div>



      {auth && 
      auth.user && 
      auth.user.stripe_seller &&
      auth.user.stripe_seller.charges_enabled ?
      (<><div className="container-fluid">
      <div className="row">
  
      <div className="col-md-10 p-2">
      <h2>Hotels</h2>
      </div>
  
  
     <div className="col-md-2 p-2">
     <Link to="/hotels/new"  className="btn btn-primary">+ Add New</Link>
     </div>
     </div>

     <div className="row">

     {hotels.map(h => <SmallCard key={h._id} h={h} showViewMoreButton={false} owner={true} handleHotelDelete={handleHotelDelete}/>)}


     </div>



      </div>
  </>):(<><div className="container-fluid">


<div className="row">

<div className="col-md-6 offset-md-3 text-center p-2">

<div className="p-5 pointer">
<HomeOutlined className="h1"/>
 <h4>Setup payouts to post hotel rooms </h4>
<p className="lead">MERN partners with stripe to transfer earnings to your bank account</p>
<button disabled={loading}   onClick={handleClick} className="btn btn-primary mb-3">{loading ? "processing..." : "setup Payouts"}</button>
<p className="text-muted"><small>You'll be redirected to the stripe for onboarding process</small></p>
</div>

</div>


</div>

</div></>)
      
      }


 {/* <pre>{JSON.stringify(auth,null,4)}</pre> */}

     

    
    </Fragment>

    )
}

export default DashboardSeller
