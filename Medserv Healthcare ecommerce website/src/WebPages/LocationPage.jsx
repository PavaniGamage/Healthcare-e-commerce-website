import React from "react";

export default function LocationPage() {
  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-12 mx-auto flex sm:flex-nowrap flex-wrap max-w-4xl items-center justify-center">
          <div className="lg:w-1/2 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-5 flex items-end relative h-96 w-96">
            <iframe
              width="100%"
              height="100%"
              className="absolute inset-0"
              title="map"
              src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=Open+University+of+Sri+Lanka,+Nawala&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
              style={{}}
            ></iframe>
            <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md"></div>
          </div>

          <div className="lg:w-1/2 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <div className="lg:w-1/2 px-6">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                ADDRESS
              </h2>
              <p className="mt-1">
                MedServ Lanka Pvt Ltd No. 23, Lotus Road, Colombo 01, Sri Lanka
              </p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                EMAIL
              </h2>
              <a className="text-indigo-500 leading-relaxed">
                medserv@gmail.com
              </a>
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                PHONE
              </h2>
              <p className="leading-relaxed">+94 11 2345678</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
