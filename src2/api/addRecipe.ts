
import axios from "axios";

interface Kategoria {
    kategoria: string;
}

interface Tag {
    id: number;
    kategoria: string;
    selected: boolean;
}

const submitForm = async (
    title: string,
    description: string,
    tags: Tag[],
    image: File
) => {
    const selectedTags = tags.filter((tag) => tag.selected);
    const kategoria: Kategoria[] = selectedTags.map((tag) => ({
        kategoria: tag.kategoria,
    }));

    const data = {
        title,
        description,
        kategoria,
    };

    const formData = new FormData();
    if (image) {
        formData.append("image", image);
    }
    formData.append("data", JSON.stringify(data));
    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/przepisy/przepisy/",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            }
        );


        return response.status;
    } catch (error) {
        return 400;
    }
};

const handleSubmitWrapper = (
   // event: FormEvent,
    title: string,
    description: string,
    tags: Tag[],
    image: File
) => {
   // event.preventDefault();
    return submitForm(title, description, tags, image);
};

export default handleSubmitWrapper;
