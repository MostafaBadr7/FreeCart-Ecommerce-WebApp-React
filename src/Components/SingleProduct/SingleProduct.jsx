import React, { useContext, useEffect, useState } from 'react'
import style from './SingleProduct.module.css'
import {useNavigate} from 'react-router-dom'
import { CounterContext } from '../CounterContext/CounterContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import {Helmet} from "react-helmet";


export default function SingleProduct({product, changeCounter}) {

  const [addLoading, setaddLoading] = useState(false)
    let {counter , setcounter} = useContext(CounterContext)

  const navigate = useNavigate()

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

  return <>
    <div id={product.id} className='product col-xl-2 col-lg-2 col-md-4 col-6   p-2 cursor-pointer overflow-hidden d-flex flex-column justify-content-between rounded border border-5 border-light'>
                    {/* <Helmet>
                      <meta charSet="utf-8" name='description' content={product?.title.split(' ').slice(0, 2).join(' ')} />
                      <title>{product?.title.split(' ').slice(0, 2).join(' ')}</title>
                    </Helmet> */}
                        <img  onClick={()=>navigate(`/ProductDetails/${product.id}`)} className='w-100 position-relative d-block rounded product-img d-block m-auto' src={product?.imageCover} alt={`${product?.title.split(' ').slice(0, 6).join(' ')}`} />
                        {product?.priceAfterDiscount ?<div className='position-absolute p-2 rounded alert alert-warning'> {Math.round(((product.priceAfterDiscount / product.price) * 100) -  100 )}% </div> : null}
                        <div  onClick={()=>navigate(`/ProductDetails/${product.id}`)} className='mt-2 text-lg-start text-md-center container h-100  d-flex flex-column justify-content-between bg-main-light p-2 '>
                            <h4 className='product-title fw-bolder'>{product?.title.split(' ').slice(0, 6).join(' ')}</h4>
                            <div className='d-flex justify-content-between align-items-end mt-3'>
                              <div>
                                  <div className={ product?.priceAfterDiscount ?` price-container fs-6 mb-1 m-auto`:''}>
                                     { product?.priceAfterDiscount ? <span className='fw-bold price-before'>{product.price} EGP</span> : null}
                                     { !product?.priceAfterDiscount ? <span className='fw-bold price text-nowrap'>{product.price} EGP</span> : null}
                                  </div>
                                  { product?.priceAfterDiscount ? <div className='fw-bold ps-1 price'>{product?.priceAfterDiscount} EGP</div> : null}
                              </div>
                              <div className='d-flex flex-column'>
                                  <span className=' m-auto text-nowrap' >{product.ratingsQuantity}<i class="fa-solid fa-user "></i></span>
                                  <span className=' text-center '>{product.ratingsAverage} <i className='fa-solid fa-star rating-color'></i></span>
                              </div>
                            </div>
                        </div>
                          {localStorage.getItem('ecommToken') &&
                            <button disabled={addLoading} onClick={()=>addToCart(product.id)} className='btn m-auto  btn-secondary w-100 mt-2 '>
                            {addLoading?
                              <div><i className='fas fa-spin fa-spinner fa-1x'></i></div>
                              :
                              <div className='text-light'>
                                <i className={`fa-solid fa-cart-arrow-down text-light fs-5 me-1`}></i> <span className='fw-bolder'>Add To Cart</span>   
                              </div>
                              }
                            </button>
                            }
    </div>
                      </>
}
