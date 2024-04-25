import React from 'react'
import './CheckoutDetails.module.css'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useState } from 'react'
import {BallTriangle} from 'react-loader-spinner'
import {useNavigate, useParams} from 'react-router-dom'

export default function CheckoutDetails() {
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> State <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    const [success, setsuccess] = useState(false);
    const [faild, setfaild] = useState(false);
    const [loading, setloading] = useState(false);
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>[ Automation ]<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    
    //usenavigate returns function ,, so its variable is a function
    const navigate = useNavigate();
    const {id} = useParams()
    const url = 'http://localhost:3000'

    function sendData(values){
        setloading(true);
         axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}`, {"shippingAddress": values}, 
          {headers:{token:localStorage.getItem('ecommToken')},params:{url: 'https://mostafabadr7.github.io/FreeCart-Ecommerce-WebApp-React/#',}})
        .then((response)=>{
            // console.log('true', response);
            setsuccess(true);
            setloading(false);
            setTimeout(()=>{setsuccess(false)
                window.location.href = response.data.session.url
            }, 2000);
        }).catch((response)=>{
            // console.log('err', (response.response.data), (id));
            setfaild(response.response.data.message);
            setloading(false);
            setTimeout(()=>{setfaild(false)
            }, 4000)
        })
    }
 
    
   
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>[ ForMik ]<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
let useData={
    details:'',
    city:'',
    phone:'',
}
function onSubmit(values){
    sendData(values)
}
// -------------------------------------------------- YUP ----------------------------------------
const myScheme=Yup.object({
    details:Yup.string().trim().required("*required*").min(10).max(50).matches(/^[\w\s]+[A-Za-z0-9'.\s,]+/),
    city:Yup.string().trim().required("*required*").min(3).max(20).matches(/^[\w\s]+[A-Za-z0-9'.\s,]+/),
    phone:Yup.string().trim().matches(/^0?1[0125]\d{8}$/, "011 / 012 / 015 / 010 (10 numbers min.)").required('*required*'),
})
// ------------------------------------------------ useFormik ----------------------------------------
const myFormik = useFormik({
    initialValues: useData ,
    onSubmit,
    validationSchema: myScheme,
    })
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>[ RETURN ]<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  return <>
    <main className="mt-5 px-5 mx-5">
    {/* // ------------------------------------------- Error or Success ---------------------------------------- */}
        {success && <div className='alert alert-success text-center' >Saved Successfully</div>}
        {faild && <div className='alert alert-danger text-center' >{faild}</div>}
    {/* // ------------------------------------------------ FORM ---------------------------------------- */}
            <h1>Your Address:</h1>
                <form className='mt-4' onSubmit={myFormik.handleSubmit} >
                    <div className="mb-3">
                        <label htmlFor='details' className="form-label text-dark">Address:</label>
                        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} type="text" value={myFormik.values.details}  id='details' className="form-control"   />
                            {myFormik.errors.details && myFormik.touched.details && <div className='alert alert-danger'>{myFormik.errors.details}</div> }
                    </div>
                    <div className="mb-3">
                        <label htmlFor='city' className="form-label">City:</label>
                        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} type="text" value={myFormik.values.city} id='city' className="form-control"   />
                            {myFormik.errors.city && myFormik.touched.city && <div className='alert alert-danger'>{myFormik.errors.city}</div> }
                    </div>
                    <div className="mb-3">
                        <label htmlFor='phone' className="form-label">Phone:</label>
                        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} type="number" value={myFormik.values.phone} id='phone' className="form-control"   />
                            {myFormik.errors.phone && myFormik.touched.phone && <div className='alert alert-danger'>{myFormik.errors.phone}</div> }
                    </div>
                    <div className="d-grid gap-2">
    {/* // --------------------------------------------- SUBMIT BUTTON ---------------------------------------- */}
                    {loading? 
                    <button  disabled={!(myFormik.isValid && myFormik.dirty)} type='button' className="d-flex align-items-center btn mt-4 validation px-3 py-2  bg-main rounded ms-auto text-white">
                    <BallTriangle
                            height={20}
                            width={20}
                            radius={5}
                            color="#fff"
                            ariaLabel="ball-triangle-loading"
                            wrapperStyle={{}}
                            wrapperClass="mb-1 px-4"
                            visible={true}
                        />
                    </button>
                    :
                    <button  className="d-flex align-items-center btn mt-4 px-3 py-2  bg-main rounded ms-auto text-white" disabled={!(myFormik.isValid && myFormik.dirty)} type='submit'>
                    Pay Now
                    </button>
                }
                    </div>
                </form>
    </main>
</>
}
