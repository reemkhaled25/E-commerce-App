import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext(0)

export default function CartContextProvider(props) {

    let headers = {
        token: localStorage.getItem('token'),
    }

    

    function getUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        })
            .then((response) =>response)
            .catch((error) => error)
    }

    function addToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId
        },{
            headers
        })
            .then((response) => response)
            .catch((error) => error)
    }

    function deleteCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers
        })
            .then((response) => response)
            .catch((error) => error)
    }

    function deleteProduct(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers
        })
            .then((response) => response)
            .catch((error) => error)
    }

    function updateCart(productId,count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            count:count
        },{
            headers
        })
            .then((response) => response)
            .catch((error) => error)
    }

    function cartCheckOut(cartId,data){
        let body={
        shippingAddress:data
        }

        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
            body
        ,{
            headers
        })
            .then((response) => response)
            .catch((error) => error)

    }


    return <><CartContext.Provider value={{ getUserCart,addToCart,deleteCart ,deleteProduct,updateCart,cartCheckOut}}>
        {props.children}
    </CartContext.Provider>
    </>
}