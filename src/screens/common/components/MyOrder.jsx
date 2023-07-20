import React, { useEffect, useState } from 'react';
import HeaderFE from "../../../components/HeaderFE";
import FooterFE from "../../../components/FooterFE";
import Cookies from 'universal-cookie'
import axios from "axios"
import jwt from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, List, ListItem } from '@mui/material';
import cn from 'classnames'
import { toLowerCaseNonAccentVietnamese } from '../../nonAccentVietnamese.js'

export const Order = () => {
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
  const [choice, setChoice] = useState('');
  const [result, setResult] = useState('');
  const handleClickOpen = (input) => {
    setChoice(input)
    setOpen(true);
  };

  const handleComplete = () => {
    switch (choice) {
      case 'accept':
        console.log(selected.orderId)
        const responseAccept = axios({
          url: "/seller-accept-request",
          params: { orderId: selected.orderId },
          method: 'put'
        }).then((data) => { setResult(data.data) })
          .catch((e) => { console.log(e) })
        break
      case 'cancel':
        console.log(selected.orderId)
        const responseCancel = axios({
          url: "/seller-cancel-exchange",
          params: { orderId: selected.orderId },
          method: 'put'
        }).then((data) => { setResult(data.data) })
          .catch((e) => { console.log(e) })
        break
      case 'complete':
        console.log(selected.orderId)
        const responseComplete = axios({
          url: "/confirm-finished",
          params: { orderId: selected.orderId },
          method: 'put'
        }).then((data) => { setResult(data.data) })
          .catch((e) => { console.log(e) })
        break
    }
  };

  const handleClose = () => {
    setOpen(false);
  };


  const fetchData = async () => {
    await axios.get('/get-all-order-list')
      .then((data) => {
        if (data.data.length > 0) {
          const list = data.data.slice(0).reverse()
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
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Are you sure?</DialogTitle>
        <div className='row dialog'>
          {result !== "" ? <>
            <DialogTitle></DialogTitle>
            <ListItem>
              <p className='col-md-12 dialog-p'>
                {result}
              </p>
            </ListItem>
            <ListItem>
              <div className='col-md-12'>
                <button className='btn btn-info' onClick={() => { handleClose() }}>Back</button>
              </div>
            </ListItem> </> : <List>
            <ListItem>
              {choice === 'complete' ? <p className='col-md-12 dialog-p'>Once you have completed this request,
                the requested post will be marked as 'Comleted' and your request is done.
              </p> : choice === 'accept' ? <p className='col-md-12 dialog-p'>Once you have accepted this request,
                the requested post will be marked as 'Processing' and your post will be hidden
              </p> : <p> Once you have cancelled this request, the requested user will be announced and the request is cancelled
              </p>}
            </ListItem>
            <ListItem>
              <div className='col-md-12'>
                <button className='btn btn-info col-md-3 yes-btn' onClick={() => { handleComplete() }}>Yes</button>
                <button className='btn btn-info col-md-3 no-btn' onClick={() => { handleClose() }}>No</button>
              </div>
            </ListItem>
          </List>}
        </div>
      </Dialog>
    </>
  )
  return (
    <>
      <HeaderFE />
      <div className=''>
        {dialog}
        <div className="exchange-order-container" style={{ padding: '10px' }}>
          <section className="bg0 p-t-75 p-b-120" style={{ height: '600px', padding: '0 20%' }}>
            <h3 class="mb-12 Account_box__yr82T p-6 text-black-600 text-18 mb-12">
              <strong>
                My Order
              </strong>
              <h6>*People order sent to you!</h6></h3>
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
                  }} class={cn("nav-link ", status == 'Processing' && 'active')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected=''>Processing Order ({processing.length})</button>
                  <button onClick={() => {
                    setFilteredList(cancelled)
                    setStatus('Cancelled')
                  }} class={cn("nav-link ", status == 'Cancelled' && 'active')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected=''>Cancelled Order ({cancelled.length})</button>
                  <button onClick={() => {
                    setFilteredList(completed)
                    setStatus('Completed')
                  }} class={cn("nav-link ", status == 'Completed' && 'active')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected=''>Completed Order ({completed.length})</button>
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
                        <th scope="col">Buyer Name</th>
                        <th scope="col">Buyer Contact</th>
                        <th scope="col">Created Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        filteredList.map((order, index) => (
                          <tr>
                            <td>
                              <div>
                                <div>{order.productName}</div>
                                <button onClick={() => { navigate('/post-detail?id=' + order.postId) }} className='btn btn-info'>View Post</button>
                              </div>
                            </td>
                            <td>{order.price}</td>
                            <td className=''>
                              <div className=''>{order.buyerName}</div>
                              <button onClick={() => { navigate('/user-detail?id=' + order.buyerId) }} className=' btn btn-info'>View Profile</button>
                            </td>
                            <td>
                              <div>{order.buyerPhoneNumber}</div>
                              <div>{order.buyerEmail}</div>
                            </td>
                            <td>{String(order.orderDate).substring(0, 10)}</td>
                            <td>{order.orderStatusName}</td>
                            <td className='mx-2'>
                              {order.orderStatusName === 'Processing' ? <button style={{ width: "100px ", margin: '10px 0px' }} onClick={() => {
                                setSelected(order)
                                handleClickOpen('complete')
                              }} className='btn btn-info yes-btn'><strong><div>Complete</div><div>this request</div></strong></button> : order.orderStatusName === 'Cancelled' || order.orderStatusName === 'Completed' ?
                                <button disabled className='btn btn-dark'><div>{order.orderStatusName} &emsp;</div></button> :
                                <>
                                  <button style={{ width: "100px ", margin: '10px 0px' }} onClick={() => {
                                    setSelected(order)
                                    handleClickOpen('accept')
                                  }} className='btn btn-info yes-btn'><strong><div>Accept</div><div>this request</div></strong></button>
                                  <button style={{ width: "100px ", margin: '10px 0px' }} onClick={() => {
                                    setSelected(order)
                                    handleClickOpen('cancel')
                                  }} className='btn btn-info no-btn'><strong><div>Cancel</div><div>this request</div></strong></button>
                                </>}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                :
                <strong>You haven't recieved any order yet!</strong>
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