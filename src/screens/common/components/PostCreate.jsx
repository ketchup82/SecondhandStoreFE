import { useEffect, useState } from 'react'
import HeaderFE from '../../../components/HeaderFE'
import FooterFE from '../../../components/FooterFE'
import '../styles/postcreate.css'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '../../../components/loading/LoadingSpinner'


export const PostCreate = () => {
    axios.defaults.baseURL = "https://localhost:7115"
    const cookies = new Cookies()
    const navigate = useNavigate()
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let cookie = cookies.get('jwt_authorization')
        if (cookie !== undefined) {
            axios.defaults.headers.common['Authorization'] = 'bearer ' + cookie;
        }
        else navigate('/auth/login', { replace: true })
    }, [])
    const handle_image = (e) => {
        console.log(e.target.files)
        const imgs = e.target.files
        setSelectedImage(imgs[0])
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)
        console.log(data)
        setTimeout(() => {
            axios.post("/posts/create-new-post", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }).then(alert("success"))
                .catch((e) => { alert(e) })
            setIsLoading(false)
        }, 2000)

    }
    const form = (
        <div className="d-flex justify-content-center">
            <form className="form" id="addProduct" onSubmit={onSubmit}>
                <div className="col-md-12 mb-3">
                    <label for="name" className="form-label">Post name</label><br />
                    <input type="text" id="ProductName" name="ProductName" className="form-input" required />
                </div>
                <div className="col-md-12 mb-3">
                    <label for="price" className="form-label">Price</label><br />
                    <input type="number" value="10" min="10" max="99999" step="10" id="Price" name="Price" className="form-input" required />
                </div>
                <div className="col-md-12 mb-3">
                    <label for="category">Choose a category:</label><br />
                    <select name="CategoryId" id="CategoryId">
                        <option value="1">Clothes</option>
                        <option value="2">Electrics</option>
                        <option value="3">Book</option>
                        <option value="4">Traditional Instruments</option>
                        <option value="5">Learning Tools</option>
                        <option value="6">Others</option>
                    </select>
                </div>
                <div className="col-md-12 mb-3">
                    <label for="type" className="form-label">Post type</label><br />
                    <label>
                        <input type="radio" id="PostTypeId" name="PostTypeId" value="1" className="form-input" />Selling
                    </label>
                    <br />
                    <label>
                        <input type="radio" id="PostTypeId" name="PostTypeId" value="2" className="form-input" />Donating
                    </label>
                </div>
                <div className="col-md-12 mb-3">
                    <label for="description" className="form-label">Description</label><br />
                    <input type="text" id="Description" name="Description" className="form-input" required />
                </div>
                <br />
                <div className="col-md-12 mb-3">
                    <label for="prior" className="form-label">Priority Point</label><br />
                    <input type="number" value="10" min="10" max="99999" step="10" id="prior" name="prior" className="form-input" required />
                </div>
                <br />
                <div className="col-md-12 mb-3">
                    <label for="image" className="form-label">Photos</label><br />
                    {selectedImage && (
                        <div>
                            <img
                                alt="not found"
                                width={"250px"}
                                src={URL.createObjectURL(selectedImage)}
                            />
                            <br />
                            <button onClick={() => setSelectedImage(null)}>Remove</button>
                        </div>
                    )}
                    <br />
                    <br />
                    <input
                        type="file"
                        name="ImageUploadRequest"
                        onChange={handle_image}
                        multiple
                    />
                </div>
                <br />
                <div className="col-md-12 mb-3">
                    <button type="submit">Add Product</button>
                </div>
            </form>
            <br />
        </div>
    )
    return (
        <>
            <HeaderFE />
            {isLoading ? <LoadingSpinner/> : form}
            <FooterFE />
        </>

    )
}
