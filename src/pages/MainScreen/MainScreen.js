import React from 'react';
import {observer} from "mobx-react-lite";
import ThreeBackground from "../../components/ThreeBackground";
import './MainScreen.css'
const MainScreen = observer(() => {
    return (
        <div className='container'>
            {/*<div className='rectangle'></div>*/}
            <ThreeBackground/>
        </div>
    );
});
export default MainScreen;