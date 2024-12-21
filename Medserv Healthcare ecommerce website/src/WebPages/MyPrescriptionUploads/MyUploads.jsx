import React, { useEffect, useState } from 'react';
import '../../WebPages/WebPages CSS/Cart.css';

const MyUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const email = localStorage.getItem('userEmail');

  useEffect(() => {
    // Fetch prescription upload history from the backend
    const fetchUploads = async () => {
      if (!email) {
        // setError('User email is not available in localStorage.');
        setError('Please login to access details.');
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`http://localhost:4000/prescriptionsUpload/prescription_history/${email}`);
        if (response.status === 404) {
          throw new Error('No uploads found.');
        }
        if (!response.ok) {
          throw new Error('Failed to fetch details of uploads');
        }
        const data = await response.json();
        setUploads(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUploads();
  }, [email]);

  if (loading) return <div className='p-10' style={{ height: '50vh' }}><p>Loading details...</p></div>;
  if (error) return <div className='p-10' style={{ height: '50vh' }}><p className="error-text">Error: {error}</p></div> ;

  return (
    <div className='cart-page text-[13px]'>
      <h2>My Prescription Uploads</h2>
      <div className='table-item'>        
        <table className="table-auto w-full border-collapse text-center">
            <thead>
              <tr className="border-t border-b table-topic">
                <th className="px-4 py-2 text-left font-semibold">Upload ID</th>
                <th className="px-4 py-2 font-semibold">Date</th>
                <th className="px-4 py-2 font-semibold">Patient Name</th>
                <th className="px-4 py-2 font-semibold">Age</th>
                <th className="px-4 py-2 font-semibold">Gender</th>
                <th className="px-4 py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {uploads.length > 0 ? (
                uploads.map((upload, index) => (
                  <tr className="border-t border-b table-items" key={upload.orderID} onClick={() => window.location.href = `/uploads_history/${upload.orderID}`}>
                    <td className="px-4 py-2 text-left">{upload.orderID}</td>
                    <td className="px-4 py-2">{upload.createdAt ? new Date(upload.createdAt).toLocaleDateString() : "Invalid Date"}</td>
                    <td className="px-4 py-2">{upload.patientName}</td>
                    <td className="px-4 py-2">{upload.patientAge}</td>
                    <td className="px-4 py-2">{upload.patientGender}</td>
                    <td className="px-4 py-2">{upload.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-2 text-center">You have not uploaded any prescriptions yet.</td>
                </tr>
              )}
            </tbody>
        </table>  
      </div>

      <div className="cart-summary flex items-center space-x-0 pr-10">
        <h3 className="text-lg font-semibold">Total Uploads:</h3>
        <p className="text-lg font-semibold">{uploads.length}</p>
      </div>
      <hr className='hr-line'/>   
    </div>
  );
};

export default MyUploads;
