import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from 'react'
import { LoadingSpinner } from '../../../components/loading/LoadingSpinner';
import { Pagination } from '../../../components/pagination/Pagination';
import Cookies from 'universal-cookie'
import axios from "axios"
import Menu from "../Sidebar";
import { toLowerCaseNonAccentVietnamese } from '../../nonAccentVietnamese.js'


export const UserManagement = () => {
    axios.defaults.baseURL = 'https://localhost:7115'
    const cookies = new Cookies();
    const [all, setAll] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const [currentPage, setCurrentPage] = useState(NaN)
    const [query, setQuery] = useState('')

    const fetchData = async () => {
        await axios.get('/account/get-account-list')
            .then((data) => {
                const list = data.data.slice(0).reverse()
                setAll(list)
                setFilteredList(list)
            })
            .catch((e) => { console.log(e) })
    }

    useEffect(() => {
        var updatedList = all;
        if (query !== '') {
            updatedList = updatedList.filter((item) => {
                let email = item.email.toLowerCase()
                let phoneNo = item.phoneNo.toLowerCase()
                let name = toLowerCaseNonAccentVietnamese(item.fullname)
                let search = toLowerCaseNonAccentVietnamese(query)
                return name.indexOf((search || '')) !== -1 ||
                    email.indexOf((search || '')) !== -1 ||
                    phoneNo.indexOf((search || '')) !== -1
            });

        }
        setFilteredList(updatedList);
    }, [query])

    useEffect(() => {
        let cookie = cookies.get('jwt_authorization')
        axios.defaults.headers.common['Authorization'] = 'bearer ' + cookie;
        fetchData()
    }, [])


    const renderAccount = (
        <>
            <div class="col-sm-7 my-1">
                <input value={query} onChange={(e) => { setQuery(e.target.value) }} type="text" name='keyword' class="form-control" id="inlineFormInputName" placeholder="Search for an account here" />
            </div>
            {
                filteredList.length > 0 ?
                    <div className="list-box">
                        <table className="table custom-table">
                            <thead>
                                <tr className='mb-1'>
                                    <th scope="col" className='text-center'>Account Id</th>
                                    <th scope="col">Full name</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone number</th>
                                    <th scope="col">Credibility score</th>
                                    <th scope="col">Point Balance</th>
                                    <th scope="col">Status</th>
                                    <th scope="col" style={{ textAlign: "center" }}>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredList.map((account) => (
                                    <tr>
                                        <td>{account.accountId}</td>
                                        <td>{account.fullname}</td>
                                        <td>{account.address}</td>
                                        <td>{account.email}</td>
                                        <td>{account.phoneNo}</td>
                                        <td>{account.credibilityPoint}</td>
                                        <td>{account.pointBalance}</td>
                                        <td>{account.isActive ? <div className="text-primary">Active</div> : <div className="text-danger">Inactive</div>}</td>
                                        <td className='text-center'>
                                            <div className="btn btn-info">
                                                <Link to="/admin/user-detail" state={account.accountId}>
                                                    Change Active Status
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table >
                    </div> :
                    <strong className="text-dark">No Account Found!</strong>
            }
        </>
    )

    return (
        <div className='d-flex'>
            <div className='flex-1 container text-white bg-body-tertiary w-100 min-vh-100'>
                <h5 className='text-dark m-3 text-capitalize'>Admin User list</h5>
                {renderAccount}
            </div>
        </div>
    )
}
