import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { LoadingSpinner } from "../../../components/loading/LoadingSpinner"
import Cookies from 'universal-cookie'
import jwt from 'jwt-decode'
import axios from "axios"
import cn from 'classnames'
import '../styles/style.css'
export const SignUp = () => {
    axios.defaults.baseURL = 'https://localhost:7115';

    const navigate = useNavigate()
    const cookies = new Cookies()
    const [error, setError] = useState('')
    const [errorName, setErrorName] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorDate, setErrorDate] = useState('')
    const [errorPhone, setErrorPhone] = useState('')
    const [errorAddress, setErrorAddress] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('')
    const [visible, setVisible] = useState(false)
    const [isFilled, setIsFilled] = useState(false)

    const validEmail = new RegExp(
        '(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
    )

    useEffect(() => {
        let cookie = cookies.get('jwt_authorization')
        if (cookie !== undefined) {
            let decoded = jwt(cookie)
            if (decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "US") {
                navigate('/', { replace: true })
            }
            else if (decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "AD") {
                navigate('/admin/admin-home', { replace: true })
            }
        }
    }, [])
    const fetchToken = async (email, password) => {
        await axios.post("/account/login", {
            email: email,
            password: password
        }).then((data) => {
            let token = data.data.token
            let expireTime = 60 * 60
            cookies.set("jwt_authorization", token, { path: '/', maxAge: expireTime })
            setTimeout(() => {
                let decoded = jwt(token)
                if (decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "US") {
                    navigate('/', { replace: true })
                }
                else if (decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "AD") {
                    navigate('/admin/admin-home', { replace: true })
                }
            }, 5000)
        }).catch(e => {
            alert("Wrong email or password")
        })
    }
    const fetchData = async (data) => {
        await axios.post("/account/create-new-account", {
            email: data['email'],
            password: data['pass'],
            fullname: data['firstName'] + " " + data['lastName'],
            address: data['address'],
            phoneNo: data['phone']
        }).then((data) => {
            setTimeout(() => {
                fetchToken(data.data.email, data.data.password)
            }, 2000)
        }).catch(e => {
            alert(e)
        })
    }

    function checkValid() {
        const aggreed = document.getElementById('aggreed').checked
        console.log(aggreed)
        let e = errorName + errorEmail + errorDate + errorPhone + errorAddress + errorPassword + errorConfirmPassword
        console.log(e.length)
        if (e.length === 0 && aggreed) setIsFilled(true)
        else setIsFilled(false)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        for (const value of formData.values()) {
            if (value === '') {
                setError("Please fill in the form!")
                return
            }
        }
        const data = Object.fromEntries(formData)
        console.log('a')
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
                            <div className="box form-wrapper">
                                <h1 className="title">Sign Up</h1>
                                <hr />
                                <form onSubmit={(e) => { onSubmit(e) }} className="row mt-3 overflow-auto">
                                    <div className="form-group col-md-12 mb-3 form-check flex items-center">
                                        <label for="fullname">Full name*</label><div className="text-danger">{errorName}</div>
                                        <input id="fullname" name="fullname" placeholder="NGUYEN VAN A" type="text" onChange={(e) => {
                                            e.target.value = e.target.value.toLocaleUpperCase()
                                        }} onBlur={() => {
                                            let name = document.getElementById('fullname').value
                                            if (name === '')
                                                setErrorName(" This field is required")
                                            else
                                                setErrorName('')
                                            checkValid()
                                        }} className="form-control" />
                                    </div>
                                    <div className="form-group col-md-12 mb-3 form-check flex items-center">
                                        <label for="email">Email*</label><div className="text-danger">{errorEmail}</div>
                                        <input id="email" name="email" type="email" placeholder="your-student-mail (ex: thanhnp172345@fpt.edu.vn)" onBlur={() => {
                                            let email = document.getElementById('email').value
                                            if (email.includes('@fpt.edu.vn') || email.includes('@fe.edu.vn'))
                                                setErrorEmail('')
                                            else
                                                setErrorEmail(" Only accept email in FPT Education domain")
                                            checkValid()
                                        }} className="form-control" />
                                    </div>
                                    <div className="form-group col-md-6 mb-3 form-check flex items-center">
                                        <div className="form-split">
                                            <label for="dob">Date of Birth*</label><div className="text-danger">{errorDate}</div>
                                        </div>
                                        <input id="dob" name="dob" min="1970-01-01" max="2005-12-31" type="date" onBlur={() => {
                                            let date = new Date(document.getElementById('dob').value)
                                            const today = new Date()
                                            if (date.getTime() < today.getTime() && today.getFullYear() - date.getFullYear() >= 18)
                                                setErrorDate('')
                                            else
                                                setErrorDate(" Invalid date!")
                                            checkValid()
                                        }} className="form-control" />
                                    </div>
                                    <div className="form-group col-md-6 mb-3 form-check flex items-center">
                                        <div className="form-split">
                                            <label for="phone">Phone Number*</label><div className="text-danger">{errorPhone}</div>
                                        </div>
                                        <input id="phone" name="phone" placeholder="0381234567" type="tel" onBlur={() => {
                                            let phone = document.getElementById('phone').value
                                            if ((phone.length === 10 || phone.length === 11) && phone[0] == '0')
                                                setErrorPhone('')
                                            else
                                                setErrorPhone(' Wrong format!')
                                            checkValid()
                                        }} className="form-control" />
                                    </div>
                                    <div className="form-group col-md-12 mb-3 form-check flex items-center">
                                        <label for="address">Address*</label><div className="text-danger">{errorAddress}</div>
                                        <textarea id="address" name="address" type="text" rows='3' placeholder="High-tech park Long Thạnh Mỹ Ward District, Hồ Chí Minh City" onBlur={() => {
                                            let address = document.getElementById('address').value
                                            if (address === '')
                                                setErrorAddress(' This field is required!')
                                            else
                                                setErrorAddress('')
                                            checkValid()
                                        }} className="form-control" />
                                    </div>
                                    <div className="form-group col-md-12 mb-3 form-check flex items-center">
                                        <label for="password">Password &emsp;</label>
                                        <label className="form-check-label text-bold ">
                                            <div className="checkbox">
                                                <input type="checkbox" onChange={() => { setVisible(!visible) }} className="form-check-input" />
                                                &nbsp;Show password
                                            </div></label>
                                        <div className="text-danger">{errorPassword}</div>
                                        <input id="password" name="password" placeholder="Password must be 5 characters or longer" type={cn(visible ? "text" : "password")} onBlur={() => {
                                            let password = document.getElementById('password').value
                                            let confirmPassword = document.getElementById('confirm-password').value
                                            if (password === '')
                                                setErrorPassword(' This field is required!')
                                            else if (password.length <= 4)
                                                setErrorPassword(' Password must be 5 characters or longer!')
                                            else
                                                setErrorPassword('')
                                            if (password === confirmPassword) {
                                                setErrorConfirmPassword('')
                                            }
                                            checkValid()
                                        }} className="form-control" />
                                    </div>
                                    <div className="form-group col-md-12 mb-3 form-check flex items-center ">
                                        <label for="confirm-password">Confirm Password*</label>
                                        <div className="text-danger">{errorConfirmPassword}</div>
                                        <div className="input-icons">
                                            <input id="confirm-password" name="confirm-password" placeholder="Ex: 123456789" type={cn(visible ? "text" : "password")} onBlur={() => {
                                                let confirmPassword = document.getElementById('confirm-password').value
                                                if (confirmPassword === '')
                                                    setErrorConfirmPassword(' This field is required!')
                                                else {
                                                    const password = document.getElementById('password').value
                                                    if (errorPassword !== '')
                                                        setErrorConfirmPassword(" Check your password again!")
                                                    else if (password === confirmPassword)
                                                        setErrorConfirmPassword('')
                                                    else
                                                        setErrorConfirmPassword(" Password does not match!")
                                                }
                                                checkValid()
                                            }} className="form-control" />

                                        </div>

                                    </div>
                                    <div className="col-md-8 mb-1 form-check flex items-center">
                                        <div className="checkbox">
                                            <input type="checkbox" onClick={() => { checkValid() }} id='aggreed' value='checked' className="form-check-input" />
                                            <label className="form-check-label text-bold" for="policies">&nbsp;I agree with all <a href="/policy" target="_blank">policies</a>*</label>
                                        </div>
                                        <p className="text-muted mb-2">Don't have an account ? <a href="/auth/login">Log in here</a></p>
                                    </div>
                                    <div className="d-flex flex-row-reverse col-md-4 md-1 ml-auto ">
                                        <button type="submit" className={cn("btn btn-primary login-button", !isFilled && 'disabled')}>
                                            Sign Up
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