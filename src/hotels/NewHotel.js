import React,{Fragment, useState} from 'react'

import {createHotel} from "../actions/hotel"
import {useSelector} from "react-redux"
import { toast } from 'react-toastify'
import HotelCreateForm from "../components/forms/HotelCreateForm"




const NewHotel = () => {

const {auth} = useSelector(state => ({...state}))
const {token}=auth

    ////State management////
    const [values, setValues] = useState({

     title:"",
     content:"",
     location:"",
     image:"",
     price:"",
     from:"",
     to:"",
     bed:"",

})

const[preview,setPreview]= useState("https://via.placeholder.com/100x100.png?text=PREVIEW")

/////Destructuring the keys from the object values////

const {title,content,location,image,price,from,to,bed} = values



//handleSubmit///

const handleSubmit= async (event)=>{

event.preventDefault()

// console.log(values)

let hotelData = new FormData()
hotelData.append("title",title)

hotelData.append("content",content)

hotelData.append("location",location)

hotelData.append("price",price)

image && hotelData.append("image",image)

hotelData.append("from",from)

hotelData.append("to",to)

hotelData.append("bed",bed)


// console.log([...hotelData])

try{

  let res = await createHotel(token,hotelData)

  console.log("HOTEL RESPONSE", res)
  toast.success("new hotel has posted")
  
  setTimeout(()=>{
  
  window.location.reload()
  
  },1000)



}catch(err){

  console.log(err)
  toast.error(err.response.data)


}

}

///HandleImage change////

const handleImageChange=(e)=>{

// console.log(e.target.files[0])

setPreview(URL.createObjectURL(e.target.files[0]))
setValues({...values, image: e.target.files[0]})



}



////HandleChange////


const handleChange=(e)=>{

setValues({...values,[e.target.name]: e.target.value})


}


////Function for Form/////

    return (
        
        <Fragment>

        <div className="container-fluid bg-secondary p-5 text-center">

        <h2>Add hotel</h2>   
   
        </div>


        <div className="container-fluid">
       
        <div className="row">

         <div className="col-md-10">

          <br/>

   <HotelCreateForm                 
   
   values={values}
   setValues={setValues}
   handleChange={handleChange}
   handleImageChange={handleImageChange}
   handleSubmit={handleSubmit}
       
   />

         </div>

         <div className="col-md-2">

         <img src={preview} alt="preview_image" className="img img-fluid m-2"  />
        {JSON.stringify(values)}

         </div>

        </div>


       </div>    

        </Fragment>
    )
}

export default NewHotel


