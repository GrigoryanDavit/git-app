import React from 'react';
import {Routes, Route} from "react-router-dom";
import './App.css';
import RepoSection from "./Components/RepoSection/RepoSection";
import UserSection from "./Components/UserSection/UserSection";
import RepoIssues from "./Components/RepoIssues/RepoIssues";


function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={

                    <>
                        <UserSection/>
                        <RepoSection/>
                    </>
                }/>
                <Route path={':owner/:name/issues'}  element={<RepoIssues/>}/>
            </Routes>
        </div>
    );
}

export default App;
