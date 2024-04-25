import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export default function Categories() {

  function getCat(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  
  let {data} = useQuery('getCat', getCat)

  return (
      <div className='row  justify-content-center gx-5 mt-5 align-items-center rounded'>
        {data?.data.data.map(Cat => 
              <Link to={`/Category/${Cat._id}`} key={Cat._id} className='  col-lg-3 col-md-4 col-6 bg-light text-center pt-3 align-items-center'>
              <img className='w-100 cursor-pointer rounded' style={{objectFit: 'cover'/'contain', height:'300px'}} src={Cat.image} alt=""  />
              <h5 className='mt-3'>{Cat.name}</h5>
              </Link> 
          )}
      </div>
  )
}
