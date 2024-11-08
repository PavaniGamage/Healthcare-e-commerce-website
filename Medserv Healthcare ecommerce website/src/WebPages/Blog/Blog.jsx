import React from "react";
import BlogCard from "./BlogCard";
import blogData from "../../data.json";

const Blog = () => {
  const chunkedBlogs = [];
  for (let i = 0; i < blogData.blogs.length; i += 3) {
    chunkedBlogs.push(blogData.blogs.slice(i, i + 3));
  }

  return (
    <div>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-manrope text-4xl font-extrabold text-gray-900 text-center mb-16">
            Medserv blog
          </h2>

          {chunkedBlogs.map((chunk, chunkIndex) => (
            <div
              key={chunkIndex}
              className="flex justify-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:justify-between lg:gap-x-8 mb-16"
            >
              {chunk.map((blog) => (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  date={blog.date}
                  title={blog.title}
                  description={blog.description}
                  image={blog.image}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
