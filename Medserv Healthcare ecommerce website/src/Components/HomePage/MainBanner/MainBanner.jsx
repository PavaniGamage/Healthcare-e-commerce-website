import React, {useState, useEffect} from 'react';
import './MainBanner.css'

import main_banner from './Assets/main_banner.jpg';
import main_banner2 from './Assets/main_banner_2.png';
import main_banner3 from './Assets/main_banner_3.png';
import main_banner4 from './Assets/main_banner_4.png';
import main_banner5 from './Assets/main_banner_5.png';
import main_banner6 from './Assets/main_banner_6.png';
import main_banner7 from './Assets/main_banner_7.png';

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
    const [fade, setFade] = useState(true); 

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
                setFade(true); 
            }, 500); 
        }, 15500); // Change image every 15.5 seconds (includes fade duration)

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    const prevImage = () => {
        setFade(false); 
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
            setFade(true); 
        }, 500); 
    };

    const nextImage = () => {
        setFade(false); 
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
            setFade(true); 
        }, 500); 
    };

    return (
        // <div className='main-banner'>
        //     <button className="prev" onClick={prevImage}>❮</button>
        //     <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
        //     <button className="next" onClick={nextImage}>❯</button>
        // </div>

        <div className='main-banner'>
            <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className={`banner-image ${fade ? 'fade-in' : 'fade-out'}`}
            />
            <button className="prev" onClick={prevImage}>❮</button>
            <button className="next" onClick={nextImage}>❯</button>
        </div>
    )
}

export default MainBanner
