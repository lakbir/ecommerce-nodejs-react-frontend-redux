import queryString from "query-string";
import { API_URL } from "../config"


export const getProducts = (params) => {
    let query = queryString.stringify(params)
    return fetch(`${API_URL}products?${query}`)
            .then(res => res.json())
            .then(res => res.products)
            .catch(err => console.log(err));
}

export const relatedProducts = (id) => {
    return fetch(`${API_URL}products/relatedProducts/${id}`)
            .then(res => res.json())
            .then(res => res.products)
            .catch(err => console.log(err));
}



export const getCategories = () => {

   return fetch(`${API_URL}categories`, {
        method: "GET",
        headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        }
    })
    .then(res => res.json())
    .then(res => res.categories)
    .catch(err => console.error(err))

 }


 export const getOneProduct = (id) => {

    return fetch(`${API_URL}products/${id}`, {
         method: "GET",
         headers: {
             "Accept" : "application/json",
             "Content-Type" : "application/json"
         }
     })
     .then(res => res.json())
     .then(res => res.product)
     .catch(err => console.error(err))
 
  }

 export const filterProducts = (skip, limit, filters) => {

    const data = {
        skip,
        limit,
        filters
    }

    return fetch(`${API_URL}products/search`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => res.products)
    .catch(err => console.error(err))
 }