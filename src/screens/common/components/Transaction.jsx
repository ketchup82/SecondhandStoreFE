import React from 'react'
import { Link } from 'react-router-dom';
import { VictoryBar } from 'victory';

const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
];

export const Transaction = () => {
    return (
        <div className='d-flex'>
            <div className='flex-1 container text-white bg-body-tertiary w-100 min-vh-100'>
                <div className="input-group col-3 border rounded-pill bg-body-secondary search-field my-3">
                    <span className="input-group-text bg-body-secondary border-0 rounded-pill" id="basic-addon1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </span>
                    <input type="text" className="form-control border-0 rounded-pill bg-body-secondary" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
                </div>
                <h5 class="text-dark m-3 text-center h3">Transaction History</h5>
                <table className="table custom-table">
                    <thead>
                        <tr className='mb-1'>
                            <th scope="col" className='text-center'>#</th>
                            <th scope="col">Status</th>
                            <th scope="col">Receipt No.</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Transaction Time</th>
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
                            </svg></td>
                        </tr>
                        <tr>
                            <th scope="row" className='text-center'>2</th>
                            <td>_</td>
                            <td>_</td>
                            <td>_</td>
                            <td className='text-secondary'>08-12-2023</td>
                            <td className='text-center text-warning'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                            </svg></td>
                        </tr>
                        <tr>
                            <th scope="row" className='text-center'>3</th>
                            <td>_</td>
                            <td>_</td>
                            <td>_</td>
                            <td className='text-secondary'>08-12-2023</td>
                            <td className='text-center text-warning'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                            </svg></td>
                        </tr>
                        <tr>
                            <th scope="row" className='text-center'>4</th>
                            <td>_</td>
                            <td>_</td>
                            <td>_</td>
                            <td className='text-secondary'>08-12-2023</td>
                            <td className='text-center text-warning'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                            </svg></td>
                        </tr>
                        <tr>
                            <th scope="row" className='text-center'>5</th>
                            <td>_</td>
                            <td>_</td>
                            <td>_</td>
                            <td className='text-secondary'>08-12-2023</td>
                            <td className='text-center text-warning'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                            </svg></td>
                        </tr>
                        <tr>
                            <th scope="row" className='text-center'>6</th>
                            <td>_</td>
                            <td>_</td>
                            <td>_</td>
                            <td className='text-secondary'>08-12-2023</td>
                            <td className='text-center text-warning'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                            </svg></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
