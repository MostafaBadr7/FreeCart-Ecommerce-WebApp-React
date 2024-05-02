import React, { useContext, useEffect, useRef, useState } from 'react'
import Slider from "react-slick";
import mainSlidImg1 from '../../Assets/images/slider-image-1.jpeg'
import mainSlidImg2 from '../../Assets/images/slider-image-2.jpeg'
import mainSlidImg3 from '../../Assets/images/slider-image-3.jpeg'
import sideSlidImg1 from '../../Assets/images/grocery-banner-2.jpeg'
import sideSlidImg2 from '../../Assets/images/blog-img-2.jpeg'
import Product from '../Product/Product'
import CategorySlider from '../CategorySlider/CategorySlider';
import { Helmet } from 'react-helmet';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import { AuthContext } from '../../Contexts/AuthContextProvider';
// import {useDispatch, useSelector} from 'react-redux'
import menCat from '../../Assets/images/categ/9521555.png'
import womCat from '../../Assets/images/categ/card3.png'
import gamingCat from '../../Assets/images/categ/1681511121316.png'
import { Link } from 'react-router-dom';
import style from './Home.module.css';
import SingleProduct from '../SingleProduct/SingleProduct';
import arrow from '../../Assets/images/arrow.png'
import BestSellersSlick from '../BestSellersSlick/BestSellersSlick';
import OnsalesSlick from '../OnsaleSlick/OnsaleSlick';
import BrandSlick from '../BrandSlick/BrandSlick';

export default function Home() {

  // let {counter} = useSelector(state => state.reducerCounter)
  // let blya = useDispatch()
  const {setnavDisplay} = useContext(AuthContext);
  // const [BestSellers, setBestSellers] = useState([])
  
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SampleNextArrow />,
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className}`}
        style={{ ...style,fontSize: '200px' , position:'absolute', zIndex:3 , display: "flex",justifyContent:'center', alignItems:'center',  background: "#fff5", borderRadius: '70%', margin:'-20px 80px', padding:'35px', boxShadow:'0px 0px 20px 0px  ' }}
        onClick={onClick}
      />
    );
  }
  
  async function getProducts({ pageParam }) {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageParam}`)
    return data
  }

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: getProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      // console.log(lastPage.metadata)
      // console.log(pages)
      if (lastPage.metadata.numberOfPages !== lastPage.metadata.currentPage) {
        return lastPage.metadata.nextPage
      }
    },
  })

  const getRandomColor = () => {
    const h = Math.floor(Math.random() * 360);
    return `hsl(${h}deg, 90%, 85%)`;
  };

  // function getBestSelling(data){
  //   let box = []
  //   for (let index = 0; index < 10; index++) {
  //     for (let index2 = 0; index2 < data?.length; index2++) {
  //       if(data[index].sold >  data[ index2 ].sold){
  //         !box.includes(data[index]) && box.push(data[index])  ;
  //       }else{
  //         !box.includes(data[index2]) && box.push(data[index2])  ;
  //       }
  //     }
  //   }
  //   setBestSellers(box)
  // }

  const productContainers =[...document.querySelectorAll(`.${style.productContainer}`) ];
const nxtBtn = [...document.querySelectorAll(`.${style.nxtBtn}`)];
const preBtn = [...document.querySelectorAll(`.${style.preBtn}`)];

  const setupslidingEffect = () => {
    productContainers.forEach((items, i ) => {
        let containerDimenstions = items.getBoundingClientRect();
        let containerWidth = containerDimenstions.width
    
        nxtBtn[i].addEventListener('click', () => {
            items.scrollLeft += containerWidth
        })
    
        preBtn[i].addEventListener('click', () => {
            items.scrollLeft -= containerWidth
        })
    });
    
    }
    
