// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';



// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
   
//       <App />
    
//   </React.StrictMode>,
// );

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import {Provider} from "react-redux";

const root = ReactDOM.createRoot (document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);



