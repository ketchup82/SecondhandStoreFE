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

export const AdminPostDetail = () => {
    axios.defaults.baseURL = 'https://localhost:7115'
    const location = useLocation()
    const postId = location.state
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [post, setPost] = useState([])
    const fetchData = async () => {
        await axios.get('/posts/get-post-by-id', { params: { id: postId } })
            .then((data) => {
                setPost(data.data)
                console.log(post)
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
                                <img  className="img-thumbnail Responsive image" src={post.image}></img>
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 px-5">
                        <h3 className='title'>Product Name: {post.productName}</h3>
                        <div className="row">
                            <h5 className="col">Price: {post.price}</h5>
                            <h5 className="col">Category: {post.categoryName}</h5>
                        </div>
                        <h3 className='title'>Description</h3>
                        <p>{post.description}</p>
                        <h3 className='text-danger'>Contact: {post.address}</h3>
                        <h3 className='text-danger'>Phone Number: {post.phoneNo}</h3>
                        <h3 className='text-danger'>Email: {post.email}</h3>
                    </div>
            </div>
        </div >
    )
}
