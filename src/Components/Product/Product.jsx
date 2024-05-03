import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import SingleProduct from '../SingleProduct/SingleProduct';
import { CounterContext } from '../CounterContext/CounterContext';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';


export default function Product({data, isLoading, pages}) {
  
  let {setCounter} = useContext(CounterContext)

  // async function getProducts({pageParam}){
  //   const {data} =  await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageParam}`);
  //   return data
  // }

  // useEffect(() => {
  //   console.log('render')
  //   setActivePage('pagination')
  //   if(!isLoading ){
  //     setproductPageTop( productPage.current.offsetTop - 100);
  //     setproductPageHeight( productPage.current.offsetHeight);
  
  //     if (bodyTop >= productPageTop && bodyTop < productPageTop + productPageHeight){
  //       productPage.current.classList.add('bg-white');
  //           setActivePage('pagination2')
  //           console.log('active2')

  //     }else{
  //       productPage.current.classList.remove('bg-white');
  //                   setActivePage('pagination3')
  //                   console.log('activeelse')

  //     }
  //   }
   
  // })
  
  return <>
  {/* {console.log(data)} */}
      {isLoading?
      <Loading/>
      :
      <>
        <main  className='products-row row g-0 mt-3 position-relative z-3 px-3'>
         {window.location.hash.toLowerCase().includes('home') ?
            <h1 className='text-warning-subtle text-center py-3 fw-bold'>Shop <span className='text-main'>Different</span> Products</h1>
          :
            ""
        } 
        {!data.pages?<>{
              data?.data.map( product =>
              <SingleProduct key={product.id} changeCounter={setCounter} id={product.id} product={product}/>
                    )
           }</> 
           :
            <>{
           data?.pages.map( page => 
              page.data.map((product)=><SingleProduct key={product.id} changeCounter={setCounter} id={product.id} product={product}/>))
           }</> 
           }

        </main>
       
        <div>
  </div>

        <Helmet>
          <meta charSet="utf-8" name='description' content="FreshCart Products" />
          <title>FreshCart Popular Products</title>
        </Helmet>
      </>
      }
</>
}