import * as React from "react";

import '../styles/titleBar.css';
import '../styles/registerSite.css';

import TitleBar from "./titleBar";
import RegisterForm from "../forms/RegisterForm";

interface RegisterSiteProps {
    onPageChange: (page: string) => void;

}

const RegisterSite: React.FC<RegisterSiteProps> = ({ onPageChange }) => {



    return (
        <div className="register">
            <div className="top">
                <TitleBar currentPage="Register" onPageChange={onPageChange} />
            </div>
            <div className="RegisterContent">

                    <RegisterForm onPageChange={onPageChange}/>

            </div>

        </div>
    );
};

export default RegisterSite;
