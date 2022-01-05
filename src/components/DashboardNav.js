import {Link} from "react-router-dom"

const DashboardNav = () => {

 const active = window.location.pathname

 console.log(active)


    return (
        <ul className="nav nav-tabs">

            <li className="Nav-item">
       
       <Link className= {`nav-link ${active === "/dashboard" && "active" }`} to="/dashboard">Bookings</Link>

            </li>


            
  <li className="nav-item"> 

<Link className={`nav-link ${active === "/dashboard/seller" && "active"}`} to="/dashboard/seller">Hotels</Link>

  </li>



        </ul>
    )
}

export default DashboardNav
