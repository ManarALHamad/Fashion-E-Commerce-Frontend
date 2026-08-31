const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/orders`


const create = async (orderFormData) => {
  
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderFormData),
        })
         const data = await res.json()

    if (!res.ok) {
    throw new Error(JSON.stringify(data))
  }

  return data
    } 

//customers viewing their orders 

const indexMine = async () => {

    
        const res = await fetch (`${BASE_URL}/mine`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },

        })  
        if (!res.ok) {
    throw new Error("Failed to get orders")
     }
        return res.json()
 
}

//admin views all orders 

const indexAll = async () => {
  try {
    const res = await fetch(`${BASE_URL}/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

    const data = await res.json()

    console.log("INDEX ALL RESPONSE:", data)

    if (!res.ok) {
      throw new Error(JSON.stringify(data))
    }

    return data
  } catch (error) {
    console.log("INDEX ALL ERROR:", error)
    throw error
  }
}

const deleteOrder = async (orderId) => {
  const res = await fetch(`${BASE_URL}/${orderId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(JSON.stringify(data))
  }

  return data
}

const updateStatus = async (orderId, orderStatus) => {
  try {
const res = await fetch(`${BASE_URL}/${orderId}`, {
  method: 'PUT',
  headers: {
  Authorization: `Bearer ${localStorage.getItem('token')}`,'Content-Type': 'application/json',
},
  body: JSON.stringify({ order_status: orderStatus }),
})

const data = await res.json()

if (!res.ok) {
throw new Error(JSON.stringify(data))
}

return data
} catch (error) {
  console.log(error)
throw error
}
}


export {
  create,
  indexMine,
  indexAll,
  deleteOrder,
  updateStatus,
}