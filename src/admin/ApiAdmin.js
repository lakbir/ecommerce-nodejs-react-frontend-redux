import { API_URL } from "../config";

export const listOfOrders = (userId, token) => {
    return fetch(`${API_URL}orders/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    }).then(res => res.json());
}

export const getStatus = (userId, token) => {
    return fetch(`${API_URL}orders/status/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    }).then(res => res.json());
}


export const updateOrderStatus = (userId, token, orderId, status) => {
    console.log('Order à modifier : ' + orderId)
    return fetch(`${API_URL}orders/${orderId}/status/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify({status})
    }).then(res => res.json());
}