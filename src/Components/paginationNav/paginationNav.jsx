import React, { Suspense, lazy, useState } from 'react'
// import Product from '../Product/Product'
import { Link } from 'react-router-dom'
import { useInfiniteQuery, useQuery } from 'react-query';
import axios from 'axios';
import Loading from '../Loading/Loading';

const Product = lazy(()=> import('../Product/Product'));
export default function PaginationNav() {

  const [pagee, setpageParam] = useState(1)

  async function getProducts(pagee){
    const {data} =  await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pagee}`);
    // console.log(data)
    return data
  }

  const {data, isLoading, } = useQuery(['projects', pagee],()=>getProducts(pagee),{
    keepPreviousData: true
  })
function pagesNumbers(){
  let array = []
  for (let i =1; i <= data?.metadata.numberOfPages ; i++){
    array.push(
      <li key={i} onClick={()=>setpageParam(i)} className={pagee === i? "page-item disabled":"page-item "}><Link className="page-link" >{i}</Link></li>
    )
 }
 return array
}
 

  return (
    <div>
      {/* {console.log(data)} */}
      <Suspense fallback={<Loading/>}>
        <Product data={data} isLoading={isLoading}/>
      </Suspense>
      <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center my-5 pt-5">
            <li   className={pagee === 1? "page-item disabled":"page-item " }>
              <Link   onClick={()=>setpageParam(pagee - 1 )} className="page-link">Previous</Link>
            </li>
            {pagesNumbers()}
            <li className={pagee === data?.metadata.numberOfPages? "page-item disabled":"page-item "}>
              <Link onClick={()=>setpageParam(pagee + 1 )} className='page-link' >Next</Link>
            </li>
          </ul>
        </nav>
    </div>
  )
}
