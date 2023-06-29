import Headphone from "../../../assets/images/headphone.png";
import ShirtMU from "../../../assets/images/shirt-mu.png";
import ShirtGame from "../../../assets/images/shirt-game.png";
import ShirtT1 from "../../../assets/images/shirt-t1.png";
import "../styles/post.css"
import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import axios from "axios"

export const PostDetail = () => {
    axios.defaults.baseURL = 'https://localhost:7115'
    const location = useLocation()
    const postId = location.state
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [post, setPost] = useState([])
    const fetchData = async () => {
        await axios.get('/posts/'+postId)
            .then((data) => {
                setPost(data.data)
            })
            .catch(e => console.log(e))
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
        <div className='p-5'>
            <button type="button" className="btn btn-light fw-medium text-uppercase mb-5">
                <a href="/admin/post-list">←Back</a>
            </button>
            <div className="row g-3 px-5">
                <div className="col-md-6">
                    <div className="col card mb-5 bg-body-tertiary">
                        <div className="card-body text-uppercase card-main">
                            <h1 className='fs-medium text-center'>
                                <img className='img-thumbnail post-img' src={Headphone} alt="" />
                            </h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col card m-3 bg-body-tertiary">
                            <div className="card-body text-uppercase card-sub">
                                <h3 className='fs-regular text-center'>
                                    <img className='img-thumbnail post-img' src={ShirtGame} alt="" />
                                </h3>
                            </div>
                        </div>
                        <div className="col card m-3 bg-body-tertiary">
                            <div className="card-body text-uppercase card-sub">
                                <h3 className='fs-regular text-center'>
                                    <img className='img-thumbnail post-img' src={ShirtMU} alt="" />
                                </h3>
                            </div>
                        </div>
                        <div className="col card m-3 bg-body-tertiary">
                            <div className="card-body text-uppercase card-sub">
                                <h3 className='fs-regular text-center'>
                                    <img className='img-thumbnail post-img' src={ShirtT1} alt="" />
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 px-5">
                    <h3 className='title'>{post.productName}</h3>
                    <div className="row">
                        <h5 className="col">{post.price}</h5>
                        <h5 className="col">{post.categoryName}</h5>
                    </div>
                    <h3 className='title'>Description</h3>
                    <p>{post.description}</p>
                    <h3 className='text-danger'>Contact: {post.address}</h3>
                    <h3 className='text-danger'>Phone number: {post.phoneNo}</h3>
                    <h3 className='text-danger'>Email: {post.email}</h3>
                </div>
                <h3 className='title'>Review</h3>
                <div className="col-md-12 mb-3">
                    <label for="username" className="form-label text-dark">User 1</label>
                    <h3>it was perfect. Everything! Right down to the last minute detail.</h3>
                </div>

                <div className="col-md-12 mb-3">
                    <label for="address" className="form-label text-dark">User 2</label>
                    <h3>Amazing. Good job!</h3>
                </div>
            </div>
        </div>
    )
}
