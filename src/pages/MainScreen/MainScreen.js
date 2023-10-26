import React from 'react';
import './MainScreen.css'
import {observer} from "mobx-react-lite";
import ThreeScene from "../../components/ThreeScene";

const MainScreen = observer(() => {
    return (
        <div>
            <ThreeScene /> {/* Вставьте ThreeScene компонент здесь */}
        </div>
    );
});

export default MainScreen;