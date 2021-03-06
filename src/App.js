import React from "react"
import {BrowserRouter,Route,Switch} from "react-router-dom"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from "./components/PrivateRoute"



import Register from "./authorisations/Register";
import Home from "./components/Home";
import TopNav from "./components/TopNav"
import Login from "./authorisations/Login";
import Dashboard from "./user/Dashboard"
import DashboardSeller from "./user/DashboardSeller";
import NewHotel from "./hotels/NewHotel"
import StripeCallback from "./stripe/StripeCallback"
import EditHotel from "./hotels/EditHotel"
import ViewHotel from "./hotels/ViewHotel"
import StripeSuccess from "./stripe/StripeSuccess"
import StripeCancel from "./stripe/StripeCancel"
import SearchResult from "./hotels/SearchResult"


function App() {

  return (

      <BrowserRouter>
      
  <TopNav/>
  <ToastContainer position="top-center"/>

      <Switch>


     <Route exact path="/" component={Home}/>
     <Route exact path="/login"  component={Login}/>
     <Route exact path="/register"  component={Register}/>


     <PrivateRoute exact path="/dashboard/seller" component={DashboardSeller}/>
     <PrivateRoute exact path="/dashboard" component={Dashboard}/>
     <PrivateRoute exact path="/hotels/new" component={NewHotel}/>
     <PrivateRoute exact path="/stripe/callback" component={StripeCallback}/>
     <PrivateRoute exact path="/hotel/edit/:hotelId" component={EditHotel}/>
     <Route exact path="/hotel/:hotelId" component={ViewHotel}/>
     <PrivateRoute exact path="/stripe/success/:hotelId" component={StripeSuccess}/>
     <PrivateRoute exact path="/stripe/cancel" component={StripeCancel}/>
     <Route exact path="/search-result" component={SearchResult}/>

     
     
     
     </Switch>
      
      
     </BrowserRouter>


  );
}

export default App;


