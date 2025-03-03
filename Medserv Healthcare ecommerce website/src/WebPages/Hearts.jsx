import React, { useState } from "react";
import DonationCards from "../Components/HeartsPage/DonationCards";

export default function Hearts() {
  // State to track which FAQ is open
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index); // Toggle the FAQ visibility
  };

  return (
    <div>
      <section className="grid bg-[#d6efff] bg-opacity-90 p-4 mx-auto items-center justify-center">
        <div className="grid max-w-screen-xl ml-10 px-4 py-4 mx-auto lg:gap-8 xl:gap-0 lg:py-8 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-xl font-bold tracking-tight leading-none md:text-3xl xl:text-4xl text-[#404549] ">
              Your Health - Our Priority
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-800 lg:mb-8 md:text-lg lg:text-xl">
              Help those in need get essential medicines. Your donation brings
              hope and healing!
            </p>

            <a
              href="/make-donation"
              className="inline-flex items-center justify-center px-7 py-3 mr-3 text-base font-bold text-center text-white bg-darkBlue rounded hover:bg-[#3ebfd6] focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 no-underline"
            >
              Donate
            </a>

            <a
              href="/application"
              className="inline-flex items-center justify-center px-7 py-3 mr-3 text-base font-bold text-center text-white bg-[#f2ae00] rounded hover:bg-[#deb03a] focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 no-underline"
            >
              Get Support
            </a>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://cdn.pixabay.com/photo/2017/05/15/21/51/blood-icon-2316227_1280.png"
              alt="mockup"
              className="w-full h-auto max-w-xs rounded-xl"
            />
          </div>
        </div>
      </section>

      <section className="pt-24 pr-24 pl-24 pb-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-x-16 gap-y-5 xl:gap-28 max-lg:max-w-2xl mx-auto max-w-full">
            {/* Left Column: Image */}
            <div className="w-full lg:w-1/2">
              <img
                src="https://cdn.pixabay.com/photo/2021/10/03/03/47/doctor-6676747_1280.jpg"
                alt="FAQ tailwind section"
                className="w-full rounded-xl object-cover"
              />
            </div>

            {/* Right Column: Lorem ipsum text */}
            <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
              <h1 className="text-3xl text-center"></h1>
              <p className="text-lg text-center text-gray-600">
                Many people struggle to afford the medicines they need due to
                financial difficulties and rising medical costs. Your donation
                can make a real difference by helping provide essential
                prescriptions to those who need them the most. If you or someone
                you know is in need of medical assistance, you can apply for
                support and receive the help you deserve.
                <b>
                  <scan> </scan>Together, we can create a healthier Sri Lanka
                  where essential medications are accessible to all, regardless
                  of their financial situation.
                </b>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <DonationCards />
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-12 bg-[#ffffff]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#706B6B] mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                question: "How does my donation help?",
                answer:
                  "Medserv offers free health checkups and ongoing support for individuals with chronic kidney diseases. Our goal is to provide essential healthcare services to underserved rural communities across Sri Lanka, ensuring better health outcomes for those in need.",
              },
              {
                question: "Can I choose who receives my donation?",
                answer:
                  "You can support our mission by donating to our cause or joining our courses to help spread awareness and educate others. Every contribution, whether financial or through volunteer work, helps us take one more step toward a healthier Sri Lanka.",
              },
              {
                question: "Will I get updates on how my donation is used?",
                answer:
                  "Medserv provides free health checkups primarily for individuals living in rural areas of Sri Lanka, particularly those at risk or suffering from chronic kidney diseases. We aim to make healthcare accessible to those who need it the most.",
              },
              {
                question:
                  "How do I know my donation is going to a genuine cause?",
                answer:
                  "To get involved, you can visit our website to learn about current volunteer opportunities, upcoming courses, and donation options. We welcome all individuals who are passionate about helping improve the health and well-being of rural communities in Sri Lanka.",
              },
              {
                question: "Who is eligible to apply for assistance?",
                answer:
                  "To get involved, you can visit our website to learn about current volunteer opportunities, upcoming courses, and donation options. We welcome all individuals who are passionate about helping improve the health and well-being of rural communities in Sri Lanka.",
              },
              {
                question: "How long does it take to process my application?",
                answer:
                  "To get involved, you can visit our website to learn about current volunteer opportunities, upcoming courses, and donation options. We welcome all individuals who are passionate about helping improve the health and well-being of rural communities in Sri Lanka.",
              },
              {
                question:
                  "What documents do I need to submit with my application?",
                answer:
                  "To get involved, you can visit our website to learn about current volunteer opportunities, upcoming courses, and donation options. We welcome all individuals who are passionate about helping improve the health and well-being of rural communities in Sri Lanka.",
              },
            ].map((faq, index) => (
              <div key={index} className="p-1 bg-[#E9F7FF] rounded-xl">
                <div
                  className="mr-5 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <p className="ml-5 text-xl  text-gray-700">{faq.question}</p>
                  <span className="text-3xl text-darkBlue font-bold">
                    {openFAQ === index ? "-" : "+"}
                  </span>
                </div>
                {openFAQ === index && (
                  <p className="ml-5 mt-2 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
