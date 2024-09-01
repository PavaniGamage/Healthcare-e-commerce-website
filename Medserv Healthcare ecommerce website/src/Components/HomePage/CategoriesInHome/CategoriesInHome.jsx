import React from 'react'
import './CategoriesInHome.css'

import category1Img from '../../Assets/Home/Categories/category_image_upload_prescription.png';
import category2Img from '../../Assets/Home/Categories/category_image_medical_devices.png';
import category3Img from '../../Assets/Home/Categories/category_image_wellness.png';
import category4Img from '../../Assets/Home/Categories/category_image_personal_care.png';
import category5Img from '../../Assets/Home/Categories/category_image_equipment_rent.png';
import category6Img from '../../Assets/Home/Categories/category_image_medical_blog.png';

import { Link } from 'react-router-dom';

const items = [
  { id: 1, content: 'Upload Prescriptions', image: category1Img, link: '/upload_prescriptions'},
  { id: 2, content: 'Medical Devices', image: category2Img, link: '/medical_devices' },
  { id: 3, content: 'Wellness', image: category3Img, link: '/wellness' },
  { id: 4, content: 'Personal Care', image: category4Img, link: '/personal_care' },
  { id: 5, content: 'Equipment Rent', image: category5Img, link: '/rent' },
  { id: 6, content: 'Medical Blog', image: category6Img, link: '/blog' },
];

const CategoriesInHome = () => {
  return (
    <div className='categories-grid'>
        {items.map(item => (
        <div key={item.id} className="category-grid-item">
            <Link className="category-link" to={item.link}>
              <img src={item.image} alt={item.content} className="category-image"/>
              <p className="category-text">{item.content}</p>
            </Link>
        </div>
      ))}
    </div>
  )
}

export default CategoriesInHome