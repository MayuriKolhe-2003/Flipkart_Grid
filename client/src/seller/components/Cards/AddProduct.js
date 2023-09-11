import React, { useState, useEffect } from "react";
import SideBar from "../SideBar";
import { useSelector } from "react-redux"; // Import useSelector
import axios from "../../../adapters/axios";
import toastMessage from "../../../utils/toastMessage";

function AddProduct() {
    const { isAuthenticate ,user} = useSelector((state) => state.userReducer);

    const [product, setProduct] = useState({ shortTitle: "", longTitle:"", cost: "", discount: "",category:"",url:"" ,coinsUsed:""});

    const [pro,setPro] = useState({
        title:{
            shortTitle:product.shortTitle,
            longTitle:product.longTitle
        },
        price:{
            cost:product.cost,
            discount:product.discount,
            coinsUsed:product.coinsUsed
        },
        qty:1,
        category:product.category,
        url:product.url,
        detailUrl:product.url,
        seller: {
            id:user._id,
            name:user.fname+user.lname
        }
    })

    const onChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
        setPro({
            ...pro,
            title: {
                ...pro.title,
                shortTitle: name === "shortTitle" ? value : pro.title.shortTitle,
                longTitle: name === "longTitle" ? value : pro.title.longTitle,
            },
            price: {
                ...pro.price,
                cost: name === "cost" ? value : pro.price.cost,
                discount: name === "discount" ? value : pro.price.discount,
                coinsUsed:name==="coinsUsed"?value:pro.price.coinsUsed
            },
            category: name === "category" ? value : pro.category,
            url: name === "url" ? value : pro.url,
            detailUrl: name === "url" ? value : pro.detailUrl,
        });
        //console.log(product);
        //console.log(pro);
      }


    const handleSubmit = async ()=>{
        const json = JSON.stringify(pro);
       
        try {
            await axios.post('/products/add-product',pro)
            .then(response => {
                // Handle the response
                console.log(response.data);
                toastMessage("Item Removed", "success");
                setProduct({ shortTitle: "", longTitle:"", cost: "", discount: "",category:"",url:"" })
            })
        } catch (error) {
            console.log(error);
        }
    }


    return (

        <div id="wrapper" width="100%">

        <SideBar />
        <div className="divmaldito my-5">

        <div className="col-lg-12 my-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Add A Product in Database</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Product Short Title</label>
                            <input type="text" class="form-control" name="shortTitle" placeholder=" " onChange={onChange} value={product.shortTitle} required/>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Product Long title</label>
                            <input type="text" class="form-control" name="longTitle" placeholder=" " onChange={onChange} value={product.longTitle}/>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Product Cost</label>
                            <input type="number" class="form-control" name="cost" placeholder=" " onChange={onChange} value={product.cost} required/>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Discount</label>
                            <input type="number" class="form-control" name="discount" placeholder=" " onChange={onChange} value={product.discount} required/>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Coins Can be used to buy product</label>
                            <input type="number" class="form-control" name="coinsUsed" placeholder=" " onChange={onChange} value={product.coinsUsed} required/>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Category</label>
                            <input type="text" class="form-control" name="category"  onChange={onChange} value={product.category}/>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Image</label>
                            <input type="text" class="form-control" name="url"  onChange={onChange} value={product.url} required/>
                        </div>

                        <div>
                            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </div>
                       

                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default AddProduct;