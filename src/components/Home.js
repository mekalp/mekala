import {useState,useEffect, Fragment} from "react"
import {allHotels} from "../actions/hotel"
import SmallCard from "../components/cards/SmallCard"
import Search from "../components/forms/Search"

const Home = () => {

const [hotels, SetHotels] = useState([])



useEffect(() => {

    loadAllhotels()
    
}, [])


const loadAllhotels=async()=>{


let res = await allHotels()

SetHotels(res.data)



}








    return (
        

       <Fragment>

       
        

        <div className="container-fluid bg-secondary p-5 text-center">


       <h1>All Hotels</h1>        

        </div>

        <div className="col">
         
         <br/>

       <Search/>


       </div>


      <div className="container-fluid">

<br/>
        
        {/* <pre>{JSON.stringify(hotels,null,4)}</pre> */}


        { hotels.map((h)=><SmallCard key={h._id} h={h}/>)}



      </div>



        </Fragment>

    )
}

export default Home
