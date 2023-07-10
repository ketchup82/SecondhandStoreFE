import Headphone from "../../../assets/images/headphone.png";
import ShirtMU from "../../../assets/images/shirt-mu.png";
import ShirtGame from "../../../assets/images/shirt-game.png";
import ShirtT1 from "../../../assets/images/shirt-t1.png";
import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import axios from "axios"
import HeaderFE from "../../../components/HeaderFE";
import FooterFE from "../../../components/FooterFE";

export const PostDetail = () => {
    axios.defaults.baseURL = 'https://localhost:7115'
    const location = useLocation()
    const postId = location.state
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [isLoading, setIsLoading] = useState(true)
    const [post, setPost] = useState([])
    const fetchData = async () => {
        await axios.get('/posts', { params: { id: postId } })
            .then((data) => {
                setPost(data.data)
                setIsLoading(false)
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
        <>
            <HeaderFE />
            <div className='p-5'>
                <button type="button" className="btn btn-light fw-medium text-uppercase mb-5">
                    <Link to="/user-home">←Back</Link>
                </button>
                <div className="row g-3 px-5">
                    <div className="col-md-6">
                        <div className="col card mb-5 bg-body-tertiary">
                            <div className="card-body text-uppercase card-main">
                                <h1 className='fs-medium text-center'>
                                    <img className='post-img' src={Headphone} alt="" />
                                </h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col card m-3 bg-body-tertiary">
                                <div className="card-body text-uppercase card-sub">
                                    <h3 className='fs-regular text-center'>
                                        <img className='post-img' src={ShirtGame} alt="" />
                                    </h3>
                                </div>
                            </div>
                            <div className="col card m-3 bg-body-tertiary">
                                <div className="card-body text-uppercase card-sub">
                                    <h3 className='fs-regular text-center'>
                                        <img className='post-img' src={ShirtMU} alt="" />
                                    </h3>
                                </div>
                            </div>
                            <div className="col card m-3 bg-body-tertiary">
                                <div className="card-body text-uppercase card-sub">
                                    <h3 className='fs-regular text-center'>
                                        <img className='post-img' src={ShirtT1} alt="" />
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 px-5">
                        <h3 className='title'>Product name</h3>
                        <div className="row">
                            <h5 className="col">Price:_</h5>
                            <h5 className="col">Category:_</h5>
                        </div>
                        <h3 className='title'>Description</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <h3 className='text-danger'>Contact:_</h3>
                        <h3 className='text-danger'>Phone number:_</h3>
                        <h3 className='text-danger'>Email:_</h3>
                        <button type="button" className="btn btn-success text-uppercase mb-12 mt-5">Submit Request</button>

                    </div>
                </div>
            </div>
            <FooterFE />
        </>
    )
}
