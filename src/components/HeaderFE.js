import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Form, Button } from 'react-bootstrap'
import Logo from "../assets/images/logo1.png";
import Avatar from "../assets/images/user.png"
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import jwt from "jwt-decode"
export default function HeaderFE() {
    const navigate = useNavigate()
    const cookies = new Cookies()
    axios.defaults.baseURL = "https://localhost:7115"
    const [isFetched, setIsFetched] = useState(false)
    const [account, setAccount] = useState([])

    const logout = () => {
        cookies.remove('jwt_authorization', { path: '/' });
        alert("Successfully logged out!")
        navigate(0)
    }

    useEffect(() => {
        let cookie = cookies.get('jwt_authorization')
        if (cookie !== undefined) {
            axios.defaults.headers.common['Authorization'] = 'bearer ' + cookie;
            const decoded = jwt(cookie)
            setIsFetched(true)
        }
    }, [])

    const logged = (
        <div class="dropdown contact-detail">
            <button class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img className='profile-avt' src={Avatar} alt="" />
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Profile </a>
                <a class="dropdown-item" href="#">Settings</a>
                <a class="dropdown-item" onClick={() => { logout() }}>Log out</a>
            </div>
        </div>
    )
    return (
        <>
            <Navbar className='header' >
                <Container>
                    <Navbar.Brand href="#home" className='logo-container'><img className='logo_header' src={Logo} alt='SecondhandStore' /></Navbar.Brand>
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
                            <Nav.Link href="#home" className='contact-detail'> Contact</Nav.Link>
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
