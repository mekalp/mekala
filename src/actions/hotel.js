import axios from "axios"


export const createHotel = async (token , data) => await axios.post("http://localhost:5000/api/create-hotel",data,{

headers:{

Authorization : `Bearer ${token}`,


},


})


export const allHotels=async()=> await axios.get("http://localhost:5000/api/hotels")




export const diffDays=(from,to)=>{

const day = 24 * 60* 60 * 1000

// milliseconds= hours x minutes x seconds x 1000

const start = new Date (from)
const end = new Date (to)

const difference = Math.round(Math.abs((start - end)/day))
return difference

}


export const sellerHotels = async(token)=> await axios.get("http://localhost:5000/api/seller-hotels",{

headers:{


Authorization : `Bearer ${token}`


}


})


export const deleteHotel = async(token,hotelId)=> await axios.delete(`http://localhost:5000/api/delete-hotel/${hotelId}`,{

headers:{

Authorization:`Bearer ${token}`


}




})


export const read = async(hotelId)=> await axios.get(`http://localhost:5000/api/hotel/${hotelId}`)



export const updateHotel = async (token , data, hotelId) => await axios.put(`http://localhost:5000/api/update-hotel/${hotelId}`,data,{

headers:{

Authorization : `Bearer ${token}`,


},


})



export const userHotelBookings = async(token)=> await axios.get("http://localhost:5000/api/user-hotel-bookings",{

headers:{


Authorization:`Bearer ${token}`


}


})



export const isAlreadyBooked = async(token,hotelId)=> await axios.get(`http://localhost:5000/api/is-already-booked/${hotelId}`,{


headers:{


Authorization:`Bearer ${token}`



}



})




export const searchListings = async(query)=> await axios.post("http://localhost:5000/search-listings",query)