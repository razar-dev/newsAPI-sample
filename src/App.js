import React from "react";
import {v4 as uuidv4} from "uuid";
import NavBar from "./components/NavBar/NavBar";
import News from "./components/News/News";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import {router} from "./config/config";

function App() {
    const pageSize = 7;
    document.body.style.backgroundColor = "rgb(36, 39, 41)";
    return (
        <>
            <Router>
                <NavBar/>
                <Routes>
                    {
                        router.map(path =>
                            <Route
                                exact
                                key={uuidv4()}
                                path={path.path}
                                element={
                                    <News
                                        key={path.key}
                                        category={path.category}
                                        pageSize={pageSize}
                                        country={path.country}
                                    />
                                }
                            />
                        )
                    }
                </Routes>
            </Router>
        </>
    );
}

export default App;
