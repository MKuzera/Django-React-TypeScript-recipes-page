import * as React from 'react';
import logging from "../Containers/logging";
interface Category {
    id: number;
    description: string;
}

interface ListOfCategoriesProps {
    listaKategori: Category[];
    handleCategoryClick: (description: string) => void;
}

const ListOfCategories = ({ listaKategori, handleCategoryClick }: { listaKategori: any[], handleCategoryClick: any }) => {

    if (!Array.isArray(listaKategori)) {
        console.error('listaKategori is not an array.');
        return null; // lub inna obsługa błędu
    }

    return (
        <div className="sideBarLeft">
            <div
                className="Kategoria"
                key={0}
                onClick={() => handleCategoryClick("Wszystko")}>
                {"Wszystko"}
            </div>
            {listaKategori.map((kategoria : any) => (
                <div
                    className="Kategoria"
                    key={kategoria.id}
                    onClick={() => handleCategoryClick(kategoria.kategoria)}>
                    {kategoria.kategoria}
                </div>
            ))}
        </div>
    );
};

export default ListOfCategories;
