import { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Form, Card, Button } from 'react-bootstrap';
import FooterFE from "../../../components/FooterFE";
import HeaderFE from "../../../components/HeaderFE";
import QRCode from 'react-qr-code'
import axios from "axios";
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

export const Transaction = () => {
  axios.defaults.baseURL = "https://localhost:7115"
  const cookies = new Cookies()
  const navigate = useNavigate()
  const [pricing, setPricing] = useState({
    '10000': 0,
    '20000': 0,
    '50000': 0,
    '100000': 0,
    '200000': 0,
    '500000': 0,
    '1000000': 0,
    '2000000': 0,
    '5000000': 0,
    '10000000': 0
  })
  let VND = new Intl.NumberFormat('vn-VN', {
    style: 'currency',
    currency: 'VND',
  });
  function handlePricing(price, value) {
    const list = Object.keys(pricing)

    console.log(pricing[price])
    pricing[price] += value
    if (pricing[price] < 0) pricing[price] = 0
  }


  const pricingList = (
    <div className="pricing-list">
      <nav aria-label="breadcrumb">
      </nav>
      {Object.keys(pricing).slice(Object.keys(pricing).indexOf('10000'), Object.keys(pricing).indexOf('10000000') + 1).map((price, index) => {
        return (
          <div className="col-8  align-items-center price-option">{index}
            <div className="col-auto mr-auto">{VND.format(price)} - Point × 10</div>
            <div className="col-auto">
              <button onClick={() => { handlePricing(price, 1) }} className=" btn add-btn btn-primary">Add</button>
              <button onClick={() => { handlePricing(price, -1) }} className="btn remove-btn btn-danger">Remove</button>
            </div>
          </div>
        )
      })}
    </div>
  )

  function onSubmit(e) {

  }


  const [error, setError] = useState('')

  const sendRequest = async () => {
    await axios.get("/topup/send-topup-order")
      .then((data) => { alert("You have sent a request!") })
      .catch((e) => { console.log(e) })
  }
  useEffect(() => {
    let cookie = cookies.get('jwt_authorization')
    if (cookie !== undefined) {
      axios.defaults.headers.common['Authorization'] = 'bearer ' + cookie

    }
    else navigate('/auth/login', { replace: true })
  }, [])
  const renderForm = (
    <div id="all">
      <div id="content">
        <div className="container">
          <div className="row">
            <div className="box">
              <h1 className="form-control text-center">Your Order</h1>
              <hr />
              <form onSubmit={(e) => { onSubmit(e) }} className="col-12">
                <table className="table custom-table">
                  <thead>
                    <tr className='mb-1'>
                      <th scope="col">Value</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(pricing).slice(Object.keys(pricing).indexOf('10000'), Object.keys(pricing).indexOf('10000000') + 1).map((price) => (
                      <>
                        {pricing[price] > 0 && <div className="col-md-12">
                          {price}
                        </div>}
                      </>
                    ))}
                  </tbody>
                </table >
                <div className="d-flex flex-row-reverse">
                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                </div>
                <p className="col-md-12 error">{error}</p>
              </form>
            </div>
          </div>
        </div>
      </div >
    </div >
  )

  return (
    <>
      <HeaderFE />
      <div className=" row padding-40 justify-content-center">
        <div className="col-md-4 pricing">
          {pricingList}
        </div>
        <div className="col-md-4">
          {renderForm}
        </div>
      </div>
      <FooterFE />
    </>
  );
}
