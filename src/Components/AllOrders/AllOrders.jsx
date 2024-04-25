import React from 'react';
import './AllOrders.module.css';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import { useQuery } from 'react-query';

export default function AllOrders() {

  const {id} = jwtDecode(localStorage.getItem('ecommToken'))
  // const [Loading, setLoading] = useState(true)

  function getOrders(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
  }

  let {data , isLoading} = useQuery('getOrders', getOrders, {cacheTime:0})

  return <>
    <h1>Your Orders</h1>
    <div className='rounded bg-light  p-3'>
          {isLoading ?
          <div className='text-center'>
            <i className='fas fa-spin fa-spinner fs-1 text-secondary'></i>
          </div>
          :<>
          {data ? <>
            {data?.data.map(order => <>
              <div className='rounded bg-white  shadow p-3 my-2 mb-4'>
              <div className='d-flex justify-content-between'>
                <span className='mx-3'><span className='fw-bolder '>Order-ID</span>#{order.id}</span>
                <span className='text-main'>Processing</span>
              </div>
              <div className='row'>
                  {order.cartItems.map(item =>
                    <div className='col-1 my-3 d-flex'>
                      <img className='w-100  d-block mx-3' src={item.product.imageCover} alt="" />
                    </div>
                  )}
              </div>
              <div className='d-flex align-items-center'>
                <span className='ms-3 me-2 fw-bolder fs-6'>Total price: </span><span>{order.totalOrderPrice} EGP</span>
              </div>
            </div>
            </>
            )}
          </>
          :
          <div className='w-100 text-center'>
            <h1 className='text-warning'>No Orders Yet</h1>
          </div>
          }
        </>}
    </div>
    </>
  

}
