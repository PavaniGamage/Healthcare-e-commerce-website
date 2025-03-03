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
    termsAndConditions: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Handle form submission logic here
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <section>
          <div className="form-container w-[750px] mx-auto flex flex-col">
            <div className="new-user">
              <div className="register-heading text-lg text-center mb-10 mt-10">
                <div className="register-heading text-lg text-left mb-10 mt-10 flex items-center">
                  <a
                    href="/hearts"
                    className="text-gray-200 font-medium text-xl hover:text-yellow-500 cursor-pointer"
                  >
                    &lt; Mederv Hearts
                  </a>
                </div>

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
                      key !== "termsAndConditions" &&
                      key !== "proofOfIncome" &&
                      key !== "proofOfResidence" &&
                      key !== "medicalCondition" && (
                        <div className="form-group text-left" key={key}>
                          <input
                            type={
                              key === "email"
                                ? "email"
                                : key === "contactNumber" ||
                                  key === "numberOfFamilyMembers"
                                ? "number"
                                : "text"
                            }
                            id={key}
                            name={key}
                            placeholder={key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())
                              .trim()}
                            required
                            className="text-base text-left placeholder:text-left"
                            value={formDetails[key]}
                            onChange={handleChange}
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
                  <div className="form-group text-left mt-4">
                    <label htmlFor="proofOfIncome" className="block">
                      Income certificate or parents' salary slips
                    </label>
                    <input
                      type="file"
                      id="proofOfIncome"
                      name="proofOfIncome"
                      accept=".jpg, .jpeg, .png, .pdf"
                      onChange={handleChange}
                      className="text-base"
                      required
                    />
                  </div>

                  <div className="form-group text-left mt-4">
                    <label htmlFor="proofOfResidence" className="block">
                      Grama Niladari-approved proof of residence document
                    </label>
                    <input
                      type="file"
                      id="proofOfResidence"
                      name="proofOfResidence"
                      accept=".jpg, .jpeg, .png, .pdf"
                      onChange={handleChange}
                      className="text-base"
                      required
                    />
                  </div>

                  <div className="form-group text-left mt-4">
                    <label htmlFor="medicalCondition" className="block">
                      SLMC-registered doctor-approved medical condition document
                    </label>
                    <input
                      type="file"
                      id="medicalCondition"
                      name="medicalCondition"
                      accept=".jpg, .jpeg, .png, .pdf"
                      onChange={handleChange}
                      className="text-base"
                      required
                    />
                  </div>

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
                  <div className="flex justify-end w-full h-[100px] items-center">
                    <button type="submit" disabled={loading}>
                      {loading ? "Processing..." : "Submit"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
