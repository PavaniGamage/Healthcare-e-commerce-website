import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './WebPages CSS/LoginSignup.css';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    address: '',
    city: '',
  }); 

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [data, setData] = useState(null);
  const navigate = useNavigate();  

  const token = localStorage.getItem('token');
  const email = localStorage.getItem('userEmail');
  const name = localStorage.getItem('userName');
  
  useEffect(() => {
    if (token) {
      console.log('Token is there. Please log again..');
    }
    
    if (!token) {
      setError('You must be logged in to view this page.');
      navigate('/login');
      return;
    }

    // Make the API request to a protected route
    fetch('http://localhost:7000/api/auth/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        setError('Failed to fetch data.');
        console.error('Error fetching profile:', error);
      });
  }, [token, email, name, navigate]);

  // Check if there's an error or if data is still loading
  if (error) {
    return <div className='p-10' style={{ height: '50vh' }}><p>{error}</p></div>;
  }

  if (!data) {
    return <div className='p-10' style={{ height: '50vh' }}><p>Loading...</p></div>;  // Show loading state while waiting for data
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Send previous data if new data is not provied
  const isDataProvided = () => {
    if (!formData.firstName) {
      formData.firstName = data.firstName;
    }
    if (!formData.lastName) {
      formData.lastName = data.lastName;
    }
    if (!formData.address) {
      formData.address = data.address;
    }
    if (!formData.mobile) {
      formData.mobile = data.mobile;
    }
    if (!formData.city) {
      formData.city = data.city;
    }
  };

  // Check if form data is different from previous profile data
  const isDataChanged = () => {
    if (
      formData.firstName === data.firstName &&
      formData.lastName === data.lastName &&
      formData.mobile === data.mobile &&
      formData.address === data.address &&
      formData.city === data.city
    ) {
      // setError('No changes detected. Please modify at least one field.');
      alert('No changes detected. Please modify at least one field.');
      setMessage('');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set previous data if no new data is provided
    isDataProvided();

    // Check if there are any changes
    if (!isDataChanged()) {
      return; // Exit if no changes detected
    }

    try {
      const response = await axios.put('http://localhost:7000/api/auth/edit-profile', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming a token is stored in localStorage
        },
      });

      setMessage(response.data.message);
      setError('');

      navigate('/my_profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating profile');
      setMessage('');
    }
  };

  return (
    <div className="form-container max-w-[550px] mx-auto flex flex-col">
      <div className='new-user'>
        <div className='register-heading text-center mb-10 mt-10'> 
          <h2>Edit Profile</h2> 
        </div>

        <form onSubmit={handleSubmit}>
          <div className="register">
            <div className="form-group"> <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder={data.firstName} className='text-base text-[13px]'/> </div>
            <div className="form-group"> <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder={data.lastName} className='text-base text-[13px]' /> </div>
            <div className="form-group"> <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} placeholder={data.mobile} className='text-base text-[13px]' /> </div>
            <div className="form-group"> <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} placeholder={data.address} className='text-base text-[13px]' /> </div>
            <div className="form-group">
              <div className="select-form-group">
                <select id="city" name="city" value={formData.city} onChange={handleChange} placeholder={data.city} className='text-base text-[13px]' >
                  <option value="">{data.city}</option> 
                  <option value="Ampara">Ampara</option>
                  <option value="Anuradhapura">Anuradhapura</option>
                  <option value="Badulla">Badulla</option>
                  <option value="Batticaloa">Batticaloa</option>
                  <option value="Colombo">Colombo</option>
                  <option value="Galle">Galle</option>
                  <option value="Gampaha">Gampaha</option>
                  <option value="Hambantota">Hambantota</option>
                  <option value="Jaffna">Jaffna</option>
                  <option value="Kalutara">Kalutara</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Kegalle">Kegalle</option>
                  <option value="Kilinochchi">Kilinochchi</option>
                  <option value="Kurunegala">Kurunegala</option>
                  <option value="Mannar">Mannar</option>
                  <option value="Matale">Matale</option>
                  <option value="Matara">Matara</option>
                  <option value="Monaragala">Monaragala</option>
                  <option value="Mullaitivu">Mullaitivu</option>
                  <option value="Nuwara Eliya">Nuwara Eliya</option>
                  <option value="Polonnaruwa">Polonnaruwa</option>
                  <option value="Puttalam">Puttalam</option>
                  <option value="Ratnapura">Ratnapura</option>
                  <option value="Trincomalee">Trincomalee</option>
                  <option value="Vavuniya">Vavuniya</option>
                </select>
              </div>
            </div>

            <div className='flex justify-center w-full h-[100px] items-center'>
              <button type="submit">Update</button>
            </div>
          </div>
        </form>   
      </div>
    </div>
  );
};

export default EditProfile; 
