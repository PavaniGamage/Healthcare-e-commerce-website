import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../../WebPages/WebPages CSS/Cart.css';
import { useUser } from '../../Context/UserContext';
import fallbackImage from '../../Components/ShopPages/Common/Item/medserv_logo-for-products.png';

const MyUploadsItem = () => {
  const { orderID } = useParams(); // Get orderID from the URL params
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const userEmail = localStorage.getItem('userEmail');

  // Check if the orderID is undefined or null
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderID) {
        console.error('Upload ID is missing!');
        setError('Upload ID is missing');
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
        const response = await fetch(`http://localhost:4000/prescriptionsUpload/prescription_history/${userEmail}/${orderID}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch upload details');
        }
        const data = await response.json();
        setOrderDetails(data); // Set the fetched order details to the state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching upload details:', error);
        setError('Failed to fetch upload details');
        setLoading(false);
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

  // Handle image error by showing a fallback image
  const handleImageError = (event) => {
    event.target.src = fallbackImage; // Set a fallback image on error
  };

  // `orderDetails` - the response from the backend
  const prescriptionImageSrc = `data:${orderDetails.prescriptionFile.contentType};base64,${orderDetails.prescriptionFile.data}`;

  // image display
  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="cart-page">
        <div className='cart-page'>
          <h2>Upload Details</h2>

          <div className="flex flex-wrap gap-4 pl-4 pr-4 bg-gray-100 rounded-md mb-7">
            <div className="flex-1">
              <p className="text-m font-semibold">
                <strong>Order ID:</strong> &nbsp; {orderDetails.orderID}
              </p>
            </div>
            <div className="flex-1">
              <p className="text-m font-semibold">
                <strong>Status:</strong> &nbsp; {orderDetails.status}
              </p>
            </div>
          </div>

          <div className='cart-items payment-details'>        
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                  <tbody>                
                      <tr>
                        <th className="border-b px-4 py-2 text-left w-[150px]">Patient Name :</th>
                        <td className="border-b px-4 py-2 text-left">{orderDetails.patientName}</td>                                   
                      </tr>

                      <tr>
                        <th className="border-b px-4 py-2 text-left">Patient Age :</th>
                        <td className="border-b px-4 py-2 text-left">{orderDetails.patientAge}</td>                   
                      </tr>

                      <tr>
                        <th className="border-b px-4 py-2 text-left">Patient Gender :</th>
                        <td className="border-b px-4 py-2 text-left">{orderDetails.patientGender}</td>                  
                      </tr>                                          
                  </tbody>
                </table>
            </div>
          </div>

          <div className='cart-items payment-details'>        
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                  <tbody>                
                      <tr>
                        <th className="border-b px-4 py-2 text-left w-[150px]">Frequency :</th>
                        <td className="border-b px-4 py-2 text-left">{orderDetails.frequency}</td>                    
                      </tr>

                      <tr>
                        <th className="border-b px-4 py-2 text-left">Fulfillment :</th>
                        <td className="border-b px-4 py-2 text-left">{orderDetails.fulfillment}</td>                                   
                      </tr>

                      <tr>
                        <th className="border-b px-4 py-2 text-left">Substitutes :</th>
                        <td className="border-b px-4 py-2 text-left">{orderDetails.substitutes}</td>                   
                      </tr>                                         
                  </tbody>
                </table>
            </div>
          </div>

          <div className='cart-items payment-details'>        
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                  <tbody>                
                      <tr>
                        <th className="border-b px-4 py-2 text-left w-[150px]">Message :</th>
                        <td className="border-b px-4 py-2 text-left">{orderDetails.message || '-'}</td>                  
                      </tr>                                          
                  </tbody>
                </table>
            </div>
          </div>
        
          <div className='cart-items payment-details'>        
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                  <tbody>                
                      <tr>
                        <th className="border-b px-4 py-2 text-left w-[150px]">Prescription File :</th>
                        <td className="border-b px-4 py-2 text-left">
                          {orderDetails.prescriptionFile && (
                            <div>
                              <img 
                                src={prescriptionImageSrc} 
                                alt="Prescription" 
                                onError={handleImageError} 
                                onClick={handleImageClick} 
                                className=' h-[150px] cursor-pointer hover:opacity-80'
                              />
                            </div>
                          )}
                        </td>                  
                      </tr>                                          
                  </tbody>
                </table>
            </div>      
          </div>

          <div className='cart-items payment-details'>        
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                  <tbody>                
                      <tr>
                        <th className="border-b px-4 py-2 text-left w-[150px]">Review Medicines with Prices :</th>
                        <td className="border-b px-4 py-2 text-left">
                          {orderDetails.prescriptionFile && (
                            <div>
                              <img 
                                src={prescriptionImageSrc} 
                                alt="Prescription" 
                                onError={handleImageError} 
                                onClick={handleImageClick} 
                                className=' h-[150px] cursor-pointer hover:opacity-80'
                              />
                            </div>
                          )}
                        </td>                  
                      </tr>                                          
                  </tbody>
                </table>
            </div>
          </div>

          <hr className='hr-line'/>
          <div className='cart-summary mr-5'>
            <h3>Total Items: &nbsp; 2 </h3>
            <h3>Total Price: &nbsp; Rs. 1500.00 </h3>
          </div>
          <hr className='hr-line'/>

          <p className="font-semibold text-gray-800 mb-2 mt-10">Please Note That : </p>
          <p className="text-gray-700">We will use the address associated with your account as the delivery address.</p>

          <div className='cart-actions flex justify-end mb-4 mr-5'>
            <button className='buy-now-button'>
              Pay Now
            </button>
          </div>

          {/* Modal for Full-Screen Image */}
          {isModalOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
              onClick={closeModal} // Close modal when clicking on the overlay
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <img 
                  src={prescriptionImageSrc} 
                  alt="Prescription Full View" 
                  className="w-auto h-auto max-w-full max-h-full object-contain"
                />
                {/* Close Button */}
                <button 
                  onClick={closeModal} 
                  className="absolute top-4 right-4 bg-white text-black px-3 py-2 rounded-full shadow"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>        
    </div>
  );
};

export default MyUploadsItem;