import React, { useEffect, useRef, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../Assets/images/logoGreen2.jpg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContextProvider'
import { CounterContext } from '../CounterContext/CounterContext'
import {jwtDecode} from 'jwt-decode'
import { ProfileContext } from '../../Contexts/ProfileContextProvider'
import Cookies from 'js-cookie'
import Categories from '../Categories/Categories'
import UserInfo from '../UserInfo/UserInfo'
import CategoriesMegaMenu from '../CategoriesMegaMenu/CategoriesMegaMenu'
import BrandegoriesMegaMenu from '../BrandsMegaMenu/BrandsMegaMenu'
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'

export default function Navbar(props) {

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> State & Hooks >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  
  const navigate = useNavigate()
  const {Token, setToken, navDisplay, setnavDisplay} = useContext(AuthContext);
  let {counter , setcounter} = useContext(CounterContext)
  const {cstNname, setcstNname}= useContext(ProfileContext)
  let SearchValue = useRef(null)
  const [inputValue, setInputValue] = useState(false);
  // const [inputValue2, setInputValue2] = useState(['tv','television','shoes','shirt','T-shirt','shawl', 'Laptop', 'woman', 'men', 'Headphone', 
  //                                       'earbuds',]);
  const [searchRecom, setsearchRecom] = useState(false);
  const [closeListId, setcloseListId] = useState(false);
  // const [navDisplay, setnavDisplay] = useState(true);

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Automation Function >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  function logout(){
    setToken(null);
    localStorage.removeItem('ecommToken');
    localStorage.removeItem('cstNnameFreeCart');
    Cookies.remove('access_token');
    navigate('/login');
    setcstNname()
  }

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<.... Search ....>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  function Search(key){
    if(key){
      navigate(`/Search/${key}`)
            setsearchRecom(false)
      return true
    }else{
      var SearchKey = document.querySelector('.SearchKey')
      navigate(`/Search/${SearchKey.value}`)
    }
  }

  function SearchOnEnter(e){
    if(e.key === 'Enter'){
      var SearchKey = document.querySelector('.SearchKey')
      navigate(`/Search/${SearchKey.value}`)
      setsearchRecom(false)
    }
    
  }
  function SearchOnChange(e){
    if(e.target.value !== ' ' || ''){
      let box = []
      data?.pages.map((page) =>
                        page.data
                          .filter((product) => product.title?.toLowerCase().includes(e.target.value.toLowerCase())  )
                          .map((product) => (
                            box.push(product.title)
                          ))
                      )
                        setInputValue(box)
                      
    }
    }
   
  
  async function getProducts({ pageParam }) {
  const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageParam}`)
  return data
}

  const {
  data,
  fetchNextPage,
  hasNextPage,
} = useInfiniteQuery({
  queryKey: ['projects'],
  queryFn: getProducts,
  initialPageParam: 1,
  getNextPageParam: (lastPage, pages) => {
    // console.log(lastPage.metadata)
    // console.log(pages)
    if (lastPage.metadata.numberOfPages !== lastPage.metadata.currentPage) {
      return lastPage.metadata.nextPage
    }
  },
})

function closeSuggest(e){
   const closeList = setTimeout(() => {
    setsearchRecom(false)
  }, 200)
  setcloseListId(closeList);
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<........>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// useEffect(() => {
//   const URL = window.location.href;
//   if (!URL.includes("Login") || !URL.includes("Register")) {
//     setnavDisplay(true);
//   } else {
//     setnavDisplay(false);
//   }
// }, [cstNname,URL]);

useEffect(() => {

  return () => clearTimeout(closeListId)
})
useEffect(() => {
// setcounter(counter)
console.log('hi')
}, [counter])


// const handleClickOutside = (event)=>{
//   if(event.relatedTarget.classList.contains('searchKey')){
//     if(!event.target.classList.contains('suggestion-item') || event.target.classList.contains('searchKey') ){
//       setsearchRecom(false)
//     }
//   }
  
// }

// useEffect(() => {
//   document.addEventListener('click', handleClickOutside);

//   return() =>{
//     document.removeEventListener('click', handleClickOutside);
//   }
// }, [])
function Linkedin(){
  console.log("Clicked"); // Check if the function is being called

   window.location.href ='https://www.linkedin.com/in/mostafa-badr-610b64208/'
}

  return <>
  {navDisplay &&
  <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top shadow">
      <div className="container ">
            <Link className={`navbar-brand cursor-pointer d-flex align-items-center fw-bolder fs-6 pe-1 rounded`} to={'Home'} ><img className={`${style.Logo} mx-2`} src={logo} alt="" />shopvista</Link>
            <Link to={'/Cart'} className="nav-link cursor-pointer  position-relative d-block d-sm-none ms-auto ">
                      <i className="fa-solid fa-cart-shopping  mt-2 fs-4 text-main"></i>                     
                       <span className="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main mb-1 ms-2">
                        {localStorage.getItem('ecommToken') ? counter : ''}
                      </span>
            </Link>
            <div className="dropdown d-block d-sm-none mx-4 ">
                          <button className=" border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="fa-solid fa-user-tie fs-4 text-secondary"></i>
                          </button>
                          <ul className="dropdown-menu p-0 mt-2 rounded bg-white ">
                          {  localStorage.getItem('ecommToken') ? <>
                            <span onClick={logout} role='button' className="rounded-pill  dropout bg-danger w-100 cursor-pointer  p-2 text-white  ">LogOut</span>
                            </>
                            :<>
                            <NavLink className="nav-link drop cursor-pointer mx-3 my-2 text-secondary"to={'Login'} >Login</NavLink>
                            <NavLink className="nav-link drop cursor-pointer mx-3 mb-3  text-secondary"to={'Register'} >Register</NavLink>
                            </>
                          }
                          </ul>
            </div>
            <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
              Menu <span className="navbar-toggler-icon" />
            </button>
            
          <div className="collapse navbar-collapse" id="collapsibleNavId">
              <ul className="navbar-nav me-lg-auto me-sm-5 mt-2 mt-lg-0">
                <li className="nav-item ">
                  <NavLink className="nav-link  cursor-pointer tex-main" to={'Home'}  aria-current="page">Home
                  <span className="visually-hidden">(current)</span></NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink className="nav-link cursor-pointer" to={'Product'}>Products</NavLink>
                </li>
                <li className="nav-item cat-navitem">
                  <NavLink className="nav-link position-relative  cursor-pointer" to={'Categories'} >Categories</NavLink>
                  <div className='cat-dropDown bg-light p-1 pb-0  position-absolute top-0 '>
                  <CategoriesMegaMenu />
                  </div>
                </li>
                <li className="nav-item brand-navitem">
                  <NavLink className="nav-link cursor-pointer" to={'Brands'} >Brands</NavLink>
                  <div className='brand-dropDown bg-light p-1  position-absolute top-0 '>
                  <BrandegoriesMegaMenu />
                  </div>
                </li>
              </ul>
              <div className='ms-auto'> 
                <input className='SearchKey  form-control position-relative rounded-end-0 fs-6 fw-light text-muted px-2 py-2 my-1 mb-2' onBlur={ closeSuggest} onFocus={()=> setsearchRecom(true) } onChange={SearchOnChange}  onKeyDown={SearchOnEnter} ref={SearchValue} placeholder='product, brand, ...'  type='text'></input>
                {searchRecom  && inputValue &&<>
                {/* {console.log(SearchValue)} */}
                  <div className='suggestion-box position-absolute  overflow-y-scroll   px-1 top-100 w-25  bg-white shadow rounded-bottom-5 pb-3'>
                    {inputValue && inputValue.map((item , index )=> <div key={index} onClick={()=>Search(item)} className='suggestion-item my-2 cursor-pointer p-1 bg-light'>{item}</div>)}
                    </div>
                    </>}
              </div>
              <button onClick={()=> Search()} className="me-auto btn rounded-start-0 mb-1 rounded-end py-2 px-1 text-white bg-main icon-link-hover"><i className='fa-solid fa-magnifying-glass px-1'></i>Search</button>
              <div className="d-flex  my-2 my-lg-0 me-4 ">
                  {/* <i className='fab fa-instagram mx-2 cursor-pointer text-danger'></i>
                  <i className='fab fa-facebook mx-2 cursor-pointer text-primary'></i> */}
                  <Link to={'https://www.linkedin.com/in/mostafa-badr-610b64208/'} target='_blank'>
                    <i  role='button'  onClick={ Linkedin} className='fab fa-linkedin mx-2 cursor-pointer text-primary fs-4'></i>
                  </Link>
                  <Link to={'https://github.com/MostafaBadr7/FreeCart-Ecommerce-WebApp-React'} target='_blank'>
                    <i className='fab fa-github mx-2 cursor-pointer text-dark fs-4'></i>
                  </Link>
                  <Link to='https://drive.google.com/drive/folders/19EzxwsrMB_DdbNCCkckacGnIBF-v1eFG' target='_blank'>
                    <i class="fa-regular fa-file mx-2 cursor-pointer text-danger fs-4">CV</i>
                  </Link>

                  {/* <i className='fab fa-youtube mx-2 cursor-pointer text-danger'></i> */}
              </div>
                    <div className="dropdown d-none d-sm-block ">
                          <div className="mx-2 border-0 rounded-circle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="fa-solid fa-circle-user fs-3  text-success-emphasis rounded-circle"></i>
                          </div>
                          <ul className="dropdown-menu p-0 mt-2 px-3 pt-3 rounded bg-transparent opacity text-center ">
                          {/* <h6 className='text-black mx-3 my-3'>{  localStorage.getItem('ecommToken') ? <span className=' m-2 d-block text-success'>Hello</span>:null} <span className='fw-bold'>{cstNname?.name?.split(' ').slice(0, 2).join(' ')}</span></h6> */}
                          {  localStorage.getItem('ecommToken') ? <>
                          <UserInfo />
                            <NavLink className="nav-link drop cursor-pointer mx-3 my-2 text-secondary"to={'/UserProfile'} >View Profile</NavLink>
                            <span onClick={logout} role='button' className="rounded-pill  dropout bg-danger w-100 cursor-pointer  p-2 text-white  "><i className="fa-solid fa-arrow-right-from-bracket"></i> LogOut</span>
                            </>
                            :<>
                            <NavLink className="nav-link drop cursor-pointer mx-3 my-2 text-secondary p-1 btn btn-outline-dark bg-dark-subtle text-dark-emphasis"to={'Login'} >Login</NavLink>
                            <NavLink className="nav-link drop cursor-pointer mx-3 mb-3  text-secondary p-3 btn btn-outine-dark bg-dark text-white"to={'Register'} >Register</NavLink>
                            </>
                          }
                          </ul>
                    </div>
                    {localStorage.getItem('ecommToken') &&
                    <Link to={'/Cart'} className="nav-link cursor-pointer mx-1 position-relative d-none d-sm-block">
                      <i className="fa-solid fa-cart-shopping  fs-4 text-main"></i>                     
                       <span className="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main mb-1 ms-2">
                        {localStorage.getItem('ecommToken') ? counter : ''}
                      </span>
                    </Link>
                    }
          </div>
      </div>
  </nav>
  }
  </>
}
