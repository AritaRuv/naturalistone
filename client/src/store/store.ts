import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    // Define tus reducers aquí
  },
});

export default store;

//EJEMPLO DE REDUCER//

// import { createSlice, configureStore } from '@reduxjs/toolkit';

// // Define el estado inicial
// const initialState = {
//   counter: 0,
// };

// // Crea un slice utilizando createSlice
// const counterSlice = createSlice({
//   name: 'counter',
//   initialState,
//   reducers: {
//     increment(state) {
//       state.counter += 1;
//     },
//     decrement(state) {
//       state.counter -= 1;
//     },
//     reset(state) {
//       state.counter = 0;
//     },
//   },
// });

// // Exporta las acciones generadas automáticamente
// export const { increment, decrement, reset } = counterSlice.actions;

// // Crea el reducer utilizando el reducer generado automáticamente por createSlice
// const counterReducer = counterSlice.reducer;

// // Configura la tienda con el reducer
// const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

// export default store;