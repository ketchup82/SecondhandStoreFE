import React, { useEffect, useState } from 'react';
import HeaderFE from "../../../components/HeaderFE";
import FooterFE from "../../../components/FooterFE";
import Cookies from 'universal-cookie'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, List, ListItem } from '@mui/material';
import cn from 'classnames'

export const Request = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [orders, setOrders] = useState([])
  const [filtered, setFiltered] = useState([])
  const [isActive, setIsActive] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleComplete = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const fetchData = async () => {
    await axios.get('/get-all-request-list')
      .then((data) => {
        if (data.data.length > 0) {
          setOrders(data.data.slice(0).reverse())
          setFiltered(data.data.slice(0).reverse())
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
    console.log(data['keyword'])
    if (data['date'] !== '') {
      var updatedList = [...orders]
      updatedList = updatedList.filter((item) => {
        return new Date(item.orderDate).getTime() > new Date(data['date']).getTime()
      })
      setFiltered(updatedList)
    }
    else setFiltered(orders)
    if (data['keyword'] === '') {
      setFiltered(orders)
    }
    else {
      var updatedList1 = [...orders]
      updatedList1 = updatedList1.filter((item) => {
        const product = item.productName.toLowerCase()
        const buyer = item.buyerName.toLowerCase()
        const isTrue = (product.indexOf((data['keyword'] || '').toLowerCase()) !== -1) ||
          (buyer.indexOf((data['keyword'] || '').toLowerCase()) !== -1)
        return isTrue
      })
      setFiltered(updatedList1)
    }
  }

  const handleType = (type) => {
    setIsActive(type)
    var updatedList = [...orders]
    updatedList = updatedList.filter((item) => {
      return String(item.orderStatusName).includes(type)
    })
    console.log(updatedList)
    setFiltered(updatedList)
  }

  const dialog = (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Are you sure?</DialogTitle>
        <div className='row dialog'>
          <List>
            <ListItem>
              <p className='col-md-12 dialog-p'>Once you have cancel this request,
                the request  will be marked as 'Cancelled'
              </p>
            </ListItem>
            <ListItem>
              <div className='col-md-12'>
                <button className='btn btn-info col-md-3 yes-btn' onClick={() => { handleComplete() }}>Yes</button>
                <button className='btn btn-info col-md-3 no-btn' onClick={() => { handleClose() }}>No</button>
              </div>
            </ListItem>
          </List>
        </div>
      </Dialog>
    </>
  )
  return (
    <>
      <HeaderFE />
      <div className='padding-40'>
        {dialog}
        <div className="exchange-order-container" style={{ border: '1px solid black', padding: '10px' }}>
          <section className="bg0 p-t-75 p-b-120" style={{ height: '500px', padding: '0 20%' }}>
            <h3 class="mb-12 Account_box__yr82T p-6 text-black-600 text-18 mb-12"><strong>My Request</strong><h6>*Your request for products!</h6></h3>
            <div class="mb-12 px-8 py-12 bg-white">
              <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                  <button onClick={() => {

                    handleType('')
                  }} class={cn("nav-link ", isActive == '' && 'active')} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="">All</button>
                  <button onClick={() => {
                    handleType('Pending')
                  }} class={cn("nav-link ", isActive == 'Pending' && 'active')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected=''>Pending Order</button>
                  <button onClick={() => {
                    handleType('Cancelled')
                  }} class={cn("nav-link ", isActive == 'Cancelled' && 'active')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected=''>Cancelled Order</button>
                  <button onClick={() => {
                    handleType('Completed')
                  }} class={cn("nav-link ", isActive == 'Completed' && 'active')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected=''>Completed Order</button>
                  <div></div>
                </div>
              </nav>
              <form id="myForm" onSubmit={(e) => onSubmit(e)}>
                <div class="form-row align-items-center">
                  <div class="col-sm-3 my-1">
                    <input type="text" name='keyword' class="form-control" id="inlineFormInputName" placeholder="Enter buyer name here" />
                  </div>
                  <div class="col-sm-3 my-1">
                    <div class="input-group">
                      <input type="date" name='date' class="form-control" id="inlineFormInputGroupUsername" />
                    </div>
                  </div>
                  <div class="col-auto my-1">
                    <button onClick={() => {
                      document.getElementById("myForm").reset()
                      setFiltered(orders)
                    }} style={{ marginTop: '1%' }} type="button" class="btn btn-primary">Clear
                    </button>
                    <button style={{ marginTop: '1%' }} type="submit" class="btn btn-primary">Search</button>
                  </div>
                </div>
              </form>
              {filtered.length > 0 ? <table className="table custom-table">
                <thead>
                  <tr className='mb-1'>
                    <th scope="col">Index</th>
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
                    filtered.map((order, index) => (
                      <tr>
                        <th>{index}</th>
                        <th>
                          <div>
                            <div>{order.productName}</div>
                            <button onClick={() => { navigate('/post-detail?id=' + order.postId) }} className='btn btn-info'>View Post</button>
                          </div>
                        </th>
                        <th>{order.price}</th>
                        <th>
                          <div>{order.buyerName}</div>
                          <button onClick={() => { navigate('/user-detail?id=' + order.buyerId) }} className='btn btn-info'>View Buyer Profile</button>
                        </th>
                        <th>
                          <div>{order.buyerPhoneNumber}</div>
                          <div>{order.buyerEmail}</div>
                        </th>
                        <th>{String(order.orderDate).substring(0, 10)}</th>
                        <th>{order.orderStatusName}</th>
                        <th className='mx-2'>
                          {order.orderStatusName === 'Cancelled' || order.orderStatusName === 'Completed' ?
                            <button disabled className='btn btn-dark'><div>Done &emsp;</div></button> :
                            <button onClick={() => { handleClickOpen() }} className='btn btn-success add-btn'><strong><div>Accept</div><div>this request</div></strong></button>
                          }
                        </th>
                      </tr>
                    ))}
                </tbody>
              </table> :
                <strong>No order found!</strong>
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