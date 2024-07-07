import React from 'react';

function HeroSection() {
  return (
    <section className="bg-yellow-100 text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-5 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img className="object-cover object-center rounded" alt="hero" src="https://as2.ftcdn.net/v2/jpg/03/83/46/57/1000_F_383465757_wSaVamcSfbdcAxpvRkA1i6D539y4OHKB.jpghttps://plus.unsplash.com/premium_photo-1661777621825-2fca17f4c533?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Title Title Title Title
            <br className="hidden lg:inline-block" />Title Title
          </h1>
          <p className="mb-8 leading-relaxed">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam quisquam sit unde earum nobis voluptatem explicabo recusandae nemo cum dolor! In vitae aut officiis quia pariatur distinctio, odio accusantium sunt!</p>
          {/*<div className="flex justify-center">
            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
            <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button>
          </div>*/}
        </div>
      </div>
    </section>
  )
}

export default HeroSection;
