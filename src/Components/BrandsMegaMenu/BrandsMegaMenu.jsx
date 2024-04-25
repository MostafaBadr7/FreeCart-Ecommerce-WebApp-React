import React, { useEffect } from 'react'
import style from './BrandsMegaMenu.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'


export default function BrandegoriesMegaMenu() {

  function getbrand(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  
  let {data} = useQuery('getbrand', getbrand)

 
    function chngImg(brand){

      document.querySelector(`.${style.imgMain}`).setAttribute('src', brand.image);
      document.querySelector(`.${style.brandNameMain}`).innerHTML= brand.name;
      Array.from( document.querySelectorAll(`.${style.brandLi}`)).map(item => item.classList.remove(`${style.activeBrand}`));
      document.querySelector(`.${brand.name.split(/[\s.']/)[0]}`).classList.add(`${style.activeBrand}`);
    }
  return(
      <ul className='d-flex mt-2 vw-100  '>
        <div className={`${style.brandmenuShowDiv} me-3 `}>
          <div className='overflow-hidden bg-white border border-4 border-white m-auto'>
            <img className={`${style.imgMain}  w-100   text-center`} src={data?.data.data[0].image} alt={data?.data.data[0].name +' freecart'} />
          </div>
          <h6 className={`${style.brandNameMain} mt-0 py-3 rounded text-center bg-white`}>{data?.data.data[0].name}</h6>
        </div>
        <div className={`${style.liDiv}  w-100 d-flex flex-wrap  ms-5 align-items-start mt-5 `}>
          {data?.data.data.map(brand => 
                <li onMouseEnter={()=> 
                  chngImg(brand)} key={brand._id} className={`${brand.name.split(/[\s.\']/)[0]} ${style.brandLi} border mb-2  border-success-subtle text-success border-end-0 border-top-0 border-bottom-0 border-start-5 list-unstyled  me-0 col-2 text-center `}>
                <h6 className='mt-3'>{brand.name}</h6>
                </li> 
            )}
        </div>
        
      </ul>

      )}