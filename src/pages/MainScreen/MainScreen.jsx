import React from 'react';
import './MainScreen.css'

import Converter from "../../components/Converter";
import ConverterTable from "../../components/ConverterTable";
import {Link, useLocation} from "react-router-dom";
import ThreeBackground from "../../components/ThreeBackground";


const MainScreen = () => {
    const location = useLocation()
    return (
        <div className='container'>
            <div className="rectangle">
                <div  className='navigation-container'>
                    <Link
                        style={{backgroundColor: location.pathname === '/' ? 'rgba(23, 23, 23, 0.80)' : 'rgba(51, 51, 51, 0.60)'}}
                        className='navigation-btn'
                        to={'/'}
                    >
                        Converter
                    </Link>
                    <Link
                        style={{backgroundColor: location.pathname === '/conversionTable' ? 'rgba(23, 23, 23, 0.80)' : 'rgba(51, 51, 51, 0.60)'}}
                        className='navigation-btn'
                        to={'/conversionTable'}
                    >
                        Currencies
                    </Link>
                </div>
                {location.pathname === '/' ? (
                    <Converter />
                ) : (
                    <ConverterTable/>
                )}
            </div>
            {/*Сцена*/}

            <ThreeBackground/>
            {/*Сцена*/}
        </div>
    );
};
export default MainScreen;
