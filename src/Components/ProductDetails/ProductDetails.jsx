import React, { Fragment, useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Slider from "react-slick";
import { toast } from 'react-toastify';
import { CounterContext } from '../CounterContext/CounterContext';

export default function ProductDetails() {

  const {id, src} = useParams()
  const [Details, setdDetails] = useState([])
  const navigate = useNavigate()
  const [Loading, setLoading] = useState(false)
  const [addLoading, setaddLoading] = useState(false)
  const [imgSrc, setimgSrc] = useState()

  const {counter, setcounter} = useContext(CounterContext)

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow:true
  };

    async function getproductDetails(){
      setLoading(true)
        await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        .then(resp => { 
          setdDetails(resp.data.data);
          setimgSrc(resp.data.data.images[0])
          // console.log(resp?.data.data);
          setLoading(false)
        })
      }

      async function addToCart(productId){
        setaddLoading(true)
        const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId:`${productId}`},
        {headers: {
              token:`${localStorage.getItem('ecommToken')}`
          }}
        )
        // console.log(data)
        if(data.status === 'success'){
          toast.success('Product added successfully');
          counter === 0? setcounter(1):setcounter(counter+1);
        }
        setaddLoading(false)
      }

      function moveSlider(imgId, img, imgslenght){
          if(imgId >= 5 ){
            // console.log(imgId);
            // console.log(document.querySelector('.pagination-imgs-div').style.top);
              document.querySelector('.pagination-imgs-div').style.top = -20*(imgId-4)+'%';
              
              if(imgId < imgslenght-2){
                const x = document.querySelector(`#detailsImg${imgId+1}`);
                const x2 = document.querySelector(`#detailsImg${imgId+2}`);
                // console.log(x.className.includes('d-none'))
                  !x.className.includes('d-none') ? x.style.cssText = 'display:none !important' : x.style.cssText = 'display:block !important' ;
                  !x2.className.includes('d-none')? x2.style.cssText = 'display:none !important' : x2.style.cssText = 'display:block !important' ;
                }else if(imgId < imgslenght-1){
                  const xv2 = document.querySelector(`#detailsImg${imgslenght}`);
                  !xv2.className.includes('d-none') ? xv2.style.cssText = 'display:none !important' : xv2.style.cssText = 'display:block !important' ;
                }
              // console.log(document.querySelector(`#detailsImg${imgId+1}`).style.display)
            // console.log(-40*(imgId-4)+'%');
          }else{
            document.querySelector('.pagination-imgs-div').style.top = '0%';
          }
      }

      useEffect(()=>{
          getproductDetails()
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
      }, [])

  return <>
    {Loading?
      <div className='min-vh-100 d-flex align-items-center '>
        <i className='fas fa-spin fa-spinner fa-2xl m-auto d-block '></i>
      </div>
      :
      <>
      <button onClick={()=>navigate('/Product')} className='btn btn-close d-block ms-auto mt-4 mb-3'></button>
        <main className='row align-items-center mb-2 ms-lg-5 me-lg-1 ms-0 me-0 '>
          {/* ----------------------------------------------------------------------------- */}
              <div className=' col-sm-4 mb-sm-4 '>
                  <div className='details-col position-relative d-flex justify-content-center align-items-center rounded  '>
                      {/* Main IMG */}
                        <img className='pdetails-mainImg img-fluid rounded' src={imgSrc} alt="" />
                      {/* rEST OF IMGS */}
                        <div className={`pagination-imgs-div  w-100  px-3 position-absolute d-flex flex-column justify-content-center align-items-start  z-1`}>
                            {Details.images?.map((img, imgId)=>
                            <div onClick={()=> {moveSlider(imgId+1, img,Details.images.length ); setimgSrc(img);}}  id={`detailsImg${imgId+1}`}  key={imgId+1} className={imgSrc === img ? `oneDetail-img position-relative w-25 ${style.active}  z-3 ` : imgId >= 6 ? 'd-none oneDetail-img position-relative w-25 z-0' : 'oneDetail-img position-relative w-25 z-0' }  to={`?src=${imgId}`}>
                              <img onClick={()=> {setimgSrc(img);  moveSlider(imgId+1, img)}} className='pDetails-img w-100 bg-white  p-2 cursor-pointer d-inline-block' src={img} alt="" />
                              <div  onClick={()=> {setimgSrc(img);  moveSlider(imgId+1, img)}} className={`${style.layer} rounded  cursor-pointer position-absolute   m-2 mx-auto top-0 bottom-0 start-0 end-0 bg-success`}></div>
                            </div>
                                  )}
                              {/* <div   className={`${style.layer} rounded  cursor-pointer position-absolute   m-2 mx-auto top-0 bottom-0 start-0 end-0 bg-info`}></div> */}
                        </div>
                  </div>
                  {/* slider in small screen */}
                  <div className={`${style.detailsSliderDiv} px-5`}>
                      <Slider {...settings} >
                          {Details.images?.map((img)=>
                              <img key={img} className='w-100 details-slider pdetails-mainImg m-auto d-none' src={img} alt="" />
                          )}
                      </Slider>
                  </div>
              </div>
          {/* ----------------------------------------------------------------------------- */}
                {/* Product Details */}
              <div className=' col-sm-8 d-flex align-items-center justify-content-center'>
                <div className='w-100 p-details-description'>
                    <h5 className='mb-3 fw-bold'>{Details.title}</h5>
                    <p className='text-muted px-3 my-3'>{Details.description}</p>
                    <div>
                        <span>{Details.category?.name}</span>
                        <div className='d-flex justify-content-between  mt-2'>
                            <span>{Details.price} EGP</span>
                            <span >{Details.ratingsAverage} <i className='fa-solid fa-star rating-color'></i></span>
                        </div>
                    </div>
                    <button disabled={addLoading} onClick={()=> addToCart(Details.id)} className='btn bg-main w-100 mt-2 text-white'>{addLoading ? <> <div class="spinner-border spinner-border-sm mx-2" role="status"></div> </>: '+ Add To Cart' }</button>
                </div>
              </div>
        </main>
      </>
    }
  </>
}
