import React, { useRef, useState } from 'react'
import './CartItem.module.css'
import { Link } from 'react-router-dom'

export default function CartItem({product , deleteFromCart, updateProductCount, itemCount, loading }) {
 
  const [productCount, setproductCount] = useState(itemCount)
  const heartIcon = useRef()
  const [toggleHeart, settoggleHeart] = useState(true)

  function addToWish(){
    // heartIcon.current.classList.toggle('fa-solid')
    settoggleHeart(!toggleHeart)
  }
  const handleClick = event => {
    // 👇️ toggle class on click
    event.currentTarget.classList.toggle('fa-solid');
    settoggleHeart(!toggleHeart)
  }

return <>
    <div key={product._id}  className='row carItem-mainRow container mt-3 rounded shadow pt-1 cursor-pointer pb-2  m-auto'>
          <div className='row  m-0 p-0'>
            {loading === product?.product._id ? 
            <div className='d-flex ms-auto me-0 text-danger mt-2 align-items-center   justify-content-end'>
              {/* <span className="me-3">Deleting...</span> */}
              
              <div className="spinner-border spinner-border-sm text-secondary text-end" role="status">
              </div>

            </div>
            :
              <button onClick={()=>deleteFromCart(product.product._id)} className='btn-close d-block ms-auto me-0 text-danger mt-1 col-1'></button>
            }
          </div>
          <div className=' cartItem-img-div col-lg-1 col-sm-3 d-flex align-items-center p-sm-2 p-md-0'>
            <img className='cartItem-img w-100' src={product.product.imageCover} alt="" />
          </div>
          <div className='cartItem-info-div col-lg-11 col-sm-9 d-flex flex-column justify-content-between '>
                <div className='cartItem-info-div-container d-flex justify-content-between align-items-center '>
                      <div className='mt-2  d-flex flex-column justify-content-center'>
                      <h5 className='cartItem-title'>{product.product.title}</h5>
                          <h6 className='text-main'>{product.product.category.name}</h6>
                          <span>{ product?.priceAfterDiscount ? product?.priceAfterDiscount : product?.price } EGP</span>
                      </div>
                      <div className='cartItem-info-div-container2 pb-2 mt-2'>
                          <div className='mb-2 m-auto'>
                              <Link  className='text-center  text-secondary m-auto d-flex align-items-center  justify-content-center'><div><i ref={heartIcon} role='button' onClick={handleClick} className='fa-regular fa-heart mx-2 empty-heart '  ></i></div>  </Link>
                          </div>
                          <div className=' d-flex justify-content-center'>
                              <button 
                              disabled={productCount == 1}
                                  onClick={()=>{
                                      updateProductCount(product.product._id,(productCount-1));
                                      setproductCount((productCount-1)) }
                                      }
                                  className='btn btn-secondary mx-2 carItem-btn-mins'>-
                              </button>
                                    <span className='mt-1'>{productCount}</span>
                              <button
                                  onClick={()=>{
                                      updateProductCount(product.product._id,(productCount+1) )
                                      setproductCount((productCount+1))
                                        }
                                      }
                                  className='btn btn-primary mx-2 carItem-btn-plus'>+
                              </button>
                            </div>
                        </div>
                  </div>
                  <div className='cartItem-footer d-flex justify-content-center mb-4 '>
                      <span className='mx-5 cartItem-totalPrice'><span className='fw-bold'>Total Price:</span> {product.count * product.price} EGP </span>
                      <span className='cartItem-rating'>{product.product.ratingsAverage} <i className='fas fa-star rating-color'></i></span>
                  </div>
          </div>
    </div>
  </>
    }
