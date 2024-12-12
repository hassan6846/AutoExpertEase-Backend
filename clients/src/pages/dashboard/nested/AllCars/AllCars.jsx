import React, { useEffect, useState } from 'react';
import './AllCars.css';
import { Avatar, Chip } from '@mui/material';
import { defaultUserImg } from '../../../../constants/ImageConstants';
import Header from '../../../../components/Header/Header';
import axios from 'axios';

const AllCars = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://backend-autoexpertease-production-5fd2.up.railway.app/api/car');
        console.log(response.data); // Log the fetched products
        setProducts(response.data); // Store the entire array of cars
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title="All Listed Cars (active)." />
      <p style={{ fontSize: 20 }}>Available Cars</p>

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
              src={product.images[0][0]} // Use the first image from the array
              alt={product.name}
            />
            <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
              <Avatar src={defaultUserImg} />
              <div>
                <p style={{ fontSize: 12, marginLeft: 5, marginBottom: 2 }}>
                  {product.name.length > 20 ? product.name.substring(0, 20) + '...' : product.name}
                </p>
                {/* You can customize the Chip labels based on your data */}
                <Chip style={{ fontSize: 9, marginLeft: 2, marginBottom: 2 }} label="Category" />
                <Chip style={{ fontSize: 9, marginLeft: 2, marginBottom: 2 }} label="Subcategory" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCars;
