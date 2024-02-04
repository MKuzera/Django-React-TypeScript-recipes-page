import * as React from 'react';
interface Kategoria{
    id: number;
    kategoria: string;
}

interface Recipe {
    id: number;
    title: string;
    description: string;
    image: string;
    image_url: string;
    kategoria: Kategoria[];
}

interface ListOfRecipiesProps {
    listOfRecipies: Recipe[];
}

const ListOfRecipies: React.FC<ListOfRecipiesProps> = ({ listOfRecipies }) => {


    return (
        <div className="Recipes">
            {listOfRecipies.map((recipe: Recipe) => (
                <div className="Recipe" key={recipe.id}>
                    <img src={recipe.image} alt={recipe.description} />
                    <div className="RecipeTitle">{recipe.title}</div>
                    {recipe.description.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default ListOfRecipies;
