import '../styles/content.css';
import {useEffect, useState} from 'react';
import * as React from "react";
import ListOfRecipies from '../lists/ListOfRecipies';
import {fetchRecipes} from "../api/getRecipes";

interface Kategoria{
    id: number;
    kategoria: string;
}

interface DataItem {
    id: number;
    title: string;
    description: string;
    image: string;
    image_url: string;
    kategoria: Kategoria[];
}
const Content = ({ category }: { category: string }) => {

    const [listOfRecipes, setListOfRecipes] = useState<DataItem[]>([]);

    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const result = await fetchRecipes();
                setListOfRecipes(result);

            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        };

        fetchDataFromApi();
    }, []); // Pusta zależność sprawia, że useEffect zostanie wykonany tylko raz po zamontowaniu komponentu




     if(category === '' || category === undefined){
         category = "Wszystko";

     }

    if(category === "Wszystko"){
        return (
            <nav className="content">
                <ListOfRecipies listOfRecipies={listOfRecipes} />
            </nav>
        );
    }
    else{

        return (
            <nav className="content">
                <ListOfRecipies listOfRecipies={listOfRecipes.filter(recipe =>
                    recipe.kategoria.some(kategoria => kategoria.kategoria === category)
                )} />
            </nav>
        );


    }




};

export default Content;
