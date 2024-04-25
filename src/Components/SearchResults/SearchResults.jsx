import React, { useContext, useEffect, useState } from 'react'
import './SearchResults.module.css'
import { Helmet } from 'react-helmet'
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'
import Loading from '../Loading/Loading'
import SingleProduct from '../SingleProduct/SingleProduct'
import { ProfileContext } from '../../Contexts/ProfileContextProvider'
import { useParams } from 'react-router-dom'

export default function SearchResults() {

  const {setCounter} = useContext(ProfileContext);
  const {SearchKey} = useParams()                   // The SearchKey parameter
  const [noResult, setnoResult] = useState(false);  
  const [rateValue, setrateValue] = useState([]);   //Filter upon rateAverage
  const [priceValue, setpriceValue] = useState([]); //Filter upon price range
  const [priceValueValidation, setpriceValueValidation] = useState(true); //If input not a number .. disable btn
  const [dataResults, setdataResults] = useState([]);
  const [isLoading2, setisLoading2] = useState(false);  //Loading while filtering
  

// Get all products
  async function getProducts({ pageParam }) {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageParam}`)
    return data
  }

  // use InfiniteQuery to get data and pagination
  const {
    data,
    isLoading,
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

  const getRandomColor = () => { // change load more button's color
    const h = Math.floor(Math.random() * 360);
    return `hsl(${h}deg, 90%, 85%)`;
  };

  //When select a rate
  function RateCheckChange(event){
    const { value, checked} = event.target; // get value of the input and the check status
    // console.log(checked)
    if(checked){
      // console.log('yes checked')
      // console.log('rate value after checked', rateValue)
       setrateValue(rateValue => { if(rateValue.includes(value) === false){ return [...rateValue, +value]} }) ;
      console.log('rate value after checked', rateValue)
    }else{
      setisLoading2(true);
      // console.log('ratevalue after not checked', +rateValue)
      setrateValue( rateValue.filter(rate => rate !== +value)); //if value not checked return rateValues which not = this value
      // console.log('ratevalue after not checked', rateValue)
    }
  }

  //Applying Filters
  function preparingData(){
    let box = []; //Main array I use in filtering phases
    // console.log('rateValue in prepare', rateValue)

    //Filter data according to searchKey
    if(data?.pages){
      box = []
      box = data?.pages.flatMap((page) => page.data).filter( (product) => product.title?.toLowerCase().includes(SearchKey.toLowerCase()) ) 
    }else{
      box = []
        box = data?.data.filter((product) => product.title.toLowerCase().includes(SearchKey.toLowerCase()))
    }

    // Filter data according to a rating selection
    if(rateValue.length > 0 && rateValue){
      setisLoading2(true);
      // console.log(data)
      let filteringBox = []
        for (let index = 0; index < rateValue.length; index++) {
          // console.log(rateValue[index],box )
          filteringBox.push(...box.filter(product => product.ratingsAverage === rateValue[index] || ( product.ratingsAverage > rateValue[index] &&  product.ratingsAverage < (rateValue[index]+1) ) ))
        }
          box = filteringBox // change box to use in price filtering
          // console.log('box after filter',box, filteringBox );
          filteringBox.length > 0 ? setdataResults([...filteringBox]) : setdataResults([]);
          setisLoading2(false);
    }else{
      setdataResults(box)
      setisLoading2(false);
    }

    // Filter data according to a price range
    if(priceValue.length > 0 && priceValue){
      console.log(box, 'price f BEFORE')

          if(priceValue.length === 2){
            console.log(box, 'price f BEFORE')
            setisLoading2(true);
            const dataArray = box.filter(product => 
              product.priceAfterDiscount ?
                product.priceAfterDiscount >= priceValue[0] && product.priceAfterDiscount <= priceValue[1]
                :
                product.price >= priceValue[0] && product.price <= priceValue[1]
          )
          setdataResults(dataArray)
          console.log(dataArray, 'price f')
          setisLoading2(false);
        }else if(priceValue[0]){
                      console.log(box, 'price f else')
          setisLoading2(true);
          const dataArray = box.filter(product => 
            product.priceAfterDiscount ?
              product.priceAfterDiscount <= priceValue[0] 
              :
              product.price <= priceValue[0] 
            )
            setdataResults(dataArray)
            console.log(dataArray, 'price f else end')
            setisLoading2(false);
          }
      }
  }

  //Validate price input, Disable Apply & Reset buttons in NAN value
function checkPriceInput(){
  const val1 = document.querySelector('.price-input').value;
  const val2 = document.querySelector('.price-input2').value;
  // console.log(val1, val2, isNaN(val1), !!Number(+val2))

  /* Number gives false if input is zero or text , so we are checking if both are zeroes,
  Then we are checking if one of the inputs is NaN*/
  !Number(+val1) && !Number(+val2) ? setpriceValueValidation(true) : setpriceValueValidation(isNaN(val1) || isNaN(val2));
}

  //Update price navigators value to the input boxes
  function priceRangeChange(e){
    document.querySelector('.price-input').value = e.target.value;
    checkPriceInput()}

  function priceRangeChange2(e){
    document.querySelector('.price-input2').value = e.target.value;
    checkPriceInput(); }

  //Update price input value to the navigators
  function updateRangeValue(e){
    const val1 = document.querySelector('.price-input').value;
    const val2 = document.querySelector('.price-input2').value;
    document.querySelector('.priceRange1').value = +val1
    document.querySelector('.priceRange2').value = +val2
    checkPriceInput()
  }

  // Set the price Filter values to the processing
  function priceFilter(){
    const price1 = +document.querySelector('.price-input').value || 0 ;
    const price2 = +document.querySelector('.price-input2').value || 0 ;
    console.log(price1, price2 , 'check')
    if(price1  && price2){
      // Put the smaller number at index 0
       setpriceValue([Math.min(+price1, +price2), Math.max(+price1, +price2)]) 
      // console.log(priceValue ,'price')
    }else{
       setpriceValue([+price1 || +price2]) // set which has a value
      console.log(priceValue ,'price ELSE')
    }
    console.log(priceValue ,'price')
  }

// Reset Price inputs
  function priceFilterReset(){
    document.querySelector('.price-input').value = 0; //Price input by number
    document.querySelector('.price-input2').value = 0;
    document.querySelector('.priceRange1').value = 0; //Price input by navigator
    document.querySelector('.priceRange2').value = 0;
    checkPriceInput()
    setpriceValue([]) // Reset price filter state
  }

  // **********************************************useEffect**********************************************
  //Filter data when a change happens
  useEffect(() => {
    preparingData();
  }, [ SearchKey, data, rateValue, priceValue]);

  useEffect(() => { //If search results lower than 6 items display from the next page

    /*Flatmap to get all the products in one array, then filter them to searchKey
    accordinagly*/
    const searchResults = data?.pages?.flatMap((page) => page.data)
    .filter((product) => product.title?.toLowerCase().includes(SearchKey.toLowerCase()));

    if (
      searchResults?.length < 6 && searchResults?.length > 0
    ) {
      setnoResult(false)
      fetchNextPage();
    }else if(
      searchResults?.length < 1
    ){
      setnoResult(true)
    }
  }, [data, SearchKey, fetchNextPage]);


// ****************************************************Return*************************************************
  return <>
  {/* {console.log(data)} */}
      {isLoading?
      <Loading/>
      :
      <>
        {/* <p className='ms-3 mt-5'>Results for {SearchKey}</p> */}
        {!noResult && <h1 className="search-results-header ms-3 mt-5">Search Results for "{SearchKey}"</h1>}
        <div className='mx-2'> <hr /> </div>
        {/**************************************  Main Row ********************************************/}
            <main  className='products-row row  g-2 mt-3 position-relative z-3 pe-3 ps-3 '>
                      {/*-----------------------------  left column ---------------------*/}
              <div className='col-md-2 col-sm-4  col-12 position-sticky shadow rounded  pt-3 mb-3 '>
                <div className='bg-light ps-2 pt-2 rounded'>
                  <h4 className='text-muted '>Filter</h4>
                    <hr className=' me-2 mt-1 pt-2' />
                </div>
                <div className='p-2'>

                <div className='me-3 mt-4'>
                  <span className='fs-4 me-1'>Price</span><span>(EGP)</span>
                  <input onChange={(e)=> priceRangeChange(e)} min={0} max={1000} type="range" className="priceRange1 form-range" id="customRange1"/>
                  <input onChange={(e)=> priceRangeChange2(e)} min={0} max={1000} type="range" className="priceRange2 form-range" id="customRange1"/>
                  <div className='d-flex flex-column mt-1'>
                    <div className='d-flex'>
                      <input onChange={(e)=> updateRangeValue(e)} className='price-input text-secondary w-50 me-1' type="number" />
                      <input onChange={(e)=> updateRangeValue(e)} className='price-input2 text-secondary w-50' type="number" />
                    </div>
                    <div>
                    <button disabled={priceValueValidation} onClick={()=> priceFilter()} className='btn btn-sm-square btn-success  mt-1 w-100'>Apply</button>
                    <button disabled={priceValueValidation} onClick={()=> priceFilterReset()} className='btn btn-sm-square btn-secondary  mt-1 w-100 me-1'>Reset</button>
                    </div>
                  </div>
                </div>
                <div className='d-flex flex-column mt-4'>
                  <h5>Rating</h5>
                  <div className='d-flex justify-content-between w-75'>

                    <label htmlFor="R1">
                      <i className='fa-solid fa-star rating-color me-1'></i>
                      {/* <i class="fa-solid fa-star-half-stroke rating-color me-1"></i> */}
                    </label>
                    <input className='' name='R1'  value={1} onChange={ RateCheckChange} id='R1' type="checkbox" />
                  </div>

                  <div className='d-flex justify-content-between w-75'>
                    <label htmlFor="R2">
                      <i className='fa-solid fa-star rating-color'></i>
                      <i className='fa-solid fa-star rating-color me-1'></i>
                      {/* <i class="fa-solid fa-star-half-stroke rating-color me-1"></i> */}
                    </label>
                    <input name='R2'  value={2} onChange={ RateCheckChange}  id='R2' type="checkbox" />
                  </div>

                  <div className='d-flex justify-content-between w-75'>
                    <label htmlFor="R3">
                      <i className='fa-solid fa-star rating-color'></i>
                      <i className='fa-solid fa-star rating-color'></i>
                      <i className='fa-solid fa-star rating-color'></i>
                      {/* <i class="fa-solid fa-star-half-stroke rating-color me-1"></i> */}
                    </label>
                    <input name='R3'  value={3} onChange={ RateCheckChange}  id='R3' type="checkbox" />
                  </div>

                  <div className='d-flex justify-content-between w-75'>
                    <label htmlFor="R4">
                      <i className='fa-solid fa-star rating-color'></i>
                      <i className='fa-solid fa-star rating-color'></i>
                      <i className='fa-solid fa-star rating-color'></i>
                      <i className='fa-solid fa-star rating-color'></i>
                      {/* <i class="fa-solid fa-star-half-stroke rating-color me-1"></i> */}
                    </label>
                    <input name='R4'  value={4} onChange={ RateCheckChange}  id='R4' type="checkbox" />
                  </div>

                  <div className='d-flex justify-content-between w-75'>
                    <label htmlFor="R5">
                      <i className='fa-solid fa-star rating-color'></i>
                      <i className='fa-solid fa-star rating-color'></i>
                      <i className='fa-solid fa-star rating-color'></i>
                      <i className='fa-solid fa-star rating-color'></i>
                      <i className="fa-solid fa-star-half-stroke rating-color me-1"></i>
                    </label>
                    <input name='R5'  value={5} onChange={ RateCheckChange}  id='R5' type="checkbox" />
                  </div>

                </div>
                </div>
              </div>
                                    {/*-----------------------------  Right column ---------------------*/}
              <div className=' col-md-10 col-sm-8 col-12 d-flex flex-wrap pb-4'>
                {
                  isLoading2?
                  <div className='text-center m-auto'><Loading/></div>
                  :
                  // check if there is a rate value ,so it's not the first render
                 rateValue && dataResults  ?
                  dataResults?.map((product) => ( <SingleProduct key={product.id} changeCounter={setCounter} id={product.id} product={product} />))
                  :
                  (
                    // If it's the first render
                    (
                      data?.pages ?
                        data?.pages.map((page) =>
                          page?.data?.filter( (product) => product.title?.toLowerCase().includes(SearchKey.toLowerCase()) ).map( ( product )=>( <SingleProduct key={product.id} changeCounter={setCounter} id={product.id} product={product} />) )
                        )
                      :
                        data?.data.filter((product) => product.title.toLowerCase().includes(SearchKey.toLowerCase())).map( (product) => ( <SingleProduct key={product.id} changeCounter={setCounter} id={product.id} product={product} />) )
                    )
                  )
                }
                    {/* If no Search Results  */}
                    {noResult &&
                      <div className='m-auto text-center'>
                        <img className='m-auto w-25 mb-2' src="https://http.cat/102" alt="Search no result" />
                        <h1 className='text-center'>No result for "{SearchKey}"</h1>
                      </div>
                    }
                </div>
            </main>
            {/* // fetchNextPage Button */}
            <div className='loadmore bg-white z-3 position-sticky w-100 py-5'>
                { ((hasNextPage && !noResult) || (hasNextPage && dataResults)) && <button  onClick={() => fetchNextPage()} className=' text-center m-auto d-block z-3'
                style={{backgroundColor:`${getRandomColor()}`}} id="load-more">Load more</button>}
            </div>
            <div>
            </div>
        
        <Helmet>
          <meta charSet="utf-8" name='description' content="FreshCart Products" />
          <title>FreshCart Search for {SearchKey}</title>
        </Helmet>
      </>
      }
</>
}
//  return (
//     <>
//       <Helmet>
//         <meta charSet="utf-8" name='description' content="FreshCart Products" />
//         <title>FreshCart Product</title>
//       </Helmet>
//       <div className="search-results-container">
//         <h1 className="search-results-header">Search Results for "{SearchKey}"</h1>
//         <div className="search-results-list">
//           {isLoading ? (
//             <Loading />
//           ) : (
//             <>
//               {data.pages ? (
//                 data.pages.map((page) =>
//                   page.data
//                     .filter((product) => product.title.toLowerCase().includes(SearchKey.toLowerCase()))
//                     .map((product) => (
//                       <SingleProduct key={product.id} changeCounter={setCounter} id={product.id} product={product} />
//                     ))
//                 )
//               ) : (
//                 data?.data
//                   .filter((product) => product.title.toLowerCase().includes(SearchKey.toLowerCase()))
//                   .map((product) => (
//                     <SingleProduct key={product.id} changeCounter={setCounter} id={product.id} product={product} />
//                   ))
//               )}
//             </>
//           )}
//         </div>
//         {/* Pagination or Infinite Scroll can be added here */}
//       </div>
//     </>
//   );
// }