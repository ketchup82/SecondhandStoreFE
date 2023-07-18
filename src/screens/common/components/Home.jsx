import React, { useEffect, useState } from 'react'
import FooterFE from '../../../components/FooterFE'
import HeaderFE from '../../../components/HeaderFE'
import ImageBanner from "../../../assets/images/banner_image.svg";
import ShirtMU from "../../../assets/images/shirt-mu.png";
import ShirtGame from "../../../assets/images/shirt-game.png";
import ShirtT1 from "../../../assets/images/shirt-t1.png";
import Headphone from "../../../assets/images/headphone.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { Carousel } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const UserHome = () => {
    axios.defaults.baseURL = "https://localhost:7115"
    const navigate = useNavigate()
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [items, setItems] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    let VND = new Intl.NumberFormat('vn-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const fetchData = async () => {
        await axios.get("/posts/get-post-list")
            .then((data) => {
                setItems(data.data.slice(0).reverse())
                setFilteredList(data.data.slice(0).reverse())

            })
            .catch((e) => { console.log(e) })
    }

    useEffect(() => {

        fetchData()
    }, [])

    useEffect(() => {
        var updatedList = [...filteredList]
        if (type === 'Donate') updatedList = updatedList.filter(p => p.postTypeName === type)
        else updatedList = items
        setFilteredList(updatedList)
    }, [type])

    const handleSortType = (category) => {
        let sortedItems = [];

        switch (category) {
            case "nameAZ":
                sortedItems = items.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "nameZA":
                sortedItems = items.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "priceAZ":
                sortedItems = items.sort((a, b) => a.price - b.price);
                break;
            case "priceZA":
                sortedItems = items.sort((a, b) => b.price - a.price);
                break;
            default:
                sortedItems = items;
        }
        setItems([...sortedItems]);

    }
    const [paginatedItems, setPaginatedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const paginate = (items, currentPage, itemsPerPage) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    }
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    useEffect(() => {
        setCurrentPage(1);
        setPaginatedItems(paginate(items, currentPage, itemsPerPage));
    }, [items])
    useEffect(() => {
        setPaginatedItems(paginate(items, currentPage, itemsPerPage));
    }, [currentPage])

    const oldOne = (
        <div className='padding-40'>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <ul className="list-group">
                            <ul className="list-group">
                                <li className="list-group-item" onClick={() => { navigate('/search') }} style={{ background: "#FFDB58", cursor: "pointer" }}>
                                    <i className="fas fa-tshirt"></i> All
                                </li>
                                <li className="list-group-item" onClick={() => { navigate('/search', { state: "Clothes" }) }} style={{ background: "#FFDB58", cursor: "pointer" }}>
                                    <i className="fas fa-tshirt"></i> Clothes
                                </li>
                                <li className="list-group-item" onClick={() => { navigate('/search', { state: "Accessories" }) }} style={{ background: "#FFDB58", cursor: "pointer" }}>
                                    <i className="fas fa-tshirt"></i> Accessories
                                </li>
                                <li className="list-group-item" onClick={() => { navigate('/search', { state: "Electronics" }) }} style={{ background: "#FFDB58", cursor: "pointer" }}>
                                    <i className="fas fa-bolt"></i> Electronics
                                </li>
                                <li className="list-group-item" onClick={() => { navigate('/search', { state: "Books" }) }} style={{ background: "#FFDB58", cursor: "pointer" }}>
                                    <i className="fas fa-book"></i> Books
                                </li>
                                <li className="list-group-item" onClick={() => { navigate('/search', { state: "Musical Instruments" }) }} style={{ background: "#FFDB58", cursor: "pointer" }}>
                                    <i className="fas fa-guitar"></i> Musical Instruments
                                </li>
                                <li className="list-group-item" onClick={() => { navigate('/search', { state: "School Supplies" }) }} style={{ background: "#FFDB58", cursor: "pointer" }}>
                                    <i className="fas fa-pencil-ruler"></i> School Supplies
                                </li>
                                <li className="list-group-item" onClick={() => { navigate('/search', { state: "Others" }) }} style={{ background: "#FFDB58", cursor: "pointer" }}>
                                    <i className="material-icons"></i> Others
                                </li>
                            </ul>
                        </ul>
                    </div>
                    <div className="col-md-9 mh-100 padding-40">
                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval="3000">
                            <ol className="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                            </ol>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img className="d-block w-100" src="https://i.imgur.com/i6L2jGh.jpg" alt="First slide" />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block w-100" src="https://i.imgur.com/RA2DI5N.jpg" alt="Second slide" />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block w-100" src="https://i.imgur.com/n5F6gPa.jpg" alt="Third slide" />
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-3">
                {/* <Tabs
                    defaultActiveKey="profile"
                    id="justify-tab-example"
                    className="mb-8"
                >
                    <Tab onClick={() => { setType("") }} eventKey="all" title="all">
                    </Tab>
                    <Tab onClick={() => { setType("Donate") }} eventKey="donating" title="donating">
                    </Tab>
                </Tabs> */}

                <Swiper
                    modules={[Navigation]}
                    slidesPerView={4}
                    spaceBetween={15}
                    navigation
                    grabCursor={true} // bật tính năng hiển thị con trỏ kéo chuột
                    mousewheel={true} // bật tính năng kéo chuột bằng bánh xe
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {filteredList.length === 0 ? <div>No available product</div> : filteredList.slice(0).reverse().map((item) => (
                        <SwiperSlide
                            onMouseDown={(e) => e.preventDefault()} // ngăn chặn sự kiện mặc định khi nhấn chuột trái
                            onMouseMove={(e) => e.preventDefault()} // ngăn chặn sự kiện mặc định khi di chuyển chuột
                            onMouseUp={(e) => e.preventDefault()} // ngăn chặn sự kiện mặc định khi thả chuột trái
                        >
                            <a className='post-image' href={'/post-detail?id=' + item.postId}>
                                <Card.Img variant="top" className='img-fluid' src={item.image} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="container border">
                <div className="">
                    {[
                        'dark',
                    ].map((variant) => (
                        <Alert key={variant} variant={variant}>
                            Newest Posts
                        </Alert>
                    ))}
                </div>
                <div class="container">
                    <div class="row mx-auto">
                        {filteredList.slice(0, 8).map((item) => (
                            <>
                                <div class="col-6 col-md-3 post-padding">
                                    <a href={"/post-detail?id="+item.postId} style={{ textDecoration: 'none' }}>
                                        <Card style={{ width: '16rem' }}>
                                            <Card.Img variant="top" className='img-fluid' src={item.image} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                                            <Card.Body>
                                                <Card.Title style={{ color: 'black' }}>{item.productName}</Card.Title>
                                            </Card.Body>
                                            <Card.Body>
                                                <a href={'/post-detail?id=' + item.postId} style={{ textDecoration: 'none' }}>
                                                    <Card.Link style={{ color: 'orange', fontSize: '20px' }}>{VND.format(item.price)}</Card.Link>
                                                </a>
                                            </Card.Body>
                                        </Card>
                                    </a>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

    // const newOne = (
    //     <>
    //         <div className="position-relative admin__home_banner">
    //             <h3 className="p-5 banner_title">
    //                 Second hand exchange where you can find amazing things
    //             </h3>
    //             <img className="admin__home_banner_image position-absolute top-0 end-0 h-100" src={ImageBanner} alt="" />
    //         </div>

    //         <div className="container">
    //             <div className="row">
    //                 <div className="col-md-3">
    //                     <ul className="list-group">


    //                         <ul className="list-group">
    //                             <li className="list-group-item" onClick={() => setType("clothes")} style={{ background: "#FFDB58", cursor: "pointer" }}>
    //                                 <i className="fas fa-tshirt"></i> Clothes
    //                             </li>
    //                             <li className="list-group-item" onClick={() => setType("electric")} style={{ background: "#FFDB58", cursor: "pointer" }}>
    //                                 <i className="fas fa-bolt"></i> Electric
    //                             </li>
    //                             <li className="list-group-item" onClick={() => setType("books")} style={{ background: "#FFDB58", cursor: "pointer" }}>
    //                                 <i className="fas fa-book"></i> Books
    //                             </li>
    //                             <li className="list-group-item" onClick={() => setType("instruments")} style={{ background: "#FFDB58", cursor: "pointer" }}>
    //                                 <i className="fas fa-guitar"></i> Instruments
    //                             </li>
    //                             <li className="list-group-item" onClick={() => setType("tools")} style={{ background: "#FFDB58", cursor: "pointer" }}>
    //                                 <i className="fas fa-pencil-ruler"></i> Learning Tools
    //                             </li>
    //                             <li className="list-group-item" onClick={() => setType("")} style={{ background: "#FFDB58", cursor: "pointer" }}>
    //                                 <i className="material-icons"></i> Others
    //                             </li>
    //                         </ul>
    //                     </ul>
    //                 </div>
    //                 <div className="col-md-9">
    //                     <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval="3000">
    //                         <ol className="carousel-indicators">
    //                             <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
    //                             <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    //                             <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    //                         </ol>
    //                         <div className="carousel-inner">
    //                             <div className="carousel-item active">
    //                                 <img className="d-block w-100" src="https://i.imgur.com/i6L2jGh.jpg" alt="First slide" />
    //                             </div>
    //                             <div className="carousel-item">
    //                                 <img className="d-block w-100" src="https://i.imgur.com/RA2DI5N.jpg" alt="Second slide" />
    //                             </div>
    //                             <div className="carousel-item">
    //                                 <img className="d-block w-100" src="https://i.imgur.com/n5F6gPa.jpg" alt="Third slide" />
    //                             </div>
    //                         </div>
    //                         <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    //                             <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    //                             <span className="sr-only">Previous</span>
    //                         </a>
    //                         <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    //                             <span className="carousel-control-next-icon" aria-hidden="true"></span>
    //                             <span className="sr-only">Next</span>
    //                         </a>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="container my-3">
    //             <Swiper
    //                 modules={[Navigation]}
    //                 slidesPerView={4}
    //                 spaceBetween={15}
    //                 navigation
    //                 grabCursor={true} // bật tính năng hiển thị con trỏ kéo chuột
    //                 mousewheel={true} // bật tính năng kéo chuột bằng bánh xe
    //                 onSlideChange={() => console.log('slide change')}
    //                 onSwiper={(swiper) => console.log(swiper)}
    //             >
    //                 {items.map((item) => (
    //                     <SwiperSlide
    //                         onMouseDown={(e) => e.preventDefault()} // ngăn chặn sự kiện mặc định khi nhấn chuột trái
    //                         onMouseMove={(e) => e.preventDefault()} // ngăn chặn sự kiện mặc định khi di chuyển chuột
    //                         onMouseUp={(e) => e.preventDefault()} // ngăn chặn sự kiện mặc định khi thả chuột trái
    //                     >
    //                         <img src={item.thumbnail} alt="" style={{ width: '100%' }} />
    //                     </SwiperSlide>
    //                 ))}
    //             </Swiper>

    //         </div>


    //         <div className="container border">
    //             <div className="">
    //                 {[
    //                     'dark',
    //                 ].map((variant) => (
    //                     <Alert key={variant} variant={variant}>
    //                         Newest Posts
    //                     </Alert>
    //                 ))}
    //             </div>
    //             <div class="container">
    //                 <div class="row mx-auto">
    //                     <div class="col-6 col-md-3">
    //                         <a href="https://example.com/san-pham/123" style={{ textDecoration: 'none' }}>
    //                             <Card style={{ width: '16rem' }}>
    //                                 <Card.Img variant="top" src="https://kidstyle.com.vn/images/detailed/4/dodam_k4qz-tw.jpg" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
    //                                 <Card.Body>
    //                                     <Card.Title style={{ color: 'black' }}>Product Name</Card.Title>
    //                                 </Card.Body>
    //                                 <Card.Body>
    //                                     <a href="https://example.com/mua?gia=9.99" style={{ textDecoration: 'none' }}>
    //                                         <Card.Link style={{ color: 'orange', fontSize: '20px' }}>100.000đ</Card.Link>
    //                                     </a>
    //                                 </Card.Body>
    //                             </Card>
    //                         </a>
    //                     </div>
    //                     <div class="col-6 col-md-3">
    //                         <a href="https://example.com/san-pham/123" style={{ textDecoration: 'none' }}>
    //                             <Card style={{ width: '16rem' }}>
    //                                 <Card.Img variant="top" src="https://kidstyle.com.vn/images/detailed/4/dodam_k4qz-tw.jpg" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
    //                                 <Card.Body>
    //                                     <Card.Title style={{ color: 'black' }}>Product Name</Card.Title>
    //                                 </Card.Body>
    //                                 <Card.Body>
    //                                     <a href="https://example.com/mua?gia=9.99" style={{ textDecoration: 'none' }}>
    //                                         <Card.Link style={{ color: 'orange', fontSize: '20px' }}>100.000đ</Card.Link>
    //                                     </a>
    //                                 </Card.Body>
    //                             </Card>
    //                         </a>
    //                     </div>
    //                     <div class="col-6 col-md-3">
    //                         <a href="https://example.com/san-pham/123" style={{ textDecoration: 'none' }}>
    //                             <Card style={{ width: '16rem' }}>
    //                                 <Card.Img variant="top" src="https://kidstyle.com.vn/images/detailed/4/dodam_k4qz-tw.jpg" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
    //                                 <Card.Body>
    //                                     <Card.Title style={{ color: 'black' }}>Product Name</Card.Title>
    //                                 </Card.Body>
    //                                 <Card.Body>
    //                                     <a href="https://example.com/mua?gia=9.99" style={{ textDecoration: 'none' }}>
    //                                         <Card.Link style={{ color: 'orange', fontSize: '20px' }}>100.000đ</Card.Link>
    //                                     </a>
    //                                 </Card.Body>
    //                             </Card>
    //                         </a>
    //                     </div>

    //                     <div class="col-6 col-md-3">
    //                         <a href="https://example.com/san-pham/123" style={{ textDecoration: 'none' }}>
    //                             <Card style={{ width: '16rem' }}>
    //                                 <Card.Img variant="top" src="https://kidstyle.com.vn/images/detailed/4/dodam_k4qz-tw.jpg" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
    //                                 <Card.Body>
    //                                     <Card.Title style={{ color: 'black' }}>Product Name</Card.Title>
    //                                 </Card.Body>
    //                                 <Card.Body>
    //                                     <a href="https://example.com/mua?gia=9.99" style={{ textDecoration: 'none' }}>
    //                                         <Card.Link style={{ color: 'orange', fontSize: '20px' }}>100.000đ</Card.Link>
    //                                     </a>
    //                                 </Card.Body>
    //                             </Card>
    //                         </a>
    //                     </div>
    //                     <div class="col-6 col-md-3">
    //                         <a href="https://example.com/san-pham/123" style={{ textDecoration: 'none' }}>
    //                             <Card style={{ width: '16rem' }}>
    //                                 <Card.Img variant="top" src="https://kidstyle.com.vn/images/detailed/4/dodam_k4qz-tw.jpg" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
    //                                 <Card.Body>
    //                                     <Card.Title style={{ color: 'black' }}>Product Name</Card.Title>
    //                                 </Card.Body>
    //                                 <Card.Body>
    //                                     <a href="https://example.com/mua?gia=9.99" style={{ textDecoration: 'none' }}>
    //                                         <Card.Link style={{ color: 'orange', fontSize: '20px' }}>100.000đ</Card.Link>
    //                                     </a>
    //                                 </Card.Body>
    //                             </Card>
    //                         </a>
    //                     </div>
    //                     <div class="col-6 col-md-3">
    //                         <a href="https://example.com/san-pham/123" style={{ textDecoration: 'none' }}>
    //                             <Card style={{ width: '16rem' }}>
    //                                 <Card.Img variant="top" src="https://kidstyle.com.vn/images/detailed/4/dodam_k4qz-tw.jpg" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
    //                                 <Card.Body>
    //                                     <Card.Title style={{ color: 'black' }}>Product Name</Card.Title>
    //                                 </Card.Body>
    //                                 <Card.Body>
    //                                     <a href="https://example.com/mua?gia=9.99" style={{ textDecoration: 'none' }}>
    //                                         <Card.Link style={{ color: 'orange', fontSize: '20px' }}>100.000đ</Card.Link>
    //                                     </a>
    //                                 </Card.Body>
    //                             </Card>
    //                         </a>
    //                     </div>
    //                     <div class="col-6 col-md-3">
    //                         <a href="https://example.com/san-pham/123" style={{ textDecoration: 'none' }}>
    //                             <Card style={{ width: '16rem' }}>
    //                                 <Card.Img variant="top" src="https://kidstyle.com.vn/images/detailed/4/dodam_k4qz-tw.jpg" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
    //                                 <Card.Body>
    //                                     <Card.Title style={{ color: 'black' }}>Product Name</Card.Title>
    //                                 </Card.Body>
    //                                 <Card.Body>
    //                                     <a href="https://example.com/mua?gia=9.99" style={{ textDecoration: 'none' }}>
    //                                         <Card.Link style={{ color: 'orange', fontSize: '20px' }}>100.000đ</Card.Link>
    //                                     </a>
    //                                 </Card.Body>
    //                             </Card>
    //                         </a>
    //                     </div>

    //                 </div>
    //             </div>
    //         </div>


    //         <div class="intro">
    //             <h1>
    //                 <span className="intro-heading">Welcome to FPT old stuff exchange</span>
    //             </h1>
    //             <p>Welcome to our website, the ultimate destination for buying and selling second-hand goods online! Our platform connects buyers and sellers from all over the world, making it easy to find the best deals on pre-owned items.

    //                 We offer a wide range of products, from electronics and appliances to clothing and home decor. All items listed on our website are thoroughly checked and verified by our team, so you can be sure that you're getting a high-quality product.

    //                 Our user-friendly interface allows you to easily browse through different categories and filter search results according to your preferences. You can also create your own profile and start selling your own items in just a few clicks.</p>
    //         </div>
    //     </>
    // )
    return (
        <>
            <HeaderFE />
            {oldOne}
            {/* <br />
            <br />
            <br />
            <br />
            {newOne} */}
            <FooterFE />
        </>
    )
}
