import React, { useEffect, useState } from 'react'
import FooterFE from '../../../components/FooterFE'
import HeaderFE from '../../../components/HeaderFE'
import ImageBanner from "../../../assets/images/banner_image.svg";
import ShirtMU from "../../../assets/images/shirt-mu.png";
import ShirtGame from "../../../assets/images/shirt-game.png";
import ShirtT1 from "../../../assets/images/shirt-t1.png";
import Headphone from "../../../assets/images/headphone.png";

const data = {
    items: [
        {
            id: 1,
            type: "clothes",
            name: "MU Shirt",
            price: 10,
            thumbnail: ShirtMU
        },
        {
            id: 2,
            type: "clothes",
            name: "Game Shirt",
            price: 20,
            thumbnail: ShirtT1
        },
        {
            id: 3,
            type: "clothes",
            name: "Shirt Game",
            price: 30,
            thumbnail: ShirtGame
        },
        {
            id: 4,
            type: "electric",
            name: "Headphone 1",
            price: 40,
            thumbnail: Headphone
        },
        {
            id: 5,
            type: "clothes",
            name: "MU Shirt 1",
            price: 50,
            thumbnail: ShirtMU
        },
        {
            id: 6,
            type: "clothes",
            name: "Game Shirt 1",
            price: 60,
            thumbnail: ShirtT1
        },
        {
            id: 7,
            type: "clothes",
            name: "Shirt Game 2",
            price: 70,
            thumbnail: ShirtGame
        },
        {
            id: 8,
            type: "electric",
            name: "Headphone 2",
            price: 80,
            thumbnail: Headphone
        },
        {
            id: 9,
            type: "clothes",
            name: "MU Shirt 3",
            price: 90,
            thumbnail: ShirtMU
        },
        {
            id: 10,
            type: "clothes",
            name: "Game Shirt 4",
            price: 80,
            thumbnail: ShirtT1
        },
        {
            id: 11,
            type: "clothes",
            name: "Shirt Game 4",
            price: 70,
            thumbnail: ShirtGame
        },
        {
            id: 12,
            type: "electric",
            name: "Headphone 3",
            price: 60,
            thumbnail: Headphone
        }
    ]
}

export const HomeFilter = () => {
    const [type, setType] = useState("");
    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems(
            data.items.filter((item) => item.type.includes(type))
        )
    }, [type])

    const handleSortType = (type) => {
        let sortedItems = [];

        switch (type) {
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

    return (
        <>
            <HeaderFE />
            <div className="position-relative admin__home_banner">
                <h3 className="p-5 banner_title">
                    Second hand exchange where you can find amazing things
                </h3>
                <img className="admin__home_banner_image position-absolute top-0 end-0 h-100" src={ImageBanner} alt="" />
            </div>

            <div className="container text-center mt-5">
                <div className="row">
                    <div className="col">
                        <div className="card card-color_linear border-0">
                            <div className="card-body">
                                <h1>Popular</h1>
                                <div className="d-flex justify-content-end mt-5">
                                    <button type="button" className="btn btn-success btn-lg">View More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card card-color_linear border-0">
                            <div className="card-body">
                                <h1>Product</h1>
                                <div className="d-flex justify-content-end mt-5">
                                    <button type="button" className="btn btn-success btn-lg">View More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className="fw-bold fs-1 m-5 text-center">Result for "{type == "" ? "all" : type}" ({items.length} items found) </h1>

            <div className="container">
                <div className='d-flex'>
                    <div className="">
                        <ul className="list-group" style={{ width: "280px" }}>
                            <li className="list-group-item" onClick={() => setType("clothes")} style={{ background: "#FFDB58", cursor: "pointer" }}>Clothes</li>
                            <li className="list-group-item" onClick={() => setType("electric")} style={{ background: "#FFDB58", cursor: "pointer" }}>Electric</li>
                            <li className="list-group-item" onClick={() => setType("")} style={{ background: "#FFDB58", cursor: "pointer" }}>Others</li>
                        </ul>
                    </div>
                    <div className="">
                        <div class="dropdown m-bottom-3 mx-5 d-flex justify-content-end">
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                                Sort by
                            </button>
                            <div class="dropdown-menu">
                                <p class="dropdown-item" onClick={() => handleSortType("nameAZ")} style={{ cursor: "pointer" }}>Name(a-z)</p>
                                <p class="dropdown-item" onClick={() => handleSortType("nameZA")} style={{ cursor: "pointer" }}>Name(z-a)</p>
                                <p class="dropdown-item" onClick={() => handleSortType("priceAZ")} style={{ cursor: "pointer" }}>Price(a-z)</p>
                                <p class="dropdown-item" onClick={() => handleSortType("priceZA")} style={{ cursor: "pointer" }}>Price(z-a)</p>
                            </div>
                        </div>

                        <div className="row row-cols-3 g-5 mx-5">
                            {
                                paginatedItems.map((item) => {
                                    return (
                                        <div key={item.id} className="col p-3">
                                            <div className="card h-100 border-0 text-center">
                                                <img src={item.thumbnail} className="card-img-top" alt="..." />
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <p className="card-text">{item.price}$</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className='col-12 d-flex justify-content-center'>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li class="page-item page-link" onClick={() => {
                                            if(currentPage != 1) {
                                                handlePageChange(currentPage - 1)
                                            }
                                        }}>Previous</li>
                                       
                                        <li class="page-item page-link" onClick={() => {
                                            if(currentPage != Math.round(items.length / 5)) {
                                                handlePageChange(currentPage + 1)
                                            }
                                        }}>Next</li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterFE />
        </>
    )
}
