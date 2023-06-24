import React from 'react'
import { VictoryBar } from 'victory'
import DashboardImage from "../../../assets/images/dashboard_img.png"
const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
];

export const AdminHome = () => {
    return (
        <div className='d-flex'>
            <div classsName="">
                <div className="sidebar list-group rounded-0 min-vh-100">
                    <h3 className='text-center my-3'>Menu</h3>
                    <button type="button" className="list-group-item list-group-item-action active" aria-current="true">
                        <svg className='me-3' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M15.985 8.5H8.207l-5.5 5.5a8 8 0 0 0 13.277-5.5zM2 13.292A8 8 0 0 1 7.5.015v7.778l-5.5 5.5zM8.5.015V7.5h7.485A8.001 8.001 0 0 0 8.5.015z" />
                        </svg>
                        Overview
                    </button>
                    <button type="button" className="list-group-item list-group-item-action text-secondary">

                        <svg className='me-3' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        </svg>
                        Registered user
                    </button>
                    <button type="button" className="list-group-item list-group-item-action text-secondary">
                        <svg className='me-3' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6V4.5Zm4 1a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5Zm0 5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5ZM4 8a1 1 0 0 0 1 1h6a1 1 0 1 0 0-2H5a1 1 0 0 0-1 1Z" />
                        </svg>
                        Revenue
                    </button>
                    <button type="button" className="list-group-item list-group-item-action text-secondary">
                        <svg className='me-3' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z" />
                            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                        </svg>Registed posts</button>
                    <button type="button" className="list-group-item list-group-item-action text-secondary">
                        <svg className='me-3' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                        </svg>Reported user</button>
                    <button type="button" className="list-group-item list-group-item-action text-secondary">Logout</button>
                </div>
            </div>

            <div className='flex-1 container text-white bg-body-tertiary w-100 min-vh-100'>
                <div className="col text-dark rounded p-3 m-2" style={{ background: "#FFDB58" }}>
                    <div className="row">
                        <div className="col">
                            <h5>Welcome to your dashboard!</h5>
                            <p>This is OSE system admin dashboard designed to reflect an overview of the most important events inside the team. Please add comments on what you want changed.</p>
                        </div>
                        <div className="col d-flex justify-content-center">
                            <img className='w-100' src={DashboardImage} alt="" />
                        </div>
                    </div>
                </div>

                <div className="row g-3 mt-3">
                    <div className="col text-dark rounded m-3" style={{ background: "#FF9E9E" }}>
                        <h5 className='m-3'>Total User</h5>
                        <h1 className='m-3'>2,000</h1>
                        <p className='m-3'>↑1.10% Since yesterday</p>
                    </div>
                    <div className="col text-dark rounded m-3" style={{ background: "#0DB5EA" }}>
                        <h5 className='m-3'>Total Post</h5>
                        <h1 className='m-3'>2,000</h1>
                        <p className='m-3'>↑1.10% Since yesterday</p>
                    </div>
                    <div className="col text-dark rounded m-3" style={{ background: "#12e265" }}>
                        <h5 className='m-3'>Total Revenue</h5>
                        <h1 className='m-3'>2,000</h1>
                        <p className='m-3'>↑1.10% Since yesterday</p>
                    </div>
                </div>

                <div className="w-50 mx-auto">
                    <h5 className='text-uppercase text-dark text-center'>Revenue chart</h5>
                    <VictoryBar
                        style={{
                            data: { fill: "#0884F5" }
                        }}
                        data={data}
                        x="quarter"
                        y="earnings" />
                </div>
            </div>
        </div>
    )
}
