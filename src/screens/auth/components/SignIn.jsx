export const SignIn = () => {
    return (
        <div className="wrapper">
            <h1 className="form__heading my-3 text-capitalize">Login to second-hand web store</h1>
            <form className="row m-3">

                <div className="col-md-12 mb-3">
                    <label for="username" className="form-label text-dark">Username</label>
                    <input type="text" className="form-control" id="username" />
                </div>

                <div className="col-md-12 mb-3">
                    <label for="address" className="form-label text-dark">Password</label>
                    <input type="text" className="form-control" id="address" />
                    <a href="/auth/recovery-request" className="form-text link__color form__helper">
                        Forgot password?
                    </a>
                </div>
                <div className="col-md-6 mb-3 form-check flex items-center">
                    <div className="mx-3">
                        <input type="checkbox" className="form-check-input" id="policies" />
                        <label className="form-check-label text-bold" for="policies">Remember me</label>
                    </div>
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                    <button type="submit" className="btn btn-dark">Login</button>
                </div>
            </form>

            <label className="my-3 link__color" for="policies">Don't have an account? <a className="fw-bolder link__color text-bold" href="/auth/register">Sign up</a></label>
        </div>
    );
}