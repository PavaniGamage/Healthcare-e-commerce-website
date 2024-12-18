import React, { useEffect, useState } from 'react';
import '../../WebPages/WebPages CSS/Cart.css';

const PaymentHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const email = localStorage.getItem('userEmail');

  useEffect(() => {
    // Fetch order history from the backend
    const fetchOrders = async () => {
      if (!email) {
        // setError('User email is not available in localStorage.');
        setError('Please login to access details.');
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`http://localhost:4000/paymentHistory/orders/${email}`);
        if (response.status === 404) {
          throw new Error('No orders found.');
        }        
        if (!response.ok) {
          throw new Error('Failed to fetch orders.'); 
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [email]);

  if (loading) return <div className='p-10' style={{ height: '50vh' }}><p>Loading payment history...</p></div>;
  if (error) return <div className='p-10' style={{ height: '50vh' }}><p className="error-text">Error: {error}</p></div>;

  return (
    <div className='cart-page'>
      <h2>Payment History</h2>
      <div className='table-item'>        
        <table className="table-auto w-full border-collapse text-center">
            <thead>
              <tr className="border-t border-b table-topic">
                <th className="px-4 py-2 text-left font-semibold">Order ID</th>
                <th className="px-4 py-2 font-semibold">Date</th>
                <th className="px-4 py-2 font-semibold item-count">Total Items Count</th>
                <th className="px-4 py-2 font-semibold">Total Price</th>
                <th className="px-4 py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr className="border-t border-b table-items" key={order.orderID} onClick={() => window.location.href = `/payment_history/${order.orderID}`}>
                    <td className="px-4 py-2 text-left">{order.orderID}</td>
                    <td className="px-4 py-2">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Invalid Date"}</td>
                    <td className="px-4 py-2 item-count">{order.products.reduce((total, product) => total + product.quantity, 0)}</td>
                    <td className="px-4 py-2">Rs. {order.totalAmount.toFixed(2)}</td>
                    <td className="px-4 py-2">{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-2 text-center">You have not placed any orders yet</td>
                </tr>
              )}
            </tbody>
        </table>  
      </div>

      <div className="cart-summary flex items-center space-x-0 pr-10">
        <h3 className="text-lg font-semibold">Total Orders:</h3>
        <p className="text-lg font-semibold">{orders.length}</p>
      </div>
      <hr className='hr-line'/>   
    </div>
  );
};

export default PaymentHistory;