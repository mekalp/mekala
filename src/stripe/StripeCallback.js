////This component decides to check whether the onboarding is done by the user successfully or not////


import React,{useEffect} from 'react'
import {LoadingOutlined} from "@ant-design/icons"
import {useSelector, useDispatch} from "react-redux"
import {getAccountStatus} from "../actions/stripe"
import {updateUserInLocalStorage} from "../actions/auth" 

const StripeCallback = ({history}) => {

const {auth} = useSelector(state => ({...state}))

const dispatch = useDispatch()

 useEffect(() => {
     
  if(auth&& auth.token) accountStatus()


 }, [auth])

 const accountStatus= async ()=>{

try{


 const res = await getAccountStatus(auth.token)
//  console.log("USER ACCOUNT STATUS ON STRIPE CALL BACK", res)
///update user in localstorage
updateUserInLocalStorage(res.data,()=>{

  //// Updating user in redux///

  dispatch({

    type: "LOGGED_IN_USER",
    payload: res.data,

  })

///redirecting user to dashboard

window.location.href = "/dashboard/seller"

})


}catch(err){

    console.log(err)
}

 }



    return (
        <div className="d-flex justify-content-center p-5">

            <LoadingOutlined className="h1 p-5 text-danger" />
            
        </div>
    )
}

export default StripeCallback
