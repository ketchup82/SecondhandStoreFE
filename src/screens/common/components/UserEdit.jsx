import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { LoadingSpinner } from "../../../components/loading/LoadingSpinner"
import Cookies from 'universal-cookie'
import jwt from 'jwt-decode'
import axios from "axios"
import cn from 'classnames'
import '../styles/style.css'
import HeaderFE from "../../../components/HeaderFE"
import FooterFE from "../../../components/FooterFE"
export const UserEdit = () => {
    axios.defaults.baseURL = 'https://localhost:7115';
    const location = useLocation()
    const postId = location.state
    const navigate = useNavigate()
    const cookies = new Cookies()
    const [fullname, setFullname] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddr] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorFetch, setErrorFetch] = useState('')
    const [error, setError] = useState('')
    const [errorName, setErrorName] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorDate, setErrorDate] = useState('')
    const [errorPhone, setErrorPhone] = useState('')
    const [errorAddress, setErrorAddress] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('')
    const [account, setAccount] = useState([])
    const [visible, setVisible] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const [completed, setCompleted] = useState(false)
    const validEmail = new RegExp(
        '(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
    )

    useEffect(() => {
        let cookie = cookies.get('jwt_authorization')
        if (cookie !== undefined) {
            axios.defaults.headers.common['Authorization'] = 'bearer ' + cookie
            fetchData()
        }
        else navigate('/auth/login', { replace: true })
    }, [])


    const updateAccount = async (data) => {
        const response = await axios({
            url: "/account/update-account",
            data: {
                password: password,
                fullname: fullname,
                address: address,
                phoneNo: phone,
            },
            headers: {
                "Content-Type": "multipart/form-data",
            },
            method: "put"
        }).catch(e => {
            console.log(e)
            setErrorFetch("Wrong email or password")
        })
        if (errorFetch !== '') {
            alert('success')
            navigate('/user-profile')
        }
    }
    const fetchData = async (data) => {
        await axios.get("/account/get-user-account")
            .then((data) => {
                setFullname(data.data.fullname)
                setAddr(data.data.address)
                setPhone(data.data.phoneNo)
                setEmail(data.data.email)
            }).catch(e => {
                alert(e)
            })
    }

    // function checkValid() {
    //     const aggreed = document.getElementById('aggreed').checked
    //     console.log(aggreed)
    //     let e = errorName + errorEmail + errorDate + errorPhone + errorAddress + errorPassword + errorConfirmPassword
    //     console.log(e.length)
    //     if (e.length === 0 && aggreed) setIsFilled(true)
    //     else setIsFilled(false)
    // }

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
        setPassword(data['password'])
        updateAccount(data)
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
                                <h1 className="title">Account Edit</h1>
                                <hr />
                                <form onSubmit={(e) => { onSubmit(e) }} className="row mt-3 overflow-auto">
                                    <div className="form-group col-md-12 mb-3 form-check flex items-center">
                                        <label for="fullname">Full name*</label><div className="text-danger">{errorName}</div>
                                        <input id="fullname" value={fullname} name="fullname" placeholder="NGUYEN VAN A" type="text" onChange={(e) => {
                                            setFullname(e.target.value.toLocaleUpperCase())
                                        }} onBlur={() => {
                                            let name = document.getElementById('fullname').value
                                            if (name === '')
                                                setErrorName(" This field is required")
                                            else
                                                setErrorName('')
                                            // checkValid()
                                        }} className="form-control" />
                                    </div>
                                    <div className="form-group col-md-12 mb-3 form-check flex items-center">
                                        <label for="phone">Phone Number*</label><div className="text-danger">{errorPhone}</div>
                                        <input id="phone" onChange={(e) => {
                                            setPhone(e.target.value)
                                        }} value={phone} name="phone" placeholder="0381234567" type="tel" onBlur={() => {
                                            let phone = document.getElementById('phone').value
                                            if ((phone.length === 10 || phone.length === 11) && phone[0] == '0')
                                                setErrorPhone('')
                                            else
                                                setErrorPhone(' Wrong format!')
                                            // checkValid()
                                        }} className="form-control" />
                                    </div>
                                    <div className="form-group col-md-12 mb-3 form-check flex items-center">
                                        <label for="address">Address*</label><div className="text-danger">{errorAddress}</div>
                                        <textarea id="address" value={address} onChange={(e) => {
                                            setAddr(e.target.value)
                                        }} name="address" type="text" rows='3' placeholder="High-tech park Long Thạnh Mỹ Ward District, Hồ Chí Minh City" onBlur={() => {
                                            let address = document.getElementById('address').value
                                            if (address === '')
                                                setErrorAddress(' This field is required!')
                                            else
                                                setErrorAddress('')
                                            // checkValid()
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
                                            // checkValid()
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
                                                // checkValid()
                                            }} className="form-control" />

                                        </div>

                                    </div>
                                    <div className="col-md-8 mb-1 form-check flex items-center">

                                    </div>
                                    <div className="d-flex flex-row-reverse col-md-4 md-1 ml-auto ">
                                        <button type="submit" className={cn("btn btn-primary login-button")}>
                                            Confirm
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
        <>
            <HeaderFE />
            <div className="auth-form padding-40">
                {completed ? <div>
                    <strong>Created account successfully</strong>
                    <div>Redirecting to homepage...</div>
                </div> : renderForm}
            </div>
            <FooterFE />
        </>

    );
}