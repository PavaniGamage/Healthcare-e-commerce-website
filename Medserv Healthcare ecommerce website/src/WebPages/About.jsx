import React from "react";

export default function About() {
  return (
    <div>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-x-16 gap-y-5 xl:gap-28 max-lg:max-w-2xl mx-auto max-w-full">
            {/* Left Column: Image */}
            <div className="w-full lg:w-1/2">
              <img
                src="https://plus.unsplash.com/premium_photo-1661767397342-5693494e0ffe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGhhcm1hY2lzdHxlbnwwfDF8MHx8fDA%3D"
                alt="FAQ tailwind section"
                className="w-full rounded-xl object-cover"
              />
            </div>

            {/* Right Column: Lorem ipsum text */}
            <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
              <h1 className="text-4xl text-center">About Us</h1>
              <p className="text-lg text-gray-600">
                Welcome to MedServ Pharmacy, where we go beyond traditional
                pharmacy services to offer a full spectrum of healthcare support
                designed for your convenience and well-being. At MedServ, we
                believe in providing accessible, comprehensive care that meets
                the evolving needs of our community.
              </p>
              <h2>Our Mission</h2>
              <p className="text-lg text-gray-600">
                Our mission is to empower individuals and families to lead
                healthier lives by offering a seamless blend of pharmaceutical
                and medical equipment rental services. We’re here to simplify
                healthcare with personalized, compassionate service, whether you
                need prescription medications, health consultations, or
                specialized medical equipment at home.
              </p>
              <h2>Why Choose Us?</h2>
              <p className="text-lg text-gray-600">
                MedServ Pharmacy is committed to making healthcare simple and
                accessible for everyone. By combining pharmaceutical expertise
                with a responsive, easy-to-use rental service for medical
                equipment, we’re here to meet you at every step of your
                healthcare journey. We pride ourselves on compassionate care,
                convenient services, and a deep commitment to community
                wellness.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
