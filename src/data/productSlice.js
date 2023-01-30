import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import productList from '../data/productList.json'

export const fetchAllProducts = createAsyncThunk('fetch-all-products', async apiUrl => {
    const response = await fetch(apiUrl)
    return response.json()
})

const productSlice = createSlice({
    name: 'products',
    initialState: {
        data: [],
        fetchStatus: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.data = action.payload
                state.fetchStatus = 'Success'
            })
            .addCase(fetchAllProducts.pending, (state) => {
                state.fetchStatus = 'Loading'
            })
            .addCase(fetchAllProducts.rejected, (state) => {
                state.data = productList.products
                state.fetchStatus = 'Error'
            })
    }
})

export default productSlice