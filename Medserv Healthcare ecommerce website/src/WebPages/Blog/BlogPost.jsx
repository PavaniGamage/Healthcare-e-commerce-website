import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import blogData from "../../data.json";

const BlogPost = () => {
  const { id } = useParams();
  const blog = blogData.blogs.find((post) => post.id === parseInt(id));

  const [showIcons, setShowIcons] = useState(false);

  if (!blog) {
    return <p>Blog post not found!</p>;
  }

  // Toggle icon visibility on click
  const handleShareClick = () => {
    setShowIcons(!showIcons);
  };

  return (
    <div className="relative max-w-3xl mx-auto py-10 px-4">
      {/* Image and Share Button */}
      <div className="relative">
        <img src={blog.image} alt={blog.title} className="w-full h-auto mb-6" />
        {/* Share Button */}
        <div
          onClick={handleShareClick}
          className="absolute top-3 right-3 bg-lightBlue text-white p-3 rounded-full cursor-pointer flex items-center space-x-1 m-2 hover:bg-darkBlue"
        >
          <FontAwesomeIcon icon={faShareNodes} className="text-sm" />
          <span className="text-sm">Share</span>
        </div>

        {/* Social Media Icons */}
        {showIcons && (
          <div className="absolute top-12 right-3 bg-white p-2 rounded-lg shadow-md flex space-x-3">
            <FontAwesomeIcon
              icon={faFacebook}
              className="text-blue-600 cursor-pointer text-xl group-hover:text-3xl transition-transform duration-300"
            />
            <FontAwesomeIcon
              icon={faTwitter}
              className="text-blue-400 cursor-pointer text-xl group-hover:text-3xl transition-transform duration-300"
            />
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-pink-500 cursor-pointer text-xl group-hover:text-3xl transition-transform duration-300"
            />
          </div>
        )}
      </div>

      {/* Blog Content */}
      <h1 className="text-3xl font-extrabold mb-4">{blog.title}</h1>
      <span className="text-gray-500">{blog.date}</span>
      {blog.paragraphs.map((paragraph, index) => (
        <p key={index} className="text-lg text-gray-700 mt-6">
          {paragraph.content}
        </p>
      ))}
    </div>
  );
};

export default BlogPost;
