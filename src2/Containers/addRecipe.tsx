import * as React from "react";


import '../styles/titleBar.css';
import '../styles/addRecipeSite.css';

import TitleBar from "./titleBar";
import AddRecipeForm from "../forms/addRecipeForm";

interface AddRecipeSiteProps {
    onPageChange: (page: string) => void;

}

const AddRecipeSite: React.FC<AddRecipeSiteProps> = ({ onPageChange }) => {


    return (
        <div className="addRecipeSite">
            <div className="top">
                <TitleBar currentPage="addRecipeSite" onPageChange={onPageChange}   />
            </div>

            <div className="AddRecipeSiteContent">
                <div className="AddRecipeSiteContentBox">


                    <AddRecipeForm />



                </div>
            </div>
        </div>
    );
};

export default AddRecipeSite;
