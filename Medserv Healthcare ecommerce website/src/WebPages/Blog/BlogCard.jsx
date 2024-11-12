import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const BlogCard = ({ id, date, title, description, image }) => {
  return (
    <div className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl relative">
      <div className="flex items-center">
        <img
          src={image}
          alt={title}
          className="rounded-t-2xl w-full h-[300px] object-cover"
        />
      </div>

      {/* Share Button with Icon */}
      <div className="absolute top-3 right-3 bg-lightBlue text-white p-3 rounded-full cursor-pointer flex items-center space-x-1 m-2 hover:bg-darkBlue group">
        <FontAwesomeIcon icon={faShareNodes} className="text-sm" />
        <span className="text-sm">Share</span>

        {/* Social Media Icons - displayed on hover */}
        <div className="hidden group-hover:flex space-x-3 absolute top-full right-0 mt-2 bg-white p-2 rounded-lg shadow-md">
          <FontAwesomeIcon
            icon={faFacebook}
            className="text-blue-600 cursor-pointer text-lg group-hover:text-2xl transition-transform duration-200"
          />
          <FontAwesomeIcon
            icon={faTwitter}
            className="text-blue-400 cursor-pointer text-lg group-hover:text-2xl transition-transform duration-200"
          />
          <FontAwesomeIcon
            icon={faInstagram}
            className="text-pink-500 cursor-pointer text-lg group-hover:text-2xl transition-transform duration-200"
          />
        </div>
      </div>

      <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
        <span className="text-darkBlue font-medium mb-3 block">{date}</span>
        <h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">
          {title}
        </h4>
        <p className="text-gray-500 leading-6 mb-10">{description}</p>
        <Link
          to={`/blog/${id}`}
          className="cursor-pointer text-lg text-darkBlue font-semibold"
        >
          Read more..
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
