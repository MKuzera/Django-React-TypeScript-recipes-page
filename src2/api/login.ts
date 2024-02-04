
import axios from "axios";
import {RedirectFunction} from "react-router-dom";
import {useEffect, useState} from "react";
import jwt, {JwtPayload} from "jsonwebtoken";
import Cookies from "js-cookie"
const submitForm = async (username: string, password: string) => {


    const data = {
        username,
        password
    };
    console.log(data);
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    console.log(JSON.stringify(data));
    try {

        const response = await fetch('http://127.0.0.1:8000/przepisy/login/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                username,
                password,
            })
        });

      // State to hold the fetched data

        // document.cookie = `access_token=${access}; path=/`;
        // document.cookie = `refresh_token=${refresh}; path=/`;

        return response.status;

    } catch (error) {
        console.error("Upload failed:", error);
        return 400;
    }
};


export default submitForm;
