import User from "../models/user"
import jwt from "jsonwebtoken"


export const register= async (req,res)=>{

try{

//  console.log(req.body)

const {name,email,password}= req.body

////Validation//

if(!name) return res.status(400).send("Name is required")
if(!password || password.length < 6) return res.status(400).send("password is required and must be minimum 6 characters long")

let userExist = await User.findOne({email}).exec()
if(userExist) return res.status(400).send("Email is already registered")


const user = new User(req.body)

    await user.save()
    console.log("user created", user)
    return res.json({ok : true});

}catch(error){

    console.log("CREATE USER FAILED",error)
    return res.status(400).send("Error try again")

}



}





export const login = async (req,res) =>{


try{

    //  console.log(req.body)

   const {email,password}= req.body


    ///To check whether the email already exists///

    let user = await User.findOne({email}).exec()

//    console.log("USER EXIST",user)

if(!user) return res.status(400).send("User with that email not found ")

///compare password///

user.comparePassword(password,(err,match)=>{

    console.log("COMPARE PASSWORD IN LOGIN ERR", err)
     
    if(!match || err ) return res.status(400).send( "WRONG PASSWORD")

    // console.log("GENERATE A TOKEN THEN SEND AS RESPONSE TO CLIENT")

let token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{

    expiresIn:"7d"

})

///On login,,, token and user is sent from backend as response to frontend///

res.json({token,user:{
   
 _id: user._id,
  name: user.name,
  email:user.email,
  createdAt:user.createdAt,
  updatedAt:user.updatedAt,
  stripe_account_id:user.stripe_account_id,
  stripe_seller:user.stripe_seller,
  stripeSession:user.stripeSession,

}})




})


}catch(err){

console.log("LOGIN ERROR",err)
res.status(400).send("Sign In Failed")

}


}