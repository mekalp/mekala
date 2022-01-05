import React from 'react'

const RegisterForm = ({handleSubmit,name,email,password,setEmail,setName,setPassword}) => {


    return (

        <form onSubmit={handleSubmit}>

    
    <div className="form-group">
    

    <label className="form-label">Name: </label>
    <input type="text" className="form-control" value={name} placeholder="Enter your name" onChange={(e)=>setName(e.target.value)} />

    </div>

    <div className="form-group">
    

    <label className="form-label">Email: </label>
    <input type="email" className="form-control" value={email} placeholder="name@example.com" onChange={(e)=>setEmail(e.target.value)} />

    </div>


    <div className="form-group">
    
    <label className="form-label">Password: </label>
    <input type="password" className="form-control" value={password} placeholder="enter your password" onChange={(e)=>setPassword(e.target.value)} />

    </div> <br/>

  <div className="text-center">

  <button  disabled={!email || !password || !name }     type="submit" className="btn btn-success" >Submit</button>

  </div>



    </form>

    )
}

export default RegisterForm
