const Filter = ({data, select, selectedCategory}) => {
    const categories = data?.map((cat) =>(
        <li key={cat.id} tabIndex={cat.id} onClick={()=>select(cat)} className={`list-group-item ${selectedCategory?.id == cat.id ? ' list-group-item-dark' : ' list-group-item-light'}`}>{cat.name} </li>
    ))
    return (
        <>
        <div className="col-lg-4">
                <ul className="list-group hover">
                    {categories}
                  </ul>
            </div>
        </>
    );
}
 
export default Filter;