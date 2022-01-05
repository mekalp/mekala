
import User from "../models/user"
import queryString from "query-string"
import Hotel from "../models/hotel"
import Order from "../models/order"





const stripe = require('stripe')('sk_test_51K95LjSDCgyjSHnxWMWdfv5bRaNaZqHmgMU0UuEq5Dz6yktQBdv3Cfbl9vIH5BeHSRPwPgHDtLONnotgsp9tnoSC00XlQe2t9N');



export const createConnectAccount = async (req,res) =>{


    //FINDING THE USER FROM DATABASE///
const user = await User.findById(req.user._id).exec()

console.log(user)


////IF USER DO NOT HAVE STRIP_ACCOUNT_ID THEN CREATE NOW


////thee below code explains that once the stripe account id is created, if again user comes and requests the stipe account, no new account id will be created///

if(!user.stripe_account_id){

    const account = await stripe.accounts.create({type: 'standard'});

    console.log(account)

    user.stripe_account_id=account.id
    user.save()


}

///Now creating account login link based on account id for frontend to onboard///
//for this install a library npm i query-string///



let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: 'http://localhost:3000/stripe/callback',
    return_url: 'http://localhost:3000/stripe/callback',
    type: 'account_onboarding',
  });

accountLink=Object.assign(accountLink,{

 "stripe_user[email]": user.email || undefined,

})

console.log("ACCOUNT LINK", accountLink);


/////Getting the account link////
let link= `${accountLink.url}?${queryString.stringify(accountLink)}`
console.log("LOGIN LINK",link)
res.send(link)


}


////Code for payouts, it means receiving the money in to the seller acount from the customer within how many days?...////

///code has not yet written//



export const getAccountStatus = async (req,res)=>{

// console.log("GET ACCOUNT STATUS")

//MAKING REQUEST TO STRIPE FOR ACCOUNT STATUS//

const user = await User.findById(req.user._id).exec()
const account = await stripe.accounts.retrieve(user.stripe_account_id)
// console.log("USER ACCOUNT RETRIEVE",account)




const updatedUser = await User.findByIdAndUpdate(user._id,
    
    {


   stripe_seller : account,


},

{new : true}

).select("-password").exec();

// console.log(updatedUser)

res.json(updatedUser)

}



export const getAccountBalance = async(req,res)=>{

    const user = await User.findById(req.user._id).exec()

try{

const balance = await stripe.balance.retrieve({

  stripeAccount: user.stripe_account_id


})

console.log("BALANCE====>",balance)
res.json(balance)

}catch(err){

    console.log(err)


}


}


export const payoutSetting = async (req,res)=>{

try{

    const user = await User.findById(req.user._id).exec()
 
    const loginLink = await stripe.accounts.createLoginLink(user.stripe_account_id,
        
        {

      redirect_url: "http://localhost:3000/dashboard/seller"


       }
    
    )

    console.log("LOGIN LINK FOR PAYOUT SETTINGS",loginLink)

    res.json(loginLink)

}catch(err){

console.log("STRIPE PAYOUT SETTINGS ERROR",err)

}




}



export const stripeSessionId= async(req,res)=>{

// console.log("you hit stripe session Id ", req.body.hotelId)


///geting hotel id from the frontend through req.body

const {hotelId} = req.body

///find the hotel based on hotel id from the database

const item = await Hotel.findById(hotelId).populate("postedBy").exec()

///20% charge as application fee
const fee = (item.price * 20 )/100

///create a session

const session = await stripe.checkout.sessions.create({

  //purchasing item details, it will be shown to user on checkout

  line_items: [{
    name: item.title,
    amount:item.price * 100, //in cents
    currency:"inr",
    quantity: 1,
  }],
  mode: 'payment',

  ///success and cancel URLS
  success_url: `http://localhost:3000/stripe/success/${item._id}`,
  cancel_url: 'http://localhost:3000/stripe/cancel',


  //create payment intent with the application fee and destination charge//

  payment_intent_data: {
    application_fee_amount: fee * 100 ,

// this seller can see his balance in our frontend dashboard

    transfer_data: {
      destination: item.postedBy.stripe_account_id,
    },
  },

//adding this session object to user in db


});

await User.findByIdAndUpdate(req.user._id, {stripeSession: session}).exec()

res.send({

sessionId: session.id

})

console.log("SESSION====>", session)


}





//send session id as response to frontend
//then in frontend, we can use this session id to create a page where users
//can securely enter their card details and checkout with stripe
//after completion, they will get redirected to /stripe/success page



//In that success page...
///we will do more stuff once user lands on that page
//for example, We will create a new order .
//user will have the hotel as booked under his name
//user can see the booking in his dashboard




export const stripeSuccess = async (req,res) => {

try{

// 1) Get hotel id from req.body //


const {hotelId} = req.body

///2) find currently logged in user


const user = await User.findById(req.user._id).exec()

///check if user has stripe session

if(!user.stripeSession) return 




//3) retrieve stripe session, based on session id we previosuly save in user db///


const session = await stripe.checkout.sessions.retrieve(user.stripeSession.id)

///4) If session payment status is paid, then create the order

if(session.payment_status === "paid"){

///5) Check if order with that session id already exist by quering orders collection

const orderExist = await Order.findOne({"session.id": session.id}).exec()

if(orderExist){

///6)If order exist, send success true

res.json({success: true})



}else{

///7) else create new order and send success true

let newOrder=  await new Order({

hotel: hotelId,
session,
orderedBy: user._id

}).save()


///8) remove user's stripeSession

await User.findByIdAndUpdate(user._id,{

  $set : { stripeSession: {}},

})

res.json({success : true})

}

}



}catch(err){

console.log("Stripe success error",err)

}

}





