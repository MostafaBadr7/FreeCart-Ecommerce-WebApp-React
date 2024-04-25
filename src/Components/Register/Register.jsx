import React, { useContext, useEffect } from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useState } from 'react'
import {BallTriangle} from 'react-loader-spinner'
import {Link, useNavigate} from 'react-router-dom'
import style from './Register.module.css'
import { AuthContext } from '../../Contexts/AuthContextProvider'

export default function Register() {
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> State <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    const [success, setsuccess] = useState(false);
    const [faild, setfaild] = useState(false);
    const [loading, setloading] = useState(false);
    const {setnavDisplay} = useContext(AuthContext)
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> useEffect <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    useEffect(() => {
        setnavDisplay(false)
    }, [])
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>[ Automation ]<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    
    //usenavigate returns function ,, so its variable is a function
    const navigate = useNavigate();

    function sendData(values){
        setloading(true);
         axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
        .then((response)=>{
            // console.log('true', response);
            setsuccess(true);
            setloading(false);
            setTimeout(()=>{setsuccess(false)
                navigate('/login');
            }, 4000);
        }).catch((response)=>{
            // console.log('err', (response.response.data.message));
            setfaild(response.response.data.message);
            setloading(false);
            setTimeout(()=>{setfaild(false)
            }, 4000)
        })
    }
 
    
   
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>[ ForMik ]<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
let useData={
    name:'',
    email:'',
    password:'',
    rePassword:'',
    phone:'',
}
function onSubmit(values){
    sendData(values)
}
// -------------------------------------------------- YUP ----------------------------------------
const myScheme =   Yup.object({
    name:  Yup.string().required("*required*").min(3).max(50).matches(/^[a-zA-Z]{3,}\s(?:[a-zA-Z]{3,}\s?){1,3}$/, "Please enter your first & last name - 4 names MAX."),
    email:  Yup.string().required("*required*").matches(/^[\w-.]+@([\w-]{2,}\.)+[\w-]{2,4}$/, "like: example@yy.zz"),
    password:  Yup.string().required("*required*").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "8 minimum => 1 small letter - 1 CAPital letter - 1 number"),
    rePassword: Yup.string().oneOf([Yup.ref('password')],"should equal the password").required("*required*"),
    phone: Yup.string().matches(/^0?1[0125]\d{8}$/, "011 / 012 / 015 / 010 (10 numbers min.)").required('*required*'),
})
// ------------------------------------------------ useFormik ----------------------------------------
const myFormik = useFormik({
    initialValues: useData ,
    onSubmit: onSubmit,
    validationSchema: myScheme,
    })
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>[ RETURN ]<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  return <>
  <div className={`${style.RegisterBackGround} py-5`}>
    <div className='container text-white'>
        <h2 className='fw-bold'>ShopVista</h2>
    </div>
    <div className=' container text-black d-flex align-items-center '>
        <Link className='bg-white p-1' to='/Home'>
        <i className="fa-solid fa-square-caret-left fs-2 bg-white"></i>
        </Link>
        <Link to='/Home'><h2 className='p-2 text-white text-center btn btn-dark mt-2'>Back To Home</h2></Link>
    </div>
    <main className="mt-5 px-5 me-5 bg-success-subtle py-5 rounded shadow w-50 ms-auto">
    {/* // ------------------------------------------- Error or Success ---------------------------------------- */}
        {success && <div className='alert alert-success text-center' >Congratulations, Your account has been created</div>}
        {faild && <div className='alert alert-danger text-center' >{faild}</div>}
    {/* // ------------------------------------------------ FORM ---------------------------------------- */}
            <h1>Register Now:</h1>
                <form onSubmit={myFormik.handleSubmit} >
                    <div className="mb-3">
                        <label htmlFor='name' className="form-label text-dark">name:</label>
                        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} type="text" value={myFormik.values.name}  id='name' className="form-control shadow "   />
                            {myFormik.errors.name && myFormik.touched.name && <div className='alert alert-danger'>{myFormik.errors.name}</div> }
                    </div>
                    <div className="mb-3">
                        <label htmlFor='email' className="form-label">email:</label>
                        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} type="text" value={myFormik.values.email} id='email' className="form-control shadow "   />
                            {myFormik.errors.email && myFormik.touched.email && <div className='alert alert-danger'>{myFormik.errors.email}</div> }
                    </div>
                    <div className="mb-3">
                        <label htmlFor='password' className="form-label">password:</label>
                        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} type="password" value={myFormik.values.password}  id='password' className="form-control shadow"   />
                            {myFormik.errors.password && myFormik.touched.password && <div className='alert alert-danger'>{myFormik.errors.password}</div> }
                    </div>
                    <div className="mb-3">
                        <label htmlFor='rePassword' className="form-label">rePassword:</label>
                        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} type="password" value={myFormik.values.rePassword} id='rePassword' className="form-control shadow"   />
                            {myFormik.errors.rePassword && myFormik.touched.rePassword && <div className='alert alert-danger'>{myFormik.errors.rePassword}</div> }
                    </div>
                    <div className="mb-3">
                        <label htmlFor='phone' className="form-label">phone:</label>
                        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} type="number" value={myFormik.values.phone} id='phone' className="form-control shadow"   />
                            {myFormik.errors.phone && myFormik.touched.phone && <div className='alert alert-danger'>{myFormik.errors.phone}</div> }
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                    <div className=''>
                        <Link to='/login' className='text-main mx-2 fw-bold'>Have an account?LogIn</Link>
                     </div>
    {/* // --------------------------------------------- SUBMIT BUTTON ---------------------------------------- */}
                    {loading? 
                    <button  disabled={!(myFormik.isValid && myFormik.dirty)} type='button' className="d-flex align-items-center btn px-3 py-2  bg-main rounded ms-auto text-white">
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
                    <button  disabled={!(myFormik.isValid && myFormik.dirty)} type='submit' className="d-flex align-items-center btn px-3 py-2  bg-main rounded  text-white">
                    Register
                    </button>
                }
                
                    </div>
                </form>
    </main>
    </div>  
</>
}
