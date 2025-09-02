import React, { useEffect, useState } from "react";
import "../dummyApi/Practise.css"


const Practise = () => {

const[search,setSearch] = useState("");
const[product , setProduct] = useState([])
const[filtered ,setFiltered] = useState([]) 
const[cart,setCart] = useState([])

useEffect(() => {
    const fetchProduct = async() => {
    try {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
        setProduct(data);
        console.log(data);
    } catch (error) {  
        console.log("fetch the error" , error)
    }
}
fetchProduct();
},[])


useEffect(() => {
    const filter = product.filter(item => 
        item.title.toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(filter);
},[product , search])
// ADD TO CART 
const handleButton = (item) => {
    setCart((prevCart) => {
    const existing = prevCart.find((i) => i.id === item.id)
    if(existing) {
        return prevCart.map((i) => 
            i.id === item.id
        ? {...i, quantity :i.quantity +1}
        :i  
)  
    } else {
        return [...prevCart ,{...item,quantity:1}]
    }

   })

}
// REMOVE CARTS 
 const handleRemoveFromCart = (itemId) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);






    return (
        <>
        <div className="app-container">
     <input type="text" placeholder="search a item" value={search} 
       onChange={(e) =>(setSearch(e.target.value))}
     />

     {filtered.length === 0 ? (
        <p>No product found</p> 
     ) : (
        <ul>
        {filtered.map(item => (
            <li key={item.id}>
             <h3>{item.title}</h3>
             <p>price : {item.price}</p>
         <img src={item.image} alt={item.title} />

            <button onClick={() => handleButton(item)}>Add to cart</button>

            </li>
          
        ))}
        </ul>
     )} 

     {/* 🛒 Cart Section */}
      <div className="cart">
        <h2>Cart ({totalItems} item{totalItems !== 1 && "s"})</h2>
        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.title} - ₹{item.price} × {item.quantity}
                <br />
                <button onClick={() => handleRemoveFromCart(item.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>


        </div>
        
        </>
    )
}
export default Practise;