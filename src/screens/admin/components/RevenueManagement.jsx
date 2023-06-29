import { useNavigate } from 'react-router-dom';
import { VictoryBar, VictoryTheme } from 'victory';
import { useState, useEffect, useMemo, useCallback } from 'react'
import { LoadingSpinner } from '../../../components/loading/LoadingSpinner';
import { Pagination } from '../../../components/pagination/Pagination';
import { Menu } from '../Sidebar';
import Cookies from 'universal-cookie'
import axios from "axios"
let itemPerPage = 10

export const RevenueManagement = () => {
    axios.defaults.baseURL = 'https://localhost:7115';

    const navigate = useNavigate();
    const cookies = new Cookies();
    const [posts, setPosts] = useState([])
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(NaN)


    useEffect(() => {
        setIsLoading(true)
        let cookie = cookies.get('jwt_authorization')
        axios.defaults.headers.common['Authorization'] = 'bearer ' + cookie;
        setIsLoading(false)
    }, [])

    const lastPage = Math.ceil(posts.length / itemPerPage);
    const currTableData = useMemo(() => {
        let firstPageIndex = (currentPage - 1) * itemPerPage;
        let lastPageIndex = firstPageIndex + itemPerPage;
        console.log(firstPageIndex)
        console.log(lastPageIndex)
        console.log(posts.slice(firstPageIndex, lastPageIndex))
        return posts.slice(firstPageIndex, lastPageIndex)
    }, [currentPage])

    const errorMessage = (
        <div className='grey-screen row g-3 mt-3'>Something went wrong. Check connection</div>
    )

    const renderPost = (
        <>
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
                    {currTableData.map((post, index) => (
                        <tr>
                            <th scope="row" className='text-center'>{index}</th>
                            <td>{post.accountId}</td>
                            <td>{post.fullname}</td>
                            <td>{post.pointCost}</td>
                            <td className='text-secondary'>08-12-2023</td>
                            <td className='text-center text-warning'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                            </svg></td>
                        </tr>
                    ))}
                </tbody>
            </table >
            <Pagination currentPage={currentPage} lastPage={lastPage} maxLength={7} setCurrentPage={setCurrentPage} />
        </>

    )

    return (
        <div className='d-flex'>
            <Menu />
            <div className='flex-1 container text-white bg-body-tertiary w-100 min-vh-100'>
                {error && errorMessage}
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
                {isLoading ? <LoadingSpinner /> : renderPost}
                <div className="row mt-5">
                    <div className="col">
                        <h5 className='text-uppercase text-dark text-center'>Revenue chart</h5>
                        <VictoryBar
                            style={{
                                data: { fill: "#0884F5" }
                            }}
                            data={[
                                { quarter: 1, earnings: 13000 },
                                { quarter: 2, earnings: 16500 },
                                { quarter: 3, earnings: 14250 },
                                { quarter: 4, earnings: 19000 }
                            ]}
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
                        <div className="container text-dark p-3 rounded m-3" style={{ background: "#12e265", width: "280px" }}>
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
