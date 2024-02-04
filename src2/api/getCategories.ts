import axios, { AxiosResponse } from 'axios';
import {useEffect, useState} from "react";
interface ServerData {
    id: number;
    kategoria: string;
}
const fetchData = async (): Promise<any> => {
    try {
        const response: AxiosResponse = await axios.get('http://127.0.0.1:8000/przepisy/kategorie/');
        return response.data;

    } catch (error) {
        console.error('Error codexD' , error);

    }

};


export const fetchKategorie = async (): Promise<{ id: number; kategoria: string }[]> => {
    try {
        const serverData = await fetchData();
        console.log(serverData);

        const transformedData = serverData.map((item : any) => ({ id: item.id, kategoria: item.kategoria }));
        console.log(transformedData);
        return transformedData;
    } catch (error) {
        console.error('Błąd podczas przekształcania danych:', error);
        throw error;
    }
};