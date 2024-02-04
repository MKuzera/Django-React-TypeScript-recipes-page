import * as React from "react";
import {useState} from "react";
import submitForm from "../api/login";
import {
    Button
} from "@mui/material"
import DoneIcon from '@mui/icons-material/Done';
interface LoggingProps {
    onPageChange: (page: string) => void;
}

interface loggingFormValues{
    login:string;
    password:string;
}


const LoggingForm: React.FC<LoggingProps> = ({ onPageChange }) => {
    const [error,setError] = useState<string>("");
    const [form, setForm] = useState<loggingFormValues>({login : '', password: ''});
    const handleChange = (fieldName: string , value: any) =>{
        setForm(prevState => ({
            ...prevState,
            [fieldName]:value
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // prevent refresh

            const response = await submitForm(form.login, form.password);
            console.log(response);
            if(response == 200) {
                localStorage.setItem('isLoggedIn', 'true');
                onPageChange("StartSite");
                window.location.reload();
            }
               //
            else{
                setError("Wystąpił bląd");
            }

    }

    return (

        <form onSubmit={handleSubmit}>
            <div className="LoginContentBox">
                <div>
                    <div>Login</div>
                    <input type="text" name="login" required value={form.login} onChange={(e) => handleChange("login",e.currentTarget.value)}></input>
                </div>

                <div>
                    <div>Password</div>
                    <input type="password" name="password" required value={form.password} onChange={(e) => handleChange("password",e.currentTarget.value)}></input>
                </div>


                <div>
                    {error}
                </div>

                <Button color = "success" type="submit"><DoneIcon/>Log in</Button>
            </div>
        </form>
    );
};

export default LoggingForm;
