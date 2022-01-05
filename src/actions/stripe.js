import axios from "axios"

export const createConnectAccount = async (token) => 
await axios.post("http://localhost:5000/api/create-connect-account",{},{

headers:{

    Authorization: `Bearer ${token}`


}



})



export const getAccountStatus = async(token)=> axios.post("http://localhost:5000/api/get-account-status",{},{


headers:{

    Authorization: `Bearer ${token}`


}



})



export const getAccountBalance = async(token)=> axios.post("http://localhost:5000/api/get-account-balance",{},{


headers:{

    Authorization: `Bearer ${token}`


}



})


export const currencyFormatter = (data) =>{

    return (data.amount/100).toLocaleString(data.currency,{

    style: "currency",
    currency: data.currency,


    })


}



export const payoutSetting = async(token) => await axios.post("http://localhost:5000/api/payout-setting",{},{

    headers:{

        Authorization: `Bearer ${token}`
    
    
    }


})


export const getSessionId = async(token,hotelId)=> await axios.post("http://localhost:5000/api/stripe-session-id",{

hotelId,

},{

headers:{

Authorization : `Bearer ${token}`

}

})




export const stripeSuccessRequest = async(token, hotelId)=> await axios.post("http://localhost:5000/api/stripe-success",{hotelId},{

headers:{

Authorization: `Bearer ${token}`


}



})


