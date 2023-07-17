import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import { LoadingSpinner } from "../../../components/loading/LoadingSpinner"
import Cookies from 'universal-cookie'
import jwt from 'jwt-decode'
import axios from "axios"
import '../styles/form.css';

export const LogIn = () => {
    axios.defaults.baseURL = 'https://localhost:7115';

    const navigate = useNavigate();
    const cookies = new Cookies();
    const [remem, setRemem] = useState(false)
    const [error, setError] = useState('')
    useEffect(() => {
        let cookie = cookies.get('jwt_authorization')
        if (cookie !== undefined) {
            let decoded = jwt(cookie)
            if (decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "US") {
                navigate('/', { replace: true })
            }
            else if (decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "AD") {
                navigate('/admin/dashboard', { replace: true })
            }
        }
    }, [])

    const fetchData = async (email, password) => {
        await axios.post("/account/login", {
            email: email,
            password: password
        }).then((data) => {
            let token = data.data.token
            let expireTime = remem ? 60 * 60 * 24 * 365 : 60 * 60
            cookies.set("jwt_authorization", token, { path: '/', maxAge: expireTime })
            let decoded = jwt(token)
            if (decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "US") {
                navigate('/', { replace: true })
            }
            else if (decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "AD") {
                navigate('/admin/dashboard', { replace: true })
            }
        }).catch((error) => {
            if (!error.response) {
                // network error
                setError("Can't connect to server. Try again later!")
            } else {
                setError("Wrong email or password")
            }
        })
    }

    const onSubmit = (e) => {
        setError("")
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)
        if (data.email === "" || data.password === "") {
            setError("Missing email or password")
        }
        else {
            fetchData(data.email, data.password)
        }
    }

    const renderForm = (
        <div id="all">
            <div id="content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <nav aria-label="breadcrumb">
                            </nav>
                        </div>
                        <div className="col-lg-6">
                            <div className="box">
                                <h1 className="title">Log in</h1>
                                <hr />
                                <form onSubmit={(e) => { onSubmit(e) }} className="row mt-3">
                                    <div className="form-group col-md-12 mb-3 form-check flex items-center">
                                        <label for="email">Email</label>
                                        <input id="email" name="email" type="text" className="form-control" />
                                    </div>
                                    <div className="form-group col-md-12 mb-3 form-check flex items-center">
                                        <label for="password">Password</label>
                                        <input id="password" name="password" type="password" className="form-control" />
                                    </div>
                                    <div className="col-md-8 mb-1 form-check flex items-center">
                                        <div className="checkbox">
                                            <input onChange={(e) => setRemem(e.target.value)} type="checkbox" className="form-check-input" id="policies" />
                                            <label className="form-check-label text-bold" for="policies">&nbsp;Remember me</label>
                                        </div>
                                        <p className="text-muted mb-2">Don't have an account ? <a href="/auth/signup">Sign up here</a></p>
                                    </div>
                                    <div className="d-flex flex-row-reverse col-md-4">
                                        <button type="submit" className="btn btn-primary login-button">
                                            Login
                                        </button>
                                    </div>
                                    <p className="col-md-12 error">{error}</p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="auth-form padding-40">
            {renderForm}
        </div>
    );
}