import React from 'react'
import {Modal} from "antd"
import { currencyFormatter } from '../../actions/stripe'



const OrderModal = ({session,orderedBy,showModal,setShowModal}) => {


    return (

        <div>
            
       <Modal visible={showModal} title="Prder payment info" onCancel={()=>setShowModal(!showModal)}> 
       
       
       <p>Payment intent: {session.payment_intent}</p>
       <p>Payment intent: {session.payment_status}</p>
       <p>Amount total: {session.currency.toUpperCase()}
           
           {session.amount_total / 100}
       
       </p>
       <p>Stripe customer id: {session.customer}</p>
       <p>Customer: {orderedBy.name}</p>
       
       </Modal>

        </div>
    )
}

export default OrderModal
