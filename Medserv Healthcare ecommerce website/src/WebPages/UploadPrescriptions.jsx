import React, { useState } from 'react';
import './WebPages CSS/UploadPrescriptions.css';

const UploadPrescriptions = () => {
  const userEmail = localStorage.getItem('userEmail');

  const [formData, setFormData] = useState({
    userEmail: userEmail,
    patientName: '',
    patientAge: '',
    patientGender: '',
    frequency: '',
    fulfillment: '',
    substitutes: '',
    prescriptionFile: null,
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!userEmail) {
      alert('Please log in before uploading.');
      setError("You're not logged-in!"); 
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      // Log form data
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await fetch('http://localhost:4000/prescriptionsUpload', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        alert('Prescription uploaded successfully!');
        setFormData({
          userEmail: userEmail,
          patientName: '',
          patientAge: '',
          patientGender: '',
          frequency: '',
          fulfillment: '',
          substitutes: '',
          prescriptionFile: null,
          message: ''
        });
      } else {
        const result = await response.json();
        setError(result.message || 'Failed to upload prescription');
      }
    } catch (error) {
      console.error('Error uploading prescription:', error);
      setError('There was an error uploading the prescription.');
      alert('There was an error uploading the prescription!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNumberInput = (e) => {
    const value = e.target.value;
  
    // Ensure the value is a valid positive number
    if (value && !/^[0-9]*$/.test(value)) {
      // Prevent input if the value contains symbols or non-digit characters
      e.target.setCustomValidity('Please enter only positive numbers');
    } else {
      e.target.setCustomValidity('');  // Reset validation if input is valid
    }
  };

  return (
    <div>
      <div className="upload-form">
        <form onSubmit={handleSubmit}>
          <div className="upload-form-intro">
            <h3 id="heading-of-form">Upload Your Prescription Now</h3>
            <li>
              Please upload an image of your medical prescription issued by a SLMC registered doctor.
            </li>
            <li>
              Prescription drug will only be issued if a valid prescription image is provided.
            </li>
          </div>

          <h3>Patient Information</h3>
          <input type="text" id="patientName" name="patientName" placeholder="Patient Name" value={formData.patientName} onChange={handleChange} required/>
          <input type="number" id="patientAge" name="patientAge" placeholder="Patient Age" value={formData.patientAge} onChange={handleChange} onInput={handleNumberInput} required/>
          <div className="select">
            <select id="patientGender" name="patientGender" value={formData.patientGender} onChange={handleChange}  required>
              <option value="">Select Patient Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <h3>Frequency</h3>
          <div className="select">
            <select id="frequency" name="frequency" value={formData.frequency} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="On time">On time</option>
              <option value="On going">On going</option>
            </select>
          </div>

          <h3>Fulfillment</h3>
          <div className="select">
            <select id="fulfillment" name="fulfillment" value={formData.fulfillment}  onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Full">Full</option>
              <option value="Partial">Partial</option>
            </select>
          </div>

          <h3>I am OK to Receive Substitutes:</h3> 
          <div className="select">
            <select  id="substitutes" name="substitutes" value={formData.substitutes} onChange={handleChange} required >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <h3>Upload Prescription File</h3>
          <div className="prescription-feild">
            <input type="file" id="prescriptionFile" name="prescriptionFile" accept="image/jpeg, image/png, application/pdf" onChange={handleChange} required/>
          </div>

          <h3>Your Message</h3>
          <textarea id="message" name="message" placeholder="Type Your Message Here" value={formData.message}onChange={handleChange}>
          </textarea>

          <div className="check">
            <input type="checkbox" id="termsAndConditions" name="termsAndConditions" required />
            <label htmlFor="termsAndConditions">
              I agree with terms and conditions
            </label>
          </div>

          <button  className="send-to-medserv-btn" type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send to Medserv'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default UploadPrescriptions;