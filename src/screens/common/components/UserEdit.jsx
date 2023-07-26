import "bootstrap/dist/css/bootstrap.min.css";
import Avatar from "../../../assets/images/user.png"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie'
import { useState, useEffect } from "react";
import HeaderFE from "../../../components/HeaderFE";
import FooterFE from "../../../components/FooterFE";

export const UserEdit = () => {
  axios.defaults.baseURL = 'https://localhost:7115'
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [account, setAccount] = useState([])

  const fetchData = async () => {
    await axios.get('/account/get-user-account')
      .then((data) => {
        setAccount(data.data)
        setIsLoading(false)
      })
      .catch((e) => {
        console.log(e)
        setIsError(true)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    let cookie = cookies.get('jwt_authorization')
    if (cookie !== undefined) {
      axios.defaults.headers.common['Authorization'] = 'bearer ' + cookie;
      fetchData()
    }
    else {
      navigate('/', { replace: true })
    }
  }, [])

  const profile = (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card-custom mt-5">
            <div className="card-body d-flex align-items-center">
              <img
                src={Avatar}
                alt="User Avatar"
                className="rounded-circle mr-3"
              />
              <div>
                <h5 className="card-title mb-0">{account.fullname}</h5>
                <p className="card-text">{account.email}</p>
              </div>
            </div>
            <div className="card-body d-flex flex-column">
              <div className="flex-grow-1">
                
                <div className="d-flex align-items-center mb-3">
                  <label className="font-weight-bold mr-3">Gender:</label>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <label className="font-weight-bold mr-3">Location:</label>
                  <div class="col-sm-7 my-1">
                    <input type="text" class="form-control" id="inlineFormInputName" placeholder="Enter Your Address" />
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <label className="font-weight-bold mr-3">Date Of Birth:</label>
                <div class="col-sm-5 my-1">
                  <div class="input-group">
                    <input type="date" class="form-control" id="inlineFormInputGroupUsername" />
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center mb-3">
                <label className="font-weight-bold mr-2">Introduction:</label>
                <div class="col-12 col-md-9 my-1">
                  <textarea class="form-control" id="inlineFormInputName" rows="3" placeholder="Enter referrals"></textarea>
                </div>
              </div>
              <button className="btn btn-primary align-self-end">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  return (
    <>
      <HeaderFE />
      <div className="pad-40">
        {profile}
      </div>
      <FooterFE />
    </>
  )
}