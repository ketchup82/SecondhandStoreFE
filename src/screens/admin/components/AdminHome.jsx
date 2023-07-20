import { useState, useEffect } from 'react'
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory'
import DashboardImage from "../../../assets/images/dashboard_img.png"
import axios from 'axios';
import Menu from '../Sidebar';
import { LoadingSpinner } from '../../../components/loading/LoadingSpinner';
import Cookies from 'universal-cookie';
import cn from 'classnames'
export const AdminHome = () => {
    axios.defaults.baseURL = 'https://localhost:7115'
    const cookies = new Cookies()
    const [accounts, setAccount] = useState([])
    const [posts, setPosts] = useState([])
    const [topup, setTopup] = useState([])
    const [error, setError] = useState('')
    const [date, setDate] = useState([])
    const [price, setPrice] = useState([])
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(0)
    let VND = new Intl.NumberFormat('vn-VN', {
        currency: 'VND',
    });

    const fetchData = async () => {
        await axios.get('/account/get-account-list')
            .then(data => {
                setAccount(data.data)
            })
            .catch((e) => {
                setError("failed to fetch accounts")
                console.log(e)
            })
        await axios.get('/posts/get-post-list')
            .then(data => {
                setPosts(data.data)
            })
            .catch(e => {
                setError("failed to fetch posts")
                console.log(e)
            })
        await axios.get("/topup/get-all-topup-order")
            .then((data) => {
                const list = data.data.slice(0).reverse().filter((item) => {
                    return item.topUpStatus === 'Accepted'
                })
                setTopup(list)
            })
            .catch((e) => {
                setError("failed to fetch topup order")
                console.log(e)
            })
    }
    useEffect(() => {
        let cookie = cookies.get('jwt_authorization')
        axios.defaults.headers.common['Authorization'] = 'bearer ' + cookie;
        fetchData()
    }, [])
    useEffect(() => {
        let a = Math.max(...topup.map(item => new Date(String(item.topUpDate).substring(0, 10))))
        let b = Math.min(...topup.map(item => new Date(String(item.topUpDate).substring(0, 10))))
        var listDate = []
        var listPrice = []
        topup.map((item) => {
            var d = String(item.topUpDate).substring(5, 10)
            var p = String(item.price)
            if (listDate.indexOf(d) === -1) listDate = [...listDate, d]
            if (listPrice.indexOf(p) === -1) listPrice = [...listPrice, p]
        })
        setDate(listDate.reverse())
        setPrice(listPrice.sort((a, b) => a - b))
        console.log(price)
        // console.log(new Date(a))
    }, [topup])
    const errorMessage = (
        <div className='grey-screen row g-3 mt-3'>Something went wrong. Check connection</div>
    )

    const page = (
        <div className='container'>
            <div className="d-flex row justify-content-center">
                <div className="col text-center text-dark rounded m-3" style={{ background: "#FF9E9E" }}>
                    <h5 className='m-3 row-md-3'>Total User</h5>
                    <h1 className='m-3'>{accounts.length}</h1>
                </div>
                <div className="col text-center text-dark rounded m-3" style={{ background: "#0DB5EA" }}>
                    <h5 className='m-3 row-md-3'>Total Post </h5>
                    <h1 className='m-3'>{posts.length}</h1>
                </div>
                <div className="col text-center text-dark rounded m-3" style={{ background: "#12e265" }}>
                    <h5 className='m-3 row-md-3'>Total Revenue</h5>
                    <h1 className='m-3'>{VND.format(topup.reduce((a, v) => a = a + v.price, 0)).replaceAll(',', '.')} VND</h1>
                </div>
            </div>
            <div className="row d-flex justify-content-center ">
                <h5 className='col-12 text-uppercase text-dark text-center'>Revenue chart</h5>
                <div className='col-12 graph'>
                    <VictoryChart
                        domainPadding={1}
                    >
                        <VictoryAxis dependentAxis
                            tickValues={
                                price
                            }
                            tickFormat={(x) => {
                                return VND.format(x).replaceAll(',', '.') + " VND"
                            }}
                        />
                        <VictoryAxis
                            tickValues={
                                date
                            }

                        />
                        <VictoryBar
                            style={{ data: { fill: "#c43a31" } }}
                            data={[
                                { x: 2, y: 1, y0: 2 },
                                { x: 3, y: 1, y0: 2 },
                                { x: 4, y: 1, y0: 3 },
                                { x: 5, y: 1, y0: 3 },
                                { x: 6, y: 1, y0: 3 }
                            ]}
                        />
                    </VictoryChart>

                </div>
            </div>
        </div>
    )
    return (
        <>
            <div className='d-flex'>
                <div className='flex-1 container text-white bg-body-tertiary w-100 min-vh-100'>
                    <div className="col text-dark rounded p-3 m-2 dashboard" style={{ background: "#FFDB58" }}>
                        <div className="row">
                            <div className="col">
                                <h5>Welcome to your dashboard!</h5>
                                <p>This is OSE system admin dashboard designed to reflect an overview of the most important events inside the team. Please add comments on what you want changed.</p>
                            </div>
                            <div className="d-flex justify-content-center">
                                <img className='w-100' src={DashboardImage} alt="" />
                            </div>
                            {error !== '' ? error : page}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
