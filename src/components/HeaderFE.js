import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Form, Button } from 'react-bootstrap'
import Logo from "../assets/images/logo1.png"
import Avatar from "../assets/images/user.png"
import { useState, useEffect } from "react"
import Cookies from "universal-cookie"
import axios from "axios"
export default function HeaderFE() {
    const navigate = useNavigate()
    const cookies = new Cookies()
    axios.defaults.baseURL = "https://localhost:7115"
    const [isFetched, setIsFetched] = useState(false)
    const [account, setAccount] = useState([])

    const fetchData = async () => {
        await axios.get('/account/get-user-account')
            .then((data) => {
                setAccount(data.data)
            })
            .catch(e => console.log(e))
    }

    const logout = () => {
        cookies.remove('jwt_authorization', { path: '/' });
        alert("Successfully logged out!")
        navigate(0)
    }
    useEffect(() => {
        let cookie = cookies.get('jwt_authorization')
        if (cookie !== undefined) {
            axios.defaults.headers.common['Authorization'] = 'bearer ' + cookie;
            fetchData()
            setIsFetched(true)
        }
    }, [])

    const logged = (
        <Nav className='dropdown contact-detail user-avt'>
            <Nav.Link href="" className='contact-detail'> Point: {account.pointBalance}</Nav.Link>
            <button className='btn btn-default dropdown-toggle' type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img draggable='false' className='dropdown-toggle profile-avt' src={Avatar} alt="" />
                <span class="caret"></span>
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link draggable='false' className="dropdown-item" to="/post-list">My Posts</Link>
                <Link draggable='false' className="dropdown-item" to="/user-profile">Profile</Link>
                <Link draggable='false' className="dropdown-item" to="/transaction">Transaction</Link>
                {account.roleId == 'AD' &&
                    <a draggable='false' className="dropdown-item" href="/admin/admin-home">Admin Dashboard</a>
                }
                <a className="dropdown-item" onClick={() => { logout() }}>Log out</a>
            </div>
        </Nav>
    )
    return (
        <>
            <Navbar className='header' >
                <Container>
                    <Navbar.Brand draggable='false' href="/" className='logo-container'><img draggable='false' className='logo_header' src={Logo} alt='SecondhandStore' /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className='me-auto col-md-8'>
                            <Form className="d-flex w-75">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="success"><ion-icon name="search-outline"></ion-icon></Button>
                            </Form>
                        </Nav>

                        <Nav className='col-md-4 contact'>
                            {isFetched ? logged :
                                <>
                                    <Nav.Link href="/auth/login" className='contact-detail'>Login</Nav.Link>
                                    <Nav.Link href="/auth/register" className='contact-detail'>Sign up</Nav.Link>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
