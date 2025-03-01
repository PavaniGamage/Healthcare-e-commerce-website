import React, { useState } from "react";

export default function Application() {
  const [formDetails, setFormDetails] = useState({
    fullName: "",
    age: "",
    gender: "",
    dateOfBirth: "",
    contactNumber: "",
    email: "",
    residentialAddress: "",
    schoolName: "",
    grade: "",
    academicPerformance: null,
    numberOfFamilyMembers: "",
    financialSituation: "",
    proofOfEnrollment: null,
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
                className="inline-flex items-center justify-center px-7 py-3 mr-3 text-base font-medium text-center text-white bg-[#f2ae00] rounded-xl hover:bg-[#deb03a] focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 no-underline"
              >
                Donate
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
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <section>
          <div className="form-container w-[750px] mx-auto flex flex-col">
            <div className="new-user">
              <div className="register-heading text-lg text-center mb-10 mt-10">
                <h2>Request Educational & Nutritional Aid</h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="register form-group">
                  {/* Subtitle for Personal Information */}
                  <div className="form-group text-left mb-4">
                    <h3 className="text-lg font-semibold">
                      Personal Information
                    </h3>
                  </div>

                  {/* Full name field */}
                  {Object.keys(formDetails).map((key) =>
                    key !== "termsAndConditions" &&
                    key !== "proofOfEnrollment" &&
                    key !== "proofOfIncome" &&
                    key !== "proofOfResidence" &&
                    key !== "medicalCondition" &&
                    key !== "academicPerformance" ? (
                      <div className="form-group text-left" key={key}>
                        <input
                          type={
                            key === "email"
                              ? "email"
                              : key === "contactNumber" ||
                                key === "age" ||
                                key === "grade" ||
                                key === "numberOfFamilyMembers"
                              ? "number"
                              : "text"
                          }
                          id={key}
                          name={key}
                          placeholder={key
                            .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
                            .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
                            .trim()}
                          required
                          className="text-base text-left placeholder:text-left"
                          value={formDetails[key]}
                          onChange={handleChange}
                        />
                      </div>
                    ) : null
                  )}

                  {/* Subtitle for Supporting Documents */}
                  <div className="form-group text-left mb-4 mt-8">
                    <h3 className="text-lg font-semibold">
                      Supporting Documents
                    </h3>
                  </div>

                  {/* File inputs for Supporting Documents */}
                  <div className="form-group text-left">
                    <label htmlFor="proofOfEnrollment" className="block">
                      School or university enrollment letter
                    </label>
                    <input
                      type="file"
                      id="proofOfEnrollment"
                      name="proofOfEnrollment"
                      accept=".jpg, .jpeg, .png, .pdf"
                      onChange={handleChange}
                      className="text-base"
                      required
                    />
                  </div>

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

                  <div className="form-group text-left mt-4">
                    <label htmlFor="academicPerformance" className="block">
                      Academic performance document (school/university)
                    </label>
                    <input
                      type="file"
                      id="academicPerformance"
                      name="academicPerformance"
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
