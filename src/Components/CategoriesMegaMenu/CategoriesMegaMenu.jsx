import React, { useEffect, useState } from 'react'
import './CategoriesMegaMenu.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Navigate } from 'react-router-dom'


export default function CategoriesMegaMenu() {

  const [SubCategs, setSubCategs] = useState(false)

  function getCat(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  function getSubCat(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
  }
  
  let {data} = useQuery('getCat', getCat)

 
    function chngImg(cat){
      document.querySelector('.img-main').setAttribute('src', cat.image);
      document.querySelector('.catName-main').innerHTML= cat.name;
      Array.from( document.querySelectorAll('.cat-li')).map(item => item.classList.remove('active-cat'));
      document.querySelector(`.${cat.name.split(/[\s.\']/)[0]}`).classList.add('active-cat');
    }

    // useEffect(() => {
      
    // }, [third])
    
  return(
      <ul className='d-flex mt-2 vw-100  '>
        <div  className='catmenu-show-div me-3 '>
          <div className='overflow-hidden bg-white border border-4 border-white m-auto'>
            <img className='img-main  w-100   text-center' src={data?.data.data[0].image} alt={data?.data.data[0].name +' freecart'} />
          </div>
          <h6 className='catName-main mt-0 py-3 rounded text-center bg-white'>{data?.data.data[0].name}</h6>
        </div>
        <div className='li-div  w-50 d-flex flex-wrap  ms-5 align-items-start mt-5 '>
          {data?.data.data.map(Cat => 
                <li onClick={()=> window.location.hash = (`/Category/${Cat._id}`) } 
                    onMouseEnter={async ()=>{ chngImg(Cat);  setSubCategs( await getSubCat(Cat._id));} 
                  } key={Cat._id} className={`${Cat.name.split(/[\s.\']/)[0]} cat-li border mb-2  border-success-subtle text-success border-end-0 border-top-0 border-bottom-0 border-start-5 list-unstyled  me-0 col-3 text-center `}>
                <h6 className='mt-3'>{Cat.name}</h6>
                </li> 
            )}
        </div>
        <div className='ps-5 fw-bold text-success '>
        {SubCategs?.data?.data?.map((sub) => <p  className='fw-bold link-success link-offset-1 link-offset-3-hover  link'>{sub.name}</p>)}
        </div>
      </ul>

      )
      }