useEffect(() => {
  setupslidingEffect();
}, )
    
    // temporary
    productContainers.forEach((items, i ) => {
      let containerDimenstions = items.getBoundingClientRect();
      let containerWidth = containerDimenstions.width
  
      nxtBtn[i].addEventListener('click', () => {
          items.scrollLeft += containerWidth
      })
  
      preBtn[i].addEventListener('click', () => {
          items.scrollLeft -= containerWidth
      })
  })

  // useEffect(() => {
  //   getBestSelling(data?.pages[0]?.data)
  // }, [data])
  
  useEffect(() => {
    const URL = window.location.href;
    if (!URL.includes("Login") || !URL.includes("Register")) {
      setnavDisplay(true);
    } else {
      setnavDisplay(false);
    }
  }, [URL]);


  return <>

    <main className='banner  row g-0  mt-0 border border-0 border-light  rounded d-flex justify-content-center'>
      <div className=' col-12  bg-light rounded px-0 mt-4 pt-2 '>
        <Slider {...settings} arrows={true}>
          <div className='position-relative z-2 '>
            <div className='super-h1 w-50 position-absolute '>
              <h1 className='super-h1 z-2  '>UP TO <span className="text-danger">30%</span> ON SUPERMARKET</h1>
              <button className={`btn btn-lg mt-5 rounded-0  btn-secondary text-center  z-3`}><span className=''></span>Shop Now</button>
            </div>
            <img style={{ height: '400px' }} className='main-slide-img z-2 w-100 rounded' src={mainSlidImg1} alt="30% ON SUPERMARKET" />
          </div>
          <div className='position-relative'>
            <div className='position-absolute w-50 velevet-h1'>
            <h1 className='velevet-h1 text-danger'>RED VELEVET IS NOW <span className='focus-ring-danger'>HERE!</span> </h1>
          <button className={`btn btn-lg rounded-0 mt-5  btn-info z-3`}>Shop Now</button>
          </div>

            <img style={{ height: '400px' }} className='main-slide-img w-100 rounded' src={mainSlidImg2} alt="RED VELEVET IS NOW" />
          </div>
          <div className='position-relative'>
            <div className='position-absolute w-25 CHOCO-h1'>
            <h1 className='CHOCO-h1 text-danger'>THE REAL CHOCOLATE <span>TASTE</span> </h1>
            <button className={`btn btn-lg rounded-0 mt-5  btn-warning position-absolute   z-3`}>Shop Now</button>
            </div>
            <img style={{ height: '400px' }} className='main-slide-img w-100 rounded' src={mainSlidImg3} alt="THE REAL CHOCOLATE TASTE" />
          </div>
        </Slider>
      </div>
      {/* <div className='col-2  align-content-stretch ms-1  mt-1 shadow  pt-1 p-1  pb-0 d-none d-md-block' >
        <div>
          <img style={{ height: '200px' }} className='w-100 img-fluid p-1 rounded' src={sideSlidImg1} alt="" />
        </div>
        <div>
          <img style={{ height: '200px' }} className='w-100 img-fluid p-1 pb-0 rounded' src={sideSlidImg2} alt="" />
        </div>
      </div> */}
    </main>
    <section>
        <BrandSlick/>
      </section>
     <p className='bg-secondary-subtle m-0 mt-2 ps-1 fw-bold'>Shop Popular Categories</p>
    <section className={`${style.catSider} bg-secondary rounded`}>
      
      <CategorySlider />
    </section>
    <BestSellersSlick data={data?.pages[0]?.data}/>
    <OnsalesSlick data={data?.pages[0]?.data} />
    <section className='w-100 d-flex categ-choice '>
      <Link to='/Category/6439d58a0049ad0b52b9003f' className='w-50 bg-white position-relative cursor-pointer'>
        <img className='w-100 h-100 object-fit-cover' src={menCat} alt="men Category FreeCart" />
        <h2 className='position-absolute top-50 text-white start-0 fw-bold fs-1'>Women's Fashion</h2>
      </Link>
      <Link to='/Category/6439d5b90049ad0b52b90048' className={`${style.catDiv} catDiv w-50 position-relative cursor-pointer`}>
        <img className='w-100 h-100 object-fit-cover' src={womCat} alt="women Category FreeCart" />
        <h2 className={`${style.menFashion} position-absolute top-50 text-white  fw-bold fs-1`}>Men's Fashion</h2>
      </Link>
    </section>
      
      {/* <Link to='/Category/6439d5b90049ad0b52b90048' className='w-100 position-relative cursor-pointer'>
        <img className='w-100 h-100 object-fit-cover' src={gamingCat} alt="women Category FreeCart" />
        <h2 className='position-absolute top-50 text-white start-75  translate-middle  fw-bold fs-1'>Men's Fashion</h2>
      </Link> */}
    <Product data={data} isLoading={isLoading} pages/>
    <div className='bg-white z-3 position-sticky w-100 py-5'>
    { hasNextPage && <button  onClick={() => fetchNextPage()} className=' text-center m-auto d-block z-3' style={{backgroundColor:`${getRandomColor()}`}} id="load-more">Load more</button>}

    </div>
    <Helmet>
      <meta charSet="utf-8" name='description' content="FreshCart E-commerce" />
      <title>FreshCart</title>
    </Helmet>
  </>
}



