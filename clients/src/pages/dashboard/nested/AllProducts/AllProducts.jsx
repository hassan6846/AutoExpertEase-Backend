import React, { useEffect, useState } from 'react';
import './AllProduct.css';
import { Avatar, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { defaultUserImg } from '../../../../constants/ImageConstants';
import Header from '../../../../components/Header/Header';
import axios from 'axios';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://backend-autoexpertease-production-5fd2.up.railway.app/api/product');
        setProducts(response.data.products);
        console.log(response.data.products); // Log the fetched products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title="All Listed Products." />
      <p style={{ fontSize: 20 }}>Products</p>

      <div className="product-wrapper">
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              height: '100%',
              position: 'relative',
              backgroundColor: '#fff',
              width: '240px',
              borderRadius: 5,
              cursor: 'pointer',
              boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
              padding: 10,
              margin: '10px',
            }}
          >

            <img
              style={{
                borderRadius: 5,
                height: '40vh',
                objectFit: 'cover',
            
                width: '100%'
              }}
              src={product.image[0]} // Use the first image from the array
              alt={product.name}
            />
            <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
              <Avatar src={defaultUserImg} />
              <div>
              <p style={{ fontSize: 12, marginLeft: 5, marginBottom: 2 }}>{product.name.length > 20 ? product.name.substring(0, 50) + '...' : product.name}</p>
              <Chip style={{ fontSize: 9, marginLeft: 2, marginBottom: 2 }} label={product.productcategory.category} />
                <Chip style={{ fontSize: 9, marginLeft: 2, marginBottom: 2 }} label={product.productcategory.subcategory} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
