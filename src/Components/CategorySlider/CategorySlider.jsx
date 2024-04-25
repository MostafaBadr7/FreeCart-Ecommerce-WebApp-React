import React from 'react';
import './CategorySlider.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import Slider from "react-slick";
import { Link } from 'react-router-dom';

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 7,
  initialSlide: 0,
  autoplay: false,
    speed: 2000,
    autoplaySpeed: 5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SampleNextArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} d-none d-md-flex`}
      style={{ ...style, display: "flex",justifyContent:'center', alignItems:'center',  background: "lightgreen", borderRadius: '70%', margin:'10px -80px', padding:'15px', boxShadow:'0px 0px 10px 0px #fff ' }}
      onClick={onClick}
    />
  );
}

 async function getCatSliderData(){
  return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
 }



export default function CategorySlider() {

  let {data} = useQuery('CategorySlider', getCatSliderData);

  return (
    <div className="slider-container w-100 mb-5 px-5  pt-3 " style={{ position: 'relative' }}>
  {/* <div className="slider-overlay slider-overlay-left"></div>
  <div className="slider-overlay slider-overlay-right"></div> */}
  <Slider {...settings} className=''>
    {data?.data.data.map(category => (
      <Link to={`/Category/${category._id}`} key={category._id} className='cat-item m-2 mb-3 rounded  border-1  p-2 '>
        <img src={category.image} style={{ height:'100px', objectFit: 'contain' }} className='w-100 rounded img-fluid' alt='' />
        <div className='text-center text-muted fw-bolder mt-2 p-2'>{category.name}</div>
      </Link>
    ))}
  </Slider>
</div>

  )
}
