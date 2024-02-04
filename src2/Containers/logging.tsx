import * as React from "react";

import "../styles/logging.css";
import '../styles/titleBar.css'

import TitleBar from "./titleBar";
import {useState} from "react";
import LoggingForm from "../forms/LoggingForm";

interface LoggingProps {
    onPageChange: (page: string) => void;

}



const Logging: React.FC<LoggingProps> = ({ onPageChange  }) => {


    return (

        <div className="logging">
            <div className="top">
                <TitleBar currentPage="LoginSite" onPageChange={onPageChange} />
            </div>

            <div className="LoginContent">
                  <LoggingForm onPageChange={onPageChange}></LoggingForm>

            </div>

            </div>

    );
};

export default Logging;
