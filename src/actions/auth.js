// CRUD only for authorisations


import axios from "axios"

export const register = async (user) => await axios.post("http://localhost:5000/api/register",user)

export const login = async (user) => await axios.post("http://localhost:5000/api/login",user)



//update user in local storage///


export const updateUserInLocalStorage= (user,next)=>{


if(window.localStorage.getItem("auth")){

let auth = JSON.parse(localStorage.getItem("auth"))
auth.user = user
localStorage.setItem("auth",JSON.stringify(auth))
next()

}


}


