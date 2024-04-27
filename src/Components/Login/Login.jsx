import React, { useEffect } from 'react'
import {replace, useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useState } from 'react'
import {ColorRing} from 'react-loader-spinner'
import {Link, useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContextProvider'
import { ProfileContext } from '../../Contexts/ProfileContextProvider'
import { redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';
import style from './Login.module.css'



export default function Login() {
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> State & Hooks <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    //.................................................State....................................
    const [faild, setfaild] = useState(false);
    const [loading, setloading] = useState();
    const [btnloading, setbtnloading] = useState();
    const [Msg, setMsg] = useState(false)
    const {cstNname, setcstNname} = useContext(ProfileContext)
    const {setToken, Token, setnavDisplay} = useContext(AuthContext)

    //..................................................Hooks...........................................
    //usenavigate returns function ,, so its variable is a function
    const navigate = useNavigate();
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>[ Automation ]<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    //......Send Data to BackEnd.........
    function sendData(values){
        setloading(true);
         axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
        .then((response)=>{
            setToken(response?.data.token);
            localStorage.setItem('ecommToken', response?.data.token);
            localStorage.setItem('cstNnameFreeCart', JSON.stringify({...jwtDecode(response?.data.token) , 'email': values.email}));
            setcstNname(JSON.stringify({...jwtDecode(response?.data.token) , 'email': values.email}))
            // console.log(JSON.parse(localStorage.getItem('cstNnameFreeCart' )));
            window.location.hash.includes('login')  ?
            navigate('/home') 
            :
            navigate(`/${window.location.hash}`, 'replace:true');
            navigate(-1);
            setloading(false);
        }).catch((response)=>{
            console.log('err', (response));
            setloading('loginError');
            setfaild(response?.response?.data.message);
            setTimeout(()=>{setloading(false);
            }, 4000)
        })
    }

    //......Forget Password.........
    async function forgetPassword(){
        setloading('forgetPassLoad')
        setMsg(false)
        setfaild(false)
        if(myFormik.values.email.match(/^[\w-.]+@([\w-]{2,}\.)+[\w-]{2,4}$/)){
            const data = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {'email' : `${myFormik.values.email}`})
            .then( resp =>{
                    // console.log(resp);
                    setMsg(resp?.data.message);
                    setloading('sendCode');
                }
            ).catch( resp =>{
                // console.log(resp)
                setloading('loginError')
                setfaild(resp?.response?.data?.message || resp?.message)}
            )
    }else{
            setfaild('Please Enter a Valid Email')
            setloading(null)
            }
    }

    //......Google Login.........

    const handleClickGoogle = () => {
        const callbackUrl = `${window.location.origin}`;
        const googleClientId = "744491233039-d7vsj933f07qk5ccsq48l3vdevovnu3m.apps.googleusercontent.com";
        const targetUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${encodeURIComponent(
          callbackUrl
        )}&response_type=token&client_id=${googleClientId}&scope=openid%20email%20profile`;
        window.location.href = targetUrl;
      };

function sendGoogleData(values, userDataRegister){
    // setloading(true);
    console.log(values)
     axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
    .then((response)=>{
        // console.log('values' ,values)
        // console.log('sendGoogleData',response )
        setToken(response.data.token);
        localStorage.setItem('ecommToken', response.data.token)
        window.location.hash.includes('login')  ?
        navigate('/home') 
        :
        navigate(`/${window.location.hash}`, 'replace:true');
        navigate(-1);
        // setloading(false);
    }).catch((response)=>{
      console.log('sendGoogleData Error',response )

        // console.log('err', (response.response.data));
            console.log(userDataRegister)
        sendDataRegister(userDataRegister)
        // setloading('loginError');
        // setfaild(response.response.data.message);
        // setTimeout(()=>{setloading(false);
        // }, 4000)
    })
}

function sendDataRegister(values){
  // setloading(true);
   axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
  .then((response)=>{
    console.log('sendDataRegister',response )

      // console.log('true', response);
      // setsuccess(true);
      // setloading(false);
      // setTimeout(()=>{setsuccess(false)
      //     navigate('/login');
      // }, 4000);
      navigate('/home')
  }).catch((response)=>{
    console.log('sendDataRegister Error',response )

      // console.log('err', (response.response.data.message));
      // setfaild(response.response.data.message);
      // setloading(false);
      // setTimeout(()=>{setfaild(false)
      // }, 4000)
  })
}   

const getUserDetails = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
  );
  const data = await response.json();
//   console.log(data)
  localStorage.setItem('cstNnameFreeCart',  JSON.stringify(data));
  setcstNname(data);
  let userData={
    email:  data.email ,
    password: data.id + 'aA',
}
  let  userDataRegister={
    name: data?.name + ' ' +  ' Google',
    email:  data?.email,
    password: data?.id + 'aA',
    rePassword: data.id + 'aA',
    phone:'01010101000',
}
sendGoogleData(userData, userDataRegister);

};
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>[ ForMik ]<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// -------------------------------------------------- UserData ----------------------------------------
let userData={email:"",password:""};
let userDataResetPass={
    resetCode:'',
};
let userDataNewPass={
    newPassword:'',
    repassword:'',
};
// -------------------------------------------------- OnSubmit ----------------------------------------
function onSubmit(values){
    sendData(values)
}
function onSubmitResetPass(values){
    setbtnloading('Rloading');
    setloading();
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {resetCode: `${values.resetCode}`})
        .then(res =>{
            // console.log('reset', res)
            setloading('resetSuccess');
            setbtnloading('no');
        }).catch(res =>{
            // console.log('reset', res)
            setbtnloading('no');
            setloading('resetFaild');
            setfaild(res.response?.data?.message)
        })
}
function onSubmitNewPass(values){
    setbtnloading('Rloading');
    setloading('resetSuccess');
        axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {email: myFormik.values.email, newPassword:values.newPassword})
        .then(res =>{
            // console.log('new', res)
            setloading('changeSuccess');
            setbtnloading('no');
            setMsg(false);
            setTimeout(() => {
                navigate('/Login');
            }, 500);
        }).catch(res =>{
            // console.log('new', res)
            setbtnloading('no');
            setloading('changeFaild');
            setfaild(res.response?.data?.message || res.message );
        })
}
// -------------------------------------------------- YUP ----------------------------------------
const myScheme =   Yup.object({
    email:  Yup.string().required("*required*").matches(/^[\w-.]+@([\w-]{2,}\.)+[\w-]{2,4}$/, "like: example@yy.zz"),
    password:  Yup.string().required("*required*").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "8 minimum => 1 small letter - 1 CAPital letter - 1 number"),
})
const mySchemeResetPass =   Yup.object({
    resetCode:  Yup.string().required().matches(/^[0-9]{3,}$/, "Only numbers - Minimum 3 "),
})
const mySchemeNewPass =   Yup.object({
    newPassword:  Yup.string().required("*required*").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "8 minimum => 1 small letter - 1 CAPital letter - 1 number"),
    repassword: Yup.string().oneOf([Yup.ref('newPassword')],"should equal the password").required("*required*"),
})
// ------------------------------------------------ useFormik Hook ----------------------------------------
const myFormik = useFormik({
    initialValues: userData ,
    onSubmit: onSubmit,
    validationSchema: myScheme,
    })
const myFormikResetPass = useFormik({
    initialValues: userDataResetPass ,
    onSubmit: onSubmitResetPass,
    validationSchema: mySchemeResetPass,
    })
const myFormikNewPass = useFormik({
    initialValues: userDataNewPass ,
    onSubmit: onSubmitNewPass,
    validationSchema: mySchemeNewPass,
    })
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>[ useEeffect ]<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// useEffect of Google Login
  useEffect(() => {
    const accessTokenRegex = /access_token=([^&]+)/;
    const isMatch = window.location.href.match(accessTokenRegex);
    

    if (isMatch) {
    //   setLoaading('notTokenLoad')
        // console.log(window.location.href)
      const accessToken = isMatch[1];
      Cookies.set("access_token", accessToken, { httpOnly: true }); //To prevent access cookies through JS
      getUserDetails(accessToken)
      navigate('/UserProfile') 
    }
  }, [window.location.href]);

  useEffect(() => {
      setnavDisplay(false)
  }, [])
  
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>[ RETURN ]<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  return <>
  <div className={`${style.loginMain} py-5`}>
    <div className='container text-white'>
        <h2 className='fw-bold'>Shopvista</h2>
    </div>
    <div className=' container text-black d-flex align-items-center '>
        <Link className='bg-white p-1' to='/Home'>
        <i className="fa-solid fa-square-caret-left fs-2 bg-white"></i>
        </Link>
        <Link to='/Home'><h2 className='p-2 text-white text-center btn btn-dark mt-2'>Back To Home</h2></Link>
    </div>
    
    <main className={` mt-5 px-5 mx-5 pb-3 pt-3 rounded  shadow`}>
    {/* // ------------------------------------------- Error or Success ---------------------------------------- */}
        {loading === 'loginError' && <div className='alert alert-danger text-center' >{faild}</div>}
    {/* // ------------------------------------------------ FORM ---------------------------------------- */}
{/* // --------------------------------------------- Pop Up Reset Password ---------------------------------------- */}
<div>
    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header ">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Reset Password</h1>
                    <button   type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>sen
                {/* // --------------------------------------------- Send Code ---------------------------------------- */}
                {loading === 'sendCode' || 'resetFaild'?
                <div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                    {loading === 'resetFaild' && <div className='alert alert-danger text-center' >{faild}</div>}
                                <input onChange={myFormikResetPass.handleChange} onBlur={myFormikResetPass.handleBlur} value={myFormikResetPass.values.resetCode} placeholder='..code here' type='text' className="form-control"  name='resetCode' id="recipient-name" />
                                {myFormikResetPass.errors.resetCode  &&  myFormikResetPass.touched.resetCode && <div className='alert alert-primary m-2 text-center'>{myFormikResetPass.errors.resetCode}</div> }
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        {btnloading === 'Rloading'?  
                            <button onClick={myFormikResetPass.handleSubmit} disabled={true} type="button" className="btn btn-primary"><div><i className='fas fa-spin fa-spinner'></i></div></button>
                        :
                            <button onClick={myFormikResetPass.handleSubmit} disabled={!(myFormikResetPass.isValid && myFormikResetPass.dirty)} type="button" className="btn btn-primary">Send Code</button>
                        }
                    </div>
                </div>
            :<div>
                {/* // --------------------------------------------- New Password ---------------------------------------- */}
                {loading !== 'changeSuccess' && (loading === 'resetSuccess' || 'changeFaild') &&
                    <div>
                        <div className="modal-body">
                            {loading === 'changeFaild' && <div className='alert alert-danger text-center' >{faild}</div>}
                            <form>
                                <div className="mb-3">
                                    <input onChange={myFormikNewPass.handleChange} onBlur={myFormikNewPass.handleBlur} value={myFormikNewPass.values.newPassword} placeholder='..new Password here' type='password' className="form-control"  name='newPassword' id="recipient-name" />
                                    {myFormikNewPass.errors.newPassword  &&  myFormikNewPass.touched.newPassword && <div className='alert alert-primary m-2 mt-0 text-center'><span className='fw-bold d-block'>Password :</span> {myFormikNewPass.errors.newPassword}</div> }
                                </div>
                                <div className="mb-3">
                                    <input onChange={myFormikNewPass.handleChange} onBlur={myFormikNewPass.handleBlur} value={myFormikNewPass.values.repassword} placeholder='..repassword' type='password' className="form-control d-inline"  name='repassword' id="recipient-name" />
                                    {myFormikNewPass.errors.repassword  &&  myFormikNewPass.touched.repassword && <div className='alert alert-primary m-2 mt-0 text-center'><span className='fw-bold d-block'>rePassword :</span> {myFormikNewPass.errors.repassword}</div> }
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={myFormikNewPass.handleSubmit} disabled={!(myFormikNewPass.isValid && myFormikNewPass.dirty)} type="button" className="btn btn-primary">{btnloading === 'Rloading' ?<div><i className='fas fa-spin fa-spinner'></i> </div>: 'Submit' }</button>
                        </div>
                    </div>}
                    :
                    {loading === 'changeSuccess' &&
                    <div>
                        <div className="modal-body text-center">
                            <div className='my-2'><i className="fa-regular fa-circle-check text-main fs-1 d-block m-auto "></i></div>
                            <p>Password Reset Successifly</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                    }
            </div>}
            </div>
        </div>
    </div>
</div>

{/* //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>[ Login  ]<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}

        {Msg && <div className='alert alert-primary alert-heading' role="alert">{Msg}</div>}
            <h1 className='pb-4 fw-bolder'>Login Now :</h1>
            
    {/* // --------------------------------------------- Google BUTTON ---------------------------------------- */}
                        <div>
                            <div className="G-btn mx-2 position-relative">
                            <a className="btn btn-dark d-flex justify-content-center" onClick={handleClickGoogle}>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 326667 333333"
                                shapeRendering="geometricPrecision"
                                textRendering="geometricPrecision"
                                imageRendering="optimizeQuality"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                width={20}
                                height={20}
                                >
                                <path
                                    d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
                                    fill="#4285f4"
                                />
                                <path
                                    d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
                                    fill="#34a853"
                                />
                                <path
                                    d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
                                    fill="#fbbc04"
                                />
                                <path
                                    d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
                                    fill="#ea4335"
                                />
                                </svg>
                                <span className="inner text-white ms-1">Log in with Google</span>
                            </a>
                            </div>
                        </div>
                        <h2 className='or text-center text-white fw-bolder'>or</h2>
                <form onSubmit={myFormik.handleSubmit} >
                    <div className="mb-3 mt-3">
                        <label htmlFor='email' className="form-label ">email:</label>
                        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} type="text" value={myFormik.values.email} id='email' className="form-control"   />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='password' className="form-label">password:</label>
                        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} type="password" value={myFormik.values.password}  id='password' className="form-control"   />
                    </div>
                    <div className="d-grid gap-2">
    {/* // --------------------------------------------- SUBMIT BUTTON ---------------------------------------- */}
                    {loading === true? 
                    <button  disabled={!(myFormik.isValid && myFormik.dirty)} type='button' className="d-flex align-items-center btn px-3 py-2  bg-main rounded ms-auto">
                        <ColorRing
                            visible={true}
                            height="25"
                            width="25"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper mx-2"
                            colors={['#fff','#fff', '#fff', '#fff','#fff']}
                            />
                    </button>
                    :<>
                    <div className='d-flex align-items-center'>
                    {loading === 'forgetPassLoad'? <div className="spinner-border text-secondary mx-2 " role="status">
                        <span className="visually-hidden">Loading...</span>
                        </div>:<>
                            <Link onClick={()=> forgetPassword()} className="text-main fw-bold d-flex align-items-center mt-3"> Forget Password? </Link>
                            {Msg && <button type="button" className="btn btn-outline-success mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Enter Your Code Here</button>}
                            </>
                    }
                    <Link to='/Register' className={`${style.linkRegister} link-black  fw-bold d-flex align-items-center ms-auto me-3 mt-3`}> Don't Have an account? Register Now </Link>
                   <button  disabled={!(myFormik.isValid && myFormik.dirty)} type='submit' className="d-flex align-items-center btn px-3 py-2  bg-main rounded text-white">
                    Login
                    </button>
                    </div>
                    </>
                }
                    </div>
                </form>
    </main>
  </div>  
</>
}
