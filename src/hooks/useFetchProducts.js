import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    setProducts,
    setLoading,
    setError,
    selectAllProducts,
    selectProductsLoading,
    selectProductsError,
} from '../redux/productsSlice'


/**
 * Custom Hook: useFetchProducts
 * 
 * Fetches the product list from the DummyJSON API on component mount using useEffect.
 * Stores the result directly in redux state via dispatch .
 * Returns products, loading, and error from Redux select   ors. 
 * 
 */

function useFetchProducts (url = `${import.meta.env.VITE_API_URL}/products`){
    const dispatch  = useDispatch()
    const products = useSelector(selectAllProducts)
    const loading = useSelector(selectProductsLoading)
    const error = useSelector(selectProductsError)

    useEffect(()=>{
        // Skip fetch if products are already in the redux store 
        if(products.length > 0) return
        const controller  = new AbortController()

        async function fetchProducts(){
            dispatch(setLoading(true))
            dispatch(setError(null))
            try{
                const res = await fetch(url, {signal: controller.signal})
                if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
                    const data = await res.json()
                dispatch(setProducts(data.data || []))
            } catch (err){
                // Ignore AbortError - expected on component unmount 
                if(err.name  !== 'AbortError'){
                    dispatch(setError('Failed to load products. Please check your connection and try again.'))
                }
            }
        }

        fetchProducts()
        // Cleanup: abort in-flight request if component unmounts 

        return() => controller.abort()
    }, [url, dispatch,products.length])

    return {products, loading, error}

}

export default useFetchProducts