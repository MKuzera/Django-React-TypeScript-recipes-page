import '../styles/titleBar.css'
import * as React from "react";
import {
    Button
} from "@mui/material"
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';

import '../styles/titleBar.css';


interface TitleBarProps {
    currentPage: string;
    onPageChange: (page: string) => void;

}

function logout(changePage: logoutProps['onPageChange']) {
    document.cookie = `access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    localStorage.setItem('isLoggedIn', 'false');
    changePage("StartSite");
    window.location.reload();
}

interface logoutProps{
    onPageChange: (page: string) => void;
}



const TitleBar: React.FC<TitleBarProps> = ({ currentPage, onPageChange }) => {


    const pageButtonMap: Record<string, React.ReactNode[]> = {
        StartSite: [

        ],
        LoginSite: [
            <Button color="success" key="back" className="button1" onClick={() => onPageChange('StartSite')}>
                <ArrowBackIcon></ArrowBackIcon>
                Back
            </Button>,
        ],
        Register: [
            <Button color="success" key="back" className="button1" onClick={() => onPageChange('StartSite')}>
                <ArrowBackIcon></ArrowBackIcon>
                Back
            </Button>,

        ],
        addRecipeSite: [
            <Button color="success" key="back" className="button1" onClick={() => onPageChange('StartSite')}>
                <ArrowBackIcon></ArrowBackIcon>
                Back
            </Button>,
        ],
    };


    if (localStorage.getItem('isLoggedIn') === 'true') {

        pageButtonMap.StartSite.push(
            <Button color="success" key="addRecipeSiteButton" className="button1" onClick={() => onPageChange('addRecipeSite')}>
                <AddIcon></AddIcon>
                Dodaj przepis
            </Button>
        );

        pageButtonMap.StartSite.push(
            <Button color="success" key="logoutButton" className="button1" onClick={() => logout(onPageChange)}>
                <LogoutIcon></LogoutIcon>
                Wyloguj
            </Button>
        );

    }
    else{

        pageButtonMap.StartSite.push(
            <Button color="success" key="logIn" className="button2" onClick={() => onPageChange('LoginSite')}>
                <LoginIcon></LoginIcon>
                Log in
            </Button>,
            <Button color="success" key="register" className="button2" onClick={() => onPageChange('Register')}>
                <AppRegistrationIcon></AppRegistrationIcon>
                Register
            </Button>
        );



    }

    const buttons = pageButtonMap[currentPage] || [];

    return (
        <div className="titleBar">
            <div className="centeredElement">{`Projekty na 5 ${currentPage}`}</div>
            <div className="rightElements">{buttons}</div>
        </div>
    );
};

export default TitleBar;

