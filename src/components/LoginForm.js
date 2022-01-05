import React from 'react'

const LoginForm = ({handleSubmit,email,password,setEmail,setPassword}) => {


    return (

        <form onSubmit={handleSubmit}>

    <div className="form-group">
    

    <label className="form-label">Email: </label>
    <input type="email" className="form-control" value={email} placeholder="name@example.com" onChange={(e)=>setEmail(e.target.value)} />

    </div>


    <div className="form-group">
    
    <label className="form-label">Password: </label>
    <input type="password" className="form-control" value={password} placeholder="enter your password" onChange={(e)=>setPassword(e.target.value)} />

    </div> <br/>

  <div className="text-center">

  <button disabled={!email || !password} type="submit" className="btn btn-success" >Submit</button>

  </div>



    </form>

    )
}

export default LoginForm
