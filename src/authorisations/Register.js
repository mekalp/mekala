import React, { Fragment, useState } from 'react'
import RegisterForm from "../components/RegisterForm"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {register} from "../actions/auth"

const Register = ({history}) => {

 const [name, setName] = useState("")
 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")


const handleSubmit=async (event)=>{

    event.preventDefault()

// console.log(name,email,password)

 try{

    const {data}= await register({name,email,password})
    console.log(data)
    toast.success("Successfully registered, Please login")
    history.push("/login")

 }catch(error){

   console.log(error)
   if(error.response.status===400)toast.error(error.response.data)

 }

}


    return (
       
        <Fragment>

        <div className="container-fluid p-5 text-center">
            <h1>Register</h1>
        </div>



      <div className="container">

      <div className="row">

       <div className="col-md-6 offset-md-3">

        <RegisterForm handleSubmit={handleSubmit} name={name} email={email} password={password} setName={setName} setEmail={setEmail} setPassword={setPassword}     />

       </div>


      </div>

      </div>












        </Fragment>

    )
}

export default Register
