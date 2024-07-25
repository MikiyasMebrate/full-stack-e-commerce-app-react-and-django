import {useDispatch, useSelector} from "react-redux"
import BuyProduct from '../../components/ui/Client/BuyProduct'


import { addProduct, removeProduct, updateProduct } from "../../state/cart/cartSlice";

const Cart = () => {

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
            <div className="row mt-5 justify-content-center">
                <BuyProduct cartData={cartData} handleAddCart={handleAddCart} handleRemoveCartByAmount={handleRemoveCartByAmount} handleRemoveCart={handleRemoveCart}/>
            </div>
        </div>
    </>
    );
}
 
export default Cart;