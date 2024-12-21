import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../../WebPages/WebPages CSS/Cart.css';
import fallbackImage from '../../Components/ShopPages/Common/Item/medserv_logo-for-products.png';

const PaymentHistoryItem = () => {
  const { orderID } = useParams(); // Access the orderID from the URL
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userEmail = localStorage.getItem('userEmail');

  // fetch the order details based on orderID
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderID) {
        console.error('Order ID is missing!');
        setError('Order ID is missing');
        setLoading(false);
        return;
      }
  
      if (!userEmail) {
        // If the user is not logged in, set error and stop fetching data
        setError('You must be logged in to view your uploads.');
        setLoading(false);
        return;
      }

      try {
        // Fetch order data
        const response = await fetch(`http://localhost:4000/paymentHistory/orders_details/${userEmail}/${orderID}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch orderDetails');
        }
        const data = await response.json();
        setOrderDetails(data); 
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Failed to load order details. Please try again later.');
      } finally {
        setLoading(false); // Stop loading once the fetch is done
      }
    };

    fetchOrderDetails();
  }, [orderID, userEmail]);

  if (loading) {
    return <div className='p-10' style={{ height: '50vh' }}><p>Loading...</p></div>;
  }

  if (error) {
    return <div className='p-10' style={{ height: '50vh' }}><p>{error}</p></div>;
  }

  // handle image
  const handleImageError = (event) => {
      event.target.src = fallbackImage; // Use fallback image on error
  };
 
  return (
    <div className='cart-page text-[13px]'>
      <h2>Order History</h2>
      <div className='cart-items payment-details'>        
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <tbody>                
                  <tr>
                    <th className="border-b px-4 py-2 text-left w-[150px]">Order ID :</th>
                    <td className="border-b px-4 py-2">{orderDetails.orderID}</td>                    
                  </tr>

                  <tr>
                    <th className="border-b px-4 py-2 text-left">Order Date :</th>
                    <td className="border-b px-4 py-2">{new Date(orderDetails.createdAt).toLocaleDateString()}</td>                                   
                  </tr>

                  <tr>
                    <th className="border-b px-4 py-2 text-left">Status :</th>
                    <td className="border-b px-4 py-2">{orderDetails.status}</td>                   
                  </tr>

                  <tr>
                    <th className="border-b px-4 py-2 text-left">Total Amount :</th>
                    <td className="border-b px-4 py-2">Rs. {orderDetails.totalAmount.toFixed(2)}</td>                  
                  </tr>                                          
              </tbody>
            </table>
        </div>
      </div>

      <div className='cart-items'>
        <p className='font-bold text-base text-left' style={{ fontSize: '18px' }}>Products</p>
        {orderDetails.products.length > 0 ? (
          orderDetails.products.map((product, index) => (
            <div key={index} className='cart-item'>
              <img
                src={product.images}
                alt={product.name}
                className='cart-item-image'
                onError={handleImageError}
              />
              <div className='cart-item-details'>
                <p className='cart-item-name'>{product.name}</p>
                <p className='cart-item-price'>Rs.{product.price.toFixed(2)}</p>
                <div className='flex items-center mt-[-10px] mb-[-10px]'>
                  <p className='mr-5'>Quantity: </p>
                  <span> {product.quantity}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='ml-10 mt-10 h-[200px] flex items-start'> Your products data is empty. </p>
        )}
      </div>

      <hr className='hr-line'/>
      <div className='cart-summary mr-5'>
        <h3>Total Items: &nbsp; {orderDetails.products.reduce((total, product) => total + product.quantity, 0)} </h3>
        <h3>Total Price: &nbsp; Rs. {orderDetails.totalAmount.toFixed(2)}</h3>
      </div>
      <hr className='hr-line'/>
    </div>
  );
};

export default PaymentHistoryItem;