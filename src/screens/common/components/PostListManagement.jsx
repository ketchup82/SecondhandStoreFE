import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from 'react'
import { LoadingSpinner } from '../../../components/loading/LoadingSpinner';
import Cookies from 'universal-cookie'
import axios from "axios"
import HeaderFE from "../../../components/HeaderFE";
import FooterFE from "../../../components/FooterFE";
import { Pagination } from '@mui/material';
import { toLowerCaseNonAccentVietnamese } from '../../nonAccentVietnamese.js'
import cn from 'classnames'
import { Card, Stack } from "react-bootstrap";

const itemsPerPage = 8;

export const PostListManagement = () => {
    axios.defaults.baseURL = 'https://localhost:7115'
    const navigate = useNavigate()
    const cookies = new Cookies()
    const [all, setAll] = useState([])
    const [pending, setPending] = useState([])
    const [accepted, setAccepted] = useState([])
    const [rejected, setRejected] = useState([])
    const [completed, setCompleted] = useState([])
    const [isError, setIsError] = useState(false)
    const [filteredList, setFilteredList] = useState([])
    const [status, setStatus] = useState('All');
    const [isLoading, setIsLoading] = useState(true)
    let VND = new Intl.NumberFormat('vn-VN', {
        currency: 'VND',
    });

    const fetchData = async () => {
        await axios.get('/posts/get-user-posts')
            .then((data) => {
                const list = data.data.slice(0).reverse()
                setAll(list)
                setPending(list.filter((item) => { return item.statusName === 'Pending' }))
                setAccepted(list.filter((item) => { return item.statusName === 'Accepted' }))
                setRejected(list.filter((item) => { return item.statusName === 'Rejected' }))
                setCompleted(list.filter((item) => { return item.statusName === 'Completed' }))
                setFilteredList(list)
                setIsLoading(false)
            })
            .catch(e => setIsError(e))
    }

    useEffect(() => {
        let cookie = cookies.get('jwt_authorization')
        if (cookie === undefined) navigate('/auth/login', { replace: true })
        axios.defaults.headers.common['Authorization'] = 'bearer ' + cookie;
        fetchData()
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)
        console.log(data)
        var updatedList
        switch (status) {
            case 'All':
                updatedList = [...all]
                break
            case 'Pending':
                updatedList = [...pending]
                break
            case 'Accepted':
                updatedList = [...accepted]
                break
            case 'Rejected':
                updatedList = [...rejected]
                break
            case 'Completed':
                updatedList = [...completed]
                break
        }
        if (data['keyword'] !== '') {
            updatedList = updatedList.filter((item) => {
                let name = toLowerCaseNonAccentVietnamese(item.productName)
                let query = toLowerCaseNonAccentVietnamese(data['keyword'])
                return name.indexOf((query || '')) !== -1
            });
        }
        if (data['date'] !== '') {
            updatedList = updatedList.filter((item) => {
                return new Date(item.orderDate).getTime() > new Date(data['date']).getTime()
            })
        }
        setFilteredList(updatedList)
    }

    const [paginatedItems, setPaginatedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const paginate = (filteredList, currentPage, itemsPerPage) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredList.slice(startIndex, startIndex + itemsPerPage);
    }
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        setCurrentPage(1);
        setPaginatedItems(paginate(filteredList, currentPage, itemsPerPage));
    }, [filteredList])
    useEffect(() => {
        setPaginatedItems(paginate(filteredList, currentPage, itemsPerPage));
    }, [currentPage])

    const renderPost = (
        <div className="mb-12 Account_box__yr82T p-6 text-black-600 text-18 mb-12" >
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button onClick={() => {
                        setFilteredList(all)
                        setStatus('All')
                    }} class={cn("nav-link ", status == 'All' && 'active')} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="">All ({all.length})</button>
                    <button onClick={() => {
                        setFilteredList(pending)
                        setStatus('Pending')
                    }} class={cn("nav-link ", status == 'Pending' && 'active')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected=''>Pending Post ({pending.length})</button>
                    <button onClick={() => {
                        setFilteredList(accepted)
                        setStatus('Accepted')
                    }} class={cn("nav-link ", status == 'Accepted' && 'active')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected=''>Accepted Post ({accepted.length})</button>
                    <button onClick={() => {
                        setFilteredList(rejected)
                        setStatus('Rejected')
                    }} class={cn("nav-link ", status == 'Rejected' && 'active')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected=''>Rejected Post ({rejected.length})</button>
                    <button onClick={() => {
                        setFilteredList(completed)
                        setStatus('Completed')
                    }} class={cn("nav-link ", status == 'Completed' && 'active')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected=''>Completed Post ({completed.length})</button>
                    <div></div>
                </div>
            </nav>
            <div className="">
                <form id="myForm" onSubmit={(e) => onSubmit(e)}>
                    <div class="form-row align-items-center">
                        <div class="col-sm-3 my-1">
                            <input type="text" name='keyword' class="form-control" id="inlineFormInputName" placeholder="Enter product name here" />
                        </div>
                        <div class="col-sm-3 my-1">
                            <div class="input-group">
                                <input type="date" name='date' class="form-control" id="inlineFormInputGroupUsername" />
                            </div>
                        </div>
                        <div class="col-auto my-1">
                            <button onClick={() => {
                                document.getElementById("myForm").reset()
                                switch (status) {
                                    case 'All':
                                        setFilteredList(all)
                                        break
                                    case 'Pending':
                                        setFilteredList(pending)
                                        break
                                    case 'Accepted':
                                        setFilteredList(accepted)
                                        break
                                    case 'Rejected':
                                        setFilteredList(rejected)
                                        break
                                    case 'Completed':
                                        setFilteredList(completed)
                                        break
                                }
                            }} style={{ marginTop: '1%' }} type="button" class="btn btn-primary">Clear
                            </button>
                            <button style={{ marginTop: '1%' }} type="submit" class="btn btn-primary">Search</button>
                        </div>
                        <div className="col-auto my-1">
                            <Stack alignItems="center">
                                <Pagination sx={{}} count={Math.ceil(filteredList.length / itemsPerPage)} onChange={(e, p) => { handlePageChange(e, p) }} variant="outlined" shape="rounded" />
                            </Stack>
                        </div>
                    </div>
                </form>
                <div className="list-box">
                    {filteredList.length === 0 ? <h5 className="text-dark m-3 text-capitalize">You have no post!</h5> : <>
                        <div className="row mx-auto">
                            {paginatedItems.map((item) => (
                                <div class="col-md-3">
                                    <div className="post-list-card">
                                        <a href={"/post-detail?id=" + item.postId} style={{ textDecoration: 'none' }}>
                                            <Card.Img variant="top" className='img-fluid' src={item.images[0].ImageUrl} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                                            <Card.Body>
                                                <div style={{ color: 'black' }}><strong>{item.productName}</strong></div>
                                                <div style={{ color: 'black' }}>{String(item.createdDate).substring(0, 10)}</div>
                                                <div style={{ color: 'orange', fontSize: '20px' }}>{VND.format(item.price).replaceAll(',', '.')} VND</div>
                                                <div className={cn(item.statusName === 'Completed' ? 'text-secondary' : item.statusName === 'Rejected' ? 'text-danger' : item.statusName === 'Accepted' ? 'text-success' : 'text-dark')}>{item.statusName}</div>
                                            </Card.Body>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>}
                </div>
            </div>
        </div>
    )

    return (
        <>
            <HeaderFE />
            <div className='d-flex padding-bot'>
                <div className='flex-1 container text-white bg-body-tertiary w-100 min-vh-100'>
                    <h5 className='text-dark m-3'>My Posts</h5>
                    {isLoading ? <LoadingSpinner /> : renderPost}
                </div>
            </div>
            <FooterFE />
        </>
    )
}
