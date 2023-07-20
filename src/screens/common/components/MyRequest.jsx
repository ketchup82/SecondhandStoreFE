import React, { useEffect, useState } from 'react';
import HeaderFE from "../../../components/HeaderFE";
import FooterFE from "../../../components/FooterFE";
import Cookies from 'universal-cookie'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContentText, DialogTitle, List, ListItem } from '@mui/material';
import cn from 'classnames'
import { toLowerCaseNonAccentVietnamese } from '../../nonAccentVietnamese.js'

export const Request = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [all, setAll] = useState([])
  const [processing, setProcessing] = useState([])
  const [cancelled, setCancelled] = useState([])
  const [completed, setCompleted] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [selected, setSelected] = useState([])
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('All');
  const [isCompleted, setIsCompleted] = useState(false)
  const [error, setError] = useState('')

  const handleClickOpen = () => {
    setError('')
    setIsCompleted(false)
    setOpen(true);
  };

  const handleComplete = async (requestId) => {
    console.log(selected.orderId)
    const response = await axios({
      url: '/buyer-cancel-exchange',
      params: { orderId: selected.orderId },
      method: 'put'
    }).catch((e) => {
      setError("Something went wrong, please try again later!")
      console.log(e)
    })
    setIsCompleted(true)
  };

  const handleClose = () => {
    setOpen(false);
  };


  const fetchData = async () => {
    await axios.get('/get-all-request-list')
      .then((data) => {
        if (data.data.length > 0) {
          const list = data.data.slice(0).reverse()
          console.log(list)
          setAll(list)
          setProcessing(list.filter((item) => { return item.orderStatusName === 'Processing' }))
          setCancelled(list.filter((item) => { return item.orderStatusName === 'Cancelled' }))
          setCompleted(list.filter((item) => { return item.orderStatusName === 'Completed' }))
          setFilteredList(list)
        }
      })
      .catch(e => console.log(e))
  }

  useEffect(() => {
    let cookie = cookies.get('jwt_authorization')
    if (cookie !== undefined) {
      axios.defaults.headers.common['Authorization'] = 'bearer ' + cookie;
      fetchData()
    }
    else {
      navigate('/auth/login', { replace: true })
    }
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
      case 'Processing':
        updatedList = [...processing]
        break
      case 'Cancelled':
        updatedList = [...cancelled]
        break
      case 'Completed':
        updatedList = [...completed]
        break
    }
    if (data['keyword'] !== '') {
      updatedList = updatedList.filter((item) => {
        let pName = toLowerCaseNonAccentVietnamese(item.productName)
        let aName = toLowerCaseNonAccentVietnamese(item.buyerName)
        let query = toLowerCaseNonAccentVietnamese(data['keyword'])
        return pName.indexOf((query || '')) !== -1 || aName.indexOf((query || '')) !== -1
      });
    }
    if (data['date'] !== '') {
      updatedList = updatedList.filter((item) => {
        return new Date(item.orderDate).getTime() > new Date(data['date']).getTime()
      })
    }
    setFilteredList(updatedList)
  }

  const dialog = (
    <>
      <Dialog onClose={() => { handleClose() }} open={open}>
        <div className='row dialog'>
          <List>
            {isCompleted ? <>
              <DialogTitle></DialogTitle>
              <ListItem>
                <p className='col-md-12 dialog-p'>
                  {error === "" ? <div className='text-success'>Successfully cancel request for<div><strong className='h3'>{selected.productName}</strong></div></div> : <div className='text-danger'>{error}</div>}
                </p>
              </ListItem>
              <ListItem>
                <div className='col-md-12'>
                  <button className='btn btn-info' onClick={() => { handleClose() }}>Back</button>
                </div>
              </ListItem> </> : <>
              <DialogTitle>Do you want to cancel the request for <strong className='h3'>{selected.productName}</strong>?</DialogTitle>
              <ListItem>
                <p className='col-md-12 dialog-p'>Once you have completed this request,
                  the requested post will be marked as 'completed'
                  and sold to the buyer</p>
              </ListItem>
              <ListItem>
                <div className='col-md-12'>
                  <button className='btn btn-info col-md-3 yes-btn' onClick={() => { handleComplete(selected.requestId) }}>Yes</button>
                  <button className='btn btn-info col-md-3 no-btn' onClick={() => { handleClose() }}>No</button>
                </div>
              </ListItem>
            </>
            }
          </List>
        </div>
      </Dialog>
    </>
  )

  return (
    <>
      <HeaderFE />
      {dialog}
      <div className=''>
        <div className="exchange-order-container" style={{ padding: '10px' }}>
          <section className="bg0 p-t-75 p-b-120" style={{ height: '600px', padding: '0 20%' }}>
            <h3 class="mb-12 Account_box__yr82T p-6 text-black-600 text-18 mb-12">
              <strong>My Request</strong>
              <h6>*Your request sent to people!</h6></h3>
            <div class="mb-12 px-8 py-12 bg-white">
              <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                  <button onClick={() => {
                    setFilteredList(all)
                    setStatus('All')
                  }} class={cn("nav-link ", status == 'All' && 'active')} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="">All ({all.length})</button>
                  <button onClick={() => {
                    setFilteredList(processing)
                    setStatus('Processing')
                  }} class={cn("nav-link ", status == 'Processing' && 'active')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected=''>Processing Request ({processing.length})</button>
                  <button onClick={() => {
                    setFilteredList(cancelled)
                    setStatus('Cancelled')
                  }} class={cn("nav-link ", status == 'Cancelled' && 'active')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected=''>Cancelled Request ({cancelled.length})</button>
                  <button onClick={() => {
                    setFilteredList(completed)
                    setStatus('Completed')
                  }} class={cn("nav-link ", status == 'Completed' && 'active')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected=''>Completed Request ({completed.length})</button>
                  <div></div>
                </div>
              </nav>
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
                        case 'Processing':
                          setFilteredList(processing)
                          break
                        case 'Cancelled':
                          setFilteredList(cancelled)
                          break
                        case 'Completed':
                          setFilteredList(completed)
                          break
                      }
                    }} style={{ marginTop: '1%' }} type="button" class="btn btn-primary">Clear
                    </button>
                    <button style={{ marginTop: '1%' }} type="submit" class="btn btn-primary">Search</button>
                  </div>
                </div>
              </form>
              {filteredList.length > 0 ?
                <div className='list-box'>
                  <table className="table custom-table">
                    <thead>
                      <tr className='mb-1'>
                        <th scope="col">Post</th>
                        <th scope="col">Price</th>
                        <th scope="col">Seller Name</th>
                        <th scope="col">Seller Contact</th>
                        <th scope="col">Created Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        filteredList.map((order) => (
                          <>
                            <tr>
                              <td>
                                <div>
                                  <div>{order.productName}</div>
                                  <button onClick={() => { navigate('/post-detail?id=' + order.postId) }} className='btn btn-info'>View Post</button>
                                </div>
                              </td>
                              <td>{order.price}</td>
                              <td className=''>
                                <div className=''>{order.sellerName}</div>
                                <button onClick={() => { navigate('/user-detail?id=' + order.sellerId) }} className=' btn btn-info'>View Profile</button>
                              </td>
                              <td>
                                <div>{order.sellerPhoneNumber}</div>
                                <div>{order.sellerEmail}</div>
                              </td>
                              <td>{String(order.orderDate).substring(0, 10)}</td>
                              <td>{order.orderStatusName}</td>
                              <td className='mx-2'>
                                {order.orderStatusName === 'Cancelled' || order.orderStatusName === 'Completed' ?
                                  <button disabled className='btn btn-dark'><div>{order.orderStatusName} &emsp;</div></button> :
                                  <button onClick={() => {
                                    setSelected(order)
                                    console.log(selected)
                                    handleClickOpen()
                                  }} className='btn btn-success add-btn'><strong>Cancel request</strong></button>
                                }
                              </td>
                            </tr>
                          </>
                        ))}
                    </tbody>
                  </table>
                </div>
                :
                <strong>You haven't request anything yet!</strong>
              }
            </div>
          </section>
        </div>
        <br />
        <br />
      </div>
      <FooterFE />
    </>
  )
}