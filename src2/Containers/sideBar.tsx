import '../styles/sideBar.css'
import {useEffect, useState} from "react";
import ListOfCategories from '../lists/ListOfCategories';
import * as React from "react";
import {fetchKategorie} from "../api/getCategories";
// nwm dlaczego to nie dziala xD blad jest a jest git
interface SideBarProps {
    handleCategoryClick: (description: string) => void;
}
interface DataItem {
    id: number;
    kategoria: string;
}

const SideBar: React.FC<SideBarProps> = ({ handleCategoryClick }) => {


    const [listOfCategories, setListOfCategories] = useState<DataItem[]>([]);

    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const result = await fetchKategorie();
                setListOfCategories(result);

            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        };

        fetchDataFromApi();
    }, []); // Pusta zależność sprawia, że useEffect zostanie wykonany tylko raz po zamontowaniu komponentu


    return (
        <nav className= "sidebar">
            <div className= "sideBarTitle">Kategorie</div>
            <ListOfCategories listaKategori={listOfCategories} handleCategoryClick={handleCategoryClick}/>
        </nav>
    );
}
export default SideBar;