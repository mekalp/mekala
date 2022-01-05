import React, { Fragment, useState } from 'react'
// import { toast } from 'react-toastify'
import {login} from "../actions/auth"
import LoginForm from '../components/LoginForm'
import {useDispatch} from "react-redux"



const Login = ({history}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


const dispatch = useDispatch()


    const handleSubmit=async (event)=>{

        event.preventDefault()
    
    console.log("SEND LOGIN DATA",{email,password})
    
   try{

     let res = await login({email,password})
     console.log(" LOGIN RESPONSE", res)
     if(res.data){
 
        console.log("SAVE USER IN REDUX AND LOCAL STORAGE THEN REDIRECT ===>")

     }

    //  console.log(res.data)


   ///Saving user data and token in local storage////

   window.localStorage.setItem("auth",JSON.stringify(res.data))

////Savint the user data and token in Redux/////

dispatch({

    type:"LOGGED_IN_USER",
    payload:res.data,


})

///Once user logins, We direct the user to dashboard page////
history.push("/dashboard")



   }catch(err){

  console.log(err)
//  if(err.response.status===400) toast.error(err.reponse.data)

   }



     
    
    }
    

    return (

  <Fragment>


        <div className="container-fluid p-5 text-center">
            <h1>Login</h1>
        </div>


    <div className="container">

    <div className="row">

    
    <div className="col-md-6 offset-md-3">

       
     <LoginForm handleSubmit={handleSubmit} email={email} password={password} setEmail={setEmail} setPassword={setPassword}/>

    </div>

    </div>

    </div>





        </Fragment>
    )
}

export default Login
