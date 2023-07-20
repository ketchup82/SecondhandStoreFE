import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import axios from "axios"
import cn from 'classnames';

export const AdminPostDetail = () => {
    axios.defaults.baseURL = 'https://localhost:7115'
    const queryParameter = new URLSearchParams(window.location.search)
    const postId = queryParameter.get("id")
    const navigate = useNavigate();
    const cookies = new Cookies();
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
    }

    useEffect(() => {
        let cookie = cookies.get('jwt_authorization')
        if (cookie !== undefined) {
            axios.defaults.headers.common['Authorization'] = 'bearer ' + cookie;
            fetchData()
        }
        else {
            navigate('/auth/login', { replace: true })
        }
    }, [])
    return (
        <>
            <div className='post-detail'>
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
                            <>
                                <div className='col-5'></div>
                                <button className="col-6 btn-outline-dark text-warning h3">Request this product</button>
                            </>
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
                                        <span className={"post-detail-user"}>
                                            {post.fullname}
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
                        <h4 className='text-info'><strong>Description</strong></h4>
                        <div className='col-md-12'>
                            <p className='h4 post-desc'>{post.description}</p>
                        </div>
                        <h5><span className='h3 text-info'>Address: </span><span className='h4'>{post.address}</span></h5>
                        <h5><span className='h3 text-info'>Phone Number: </span><span className='h4'>{post.phoneNo}</span></h5>
                        <h5><span className='h3 text-info'>Email: </span><span className='h4'>{post.email}</span></h5>
                    </div>
                </div>
            </div >
        </>
    )
}
