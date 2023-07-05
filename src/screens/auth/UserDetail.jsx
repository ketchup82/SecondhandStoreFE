import React from 'react'
import { Link } from 'react-router-dom';
import Avatar from "../../../assets/images/user.png";

export const UserDetail = () => {
    return (
        <div className='p-5'>
            <button type="button" className="btn btn-light fw-medium text-uppercase mb-5">
            <Link to="/home-page">←Back</Link>
            </button>
            <div className="row g-3 px-5 h-100">
                <div className="col-md-6 flex-grow-1 overflow-auto">
                    <div className="col card h-100 bg-body-tertiary">
                        <div style={{ background: "#FEC401" }} className="card-body rounded text-uppercase card-main d-flex flex-column align-items-center">
                            <img className='profile-avt' src={Avatar} alt="" />
                            <h1 className='fs-medium text-center'>Username</h1>
                            <h5 className='text-center'>Role: Customer</h5>
                            <h5 className='text-center'>Account Id: 1</h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 px-5 flex-grow-1 overflow-auto">
                    <h3 className='title text-center'>User Information</h3>
                    <p className=''>NAME : User Name</p>
                    <p className=''>ADRESS : 666 Thu Duc City</p>
                    <p className=''>DOB : 06/06/1996</p>
                    <p className=''>PHONE NUMBER : 0909 666 666</p>
                    <p className=''>GMAIL : user666@gmail.com</p>
                    <p className=''>REPORTED REASON: Scam, toxic, flake, unreal prices</p>
                </div>
            </div>
        </div>
    )
}
