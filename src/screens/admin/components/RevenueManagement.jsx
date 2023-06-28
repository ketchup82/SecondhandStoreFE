import React from 'react'
import { Link } from 'react-router-dom';
import { VictoryBar } from 'victory';

const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
];

export const RevenueManagement = () => {
    return (
        <div className='d-flex'>
            <div classsName="">
                <div className="sidebar list-group rounded-0 min-vh-100">
                    <h3 className='text-center my-3'>Menu</h3>
                    <button type="button" className="list-group-item list-group-item-action active" aria-current="true">
                        <svg className='me-3' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M15.985 8.5H8.207l-5.5 5.5a8 8 0 0 0 13.277-5.5zM2 13.292A8 8 0 0 1 7.5.015v7.778l-5.5 5.5zM8.5.015V7.5h7.485A8.001 8.001 0 0 0 8.5.015z" />
                        </svg>
                        <Link to="/admin/admin-home">Overview</Link>
                    </button>
                    <button type="button" className="list-group-item list-group-item-action text-secondary">

                        <svg className='me-3' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        </svg>
                        <Link to="/admin/user-management">Registered user</Link>
                    </button>
                    <button type="button" className="list-group-item list-group-item-action text-secondary">
                        <svg className='me-3' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6V4.5Zm4 1a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5Zm0 5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5ZM4 8a1 1 0 0 0 1 1h6a1 1 0 1 0 0-2H5a1 1 0 0 0-1 1Z" />
                        </svg>
                        <Link to="/admin/revenue">Revenue</Link>
                    </button>
                    <button type="button" className="list-group-item list-group-item-action text-secondary">
                        <svg className='me-3' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z" />
                            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                        </svg>
                        <Link to="/admin/report-list">Registed posts</Link></button>
                    <button type="button" className="list-group-item list-group-item-action text-secondary">
                        <svg className='me-3' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                        </svg>
                        <Link to="/admin/report">Reported user</Link></button>
                    <button type="button" className="list-group-item list-group-item-action text-secondary">
                    <Link to="/user-home">Logout</Link></button>                     
                </div>
            </div>
            <div className='flex-1 container text-white bg-body-tertiary w-100 min-vh-100'>
                <div className="row g-3 mt-3">
                    <div className="col text-center m-3 rounded d-flex justify-content-center align-items-center flex-column p-3 bg-danger">
                        <h5>Rejected Post</h5>
                        <h3>10</h3>
                    </div>
                    <div className="col text-center m-3 rounded d-flex justify-content-center align-items-center flex-column p-3 bg-success">
                        <h5>Approved Post</h5>
                        <h3>10</h3>
                    </div>
                    <div className="col text-center m-3 rounded d-flex justify-content-center align-items-center flex-column p-3 bg-primary">
                        <h5>Pending Post</h5>
                        <h3>10</h3>
                    </div>
                </div>
                <div className="input-group col-3 border rounded-pill bg-body-secondary search-field my-3">
                    <span className="input-group-text bg-body-secondary border-0 rounded-pill" id="basic-addon1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </span>
                    <input type="text" className="form-control border-0 rounded-pill bg-body-secondary" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
                </div>
                <h5 className='text-dark m-3'>Register post list</h5>
                <table className="table custom-table">
                    <thead>
                        <tr className='mb-1'>
                            <th scope="col" className='text-center'>Order Id</th>
                            <th scope="col">Account Id</th>
                            <th scope="col">Full name</th>
                            <th scope="col">Top-up Point</th>
                            <th scope="col">Price</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" className='text-center'>1</th>
                            <td>_</td>
                            <td>_</td>
                            <td>_</td>
                            <td className='text-secondary'>08-12-2023</td>
                            <td className='text-center text-warning'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                            </svg></td>
                        </tr>
                        <tr>
                            <th scope="row" className='text-center'>2</th>
                            <td>_</td>
                            <td>_</td>
                            <td>_</td>
                            <td className='text-secondary'>08-12-2023</td>
                            <td className='text-center text-warning'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                            </svg></td>
                        </tr>
                        <tr>
                            <th scope="row" className='text-center'>1</th>
                            <td>_</td>
                            <td>_</td>
                            <td>_</td>
                            <td className='text-secondary'>08-12-2023</td>
                            <td className='text-center text-warning'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                            </svg></td>
                        </tr>
                    </tbody>
                </table>
                <div className="row mt-5">
                    <div className="col">
                        <h5 className='text-uppercase text-dark text-center'>Revenue chart</h5>
                        <VictoryBar
                            style={{
                                data: { fill: "#0884F5" }
                            }}
                            data={data}
                            x="quarter"
                            y="earnings" />
                    </div>
                    <div className="col d-flex justify-content-center flex-column align-items-center">
                        <div className="d-flex w-100 justify-content-center">
                            <button className='btn rounded-pill border button_hover-dark m-3 border-black revenue-btn'>Choose date</button>
                            <button className='btn rounded-pill border button_hover-dark m-3 border-black revenue-btn'>Choose date</button>
                        </div>
                        <div className="d-flex ">
                            <button className='btn rounded-pill bg-warning button_hover-dark revenue-btn'>Confirm</button>
                        </div>
                        <div className="container text-dark p-3 rounded m-3" style={{background: "#12e265", width: "280px"}}>
                            <h5>Total Revenue</h5>
                            <h1>2,000</h1>
                            <p>↑ Since yesterday</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
