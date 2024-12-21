import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUserEdit, faCreditCard, faFileMedicalAlt, faSignOutAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './WebPages CSS/Cart.css';
import fallbackImage from '../Components/ShopPages/Common/Item/medserv_logo-for-products.png';

const MyProfile = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  
  const { login, logout } = useUser();  // Access login and logout functions from context

  const token = localStorage.getItem('token');
  if (token) {
    console.log('Token is there.')
  }
  const email = localStorage.getItem('userEmail');
  const name = localStorage.getItem('userName');

  useEffect(() => {
    if (!token) {
      setError('You must be logged in to view this page.');
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/auth/profile', {
          method: 'GET',
          headers: {'Authorization': `Bearer ${token}`},
        });
        console.log('User profile:', response.data);

        if (!response.ok) {
          if (response.status === 401) {
            alert('Your session has expired. Please log in again.');
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            navigate('/login');
            return;
          }
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setData(data);

        if (data?.firstName && data?.email && (!email || !name)) {
          localStorage.setItem('userName', data.firstName);
          localStorage.setItem('userEmail', data.email);
          login(data.firstName);
        }
      } catch (error) {
        setError('Failed to fetch data.');
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [navigate, login, token, email, name]);  

  if (!token) {
    // Return nothing if no token is present
    return null;
  } 

  if (!data) return <div className='p-10' style={{ height: '50vh' }}><p>Loading details...</p></div>;
  if (error) return <div className='p-10' style={{ height: '50vh' }}><p className="error-text">Error: {error}</p></div> ;
  
  // Navigation
  const goToEdit = () => navigate('/edit_profile');
  const goToPaymentHistory = () => navigate('/payment_history');
  const goToPrescriptionHistory = () => navigate('/uploads_history');

  // Log out
  const logOut = () => {
    // Clear user-related data from localStorage (or sessionStorage)
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');

    logout();  // Log out in UserContext

    // Optionally clear other session data if needed
    sessionStorage.clear(); 

    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className="cart-page text-[13px]">
        <div className='cart-page'>
          <h2>My Profile</h2>

          <div className="flex flex-col items-center mb-10"> 
            <div className="w-32 h-32 rounded-full bg-blue-200 mb-4">
              <img src={fallbackImage} className="w-full h-full rounded-full object-cover" />
            </div>
          </div>

          <div className='cart-items payment-details'>        
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                  <tbody>                
                      <tr>
                        <th className="border-b px-4 py-2 text-left w-[70px]">Name :</th>
                        <td className="border-b px-4 py-2 text-left"> {data.firstName}  {data.lastName || '-'} </td>                                   
                      </tr>

                      <tr>
                        <th className="border-b px-4 py-2 text-left">Email :</th>
                        <td className="border-b px-4 py-2 text-left">{data.email || '-'}</td>                   
                      </tr>

                      <tr>
                        <th className="border-b px-4 py-2 text-left">Mobile :</th>
                        <td className="border-b px-4 py-2 text-left">{data.mobile || '-'}</td>                  
                      </tr>

                       <tr>
                        <th className="border-b px-4 py-2 text-left">Address :</th>
                        <td className="border-b px-4 py-2 text-left">{data.address || '-'}</td>                  
                      </tr>

                      <tr>
                        <th className="border-b px-4 py-2 text-left">City :</th>
                        <td className="border-b px-4 py-2 text-left">{data.city || '-'}</td>                  
                      </tr>                                          
                  </tbody>
                </table>
            </div>
          </div>

          {/* <p className='pl-2 pr-2 text-blue-500 text-lg mt-[50px] mb-[0px]'>
            <strong>
            <FontAwesomeIcon icon={faCog} className='pl-2 pr-2'/> Settings :
            </strong>
          </p> */}

          <div className='cart-items payment-details g-none shadow-none'> 
            <div className='cart-page mb-0 hover:bg-gray-200 cursor-pointer' onClick={goToEdit}>       
                <div className="overflow-x-auto flex justify-between items-center">
                    <div className='flex flex-row items-center gap-5'>
                        <FontAwesomeIcon icon={faUserEdit} className='pl-2 pr-2'/>
                        <p>Edit Profile</p>
                    </div>

                    <FontAwesomeIcon icon={faChevronRight  } className='pl-2 pr-2'/>                   
                </div>
            </div>
            <div className='cart-page mt-0 mb-0 hover:bg-gray-200 cursor-pointer' onClick={goToPaymentHistory}>
                <div className="overflow-x-auto flex justify-between items-center">
                    <div className='flex flex-row items-center gap-5'>
                        <FontAwesomeIcon icon={faCreditCard} className='pl-2 pr-2'/>
                        <p>Payment History</p>
                    </div>  

                    <FontAwesomeIcon icon={faChevronRight  } className='pl-2 pr-2'/>                 
                </div>
            </div>
            <div className='cart-page mt-0 mb-0 hover:bg-gray-200 cursor-pointer' onClick={goToPrescriptionHistory}>
                <div className="overflow-x-auto flex justify-between items-center">
                    <div className='flex flex-row items-center gap-5'>
                        <FontAwesomeIcon icon={faFileMedicalAlt} className='pl-2 pr-2'/>
                        <p>Uploaded Prescriptions History</p>
                    </div> 

                    <FontAwesomeIcon icon={faChevronRight  } className='pl-2 pr-2'/>                  
                </div>
            </div>
            <div className='cart-page mt-0 hover:bg-gray-200 cursor-pointer' onClick={logOut}>
                <div className="overflow-x-auto flex justify-between items-center">
                    <div className='flex flex-row items-center gap-5'>
                        <FontAwesomeIcon icon={faSignOutAlt} className='pl-2 pr-2'/>
                        <p>Log out</p>
                    </div>

                    <FontAwesomeIcon icon={faChevronRight  } className='pl-2 pr-2'/>                 
                </div>
            </div>                     
          </div>
        </div>
    </div>
  );
};

export default MyProfile;

