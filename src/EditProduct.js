import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EditProduct() {
    let params = useParams();
    let baseURL = "https://61a32591014e1900176dead9.mockapi.io/products"
    let [name, setName] = useState("");
    let [description, setDescription] = useState("");
    let [image, setImage] = useState("");
    let [price, setPrice] = useState(0);

    let updateProduct = () => {
        axios.put(baseURL + `/${params.id}`, {
            name: name,
            description: description,
            price: price,
            image: image
        })
    }

    useEffect(() => {
        axios.get(baseURL + `/${params.id}`).then((response) => {
            let temp = response.data;
            setDescription(temp.description);
            setName(temp.name);
            setPrice(temp.price);
            setImage(temp.image);
        });
    }, [])

    let handleName = (event) => {
        setName(event.target.value);
    }

    let handleDescription = (event) => {
        setDescription(event.target.value);
    }

    let handleImage= (event) => {
        setImage(event.target.value);
    }

    let handlePrice = (event) => {
        setPrice(event.target.value);
    }

    if (!name) return null;

    return (
        <div className='container'>
            <h4 className='mt-3 mb-2 font-weight-normal'>Edit user</h4>
            <div className='row row-cols-1'>
                <div className='col'>
                    <div className='form-group'>
                        <label>Product name:</label>
                        <input type="text" placeholder='Name' className='form-control' value={name} onChange={handleName} />
                    </div>
                    <div className='form-group'>
                        <label>Product price (INR):</label>
                        <input type="number" placeholder='Price' className='form-control' value={price} onChange={handlePrice} />
                    </div>
                    <div className='form-group'>
                        <label>Product description:</label>
                        <input type="text" placeholder='Description' className='form-control' value={description} onChange={handleDescription} />
                    </div>
                    <div className='form-group'>
                        <label>Image link:</label>
                        <input type="text" placeholder='Link' className='form-control' value={image} onChange={handleImage} />
                    </div>
                    <div className='form-group'>
                        <button type='button' onClick={updateProduct}
                            disabled={name.length > 2 && price != 0 ? false : true}
                            className='btn btn-primary'>
                            Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProduct;