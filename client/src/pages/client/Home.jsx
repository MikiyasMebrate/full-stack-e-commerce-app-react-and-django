import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Filter from "../../components/ui/Filter";
import useFetch from "../../hook/useFetch"
import {useDispatch, useSelector} from "react-redux"

import { addProduct, removeProduct, updateProduct } from "../../state/cart/cartSlice";

const Home = () => {
    const [categoryData, loading, error] = useFetch('http://127.0.0.1:8000/category-list/')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [productData, productLoading, productError] = useFetch(`http://127.0.0.1:8000/product-filter-client/${selectedCategory?.id}/`)
    const dispatch = useDispatch()

    const cartData = useSelector((state) => state.cart.item)


    const handleAddCart = (product) => {
        let item = cartData.find((cart) => cart.id == product.id )
        if(item ){
            let pro = {...item, quantity : item.quantity + 1}
            dispatch(updateProduct(pro))
        }else{
            product = {...product, quantity :  1}
            dispatch(addProduct(product))
        }
       
    }
    const handleRemoveCart = (product) => dispatch(removeProduct(product.id))
    const handleRemoveCartByAmount = (product) => {
        let item = cartData.find((cart) => cart.id == product.id )
        if(item.quantity > 1 ){
            let pro = {...item, quantity : item.quantity - 1}
            dispatch(updateProduct(pro))
        }else{
            dispatch(removeProduct(product.id))
        }
    }



    return (
        <>
        <div className="container-fluid">
            <div className="row mt-5">
                {categoryData && <Filter data={categoryData?.data?.categories} selectedCategory={selectedCategory} select={setSelectedCategory} />}
                {productData && <Card handleRemoveCartByAmount={handleRemoveCartByAmount} handleAddCart={handleAddCart}  cartData={cartData} handleRemoveCart={handleRemoveCart}  data={productData?.data?.products} />}
            </div>
        </div> 
        </>
    );
}
 
export default Home;