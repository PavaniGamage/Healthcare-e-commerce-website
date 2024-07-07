import React from "react";
import { Link } from "react-router-dom";

function Products() {
  return (
    <section className="text-gray-600 body-font mx-auto max-w-[1060px]">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">

          {/* Card 1 - Upload Prescription */}
          <div className="p-4 md:w-1/3 relative">
            <Link to="/upload-prescription" className="h-full overflow-hidden relative block">
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center cursor-pointer"
                src="https://envato-shoebox-0.imgix.net/d1a6/b548-fb92-442d-8b41-c5ab9166dcac/P-228A-Ake-7193.jpg?auto=compress%2Cformat&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&w=1000&fit=max&markalign=center%2Cmiddle&markalpha=18&s=37e51762105cf85b2fd796ae4a5f4f5a"
                alt="upload prescription"
              />
              <h1 className="title-font text-lg font-medium text-white absolute bottom-0 bg-black bg-opacity-50 w-full text-center py-2">
                Upload Prescription
              </h1>
            </Link>
          </div>

          {/* Card 2 - Personal Care */}
          <div className="p-4 md:w-1/3 relative">
            <Link to="/personal-care" className="h-full overflow-hidden relative block">
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center cursor-pointer"
                src="https://envato-shoebox-0.imgix.net/d0ea/9f35-eda4-4676-934e-33aba278cfff/DSC04538-2.jpg?auto=compress%2Cformat&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&w=1000&fit=max&markalign=center%2Cmiddle&markalpha=18&s=513d50ead1eadb2a91e9e2e181655d9f"
                alt="personal care"
              />
              <h1 className="title-font text-lg font-medium text-white absolute bottom-0 bg-black bg-opacity-50 w-full text-center py-2">
                Personal Care
              </h1>
            </Link>
          </div>

          {/* Card 3 - Medical Devices */}
          <div className="p-4 md:w-1/3 relative">
            <Link to="/medical-devices" className="h-full overflow-hidden relative block">
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center cursor-pointer"
                src="https://envato-shoebox-0.imgix.net/268b/e36b-10b9-496d-ad3d-9dd38cbe0390/275690.jpg?auto=compress%2Cformat&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&w=1000&fit=max&markalign=center%2Cmiddle&markalpha=18&s=ea6c1ba94878fd961e37b552b6a0cc54"
                alt="medical devices"
              />
              <h1 className="title-font text-lg font-medium text-white absolute bottom-0 bg-black bg-opacity-50 w-full text-center py-2">
                Medical Devices
              </h1>
            </Link>
          </div>

          {/* Card 4 - Equipment Rent */}
          <div className="p-4 md:w-1/3 relative">
            <Link to="/rent" className="h-full overflow-hidden relative block">
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center cursor-pointer"
                src="https://envato-shoebox-0.imgix.net/5d37/8988-1e89-4b6c-afd2-56995fa8c114/B001_04240941_C013.00836123.JPG?auto=compress%2Cformat&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&w=1000&fit=max&markalign=center%2Cmiddle&markalpha=18&s=c92416c76c6056fdf8460705454eeb48"
                alt="equipment rent"
              />
              <h1 className="title-font text-lg font-medium text-white absolute bottom-0 bg-black bg-opacity-50 w-full text-center py-2">
                Equipment Rent
              </h1>
            </Link>
          </div>

          {/* Card 5 - Wellness */}
          <div className="p-4 md:w-1/3 relative">
            <Link to="/wellness" className="h-full overflow-hidden relative block">
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center cursor-pointer"
                src="https://envato-shoebox-0.imgix.net/d1e8/f5f5-fa25-4904-9692-0ffdd4e7cdea/Beta_Carotene_Supplement_2871.jpg?auto=compress%2Cformat&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&w=1000&fit=max&markalign=center%2Cmiddle&markalpha=18&s=0840842c288daf5fb581f9afa44b34c7"
                alt="wellness"
              />
              <h1 className="title-font text-lg font-medium text-white absolute bottom-0 bg-black bg-opacity-50 w-full text-center py-2">
                Wellness
              </h1>
            </Link>
          </div>

          {/* Card 6 - Blog */}
          <div className="p-4 md:w-1/3 relative">
            <Link to="/blog" className="h-full overflow-hidden relative block">
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center cursor-pointer"
                src="https://envato-shoebox-0.imgix.net/9d17/be17-94fb-4b67-953b-f39ab6d63479/BST_3184.jpg?auto=compress%2Cformat&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&w=1000&fit=max&markalign=center%2Cmiddle&markalpha=18&s=adb6dd6c9b1c4e7ec7459740e7b6f809"
                alt="blog"
              />
              <h1 className="title-font text-lg font-medium text-white absolute bottom-0 bg-black bg-opacity-50 w-full text-center py-2">
                Medserv Blog
              </h1>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Products;
