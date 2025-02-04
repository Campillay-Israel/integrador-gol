import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot desde react-dom/client
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';

// Selecciona el contenedor raíz de tu aplicación
const container = document.getElementById('root');

// Crea una raíz con createRoot
const root = createRoot(container);

// Renderiza la aplicación
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);