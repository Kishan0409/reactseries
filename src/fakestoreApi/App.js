import React, { useState , useEffect} from 'react';
import "./App.css";


const App = () => {
  const[product , setProduct] = useState([])
  const[searchItem , setsearchItem] = useState('')
  const[filteredProduct , setfilterProduct] = useState([])
   useEffect(() => {
    const fetchproduct = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        const data =  await response.json();
        setProduct(data);
        setfilterProduct(data);
        console.log(data);

      } catch (error){
        console.log('error fetching detail:-', error);

      }
      
    }
    fetchproduct()

 },[])


 useEffect(() => {
  const filter = product.filter(product => 
   product.title.toLowerCase().includes(searchItem.toLowerCase())
  )
  setfilterProduct(filter)
 },[searchItem ,product])


  return (
    <>
    <div className='app-container'>
     <h1>Product List</h1>
     <input type='text' placeholder='search a product...'  value={searchItem}
      onChange={(e) => {setsearchItem(e.target.value)}}
     />

     {filteredProduct.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {filteredProduct.map(product => (
            <li key={product.id}>
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <img src={product.image} alt={product.title} className="product-image" />
            </li>
          ))}
        </ul>
      )}


    </div>
     
    
    </>
  )
}
export default App;