import React, { useState, useEffect } from 'react';
import "./App.css";

const App = () => {
  const [product, setProduct] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [filteredProduct, setFilterProduct] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProduct(data);
        setFilterProduct(data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    const filter = product.filter(product =>
      product.title.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilterProduct(filter);
  }, [searchItem, product]);

  // ✅ Add product to cart or increase quantity
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // ✅ Remove product or decrease quantity
  const removeFromCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem.quantity === 1) {
      setCartItems(cartItems.filter(item => item.id !== product.id));
    } else {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  // ✅ Get quantity of a product in cart
  const getQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // ✅ Total cart items (sum of all quantities)
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <div className='app-container'>
        <h1>🛒 Product List</h1>

        <div className="top-bar">
          <input
            type='text'
            placeholder='Search a product...'
            className='search-input'
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />
          <div className="cart-counter">
            🛍️ Cart: {totalItems} item{totalItems !== 1 ? "s" : ""}
          </div>
        </div>

        {filteredProduct.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <ul className="product-list">
            {filteredProduct.map(product => (
              <li key={product.id} className="product-item">
                <h3>{product.title}</h3>
                <p><strong>Price:</strong> ${product.price}</p>
                <img src={product.image} alt={product.title} className="product-image" />
                <div className="cart-actions">
                  <button className='add-cart-btn' onClick={() => addToCart(product)}>+</button>
                  <span className='quantity'>
                    {getQuantity(product.id)}
                  </span>
                  <button className='remove-cart-btn' onClick={() => removeFromCart(product)}>-</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default App;
