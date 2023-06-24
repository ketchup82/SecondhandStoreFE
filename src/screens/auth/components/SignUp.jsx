export const SignUp = () => {
    return (
        <div className="wrapper">
            <h1 className="form__heading my-3 text-capitalize">Join our community today!</h1>
            <div className="form-wrapper">
                <form className="form row m-3">
                    <div className="col-md-6 mb-3">
                        <label for="firstName" className="form-label text-white">First name</label>
                        <input type="text" className="form-control" id="firstName" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label for="lastName" className="form-label text-white">Last name</label>
                        <input type="text" className="form-control" id="lastName" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label for="dob" className="form-label text-white">DoB</label>
                        <input type="date" className="form-control" id="dob" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label for="gender" className="form-label text-white">Gender</label>
                        <input type="text" className="form-control" id="gender" />
                    </div>
                    <div className="col-md-12 mb-3">
                        <label for="username" className="form-label text-white">Username</label>
                        <input type="text" className="form-control" id="username" />
                    </div>
                    <div className="col-md-12 mb-3">
                        <label for="address" className="form-label text-white">Address</label>
                        <input type="text" className="form-control" id="address" />
                    </div>
                    <div className="col-md-12 mb-3">
                        <label for="address" className="form-label text-white">Password</label>
                        <input type="text" className="form-control" id="address" />
                    </div>
                    <div className="col-md-12 mb-3">
                        <label for="address" className="form-label text-white">Confirm password</label>
                        <input type="text" className="form-control" id="address" />
                    </div>
                    <div className="col-md-12 mb-3 form-check flex items-center">
                        <input type="checkbox" className="form-check-input" id="policies" />
                        <label className="form-check-label form__check-label" for="policies">I am aggree with all <a className="text-warning" href="/policy">policies</a></label>
                    </div>
                    <div className="col-md-12 d-flex justify-content-center">
                        <button type="submit" className="btn btn-dark">Sign up</button>
                    </div>
                </form>
            </div>

            <label className="my-3 link__color" for="policies">Already have an account? <a className="fw-bolder link__color text-bold" href="/auth/login">Sign in</a></label>
        </div>
    );
}