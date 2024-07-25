const Card = ({data, handleRemoveCart,cartData, handleAddCart, handleRemoveCartByAmount}) => {
    const product = data?.map((pro) => {

        let item = cartData.find((cart) => cart.id == pro.id )

       return(
        <div key={pro.id} className="card shadow p-3 mt-2">
        <h6>{pro.name}</h6>
        <p className="text-muted">${pro.price}</p>
        {item && <p className="text-muted">Total Price ${(pro.price)*item?.quantity}</p>}
        <div className="mt-2 mb-2">

        <div className={`btn-group me-2 ${item ? 'd-inline-flex' : 'd-none'}`} role="group" aria-label="Basic example">
                <button onClick={()=> handleRemoveCartByAmount(pro)} type="button" className="btn btn-secondary">-</button>
                <button type="button" className="btn btn-light">{item?.quantity}</button>
                <button onClick={()=>handleAddCart(pro)} type="button" className="btn btn-secondary">+</button>
            </div>

            <button onClick={()=>item ? handleRemoveCart(pro) : handleAddCart(pro)} className={`btn ${item ? 'btn-danger' : 'btn-secondary'}`}>{item ? "Remove" :"Add to cart"}</button>
        </div>


    </div>
       )


})

    const a = []
    return (
        <>
         <div className="col-lg-8">
               { product?.length == 0 && <p className="text-danger text-center">No data Found</p>}
               {product}
              
            </div>
        </>
    );
}
 
export default Card;