import * as React from "react";
import {useEffect, useState} from "react";

import TitleBar from "./titleBar";
import StartSite from "./startSite";
import Logging from "./logging";
import Register from "./registerSite";
import AddRecipeSite from "./addRecipe";

import '../styles/App.css';

function App() {


    const [currentPage, setCurrentPage] = useState<string>('StartSite');

    const handlePageChange = (page: string) => {
        setCurrentPage(page);
    };




    return (
        <div>
            {currentPage === 'StartSite' ? (
                <StartSite onPageChange={handlePageChange} />
            ) : currentPage === 'Register' ? (
                <Register onPageChange={handlePageChange}  />
            ) : currentPage === 'LoginSite' ? (
                <Logging onPageChange={handlePageChange} />
            ): currentPage === 'addRecipeSite' ? (
                <AddRecipeSite onPageChange={handlePageChange}  />
            ): null
            }
        </div>
    );

}


export default App;

