import axios from "axios";
import { createContext } from "react";


export let WishlistContext = createContext(0)

export default function WishlistContextProvider(props) {

    let headers = {
        token: localStorage.getItem('token'),
    }
    function getUserWishlist() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers
        })
            .then((response) => response)
            .catch((error) => error)
    }
    function addToWishlist(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            productId
        },{
            headers
        })
            .then((response) => response)
            .catch((error) => error)
    }
    function deleteWislistProduct(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
            headers
        })
            .then((response) => response)
            .catch((error) => error)
    }
    return <><WishlistContext.Provider value={{ getUserWishlist,addToWishlist,deleteWislistProduct}}>
        {props.children}
    </WishlistContext.Provider>
    </>
}