import * as React from "react";
import {useState} from "react";
import submitFormRegister from "../api/register";
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
    repeatPassword:string;
    email:string;
}


const RegisterForm: React.FC<LoggingProps> = ({ onPageChange }) => {
    const [error,setError] = useState<string>("");
    const [form, setForm] = useState<loggingFormValues>({login : '', password: '',repeatPassword: '', email: ''});
    const handleChange = (fieldName: string , value: any) =>{
        setForm(prevState => ({
            ...prevState,
            [fieldName]:value
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // prevent refresh

       // const response =await register(form.login, form.password,form.repeatPassword,form.email, setError);
        if(form.password !== form.repeatPassword){
            setError("Password aren't the same")
        }
        else{
           const response = await submitFormRegister(form.login, form.password,form.email);
             console.log(response);
             if(response === 201){
                 onPageChange("LoginSite");
             }
             else{
                 setError("Wystąpił bląd");
             }
        }

       // onPageChange('StartSite');
    }

    return (

        <form onSubmit={handleSubmit}>
            <div className="LoginContentBox">
                <div>
                    <div>Login</div>
                    <input type="text" name="login" required value={form.login} onChange={(e) => handleChange("login",e.currentTarget.value)}></input>
                </div>

                <div>
                    <div>Email</div>
                    <input type="text" name="email" required value={form.email} onChange={(e) => handleChange("email",e.currentTarget.value)}></input>
                </div>

                <div>
                    <div>Password</div>
                    <input type="password" name="password" required value={form.password} onChange={(e) => handleChange("password",e.currentTarget.value)}></input>
                </div>

                <div>
                    <div>Reapet Password</div>
                    <input type="password" name="repeatPassword" required value={form.repeatPassword} onChange={(e) => handleChange("repeatPassword",e.currentTarget.value)}></input>
                </div>
                <div>
                    {error}
                </div>

                <Button color="success" type="submit"><DoneIcon/>Register</Button>
            </div>
        </form>
    );
};

export default RegisterForm;
