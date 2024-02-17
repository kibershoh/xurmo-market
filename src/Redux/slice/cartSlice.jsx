// import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

// const initialState = {
//     cartItems: [],
//     totalAmout: 0,
//     totalQuantity: 0
// }


// const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//         addProduct: (state, action) => {
//             const newItem = action.payload;
//             const existingItem = state.cartItems.find(
//                 (item) => item.id === newItem.id
//             )
//             if (!existingItem) {
//                 state.cartItems.push({
//                     id: newItem.id,
//                     productName: newItem.productName,
//                     image: newItem.image,
//                     price: newItem.price,
//                     quantity: 1,
//                     totalPrice: newItem.price
//                 })
//                 state.totalQuantity++
//                 state.totalAmout += newItem.price
//                 toast.success('Product added successfully')

//             }
//             else {
//                 existingItem.quantity++
//                 existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price)

//                 state.totalAmout = state.cartItems.reduce((total, item) => total + Number(item.price) + Number(item.quantity))


//             }

//         },
//         deleteProduct: (state, action) => {
//             const id = action.payload
//             const existingItem = state.cartItems.find(item => item.id === id)

//             if (existingItem) {
//                 state.cartItems = state.cartItems.filter(item => item.id !== id)
//                 state.totalQuantity = state.totalQuantity - existingItem.quantity
//             }
//         },
//         Increment: (state, action) => {
//             const id = action.payload;
//             const existingItem = state.cartItems.find((item) => item.id === id);

//             if (existingItem) {
//                 existingItem.quantity += 1;
//                 existingItem.totalPrice = Number(existingItem.totalPrice) + Number(existingItem.price);
//                 state.totalQuantity += 1;
//                 state.totalAmout += Number(existingItem.price);
//                 toast.success('Product quantity increased successfully');
//             }
//         },

//     },
// })


// export const cartActions = cartSlice.actions;
// export default cartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: [],
    totalAmout: 0,
    totalQuantity: 0,
    shippingPrice:10,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.id === newItem.id
            );
            if (!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    name: newItem.name,
                    downloadURL: newItem.downloadURL,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    added: false,
                });
                state.totalQuantity++;
                state.totalAmout += Number(newItem.price);
                state.cartItems.map((item)=>{
                    item.added = !newItem.action
                    
                })

                toast.success("Product added successfully");
               
            } else {
                // existingItem.quantity++;
                existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price);
                state.totalAmout = state.cartItems.reduce(
                    (total, item) => total + Number(item.totalPrice),
                    0
                );
            }
        },
        deleteProduct: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);

            if (existingItem) {
                state.cartItems = state.cartItems.filter((item) => item.id !== id);
                state.totalQuantity -= existingItem.quantity;
                state.totalAmout = state.cartItems.reduce(
                    (total, item) => total + Number(item.totalPrice),
                    0
                );
            }
        },
        incrementQuantity: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);

            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice = Number(existingItem.totalPrice) + Number(existingItem.price);
                state.totalQuantity++;
                state.totalAmout =
                    state.totalAmout + Number(existingItem.price);

            }
        },
        decrementQuantity: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id)

            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity--;
                existingItem.totalPrice = Number(existingItem.totalPrice) - Number(existingItem.price);
                state.totalQuantity--;
                state.totalAmout = state.totalAmout - Number(existingItem.price)
            }
        }
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;


