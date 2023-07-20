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
import cn from 'classnames';

export const PostDetail = () => {
    axios.defaults.baseURL = 'https://localhost:7115'
    const queryParameter = new URLSearchParams(window.location.search)
    const postId = queryParameter.get("id")
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [isSented, setIsSented] = useState(false)
    const [isRequested, setIsRequested] = useState(false)
    const [Owner, setOwner] = useState('')
    const [result, setResult] = useState('')
    const [error, setError] = useState('')
    const [post, setPost] = useState([])
    let VND = new Intl.NumberFormat('vn-VN', {
        currency: 'VND',
    });
    const fetchData = async () => {
        await axios.get('/posts/get-post-by-id', { params: { id: postId } })
            .then((data) => {
                setPost(data.data)
            })
            .catch(e => setError(error))
        await axios.get('/get-all-request-list').then((data) => {
            data.data.map((item) => {
                if (String(item.postId) === postId) setIsRequested(true)
            })
        })
    }
    const sendRequest = async () => {
        await axios.post('/buyer-send-exchange-request', {
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

    const handleReqComplete = () => {
        sendRequest()
    };

    const handleDelComplete = () => {

    };

    const handleClose = () => {
        setResult('')
        setIsSented(false)
        setOpen(false);
    };


    const requestDialog = (
        <List>
            <ListItem>
                <p className='col-md-12 dialog-p'>
                    You are about to create a request for this product. The seller can see your request and contact with you. Or you can try to contact them first.
                </p>
            </ListItem>
            <ListItem>
                <div className='col-md-12'>
                    <button className='btn btn-info col-md-3 yes-btn' onClick={() => { handleReqComplete() }}>Yes</button>
                    <button className='btn btn-info col-md-3 no-btn' onClick={() => { handleClose() }}>No</button>
                </div>
            </ListItem>
        </List>
    )

    // const deleteDialog = (
    //     <List>
    //         <ListItem>
    //             <p className='col-md-12 dialog-p'>
    //                 You are about to complete this post. It won't show on display anymore and all request about this product will be cancelled. 
    //             </p>
    //         </ListItem>
    //         <ListItem>
    //             <div className='col-md-12'>
    //                 <button className='btn btn-info col-md-3 yes-btn' onClick={() => { handleDelComplete() }}>Yes</button>
    //                 <button className='btn btn-info col-md-3 no-btn' onClick={() => { handleClose() }}>No</button>
    //             </div>
    //         </ListItem>
    //     </List>
    // )

    return (
        <>
            <HeaderFE />
            <div className='post-detail '>
                <div className='row'>
                    <div className='col-2 back-btn'>
                        <button onClick={() => { navigate(-1) }} type="button" className="btn btn-light fw-medium text-uppercase mb-5">
                            ←Back
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 text-right">
                        <div className="row col-md-12 d-flex justify-content-end">
                            <a className='post-detail-card d-flex justify-content-center' href={post.image} target='_blank'>
                                <img className="img-fluid post-img" src={post.image}></img>
                            </a>
                        </div>
                        <br />
                        <div className='row justify-content-md-center'>
                            {Owner == post.accountId ?
                                <div className='row'>
                                    {/* <div className='col-4'>
                                        <button className="btn-outline-dark text-danger h3">&nbsp;Delete Post</button>
                                    </div> */}
                                    <div className='col-4'></div>
                                    <div className='col-4'>
                                        <button onClick={() => { navigate('/post-edit', { state: post.postId }) }} className="btn-outline-dark text-warning h3">Update Post</button>
                                    </div>
                                </div>
                                :
                                <>
                                    <div className='col-5'></div>
                                    {isRequested ?
                                        <strong className='col-6 btn-secondary text-warning h5 text-center'>You've already requested this product</strong> :
                                        <button onClick={() => { handleClickOpen() }} className="col-6 btn-outline-dark text-warning h3">Request this product</button>
                                    }
                                </>
                            }
                        </div>
                    </div>
                    <div className="col-md-7 px-5">
                        <div className='row'>
                            <h3 className='title col-4'>{post.productName}</h3>
                            <h3 className={cn('title col-auto',
                                post.statusName == "Completed" || post.statusName == "Pending" && 'status-post-completed',
                                post.statusName == "Accepted" && 'status-post-accepted',
                                post.statusName == "Rejected" || post.statusName == "Inactive" && 'status-post-rejected',
                            )}>{post.statusName == "Accepted" ? "Available" : (post.statusName == "Rejected" || post.statusName == "Inactive" ? "Unavailable" : post.statusName)}</h3>
                            <h4 className='col-md-12'>
                                <strong>
                                    Owner:&nbsp;
                                    <a className='to-user-profile' href={'/user-detail?id=' + post.accountId}>
                                        <span className={cn(post.accountId == Owner ? "post-detail-owner" : "post-detail-user")}>
                                            {post.accountId == Owner ? "You" : post.fullname}
                                        </span>
                                    </a>
                                </strong>
                            </h4>
                        </div>
                        <div className="row">
                            <h5 className="col-3"><div className='h3 text-info'>Price</div><div className='h4'>{VND.format(post.price)} VND</div></h5>
                            <h5 className="col-3"><div className='h3 text-info'>Category</div><div className='h4'>{post.categoryName}</div></h5>
                            <h5 className="col-6"><div className='h3 text-info'>Last modified</div><div className='h4'>{String(post.createdDate).substring(0, 10)}</div></h5>
                        </div>
                        <h4 className='text-info'>Description</h4>
                        <div className='col-md-12'>
                            <p className='h4 post-desc'>{post.description}</p>
                        </div>
                        <h5><span className='h3 text-info'>Address: </span><span className='h4'>{post.address}</span></h5>
                        <h5><span className='h3 text-info'>Phone Number: </span><span className='h4'>{post.phoneNo}</span></h5>
                        <h5><span className='h3 text-info'>Email: </span><span className='h4'>{post.email}</span></h5>
                    </div>
                </div>
                <Dialog onClose={handleClose} open={open}>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <div className='row dialog'>
                        {Owner === post.accountId ?
                            <>
                                {/* {isDeleted ? <div>{result}</div> : deleteDialog} */}
                            </>
                            :
                            <>
                                {isSented ? <div>{result}</div> : requestDialog}
                            </>
                        }
                    </div>
                </Dialog>
            </div >
            <FooterFE />
        </>
    )
}
