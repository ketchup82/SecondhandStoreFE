import React, { useEffect, useState } from 'react';
// import QRCode from 'react-qr-code';
import HeaderFE from "../../../components/HeaderFE";
import FooterFE from "../../../components/FooterFE";
import '../styles/qrcode.css'

function PaymentQRPage() {
  // const [qrCodeValue, setQRCodeValue] = useState('');
  const [expirationTime, setExpirationTime] = useState(300); // Thời gian hết hạn đơn hàng (phút)

  useEffect(() => {
    setInterval(() => {
      setExpirationTime(expirationTime - 1)
    }, 1000)
  }, expirationTime)
  function handlePayment() {
    // Call payment API to get QR code URL and order information
    // Set QR code value and expiration time based on response from API
    // setQRCodeValue('https://example.com');

  }

  return (
    <>
      <HeaderFE />

      <div className='qrpayment'>
        <div className="container">
          <div className="row">
            <div className="col-md-6 ">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Information Checkout</h5>
                  <div className="order-info">
                    <p>Order number: <strong>ABC123</strong></p>
                    <p>Amount: <strong>1.000.000 VNĐ</strong></p>
                    <p>Information:: <strong>Thanh Toán [1.000.000]</strong></p>
                    <p>Payment term: <strong>{expirationTime} phút</strong></p>
                    <p className="text-danger">Orders will expire if not paid in time!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body text-center">
                  <h5 className="card-title">Scan QR code to pay</h5>
                  <div className="qr-code">
                    <p><small> Use the MoMo app to scan the QR code</small></p>
                    {/* <QRCode value={qrCodeValue} /> */}

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <FooterFE />
    </>

  );
}

export default PaymentQRPage;