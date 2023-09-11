import React from 'react';
import '../assets/css/app.css';
import '../assets/css/colors.css';
import { Link } from 'react-router-dom';
 
function SideBar(){
    return(
        <React.Fragment>
            
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav color-sidebar sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <a className="sidebar-brand d-flex align-items-center justify-content-center bg-light" href="http://localhost:3001">
                    <div className="sidebar-brand-icon">
                        <img className="w-100" src="https://1000logos.net/wp-content/uploads/2021/02/Flipkart-logo.png" alt="GranBazar"/>
                    </div>
                </a>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0"/>

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <a className="nav-link" href="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>DASHBOARD</span></a>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                {/*<!-- Heading -->*/}
                <div className=" sidebar-action ">Menu</div>

                {/*<!-- Nav Item - Pages -->*/}
                <li className=" nav-items nav-item">
                    <Link className="nav-links  nav-link collapsed" to="/seller">
                        
                        <i className="fas fa-archive"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Charts -->*/}
                <li className=" nav-items nav-item">
                    <Link className="nav-links nav-link" to="/seller/orders">
                    <i className="fas fa-globe"></i>
                        <span>Orders</span></Link>
                </li>
                {/*<!-- Nav Item - Charts -->*/}
                <li className=" nav-items nav-item">
                    <Link className="nav-links nav-link" to="/seller/add-product">
                    <i className="fa fa-plus-circle"></i>
                        <span>ADD Product</span></Link>
                </li>

                <li className=" nav-items nav-item">
                    <Link className="nav-links nav-link" to="/seller/add-challenge">
                    <i className="fa fa-plus-circle"></i>
                        <span>ADD Challenge</span></Link>
                </li>

                {/*<!-- Nav Item - Tables -->*/}
                <li className="nav-items nav-item">
                    <Link
                     className="nav-links nav-link" to="/seller/products">
                    <i className="fas fa-clipboard-list"></i>
                        <span>My Products</span></Link>
                </li>

                <li className="nav-items nav-item">
                    <Link
                     className="nav-links nav-link" to="/seller/brandreq">
                    <i className="fas fa-clipboard-list"></i>
                        <span>View Brand Requests</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>
            {/*<!-- End of Sidebar -->*/}
        
        </React.Fragment>
    )
}
export default SideBar;
