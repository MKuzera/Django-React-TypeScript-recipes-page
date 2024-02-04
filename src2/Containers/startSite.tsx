import * as React from "react";
import TitleBar from "./titleBar";
import SideBar from "./sideBar";
import Content from "./Content";
import Footer from "./footer";

import "../styles/startSite.css";
import {useState} from "react";

interface StartSiteProps {
    onPageChange: (page: string) => void;

}

const StartSite: React.FC<StartSiteProps> = ({ onPageChange }) => {

    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryClick = (description : string) => {


        setSelectedCategory(description);

    };


    return (
        <div className="StartSite">
            <div className="top">
                <TitleBar currentPage={'StartSite'} onPageChange={onPageChange}  />
            </div>
            <div className="main">
                <SideBar handleCategoryClick={handleCategoryClick}/>
                <Content category={selectedCategory}/>
            </div>
            <div className="down">
                <Footer/>
            </div>

        </div>
    );


}


export default StartSite;

