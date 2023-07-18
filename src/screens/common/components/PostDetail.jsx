import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import axios from "axios"
import jwt from 'jwt-decode'
import HeaderFE from "../../../components/HeaderFE";
import FooterFE from "../../../components/FooterFE";
import { Card } from 'react-bootstrap';
import { Dialog, DialogTitle, List, ListItem } from '@mui/material';

export const PostDetail = () => {
    axios.defaults.baseURL = 'https://localhost:7115'
    const queryParameter = new URLSearchParams(window.location.search)
    const postId = queryParameter.get("id")
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [isSented, setIsSented] = useState(false)
    const [Owner, setOwner] = useState('')
    const [result, setResult] = useState('')
    const [error, setError] = useState('')
    const [post, setPost] = useState([])
    let VND = new Intl.NumberFormat('vn-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const fetchData = async () => {
        await axios.get('/posts/get-user-post-by-id', { params: { id: postId } })
            .then((data) => {
                setPost(data.data)
            })
            .catch(e => setError(error))
    }
    const sendRequest = async () => {
        await axios.post('/send-exchange-request', {
            'postId': postId,
        }).then((data) => {
            setResult(data.data)
        })
            .catch((e) => {
                console.log(e)
                setResult("Something went wrong!")
            })
        setIsSented(true)
    }

    useEffect(() => {
        let cookie = cookies.get('jwt_authorization')
        if (cookie !== undefined) {
            axios.defaults.headers.common['Authorization'] = 'bearer ' + cookie;
            setOwner(jwt(cookie)['accountId'])
            fetchData()
        }
        else {
            navigate('/auth/login', { replace: true })
        }
    }, [])

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleComplete = () => {
        sendRequest()
    };

    const handleClose = () => {
        setResult('')
        setIsSented(false)
        setOpen(false);
    };


    const Rusure = (
        <List>
            <ListItem>
                <p className='col-md-12 dialog-p'>You are about to create a request for this product. The seller can see your request and contact with you. Or you can try to contact them first.
                </p>
            </ListItem>
            <ListItem>
                <div className='col-md-12'>
                    <button className='btn btn-info col-md-3 yes-btn' onClick={() => { handleComplete() }}>Yes</button>
                    <button className='btn btn-info col-md-3 no-btn' onClick={() => { handleClose() }}>No</button>
                </div>
            </ListItem>
        </List>
    )
    return (
        <>
            <HeaderFE />
            <div className='p-5'>
                {error !== '' ? <div>{error}</div> : <div>
                    <button onClick={() => { navigate(-1) }} type="button" className="btn btn-light fw-medium text-uppercase mb-5">
                        ←Back
                    </button>
                    <div className="row g-3 px-5">
                        <div className="col-md-6">
                            <div className="col card mb-5 bg-body-tertiary">
                                <div className="card-body text-uppercase card-main">
                                    <h1 className='fs-medium text-center'>
                                        <img className="img-thumbnail img-fluid Responsive image" src={post.image}></img>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 px-5">
                            <h3 className='title'>Product Name: {post.productName}</h3>
                            <div className="row">
                                <h5 className="col">Price: {VND.format(post.price)}</h5>
                                <h5 className="col">Category: {post.categoryName}</h5>
                                <h5 className="col">Date: {String(post.createdDate).substring(0, 10)}</h5>
                            </div>
                            <h3 className='title'>Description</h3>
                            <p>{post.description}</p>
                            <h3 className='text-danger'>Contact: {post.address}</h3>
                            <h3 className='text-danger'>Phone Number: {post.phoneNo}</h3>
                            <h3 className='text-danger'>Email: {post.email}</h3>
                            {Owner === post.accountId ?
                                <button onClick={() => { navigate('/post-edit', { state: post.postId }) }} className="btn btn-outline-dark">Update Product</button> :
                                <>
                                    <button onClick={() => { navigate('/user-detail?id=' + post.accountId) }} className="btn btn-light">Go to seller's profile</button>
                                    <button onClick={() => { handleClickOpen() }} className="btn btn-light">Request this product</button>
                                </>
                            }
                        </div>
                    </div>
                    <Dialog onClose={handleClose} open={open}>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <div className='row dialog'>
                            {isSented ? <div>{result}</div> : Rusure}
                        </div>
                    </Dialog>
                </div>}
            </div >
            <FooterFE />
        </>
    )
}
