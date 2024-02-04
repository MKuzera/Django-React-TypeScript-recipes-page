import '../styles/titleBar.css';
import '../styles/fileUpload.css';
import * as React from "react";
import { fetchKategorie } from "../api/getCategories";
import handleSubmitWrapper from "../api/addRecipe";
import { ChangeEvent, useEffect, useState } from "react";
import {
    Button
} from "@mui/material"
import DoneIcon from '@mui/icons-material/Done';
interface Tag {
    id: number;
    kategoria: string;
    selected: boolean;
}

interface AddRecipeFormValues{
    title: string;
    description: string;
    tags : Tag[];
    image?: File | null;
}


const AddRecipeForm = () => {

    const [form , setForm] = useState<AddRecipeFormValues>({title: '',description : '', image: null , tags: []});
    const [error,setError] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // mapa tagow
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchKategorie();
                const tagsWithSelection = data.map((tag) => ({ ...tag, selected: false }));
                handleChange('tags',tagsWithSelection);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        };

        fetchData();
    }, []);


    const handleChange = (fieldName: string , value: any) =>{
        setForm(prevState => ({
            ...prevState,
            [fieldName]:value
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        const isNoTagSelected = form.tags.every(tag => !tag.selected);

        if (form.title === "" || form.title === null) {
            setError("Title cannot be empty");
        } else if (form.description === "" || form.description === null) {
            setError("Description cannot be empty");
        } else if (form.image === null) {
            setError("Image cannot be empty");
        } else if (isNoTagSelected) {
            setError("Tags cannot be empty");
        } else {


            if (form.image) {

                let response: number = await handleSubmitWrapper(form.title, form.description, form.tags, form.image);
                if (response === 200) {
                    setError('Dodano przepis: ' + form.title);
                } else if (response === 401) {
                    setError("Unathorized!");
                }
                else{
                    setError("Wystapil blad!");
                }
                clean();
            } else {
                setError("Something gone wrong");
            }
        }

    }

    const clean = async () => {
        setForm({
            title: '',
            description: '',
            image: null,
            tags: []
        });

        const data = await fetchKategorie();
        const tagsWithSelection = data.map((tag) => ({...tag, selected: false}));
        handleChange('tags', tagsWithSelection);
        setImagePreview(null);

    }
    const handleTagClick = (tagId: number) => {

        const updatedTags = form.tags.map((tag) =>
            tag.id === tagId ? { ...tag, selected: !tag.selected } : tag
        );
        handleChange('tags',updatedTags);

    };


    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        handleChange('image',file);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
        else {
            // No file selected, clear the image preview
            setImagePreview(null);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className="inputLabel">
                Tytuł
                <input type="text" name="title" required value={form.title} onChange={(e) => handleChange('title',e.target.value)} />
            </div>
            <div className="inputLabel">
                Opis
                <textarea required value={form.description} onChange={(e) => handleChange('description',e.target.value)} />
            </div>
            <div className="inputLabel">
                Obraz
                {/* Czy tutaj nie powinno byc required value? */}
                <input type="file" onChange={handleFileChange} />
                {imagePreview && <img src={imagePreview} alt="Podgląd obrazu" style={{ maxWidth: '100%' }} />}
            </div>

            <div className="inputLabel">
                Kategorie
            </div>
            <div>
                {form.tags.map((tag) => (
                    <div
                        key={tag.id}
                        className={`tag ${tag.selected ? 'selected' : ''}`}
                        onClick={() => handleTagClick(tag.id)}
                    >
                        {tag.kategoria}
                    </div>
                ))}
            </div>

            <div >
                {error}
            </div>

            <Button color = "success" type="submit"><DoneIcon/>Dodaj przepis</Button>
        </form>
    );
};

export default AddRecipeForm;
