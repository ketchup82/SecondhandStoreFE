import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Form, Button } from 'react-bootstrap'
import Logo from "../assets/images/user.png";

export default function HeaderFE() {
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
                            <Nav.Link href="#home" className='contact-detail'> About us</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}