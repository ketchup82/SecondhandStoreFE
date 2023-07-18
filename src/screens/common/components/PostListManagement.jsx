import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from 'react'
import { LoadingSpinner } from '../../../components/loading/LoadingSpinner';
import { Pagination } from '../../../components/pagination/Pagination';
import Cookies from 'universal-cookie'
import axios from "axios"
import HeaderFE from "../../../components/HeaderFE";
import FooterFE from "../../../components/FooterFE";
import { Dialog, DialogTitle, List, ListItem } from '@mui/material';

import cn from 'classnames'
import { Card } from "react-bootstrap";


export const PostListManagement = () => {
    axios.defaults.baseURL = 'https://localhost:7115'
    const navigate = useNavigate()
    const cookies = new Cookies()
    const [posts, setPosts] = useState([])
    const [isError, setIsError] = useState(false)
    const [filtered, setFiltered] = useState([])
    const [isActive, setIsActive] = useState('');
    const [open, setOpen] = useState(false);

    let VND = new Intl.NumberFormat('vn-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const fetchData = async () => {
        await axios.get('/posts/get-user-posts')
            .then((data) => {
                setPosts(data.data.slice(0).reverse())
                setFiltered(data.data.slice(0).reverse())
            })
            .catch(e => setIsError(e))
    }

    useEffect(() => {
        let cookie = cookies.get('jwt_authorization')
        if (cookie === undefined) navigate('/auth/login', { replace: true })
        axios.defaults.headers.common['Authorization'] = 'bearer ' + cookie;
        fetchData()
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)
        console.log(data['keyword'])
        if (data['date'] !== null) {
            var updatedList = [...filtered]
            updatedList = updatedList.filter((item) => {
                return new Date(item.orderDate).getTime() > new Date(data['date']).getTime()
            })
            setFiltered(updatedList)
        }
        else setFiltered(filtered)
        if (data['keyword'] === '') {
            setFiltered(posts)
        }
        else {
            var updatedList1 = [...posts]
            updatedList1 = updatedList1.filter((item) => {
                const product = item.productName.toLowerCase()
                const isTrue = (product.indexOf((data['keyword'] || '').toLowerCase()) !== -1)
                return isTrue
            })
            setFiltered(updatedList1)
        }
    }

    const handleType = (type) => {
        setIsActive(type)
        var updatedList = [...posts]
        updatedList = updatedList.filter((item) => {
            return String(item.orderStatusName).includes(type)
        })
        console.log(updatedList)
        setFiltered(updatedList)
    }

    const errorMessage = (
        <div className='grey-screen row g-3 mt-3'>Something went wrong. Check connection</div>
    )

    const renderPost = (
        <div className="mb-12 Account_box__yr82T p-6 text-black-600 text-18 mb-12" >
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button onClick={() => {
                        handleType('')
                    }} class={cn("nav-link ", isActive == '' && 'active')} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="">All</button>
                    <button onClick={() => {
                        handleType('Pending')
                    }} class={cn("nav-link ", isActive == 'Pending' && 'active')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected=''>Pending Order</button>
                    <button onClick={() => {
                        handleType('Cancelled')
                    }} class={cn("nav-link ", isActive == 'Cancelled' && 'active')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected=''>Cancelled Order</button>
                    <button onClick={() => {
                        handleType('Completed')
                    }} class={cn("nav-link ", isActive == 'Completed' && 'active')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected=''>Completed Order</button>
                    <div></div>
                </div>
            </nav>
            <form id="myForm" onSubmit={(e) => onSubmit(e)}>
                <div class="form-row align-items-center">
                    <div class="col-sm-3 my-1">
                        <input type="text" name='keyword' class="form-control" id="inlineFormInputName" placeholder="Enter buyer name here" />
                    </div>
                    <div class="col-sm-3 my-1">
                        <div class="input-group">
                            <input type="date" name='date' class="form-control" id="inlineFormInputGroupUsername" />
                        </div>
                    </div>
                    <div class="col-auto my-1">
                        <button onClick={() => {
                            document.getElementById("myForm").reset()
                            setFiltered(posts)
                        }} style={{ marginTop: '1%' }} type="button" class="btn btn-primary">Clear
                        </button>
                        <button style={{ marginTop: '1%' }} type="submit" class="btn btn-primary">Search</button>
                    </div>
                </div>
            </form>
            {filtered.length === 0 ? <h5 className="text-dark m-3 text-capitalize">You have no post!</h5> : <>
                <div className="row mx-auto">
                    {filtered.map((item) => (
                        <div class="col-6 col-md-3 post-padding">
                            <a href={"/post-detail?id=" + item.postId} style={{ textDecoration: 'none' }}>
                                <Card style={{ width: '16rem' }}>
                                    <Card.Img variant="top" className='img-fluid' src={item.image} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                                    <Card.Body>
                                        <Card.Title style={{ color: 'black' }}>{item.productName}</Card.Title>
                                    </Card.Body>
                                    <Card.Body>
                                        <Card.Text>{String(item.createdDate).substring(0, 10)}</Card.Text>
                                        <Card.Link style={{ color: 'orange', fontSize: '20px' }}>{VND.format(item.price)}</Card.Link>
                                    </Card.Body>
                                </Card>
                            </a>
                        </div>
                    ))}
                </div>
            </>}
        </div>
    )

    return (
        <>
            <HeaderFE />
            <div className='d-flex'>
                <div className='flex-1 container text-white bg-body-tertiary w-100 min-vh-100'>
                    <h5 className='text-dark m-3'>My Posts</h5>
                    {renderPost}
                </div>
            </div>
            <FooterFE />
        </>
    )
}
