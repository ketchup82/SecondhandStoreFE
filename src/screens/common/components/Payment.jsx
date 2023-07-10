import React from 'react';
import { useHistory } from "react-router-dom";
import HeaderFE from "../../../components/HeaderFE";
import FooterFE from "../../../components/FooterFE";



export const Payment = () => {
  return (
    <>
      <HeaderFE />
      <section style={{ backgroundColor: '#f5deb3 ' }}
        className="p-4 p-md-5"
      >
        <div className="row d-flex justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-5">
            <div className="card rounded-3">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h3>Payment Method</h3>

                </div>
                <form action="">
                  <p className="fw-bold mb-4 pb-2">Saved cards:</p>

                  <div className="d-flex flex-row align-items-center mb-4 pb-1">
                    <img className="img-fluid" src="https://img.icons8.com/color/48/000000/mastercard-logo.png" />
                    <div className="flex-fill mx-3">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="formControlLgXc"
                          className="form-control form-control-lg"
                          defaultValue="**** **** **** 3193"
                        />
                        <label className="form-label" htmlFor="formControlLgXc">
                          Card Number
                        </label>
                      </div>
                    </div>
                  </div>
                  <p className="fw-bold mb-0 pb-2">Or with :</p>
                  <div className="d-flex flex-row align-items-center mb-4 pb-1">
                    <img className="img-fluid" src="https://img.icons8.com/color/48/000000/visa.png" />
                    <div className="flex-fill mx-3">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="formControlLgXs"
                          className="form-control form-control-lg"
                          defaultValue="**** **** **** 4296"
                        />
                        <label className="form-label" htmlFor="formControlLgXs">
                          Card Number
                        </label>
                      </div>
                    </div>

                  </div>

                  <p className="fw-bold mb-4"></p>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="formControlLgXsd"
                      className="form-control form-control-lg"
                      defaultValue="Anna Doe"
                    />
                    <label className="form-label" htmlFor="formControlLgXsd">
                      Cardholder's Name
                    </label>
                  </div>

                  <div className="row mb-4">
                    <div className="col-7">

                    </div>
                    <div className="col-6">
                      <div className="form-outline">
                        <input
                          type="password"
                          id="formControlLgExpk"
                          className="form-control form-control-lg"
                          placeholder="MM/YYYY"
                        />
                        <label className="form-label" htmlFor="formControlLgExpk">
                          Expire
                        </label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-outline">
                        <input
                          type="password"
                          id="formControlLgcvv"
                          className="form-control form-control-lg"
                          placeholder="Cvv"
                        />
                        <label className="form-label" htmlFor="formControlLgcvv">
                          Cvv
                        </label>
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-success btn-lg btn-block">Proceed to checkout</button>
                  <button className="btn btn-warning btn-lg btn-block">Checkout with Point</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterFE />
    </>
  );
}

