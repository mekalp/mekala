import mongoose from "mongoose"

const connectToDb = async ()=>{


    try{


  const connect= await mongoose.connect(process.env.MONGO_URI,{ 
      
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })

  console.log(`MongoDB Connected: ${connect.connection.host}`)


       }

     catch(error){


    console.error(`Error: ${error.message}`)
    process.exit(1)

}

}

export default connectToDb;
