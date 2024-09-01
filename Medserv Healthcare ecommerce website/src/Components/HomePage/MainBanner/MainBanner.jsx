import React, {useState, useEffect} from 'react';
import './MainBanner.css'

import main_banner from '../../Assets/Home/MainBanner/main_banner.jpg';
import main_banner2 from '../../Assets/Home/MainBanner/main_banner_2.png';
import main_banner3 from '../../Assets/Home/MainBanner/main_banner_3.png';
import main_banner4 from '../../Assets/Home/MainBanner/main_banner_4.png';
import main_banner5 from '../../Assets/Home/MainBanner/main_banner_5.png';
import main_banner6 from '../../Assets/Home/MainBanner/main_banner_6.png';
import main_banner7 from '../../Assets/Home/MainBanner/main_banner_7.png';

const images = [
    main_banner,
    main_banner2,
    main_banner3,
    main_banner4,
    main_banner5,
    main_banner6,
    main_banner7
];

const MainBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userInteracted, setUserInteracted] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!userInteracted) {
                setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
            }
            setUserInteracted(false); // Reset user interaction state after each interval
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(intervalId);
    }, [userInteracted]);

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
        setUserInteracted(true);
    };

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        setUserInteracted(true);
    };

    return (
        <div className='main-banner'>
            <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className={`banner-image}`}
            />
            <button className="prev" onClick={prevImage}>❮</button>
            <button className="next" onClick={nextImage}>❯</button>
        </div>
    )
}

export default MainBanner
