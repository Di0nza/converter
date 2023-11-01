import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainScreen from "./pages/MainScreen/MainScreen"



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<MainScreen/>}/>
                <Route path={'/conversionTable'} element={<MainScreen/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
