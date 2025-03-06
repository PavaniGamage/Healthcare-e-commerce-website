import React, { useState } from "react";

export default function Application() {
  const [formDetails, setFormDetails] = useState({
    fullName: "",
    gender: "",
    dateOfBirth: "",
    contactNumber: "",
    email: "",
    residentialAddress: "",
    numberOfFamilyMembers: "",
    financialSituation: "",
    proofOfIncome: null,
    proofOfResidence: null,
    medicalCondition: null,
    prescriptionDocument: null,
  });

  const fieldTypes = {
    email: "email",
    contactNumber: "number",
    numberOfFamilyMembers: "number",
    dateOfBirth: "date",
    fullName: "text",
    gender: "text",
    residentialAddress: "text",
    financialSituation: "text",
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === "file") {
      setFormDetails((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else if (type === "checkbox") {
      setFormDetails((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const fetchWithTimeout = (url, options, timeout = 5000) => {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out.")), timeout)
      ),
    ]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      Object.keys(formDetails).forEach((key) => {
        formDataToSend.append(key, formDetails[key]);
      });

      // Log form data for debugging
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await fetchWithTimeout("http://localhost:4000/donationRequests", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Donation request submitted successfully!");
        setFormDetails({
          fullName: "",
          gender: "",
          dateOfBirth: "",
          contactNumber: "",
          email: "",
          residentialAddress: "",
          numberOfFamilyMembers: "",
          financialSituation: "",
          proofOfIncome: null,
          proofOfResidence: null,
          medicalCondition: null,
          prescriptionDocument: null,
        });
      } else {
        const result = await response.json();
        alert("Something went wrong with submitting!");
        setError(result.message || "Failed to submit donation request.");
      }
    } catch (error) {
      console.error("Error submitting donation request:", error);
      setError("There was an error submitting the request.");
    } finally {
      setLoading(false);
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
        <section className="grid bg-[#000] bg-opacity-90 p-4 mx-auto items-center justify-center">
            <div className="grid max-w-screen-xl ml-10 px-4 py-4 mx-auto lg:gap-8 xl:gap-0 lg:py-8 lg:grid-cols-12">
              <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-xl font-bold tracking-tight leading-none md:text-3xl xl:text-4xl text-white dark:text-white">
                  Your Health - Our Priority
                </h1>
                <p className="max-w-2xl mb-6 font-light text-gray-400 lg:mb-8 md:text-lg lg:text-xl dark:text-white">
                  Medserv brings healthcare to rural Sri Lanka. Join us in
                  building a healthier future.
                </p>

                <a
                  href="/donation"
                  className="inline-flex items-center justify-center px-7 py-3 mr-3 text-base font-medium text-center text-white bg-[#1DAEFF] rounded-xl hover:bg-[#59C2E3] focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 no-underline"
                >
                  Donation
                </a>
              </div>
              <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img
                  src="https://cdn.pixabay.com/photo/2016/12/21/10/10/begging-1922612_640.png"
                  alt="mockup"
                  className="w-full h-auto max-w-xs rounded-xl" // Round border and size control
                />
              </div>
            </div>
        </section>

        <div className="register-heading text-lg text-left  mt-10 flex items-center">
              <a
                href="/hearts"
                className="font-bold text-black text-[20px] hover:text-yellow-500 cursor-pointer no-underline ml-[100px]"
              >
                &lt; {"\u00A0"} Mederv Hearts
              </a>
        </div>

        <div className="flex justify-center">
          <section>
            <div className="form-container lg:pl-0 lg:pr-0 lg:w-[550px]">
              <div className="new-user">
                <div className="register-heading text-lg text-center mb-10 mt-10">
                  <h2>Request Donation</h2>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="register form-group">
                    {/* Subtitle for Personal Information */}
                    <div className="form-group text-left mb-4">
                      <h3 className="text-lg font-semibold">
                        Personal Information
                      </h3>
                    </div>

                    {/* Input fields */}
                    {Object.keys(formDetails).map(
                      (key) =>
                        ![
                          "proofOfIncome",
                          "proofOfResidence",
                          "medicalCondition",
                          "prescriptionDocument",
                        ].includes(key) && (
                          <div className="form-group text-left" key={key}>
                            <input
                              type={key === "dateOfBirth" && !formDetails[key] ? "text" : fieldTypes[key] || "text"} 
                              id={key}
                              name={key}
                              placeholder={
                                key === "dateOfBirth" && !formDetails[key]
                                  ? "Date of Birth" 
                                  : key
                                      .replace(/([A-Z])/g, " $1")
                                      .replace(/^./, (str) => str.toUpperCase())
                                      .trim()
                              }
                              required
                              className="text-base text-left placeholder:text-left"
                              style={{
                                textAlign: key === 'contactNumber' || key === 'numberOfFamilyMembers' ? 'left' : 'left',
                              }}
                              value={formDetails[key]}
                              onChange={handleChange}
                              onFocus={(e) => {
                                if (key === "dateOfBirth") {
                                  e.target.type = "date"; // Switch to date input on focus
                                }
                              }}
                              onBlur={(e) => {
                                if (key === "dateOfBirth" && !e.target.value) {
                                  e.target.type = "text"; // Switch back to text input if empty on blur
                                }
                              }}
                            />
                          </div>
                        )
                    )}

                    {/* Subtitle for Supporting Documents */}
                    <div className="form-group text-left mb-4 mt-8">
                      <h3 className="text-lg font-semibold">
                        Supporting Documents
                      </h3>
                    </div>

                    {/* File inputs for Supporting Documents */}
                    {["proofOfIncome", "proofOfResidence", "medicalCondition", "prescriptionDocument"].map((docKey) => (
                      <div className="form-group text-left mt-4" key={docKey}>
                        <label htmlFor={docKey} className="block">
                          {docKey === "proofOfIncome" && "Income Certificate or Salary Slips"}
                          {docKey === "proofOfResidence" && "Grama Niladari-Approved Proof of Residence Document"}
                          {docKey === "medicalCondition" && "SLMC-Registered Doctor-Approved Medical Condition Document"}
                          {docKey === "prescriptionDocument" && "Prescription Issued by SLMC-Registered Doctor"}
                        </label>
                        <input
                          type="file"
                          id={docKey}
                          name={docKey}
                          accept=".jpg, .jpeg, .png, .pdf"
                          onChange={handleChange}
                          className="text-base"
                          required
                        />
                      </div>
                    ))}

                    {/* Terms and Conditions */}
                    <div className="check check-donations text-left mt-4">
                      <input
                        type="checkbox"
                        id="termsAndConditions"
                        name="termsAndConditions"
                        required
                        checked={formDetails.termsAndConditions}
                        onChange={handleChange}
                      />
                      <label htmlFor="termsAndConditions">
                        I agree with terms and conditions.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center w-full h-[100px] items-center">
                      <button type="submit" disabled={loading}>
                        {loading ? "Processing..." : "Submit"}
                      </button>
                    </div>
                  </div>
                </form>
                {error && <p className="error-message">{error}</p>}
              </div>
            </div>
          </section>
        </div>
    </div>
  );
}
