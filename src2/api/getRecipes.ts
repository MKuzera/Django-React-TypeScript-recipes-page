import axios, { AxiosResponse } from 'axios';
import {useEffect, useState} from "react";

interface Kategoria {
    id: number;
    kategoria: string;
}
interface ServerData {
    id: number;
    title: string;
    description: string;
    image: string;
    kategoria: Kategoria[];

}
const fetchData = async (): Promise<any> => {
    try {
        const response: AxiosResponse = await axios.get('http://127.0.0.1:8000/przepisy/przepisy/');
        return response.data;

    } catch (error) {
        console.error('Return code ' , error);

    }

};


export const fetchRecipes = async (): Promise<{ id: number; title: string, description: string, image: string, image_url: string, kategoria: Kategoria[] }[]> => {
    try {
        const serverData = await fetchData();
     //   console.log(serverData);

        const transformedData = serverData.map((item : any) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            image: item.image,
            kategoria: item.kategoria,
            image_url: item.image_url

        }));
     //   console.log(transformedData);
        return transformedData;
    } catch (error) {
        console.error('Błąd podczas przekształcania danych:', error);
        throw error;
    }
};