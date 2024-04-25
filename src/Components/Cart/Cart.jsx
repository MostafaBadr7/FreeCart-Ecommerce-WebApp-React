import React, { Suspense, lazy, useEffect, useState } from 'react'
import { useContext } from 'react'
import { CounterContext } from '../CounterContext/CounterContext'
import { Link } from 'react-router-dom';
import axios from 'axios'
// import CartItem from '../CartItem/CartItem';
// import Loading from '../Loading/Loading';

const CartItem = lazy(()=> import ('../CartItem/CartItem'))
const Loading = lazy(()=> import ('../Loading/Loading'))

export default function Cart() {

    const [cart, setcart] = useState(false)
    const [loading, setloading] = useState(true)
    const [timeoutId, settimeoutId] = useState()
    let {counter, setcounter} = useContext(CounterContext);

    async function getCart(){
      if(localStorage.getItem('ecommToken')){
        try {
          setloading('cart')
          const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',
          {headers: {
                token:localStorage.getItem('ecommToken')
            }}
          )
          setcart(data.data);
          setcounter(data.numOfCartItems);
          setloading(false)
        } catch (error) {
          setloading(false)
        }
      }
  }

    async function deleteFromCart(productId){
        setloading(productId)
        const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {headers: {
              token:localStorage.getItem('ecommToken')
          }}
        )
        setcart(data.data)
        setcounter(data.numOfCartItems);
        setloading(false)
    }

    async function clearAllCart(){
        try {
          const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
          {headers: {
                token:localStorage.getItem('ecommToken')
            }}
          )
          setcart(data.data)
          setcounter(data.numOfCartItems);
        } catch (error) {
        }
    }

     function updateProductCount(productId,productCount ){
        clearTimeout(timeoutId);
        settimeoutId(
          setTimeout(
            async()=>{
              if(productCount === 0 ){
                deleteFromCart(productId)
              }else{
                const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {count : productCount},{headers:{token:localStorage.getItem('ecommToken')}} )
                setcart(data.data)
              }
            }
          )
        )
      }

    useEffect(()=>{getCart()}, [])

  return <>
  {
  loading === 'cart'? 
        <Loading/>
    :
        <>
              {!!cart?.totalCartPrice ? <>
                <div className=' mt-5 mb-4  text-end container'>
                  <Link onClick={()=>clearAllCart()} className='text-danger  cursor-pointer me-3'>Clear All</Link>
                </div>
                {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Single Cart <<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
                <main className='container'>
                  {console.log(cart)}
                    { cart?.products?.map((product, index)=>
                      <>
                      <Suspense key={product._id+1}  fallback={<Loading/>}>
                        <CartItem key={product._id} loading={loading} itemCount={product.count} updateProductCount={updateProductCount} product={product} deleteFromCart={deleteFromCart} />
                      </Suspense>
                      </>
                      )
                    }
                </main>
                {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Check Out <<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
                  <div className='cart-checkout-div d-flex justify-content-between align-items-center mt-4 mb-5 pb-5 container'>
                    <Link to={`/Address/${cart._id}`} className='cart-check-btn btn btn-success d-block me-auto mt-3 text-white'>Check Out</Link>
                    <span className='fw-bold fs-4 text-success'><span className='fw-bold fs-6 mt-3 text-black'>Total Price:</span> {cart?.totalCartPrice} EGP </span>
                  </div>
                                </>
                : 
                <div className=' bg-success-subtle  border-3 border-success rounded mt-5 py-5 d-flex flex-column justify-content-center align-items-center'>
                {/* <div className='alert alert-info  fs-1 text-center w-100'>Card is Empty</div> */}
                <h2 className='d-block text-main'>Cart is EMPTY</h2>
                <img className='w-25 rounded mt-2 ' src='https://http.cat/204' alt="" />
                </div>
                }
        </>
}
</>
}
