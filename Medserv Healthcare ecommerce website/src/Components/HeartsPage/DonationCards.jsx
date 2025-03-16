import React, { useState, useEffect  } from "react";
import { useNavigate  } from "react-router-dom";
import clsx from 'clsx'; // for dynamic class names and simplifying some of the logic.
import axios from "axios";
import fallbackImage from '../../Components/ShopPages/Common/Item/medserv_logo-for-products.png';

const DonationCard = ( {totalPrice, isButtonDisabled}) => {
  const [activeTab, setActiveTab] = useState("Looking For Support");
  const [donations, setDonations] = useState([]); // State to hold donation data
  const [fulfilledDonations, setFulfilledDonations] = useState([]); // State for fulfilled donations
  const [error, setError] = useState(""); // State for error handling
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [donationsPerPage] = useState(8); // Set the number of donations per page
  const totalPagesForDonations = Math.ceil(donations.length / donationsPerPage);
  const totalPagesForFullfilledDonations = Math.ceil(fulfilledDonations.length / donationsPerPage);
  const [loading, setLoading] = useState(true);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Handle image error by showing a fallback image
  const handleImageError = (event) => {
    event.target.src = fallbackImage; 
  };

  // Fetch donation data from the backend
  useEffect(() => {
      const fetchDonation = async () => {
          try {
              const response = await axios.get("http://localhost:4000/donationRequests/donations");
              
              // Filter and sort donations
              const fulfilledDonationsData = response.data
                .filter(donation => donation.sessionId !== null && donation.status === 'paid')
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
              setFulfilledDonations(fulfilledDonationsData);
              
              const requestDonationsData = response.data
                .filter(donation => donation.status === 'Pending' ||  donation.sessionId === null)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
              setDonations(requestDonationsData);

              setLoading(false);
          } catch (err) {
              setError("Failed to fetch donation data");
              setLoading(false);
              console.error("Error fetching donation:", err);
          }
      };

      fetchDonation();
  }, []); 

  // Logic to calculate the indexes of the first and last donation for the current page
  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = donations.slice(indexOfFirstDonation, indexOfLastDonation);
  const currentFullfilledDonations = fulfilledDonations.slice(indexOfFirstDonation, indexOfLastDonation);

  // Pagination logic
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Create the page numbers array based on the current page and total pages
  const pageNumbersForDonations = [];
  for (let i = 1; i <= totalPagesForDonations; i++) {
    pageNumbersForDonations.push(i);
  }

  const pageNumbersForFullfiledDonations = [];
  for (let i = 1; i <= totalPagesForFullfilledDonations; i++) {
    pageNumbersForFullfiledDonations.push(i);
  }

  if (error) {
      return <div className="col-span-1 sm:col-span-2 md:col-span-4 flex justify-center p-[100px]">
                <p className="text-base text-gray-700 px-4 py-2 rounded-md">
                  Error: {error}
                </p>
              </div>; }

  if (!donations) {
    return <div className="flex justify-center p-[100px] text-gray-700">Loading...</div>;
  }  
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Tabs */}
      <div className="flex justify-center mb-14 mt-20 space-x-6" id="Support">
        <a
          href="#Support"
          onClick={() => { handleTabClick("Looking For Support"); setCurrentPage(1); }}
          className={`px-7 py-3 text-2xl font-bold ${
            activeTab === "Looking For Support"
              ? "text-darkBlue underline decoration-4 hover:underline"
              : "text-gray-500 hover:text-darkBlue no-underline"
          }`}
          style={{ textUnderlineOffset: "10px" }}
        >
          Looking For Support
        </a>

        <a
          href="#Support"
          onClick={() => {handleTabClick("Fulfilled"); setCurrentPage(1);}}
          className={`px-7 py-3 text-2xl font-bold  ${
            activeTab === "Fulfilled"
              ? "text-darkBlue underline decoration-4 hover:underline"
              : "text-gray-500 hover:text-darkBlue no-underline"
          }`}
          style={{ textUnderlineOffset: "10px" }}
        >
          Fulfilled
        </a>
      </div>

      {/* Donation Cards */}
      {activeTab === "Looking For Support" && (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
              {currentDonations.length > 0 ? (
                currentDonations.map((donation) => {
                  const totalPrice = donation.billDetails.totalPrice;
                  const formattedPrice = (typeof totalPrice === 'number' && !isNaN(totalPrice))
                    ? totalPrice.toFixed(2)
                    : "Pending";
                  const date = new Date(donation.createdAt);
                  const formattedDate = date.toLocaleDateString('en-CA');
                  const billImageSrc = donation.billDetails?.billFile 
                    ? `data:${donation.billDetails.billFile.contentType};base64,${donation.billDetails.billFile.data}`
                    : fallbackImage;
                    // Open modal with the selected image
                  const handleImageClick = () => {
                    setSelectedImage(billImageSrc);  
                    setIsOpen(true);  // Open the modal
                  };
                  const isButtonDisabled = !(donation.review.reviewStatus === 'Approved' && donation.billDetails?.totalPrice !== null);
                  // send donation amount to donate page
                  const handleDonateClick = () => {
                    navigate('/donation', { state: { amount: totalPrice, donationID: donation.donationID } });   
                  };
                  
                  return (
                    <div
                      key={donation.donationID}
                      className="border-2 border-darkBlue rounded-lg p-6 shadow-md text-center"
                    >
                      <p className="text-center font-bold">#REQ {donation.donationID}</p>
                      <img
                        src={billImageSrc}
                        className="w-full h-60 object-cover mb-1 rounded"
                        onClick={handleImageClick}
                        alt="Bill"
                        onError={handleImageError}
                      />

                      {/* Modal for Large Image */}
                      {isOpen && selectedImage && (
                        <div
                          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
                          onClick={() => setIsOpen(false)} // Close modal when clicking outside
                        >
                          <div className="relative p-2" onClick={(e) => e.stopPropagation()}>
                            <button
                              className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
                              onClick={() => setIsOpen(false)} // Close modal on button click
                            >
                              ✖
                            </button>
                            <img
                              src={selectedImage}  // Display the selected image in the modal
                              className="max-w-[90vw] max-h-[90vh] rounded-lg"
                              alt="Large Bill"
                            />
                          </div>
                        </div>
                      )}

                      <p className="text-sm">
                        Amount:{" "}
                        <span className="text-darkBlue font-semibold text-lg">
                          Rs. {formattedPrice}
                        </span>
                      </p>
                      {totalPrice == null && <p className="text-red-600">Still Under Verification</p>}
                      <p className="text-sm">
                        Requested on:{" "}
                        <span className="text-black text-medium">
                          {formattedDate}
                        </span>
                      </p>
                      <a href="/donation">
                        <button
                          className={`bg-darkBlue text-white px-5 py-1 mt-2 text-base font-medium rounded focus:outline-none ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#3ebfd6]'}`}
                          style={{ border: "none" }}
                          disabled={isButtonDisabled}
                          onClick={handleDonateClick}
                        >
                          Donate
                        </button>
                      </a>
                    </div>
                )} )
              ) : loading || currentDonations.length !== 0 ? (
                <div className="col-span-1 sm:col-span-2 md:col-span-4 flex justify-center">
                  <p className="text-base text-gray-700 px-4 py-2 rounded-md">
                    Loading..
                  </p>
                </div>
              ) : !loading && currentDonations.length === 0 ? (
                <div className="col-span-1 sm:col-span-2 md:col-span-4 flex justify-center">
                  <p className="text-base text-gray-700 px-4 py-2 rounded-md">
                    No donation requests at the moment.
                  </p>
                </div>
              ) : null}
            </div>

            {/* Pagination Controls */}
            <div className="text-center flex flex-col gap-2 mt-12">
              <div className="flex justify-center items-center">
                {/* Previous Button */}
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 rounded-l-md border-0 m-[10px] disabled:opacity-50"
                >
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex items-center mx-4">
                  {currentPage > 2 && (
                    <>
                      <button onClick={() => paginate(1)} className="px-3 py-2 border-0 m-[5px]">
                        1
                      </button>
                      <span className="px-2">. . .</span>
                    </>
                  )}

                  {pageNumbersForDonations
                    .filter((number) => number >= currentPage - 1 && number <= currentPage + 1)
                    .map((number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={clsx(
                          'px-3 py-2',
                          currentPage === number ? 'bg-blue-500 text-white border-0 m-[5px]' : 'bg-gray-200 border-0 m-[10px]'
                        )}
                      >
                        {number}
                      </button>
                    ))}

                  {currentPage < totalPagesForDonations - 1 && (
                    <>
                      <span className="px-2">...</span>
                      <button onClick={() => paginate(totalPagesForDonations)} className="px-3 py-2 border-0 m-[5px]">
                        {totalPagesForDonations}
                      </button>
                    </>
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPagesForDonations}
                  className="px-4 py-2 bg-gray-200 rounded-r-md border-0 m-[10px] disabled:opacity-50"
                >
                  Next
                </button>
              </div>

              {/* Page Number Display */}
              <span className="px-4 py-2">
                Page {currentPage} of {totalPagesForDonations}
              </span>
            </div>
        </div>
      )}

      {/* Fulfilled Cards */}
      {activeTab === "Fulfilled" && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
            {currentFullfilledDonations.length > 0 ? (
              currentFullfilledDonations.map((donation) => {
                const totalPrice = donation.billDetails.totalPrice;
                const formattedPrice = (typeof totalPrice === 'number' && !isNaN(totalPrice))
                  ? totalPrice.toFixed(2)
                  : "Pending";
                const date = new Date(donation.createdAt);
                const formattedDate = date.toLocaleDateString('en-CA');
                const billImageSrc = donation.billDetails?.billFile 
                  ? `data:${donation.billDetails.billFile.contentType};base64,${donation.billDetails.billFile.data}`
                  : fallbackImage;
                  // Open modal with the selected image
                const handleImageClick = () => {
                  setSelectedImage(billImageSrc);  
                  setIsOpen(true);  // Open the modal
                };

                return (
                  <div
                    key={donation.donationID}
                    className="border-2 border-darkBlue bg-green-50 rounded-lg p-6 shadow-md text-center"
                  >
                    <p className="text-center font-bold">#REQ {donation.donationID}</p>
                    <img
                      src={billImageSrc}
                      className="w-full h-60 object-cover mb-1 rounded"
                      onClick={handleImageClick}
                      alt="Bill"
                      onError={handleImageError}
                    />

                    {/* Modal for Large Image */}
                    {isOpen && selectedImage && (
                      <div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
                        onClick={() => setIsOpen(false)} // Close modal when clicking outside
                      >
                        <div className="relative p-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
                            onClick={() => setIsOpen(false)} // Close modal on button click
                          >
                            ✖
                          </button>
                          <img
                            src={selectedImage}  // Display the selected image in the modal
                            className="max-w-[90vw] max-h-[90vh] rounded-lg"
                            alt="Large Bill"
                          />
                        </div>
                      </div>
                    )}

                    <p className="text-sm">
                      Amount:{" "}
                      <span className="text-green font-semibold text-lg">
                        Rs. {formattedPrice}
                      </span>
                    </p>

                    <p className="text-sm">
                      Requested on:{" "}
                      <span className="text-black text-medium">
                        {formattedDate}
                      </span>
                    </p>

                    {/* Replacing Donate button with a checkmark ✅ */}
                    <div className="text-3xl text-green-650 mt-2">✅</div>

                    {/* about sending to person in need */}
                    {donation.sendingStatus === 'Sent' ? (
                      <div className="mt-[20px] mb-[10px] p-[10px] bg-yellow-500 rounded-lg">
                        <span className="text-black text-medium">Donation Delivered</span>
                      </div>  
                    ) : (
                      <div className="mt-[20px] mb-[10px] p-[10px] bg-gray-500 rounded-lg">
                        <span className="text-black text-medium">Delivery in Progress</span>
                      </div>                    
                    )}
                  </div> 
              )} ) 
            ) : loading || currentFullfilledDonations.length !== 0 ? (
              <div className="col-span-1 sm:col-span-2 md:col-span-4 flex justify-center">
                <p className="text-base text-gray-700 px-4 py-2 rounded-md">
                  Loading..
                </p>
              </div>
            ) : !loading && currentFullfilledDonations.length === 0 ? (
              <div className="col-span-1 sm:col-span-2 md:col-span-4 flex justify-center">
                <p className="text-base text-gray-700 px-4 py-2 rounded-md">
                  No fullfiled donation requests at the moment.
                </p>
              </div>
            ) : null}
          </div>

          {/* Pagination Controls */}
          <div className="text-center flex flex-col gap-2 mt-12">
            <div className="flex justify-center items-center">
              {/* Previous Button */}
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded-l-md border-0 m-[10px] disabled:opacity-50"
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center mx-4">
                {currentPage > 2 && (
                  <>
                    <button onClick={() => paginate(1)} className="px-3 py-2 border-0 m-[5px]">
                      1
                    </button>
                    <span className="px-2">. . .</span>
                  </>
                )}

                {pageNumbersForFullfiledDonations
                  .filter((number) => number >= currentPage - 1 && number <= currentPage + 1)
                  .map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={clsx(
                        'px-3 py-2',
                        currentPage === number ? 'bg-blue-500 text-white border-0 m-[5px]' : 'bg-gray-200 border-0 m-[10px]'
                      )}
                    >
                      {number}
                    </button>
                  ))}

                {currentPage < totalPagesForFullfilledDonations - 1 && (
                  <>
                    <span className="px-2">...</span>
                    <button onClick={() => paginate(totalPagesForFullfilledDonations)} className="px-3 py-2 border-0 m-[5px]">
                      {totalPagesForFullfilledDonations}
                    </button>
                  </>
                )}
              </div>

              {/* Next Button */}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPagesForFullfilledDonations}
                className="px-4 py-2 bg-gray-200 rounded-r-md border-0 m-[10px] disabled:opacity-50"
              >
                Next
              </button>
            </div>

            {/* Page Number Display */}
            <span className="px-4 py-2">
              Page {currentPage} of {totalPagesForFullfilledDonations}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationCard;
