import React from 'react';
import HeaderFE from "../../../components/HeaderFE";
import FooterFE from "../../../components/FooterFE";



export const PaymentWithPoint = () => {
  return (
    <>
      <HeaderFE />
      <section style={{ backgroundColor: '#f5deb3 ' }}>
        <div className="container py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-9 col-lg-7 col-xl-5">
              <div className="card">

                <div className="card-body">
                  <div className="card-title d-flex justify-content-between mb-0">
                    <p className="text-muted mb-0">Your Point balance</p>
                    <p className="mb-0">1000 point</p>
                  </div>
                </div>
                <div className="rounded-bottom" style={{ backgroundColor: '#eee' }}>
                  <div className="card-body">
                    <p className="mb-4">Your payment details</p>
                    <label className="form-label" htmlFor="formControlLgXM8">
                      User Name
                    </label>
                    <div className="form-outline mb-3">
                      <input
                        type="text"
                        id="formControlLgXM8"
                        className="form-control"
                        placeholder="Your user name"
                      />

                    </div>
                    <label className="form-label" htmlFor="formControlLgXM8">
                      Password
                    </label>
                    <div className="form-outline mb-3">
                      <input
                        type="text"
                        id="formControlLgXM8"
                        className="form-control"
                        placeholder="your password"
                      />
                    </div>
                    <label className="form-label" htmlFor="formControlLgXM8">
                      Points you want to exhange
                    </label>
                    <div className="form-outline mb-3">
                      <input
                        type="number"
                        id="formControlLgXM8"
                        className="form-control"
                        placeholder="1000"
                      />
                    </div>

                    <button className="btn btn-info btn-block">Exchange Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterFE />
    </>
  );
}

