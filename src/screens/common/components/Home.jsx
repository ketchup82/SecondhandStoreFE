import ImageBanner from "../../../assets/images/banner_image.svg";
import ShirtMU from "../../../assets/images/shirt-mu.png";
import ShirtGame from "../../../assets/images/shirt-game.png";
import ShirtT1 from "../../../assets/images/shirt-t1.png";
import Headphone from "../../../assets/images/headphone.png";

export const UserHome = () => {
    return (
        <>
            <div className="position-relative admin__home_banner">
                <h3 className="p-5 banner_title">
                    Second hand exchange where you can find amazing things
                </h3>
                <img className="admin__home_banner_image position-absolute top-0 end-0 h-100" src={ImageBanner} alt="" />
            </div>

            <div class="container text-center mt-5">
                <div class="row">
                    <div class="col">
                        <div class="card card-color_linear border-0">
                            <div class="card-body">
                                <h1>Popular</h1>
                                <div className="d-flex justify-content-end mt-5">
                                    <button type="button" class="btn btn-success btn-lg">View More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card card-color_linear border-0">
                            <div class="card-body">
                                <h1>Product</h1>
                                <div className="d-flex justify-content-end mt-5">
                                    <button type="button" class="btn btn-success btn-lg">View More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className="fw-bold fs-1 m-5">Newest</h1>
            <div class="row row-cols-3 g-5 m-5">
                <div class="col">
                    <div class="card h-100 border-0 text-center">
                        <img src={ShirtMU} class="card-img-top h-100" alt="..." />
                        <div class="card-body">
                            <h1 class="card-title">Victory Shirt</h1>
                            <h3 class="card-text">$200</h3>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100 border-0 text-center">
                        <img src={ShirtGame} class="card-img-top h-100" alt="..." />
                        <div class="card-body">
                            <h1 class="card-title">Victory Shirt</h1>
                            <h3 class="card-text">$200</h3>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100 border-0 text-center">
                        <img src={ShirtT1} class="card-img-top h-100" alt="..." />
                        <div class="card-body">
                            <h1 class="card-title">Victory Shirt</h1>
                            <h3 class="card-text">$200</h3>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100 border-0 text-center">
                        <img src={Headphone} class="card-img-top h-100" alt="..." />
                        <div class="card-body">
                            <h1 class="card-title">Victory Shirt</h1>
                            <h3 class="card-text">$200</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
} 