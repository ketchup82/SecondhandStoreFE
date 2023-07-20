import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UserProfile = () => {
  const [gender, setGender] = useState(""); // khởi tạo state cho giới tính

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body d-flex align-items-center">
              <img
                src="https://via.placeholder.com/150"
                alt="User Avatar"
                className="rounded-circle mr-3"
              />
              <div>
                <h5 className="card-title mb-0">John Doe</h5>
                <p className="card-text">john.doe@example.com</p>
              </div>
            </div>
            <div className="card-body d-flex flex-column">
              <div className="flex-grow-1">
                <div className="d-flex align-items-center mb-3">
                  <label className="font-weight-bold mr-3">Location:</label>
                  <div class="col-sm-7 my-1">
            <input type="text" class="form-control" id="inlineFormInputName" placeholder="Enter Your Address" />
          </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <label className="font-weight-bold mr-3">Gender:</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="male"
                        id="male"
                        onChange={handleGenderChange}
                        checked={gender === "male"} // đánh dấu tích chọn nếu giới tính là male
                      />
                      <label className="form-check-label rounded-circle" htmlFor="male">
                        Male
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="female"
                        id="female"
                        onChange={handleGenderChange}
                        checked={gender === "female"} // đánh dấu tích chọn nếu giới tính là female
                      />
                      <label className="form-check-label rounded-circle" htmlFor="female">
                        Female
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="other"
                        id="other"
                        onChange={handleGenderChange}
                        checked={gender === "other"} // đánh dấu tích chọn nếu giới tính là other
                      />
                      <label className="form-check-label rounded-circle" htmlFor="other">
                        Others
                      </label>
                    </div>
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
  );
};

export default UserProfile;