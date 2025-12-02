import React from 'react';
import ProductCard from './productcard';
import './productlist.css';

const products = [
  { id: 1, name: 'Product 1', price: '$10', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Product 2', price: '$20', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Product 3', price: '$30', image: 'https://via.placeholder.com/150' },
];

function ProductList() {
  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
