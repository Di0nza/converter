import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
const animate = require('./utils/animation')

export const Context = createContext(null)
const root = ReactDOM.createRoot(document.getElementById('root'));
animate();
root.render(
    //<Context.Provider value={{data}}>
        <App/>
    //</Context.Provider>
);

