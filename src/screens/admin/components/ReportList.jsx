import React from 'react'
import { Menu } from '../Sidebar'

export const ReportList = () => {
    return (
        <div className='d-flex'>
            <Menu/>
            <div className='flex-1 container text-white bg-body-tertiary w-100 min-vh-100'>
                <div className="input-group col-3 border rounded-pill bg-body-secondary search-field my-3">
                    <span className="input-group-text bg-body-secondary border-0 rounded-pill" id="basic-addon1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </span>
                    <input type="text" className="form-control border-0 rounded-pill bg-body-secondary" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
                </div>
                <h5 className='text-dark m-3 text-capitalize'>Report list</h5>
                <table className="table custom-table">
                    <thead>
                        <tr className='mb-1'>
                            <th scope="col" className='text-center'>Report Id</th>
                            <th scope="col">Report user</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone number</th>
                            <th scope="col">Reason</th>
                            <th scope="col">Status</th>
                            <th scope="col" className='text-center'>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" className='text-center'>1</th>
                            <td>_</td>
                            <td>_</td>
                            <td>_</td>
                            <td>_</td>
                            <td>_</td>
                            <td className='text-center text-warning'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-3 bi bi-x text-danger" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" className='text-center'>2</th>
                            <td>_</td>
                            <td>_</td>
                            <td>_</td>
                            <td>_</td>
                            <td>_</td>
                            <td className='text-center text-warning'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-3 bi bi-x text-danger" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" className='text-center'>3</th>
                            <td>_</td>
                            <td>_</td>
                            <td>_</td>
                            <td>_</td>
                            <td>_</td>
                            <td className='text-center text-warning'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-3 bi bi-x text-danger" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
