import React, { useContext, useEffect, useState } from 'react'
import style from './BestSellersSlick.module.css'
import arrow from '../../Assets/images/arrow.png'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CounterContext } from '../CounterContext/CounterContext';


export default function BestSellersSlick({data}) {

  const [BestSellers, setBestSellers] = useState([])
  const [addLoading, setaddLoading] = useState(false)
  let {counter , setcounter} = useContext(CounterContext)
  const navigate = useNavigate()

      const nxtBtnOnClck = ()=>{

        const productContainers =[...document.querySelectorAll(`.${style.productContainer}`) ];

        productContainers.forEach((items, i ) => {
          let containerDimenstions = items.getBoundingClientRect();
          let containerWidth = containerDimenstions.width

          items.scrollLeft += containerWidth
        });
      }
      const preBtnOnClck = ()=>{

        const productContainers =[...document.querySelectorAll(`.${style.productContainer}`) ];

        productContainers.forEach((items, i ) => {
          let containerDimenstions = items.getBoundingClientRect();
          let containerWidth = containerDimenstions.width

          items.scrollLeft -= containerWidth
        });
      }
 
      function getBestSelling(data){
        let box = []
        for (let index = 0; index < 10; index++) {
          for (let index2 = 0; index2 < data?.length; index2++) {
            if(data[index].sold >  data[ index2 ].sold){
              !box.includes(data[index]) && box.push(data[index])  ;
            }else{
              !box.includes(data[index2]) && box.push(data[index2])  ;
            }
          }
        }
        setBestSellers(box)
      } 

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

   
    useEffect(() => {
      getBestSelling(data)
    }, [data])

  return (
    <section className={style.product}>
      <h2 className={`${style.productCategory}`}>best offers</h2>
      <button onClick={()=> preBtnOnClck()} class={style.preBtn}><img src={arrow} alt="" /></button>
      <button onClick={()=> nxtBtnOnClck()} class={style.nxtBtn}><img src={arrow} alt="" /></button>
      <div className={`${style.productContainer} pb-4`}>
        {/* <div class={style.productCard}>
          <div class={style.productImage}>
            <span class={style.discountTag}>40% off</span>
            <img src="img/card7.png" class={style.productThumb} alt="" />
            <button class={style.cardBtn}>add to whislist</button>
          </div>
          <div class={style.productInfo}>
            <h2 class={style.productBrand}>sutra</h2>
            <p class={style.productShortDes}>a black shirt..</p>
            <span class={style.price}>480le</span
            ><span class={style.actualPrice}>800le</span>
          </div>
        </div> */}
        {BestSellers?.map(product => 
          <div class={style.productCard} role='button' onClick={ (e)=> navigate(`/ProductDetails/${product.id}`) } key={product._id} >
              <div class={style.productImage}>
                  {product?.priceAfterDiscount ?<span class={style.discountTag}> {Math.round(((product.priceAfterDiscount / product.price) * 100) -  100 )}% off</span>  : null}
                    <img
                      src={product?.imageCover}
                      alt={`${product?.title.split(' ').slice(0, 6).join(' ')}`} 
                      className={style.productThumb}
                    />
                  {localStorage.getItem('ecommToken') &&
                    <button onClick={(e)=>{e.stopPropagation(); addToCart(product._id)}} class={style.cardBtn} disabled={addLoading}>
                      {addLoading?
                          <div><i className='fas fa-spin fa-spinner fa-1x text-success'></i></div>
                          :
                          <span className=''>Add To Cart</span>
                      }
                    </button>
                  }
              </div>
            <div class={style.productInfo}>
              <h2 class={style.productBrand}>{product?.brand.name}</h2>
              <p class={style.productShortDes}>{product?.title.split(' ').slice(0, 6).join(' ')} ..</p>
              { product?.priceAfterDiscount ? <span class={style.price}>{product?.priceAfterDiscount}EGP</span> : null}
              { product?.priceAfterDiscount ? <span class={style.actualPrice}>{product.price}EGP</span> : null}
              { !product?.priceAfterDiscount ? <span class={style.price}>{product.price}EGP</span> : null}
            </div>
          </div>
          // <SingleProduct key={product.id}  id={product.id} product={product}/>
        )}
      </div>
    </section>
  )
}
