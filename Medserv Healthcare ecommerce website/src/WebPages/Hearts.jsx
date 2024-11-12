import React, { useState } from "react";

export default function Hearts() {
  // State to track which FAQ is open
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index); // Toggle the FAQ visibility
  };

  return (
    <div>
      <section className="grid bg-[#000] bg-opacity-90 p-4 mx-auto flex items-center justify-center">
        <div className="grid max-w-screen-xl ml-10 px-4 py-4 mx-auto lg:gap-8 xl:gap-0 lg:py-8 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-xl font-bold tracking-tight leading-none md:text-3xl xl:text-4xl text-white dark:text-white">
              Your Health - Our Priority
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-400 lg:mb-8 md:text-lg lg:text-xl dark:text-white">
              Medserv brings healthcare to rural Sri Lanka. Join us in building
              a healthier future.
            </p>

            <a
              href="#"
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

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-x-16 gap-y-5 xl:gap-28 max-lg:max-w-2xl mx-auto max-w-full">
            {/* Left Column: Image */}
            <div className="w-full lg:w-1/2">
              <img
                src="https://cdn.pixabay.com/photo/2020/07/23/01/09/field-5430070_640.jpg"
                alt="FAQ tailwind section"
                className="w-full rounded-xl object-cover"
              />
            </div>

            {/* Right Column: Lorem ipsum text */}
            <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
              <h1 className="text-3xl text-center"></h1>
              <p className="text-lg text-center text-gray-600">
                Empowering rural communities, Medserv is committed to bringing
                healthcare to the forefront of Sri Lanka’s development. We
                provide free health checkups and dedicated support for
                individuals living with chronic kidney diseases, ensuring they
                receive the care they need to thrive. Our mission is to improve
                the quality of life across rural areas by making healthcare
                accessible to all, one compassionate step at a time. We believe
                that with the help of generous donations and support, we can
                create a healthier, brighter future for Sri Lanka. Join us in
                our cause — take part in our programs, donate, and help us make
                a lasting impact on the lives of those in need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-[#E9F7FF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#706B6B] mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                question: "What services does Medserv hearts provide?",
                answer:
                  "Medserv offers free health checkups and ongoing support for individuals with chronic kidney diseases. Our goal is to provide essential healthcare services to underserved rural communities across Sri Lanka, ensuring better health outcomes for those in need.",
              },
              {
                question: "How can I support Medserv haerts mission?",
                answer:
                  "You can support our mission by donating to our cause or joining our courses to help spread awareness and educate others. Every contribution, whether financial or through volunteer work, helps us take one more step toward a healthier Sri Lanka.",
              },
              {
                question:
                  "Who is eligible for Medserv hearts free health checkups?",
                answer:
                  "Medserv provides free health checkups primarily for individuals living in rural areas of Sri Lanka, particularly those at risk or suffering from chronic kidney diseases. We aim to make healthcare accessible to those who need it the most.",
              },
              {
                question:
                  "How can I get involved with Medserv hearts programs or volunteer opportunities?",
                answer:
                  "To get involved, you can visit our website to learn about current volunteer opportunities, upcoming courses, and donation options. We welcome all individuals who are passionate about helping improve the health and well-being of rural communities in Sri Lanka.",
              },
            ].map((faq, index) => (
              <div key={index} className="p-6 bg-white rounded-xl">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <p className="text-xl  text-gray-700">{faq.question}</p>
                  <span className="text-3xl text-darkBlue font-bold">
                    {openFAQ === index ? "-" : "+"}
                  </span>
                </div>
                {openFAQ === index && (
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
