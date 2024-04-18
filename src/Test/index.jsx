// React.js da API hosil qilish uchun foydalanilgan komponent
import React from 'react';
import { ImageHoverZoom } from '../UI_Design';
 import img1 from '../assets/bglogin.jpg'
 import img2 from '../assets/charts.jpg'
const Tester = () => {
   
    return (
        <div>
        <ImageHoverZoom
        src={img1}
        alt="Original Image"
        hoverSrc={img2}
      />
        </div>
    );
};

export default Tester;
