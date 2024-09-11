import React from 'react'
import { useCart,useCartDispatch } from './ContextRed';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
function Card(props) {
  const options=props.food.options[0];
  const opts=Object.keys(options);
  const [Qty,setQty]=useState(1);
  const [size,setSize]=useState();
  const [price,setPrice]=useState(0);
  const dispatch = useCartDispatch();
  const SizeRef=useRef();
  const qtyRef=useRef();
  const cart=useCart();
  const handleCart=async ()=>
  {
    dispatch({type:'ADD_ITEM',payload:{_id:props.food._id,name:props.food.name,qty:Qty,size:size,price:finalPrice}});
    alert("Item added to cart");
  }
  let finalPrice=Qty*parseInt(options[size]);
  useEffect(()=>{
    setSize(SizeRef.current.value);
    setPrice(Qty*parseInt(options[size]));
  },[price,Qty,size,options]);
  return (
    <div>
        <div className="card" style={{"width": "17rem"}}>
  <img className="card-img-top" style={{"height":"230px","objectFit":"cover"}} src={props.food.img} alt="Card"/>
  <div className="card-body bg-dark text-white">
    <h5 className="card-title">{props.food.name}</h5>
    <p className="card-text">{props.food.description}</p>
    <div className='.contaner row d-flex'>
       <div className='w-50'>
       <select ref={qtyRef} onChange={e=>setQty(e.target.value)}>
           {
             Array.from(Array(6), (e,i)=>{
                 return <option key={i}>{i+1}</option>

             })
           }
        </select>
       </div>
       <div className='w-50'>
        <select ref={SizeRef} onChange={e=>setSize(e.target.value)}>
        {
          opts.map((e,i)=>{
              return <option key={i} name={e} value={e}>{e}</option>
          })
        }
        </select>
       </div>
       <div className='fs-5'>
        Total Price : {price} Rs
       </div>
       <div className='btn btn-outline-success' onClick={handleCart}>Add To Cart</div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Card