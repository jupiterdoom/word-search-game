import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Application from './components/Application/Application';
import reportWebVitals from './reportWebVitals';

// Import F7 Bundle
import Framework7 from 'framework7/lite/bundle';

// Import F7-React Plugin
import Framework7React from 'framework7-react';

// Import F7 Styles
import 'framework7/css/bundle';

import 'framework7-icons';

// Init F7-React Plugin
Framework7.use(Framework7React);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// ReactDOM.render(
//   React.createElement(App),
//   document.getElementById('app')
// )

root.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
