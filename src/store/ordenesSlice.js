import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks
export const fetchOrdenes = createAsyncThunk('ordenes/fetchOrdenes', async () => {
  const response = await axios.get('/api/ordenes'); // Usa la ruta relativa
  return response.data;
});

export const addOrden = createAsyncThunk('ordenes/addOrden', async (orden) => {
  const response = await axios.post('/api/ordenes', orden);
  return response.data;
});

export const updateOrden = createAsyncThunk('ordenes/updateOrden', async ({ id, ...orden }) => {
  const response = await axios.put(`/api/ordenes/${id}`, orden);
  return response.data;
});

export const deleteOrden = createAsyncThunk('ordenes/deleteOrden', async (id) => {
  await axios.delete(`/api/ordenes/${id}`);
  return id;
});

// Slice
const ordenesSlice = createSlice({
  name: 'ordenes',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrdenes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrdenes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchOrdenes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addOrden.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateOrden.fulfilled, (state, action) => {
        const index = state.items.findIndex(orden => orden._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteOrden.fulfilled, (state, action) => {
        state.items = state.items.filter(orden => orden._id !== action.payload);
      });
  },
});

export default ordenesSlice.reducer;