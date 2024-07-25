const BuyProduct = ({cartData , handleAddCart , handleRemoveCartByAmount , handleRemoveCart}) => {

  const sorted = [...cartData];

  let totalPrice = 0


  sorted.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    })


    const data = sorted.map((pro, index) => {
      totalPrice+=(pro.price*pro.quantity)
      return (
        <tr> 
          <td> {index + 1}</td>
          <td> {pro.name} </td>
          <td>  <div className={`btn-group me-2 ${pro ? 'd-inline-flex' : 'd-none'}`} role="group" aria-label="Basic example">
                <button onClick={()=> handleRemoveCartByAmount(pro)} type="button" className="btn btn-secondary">-</button>
                <button type="button" className="btn btn-light">{pro?.quantity}</button>
                <button onClick={()=>handleAddCart(pro)} type="button" className="btn btn-secondary">+</button>
            </div></td>
            <td>${pro.price*pro.quantity}</td>
          <td> <button onClick={()=>pro ? handleRemoveCart(pro) : handleAddCart(pro)} className={`btn ${pro ? 'btn-danger' : 'btn-secondary'}`}>{pro ? "Remove" :"Add to cart"}</button>
         </td>
        </tr>
      )
    })
    return (
        <>
        <div class="col-lg-9 mt-5">
                <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product</th>
                        <th scope="col">Quantity </th>
                        <th scope="col">Price</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                        {data}
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td><h6>Total Price ${totalPrice}</h6></td>
                          <td></td>
                        </tr>
                    </tbody>
                  </table>
                  <button class="btn btn-primary"> Buy </button>
            </div>
        </>
    );
}
 
export default BuyProduct;