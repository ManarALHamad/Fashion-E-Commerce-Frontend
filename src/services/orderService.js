// const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/orders`



// const create = async (orderFormData) => {
//     try {
//         const res = await fetch(BASE_URL, {
//             method: 'POST',
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(orderFormData),
//         })
//         return res.json()
//     } catch (error) {
//         console.log(error)
//     }
// }

// //customers viewing their orders 

// const indexMine = async () => {

//     try {
//         const res = await fetch (`${BASE_URL}/mine`, {
//             headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}

//         })
//         return res.json()

//     } catch (error) {
//         console.log(error)
//     }
// }

// //admin views all orders 

// const indexAll = async () => {
//     try {
//         const res = await fetch(`${BASE_URL}/all`, {
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         })
//         return res.json()
//     } catch (error) {
//         console.log(error)
//     }
// }
// export {
//   create,
//   indexMine,
//   indexAll,
// }