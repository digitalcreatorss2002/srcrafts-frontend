"use client"
import ButtonPrimary from "@/components/ButtonPrimary";
import InfinityLoader from "@/components/InfinityLoader";
import { addToCartRequest } from "@/modules/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";


export default function AddToCartButton ({children,variantId='',productId, quantity=1})
{
    const dispatch = useDispatch();  
    const {status, itemId} = useSelector((state)=>(state.cart))
    const handleClick = ()=>{
        dispatch(addToCartRequest({variantId,productId,quantity}))
    }  

    return(
        <ButtonPrimary
        
        onClick={handleClick}
        >
          {
          (status == 'loading' && (variantId == itemId || productId == itemId))?(<div className="flex item h-5">
                <InfinityLoader/>
            </div>):
            (<div className="flex items-center">
                <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="14" height="14"
            viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" strokeWidth="2.5" 
            strokeLinecap="round" strokeLinejoin="round" 
          >
            <path d="M5 12h14m-7-7v14"/>
          </svg> {children}
            </div>)
          }
        </ButtonPrimary>
    )
    
}