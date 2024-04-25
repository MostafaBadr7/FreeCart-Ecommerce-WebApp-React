import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

export default function Brands() {

function getBrands(){
  return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
}

let {data} = useQuery('getBrands', getBrands)

  return (
    <div className='row  justify-content-center gx-3 mt-5 '>
      {data?.data.data.map(brand => 
            <div key={brand._id} className=' col-md-2 col-sm-3 col-4 bg-light text-center pt-3'>
            <img className='w-100 cursor-pointer' src={brand.image} alt=""  />
            {/* <h5>{brand.name}</h5> */}
            </div> 
        )}
        
    </div>
  )
}
