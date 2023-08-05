import axios from "axios";
import {createSlice , createAsyncThunk } from "@reduxjs/toolkit"



const initialState = {
    products : [],
    selectedProduct :[],
    sepetProducts : [],
}




export const fetchProducts = createAsyncThunk("fetchProducts", async (params) => {  

    const response = await axios("https://fakestoreapi.com/products")
     console.log(response);
     return response?.data
 })

 const productsSlice = createSlice({


    name : "products",
    initialState,
    reducers:{
        setSelectedProduct(state,actions) {
            state.selectedApplication = actions?.payload
        },
        addToSepet(state,actions) {
            state.sepetProducts.push(actions?.payload)
        },
        removeToSepet(state,actions) {
            state.sepetProducts = state.sepetProducts.filter(
                (product) => product.id !== actions.payload
            )
         }
    },

    extraReducers:(builder) => {

        builder.addCase(fetchProducts.pending, (state, actions) => {
            state.loading = true
        })

        builder.addCase(fetchProducts.fulfilled, (state, actions)=>{ 

            state.products = actions?.payload
            state.loading=false

        })


        builder.addCase(fetchProducts.rejected, (state,actions) => {

            console.log("rejected products", (actions))

            state.loading = false;
            state.error = JSON.stringify(actions.error);

        })

    }
 })


export const {fetchAcceptedproducts, setSelectedProduct,addToSepet,removeToSepet} = productsSlice.actions

export default productsSlice.reducer
