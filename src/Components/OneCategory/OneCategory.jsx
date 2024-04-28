import React, { useContext, useEffect, useState } from 'react'
import './OneCategory.module.css'
import { Helmet } from 'react-helmet'
import { useInfiniteQuery, useQuery } from 'react-query'
import axios from 'axios'
import Loading from '../Loading/Loading'
import SingleProduct from '../SingleProduct/SingleProduct'
import { ProfileContext } from '../../Contexts/ProfileContextProvider'
import { useParams } from 'react-router-dom'
import underConstruction from '../../Assets/images/OneCateg/mathieu-stern-tv7GF92ZWvs-unsplash.jpg'

export default function OneCategory() {

  const {setCounter} = useContext(ProfileContext);
  const {id} = useParams() // Access the id parameter
  const [noResult, setnoResult] = useState(false);
  const [categData, setCategData] = useState(null); //Category MetData
  const [ShowNextPageBtn, setShowNextPageBtn] = useState(null);


  // Get all products
  async function getProducts({ pageParam }) {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageParam}`)
    return data
  }

  //Get Category meta data
  async function getCategData() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
      // console.log(data.data.name, 'sign');
      setCategData(data); // Update state with category data
      setnoResult(false)
      return data;
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getCategData(); 
  }, [id]); 
  

  // useQuery and get data and so on
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

//Random colors on Load More button
  const getRandomColor = () => { // change load more button's color
    const h = Math.floor(Math.random() * 360);
    return `hsl(${h}deg, 90%, 85%)`;
  };
  
  useEffect(() => { //If search results lower than 6 items display from the next page
    const searchResults = data?.pages?.flatMap((page) => page.data)
    .filter((product) => `${product.category._id}` === `${id}`);

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
    
     if(searchResults?.length >= 6){
        if(data?.pages[0]?.metadata?.currentPage < data?.pages[0]?.metadata?.numberOfPages){
           const nextData =
            data?.pages[data?.pages[0]?.metadata?.currentPage + 1]?.data?.filter((product) => `${product.category._id}` === `${id}`);
            if(nextData?.length){
              setShowNextPageBtn(true)
            }else{
              setShowNextPageBtn(false)
            }
            fetchNextPage()
        }
    }

  }, [data, id, fetchNextPage]);

  useEffect(()=>{
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}, [])

  return <>
  {/* {console.log(data)} */}
      {isLoading?
      <Loading/>
      :
      <>
        {/* <p className='ms-3 mt-5'>Results for {id}</p> */}
        {!noResult &&
        <div className='w-100 bg-white-subtle'>

        <div className='m-auto w-50 pt-5'>
          <img className='m-auto w-25' src={categData?.data?.image} alt={ `${categData?.data?.image}'s catgory`} />
          <h2 className='text-center pt-3 pb-3'>{categData?.data?.name}</h2>
          
          </div>
          {!noResult && <h1 className="search-results-header ps-3 mt-0 bg-main text-white py-2">{categData?.data?.name}</h1>}
        </div>
          
          }
        {/* {!noResult && <h1 className="search-results-header ps-3 mt-0 bg-main text-white py-2">{categData?.data?.name}</h1>} */}

        {/* <div className='mx-2'> <hr /> </div> */}
            <main  className='products-row row g-0 mt-0 position-relative z-3 px-3'>
                {!data.pages ? (
                    data?.data
                      .filter((product) =>  product.category._id === `${id}`)
                      .map((product) => (
                        <SingleProduct key={product.id} changeCounter={setCounter} id={product.id} product={product} />
                      ))
                  )
                :
                (
                  <>
                    {data?.pages.map((page) =>
                      page.data
                        .filter((product) =>  product.category._id === `${id}` )
                        .map((product) => (
                          <SingleProduct key={product.id} changeCounter={setCounter} id={product.id} product={product} />
                        ))
                    )}
                  </>
                )}
            </main>
            <div className='loadmore bg-white z-3 position-sticky w-100 py-5'>
            {/* {console.log(fetchNextPage())} */}
                { (hasNextPage && !noResult && ShowNextPageBtn) &&  <button  onClick={() => fetchNextPage()} className=' text-center m-auto d-block z-3'
                style={{backgroundColor:`${getRandomColor()}`}} id="load-more">Load more</button>}
            </div>
            <div>
            </div>
        {noResult &&
          <>
            <img className='m-auto w-25 mb-2' src={underConstruction} alt="Search no result" />
            <h1 className='text-center'>Sorry!</h1>
            <h1 className='text-center'> "{categData?.data?.name}" Category is under construction</h1>
          </>
        }
        <Helmet>
          <meta charSet="utf-8" name='description' content="FreshCart Products" />
          <title>FreshCart {data?.pages[0].data[0].category.slug}</title>
        </Helmet>
      </>
      }
</>
    }