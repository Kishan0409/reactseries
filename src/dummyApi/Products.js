import React, { useState , useEffect } from 'react';
import "../dummyApi/Products.css"

const Products = () => {
    const[product , setProduct] = useState([])
    const[search , setSearch] = useState("")
    const[filtered, setFiltered]  = useState([])


    useEffect(() => {
        const fetchProduct = async() => {
            try {
                const  response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();
                setProduct(data)
                setFiltered(data)
                console.log(data);

            } catch (error) {
                console.log("error fetching detail" , error)

            }
        }
        fetchProduct();
    },[])

   useEffect (() => {
    const filter = product.filter(products => 
        products.title.toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(filter);

   },[search , product])




    return (
        <>
        <div className='app-container'>
            <input type='text'  placeholder='Search a item... '
             value={search} 
             onChange={(e) => (setSearch(e.target.value))} 
            />

            {filtered.length === 0 ? (
                <p>no records found</p>
            ) : (
                <ul>
                  {filtered.map(item => (
                    <li key={item.id}>
                        <h3>{item.title}</h3>
                        <p>price : ${item.price}</p>
                        <img src={item.image}  alt = {item.title}  className='product-image'/>
                    </li>
                    
                  ))}
                </ul>
            )}
        

        </div>
        </>
    )

}
export default Products;