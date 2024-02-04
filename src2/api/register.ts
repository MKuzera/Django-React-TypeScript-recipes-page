const submitFormRegister = async (username: string, password: string, email: string) => {


    const data = {
        username,
        password,
        email
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    console.log(JSON.stringify(data));

    try {
        // const response = await axios.post(
        //     "http://127.0.0.1:8000/przepisy/register/",
        //     formData,
        //     {
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //     }
        // );
        // console.log(response.data);

         const response = await fetch('http://127.0.0.1:8000/przepisy/register/', {
             method: 'POST',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify({
                 username,
                 password,
                 email
             })
         });
         return response.status;

    } catch (error) {
        console.error("Upload failed:", error);
        return 400;

    }
};

export default submitFormRegister;
