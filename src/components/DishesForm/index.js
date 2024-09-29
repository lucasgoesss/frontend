import React, { useEffect, useState } from 'react';
import api from '../../config/axiosConfig';
import { useNavigate } from 'react-router-dom';
import './dishes-form.css';


const DishesForm = ({ id }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Refeições');
    const [ingredients, setIngredients] = useState([]);
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const fetchDishe = async (id) => {
        try {
            const response = await api.get(`/dishes/${id}`);

            setName(response.data.name);
            setCategory(response.data.category);
            setPrice(response.data.price);
            setDescription(response.data.description);
            setImagePreview(`${process.env.REACT_APP_BACKEND_URL}/files/${response.data.image}`)
            setIngredients(response.data.ingredients.map(item => item.name))

        } catch (error) {
            console.error('Erro ao buscar prato:', error);
            alert('Erro ao buscar prato.');
        }
    }


    useEffect(() => {
        if (id) {
            fetchDishe(id);
        }
    }, [id])

    const handleAddIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        if (image)
            formData.append('image', image);

        formData.append('name', name);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('description', description);

        ingredients.forEach((ingredient, index) => {
            formData.append(`ingredients[${index}]`, ingredient);
        });

        try {
            if (id) {
                const response = await api.put(`/dishes/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                alert('Prato atualizado com sucesso!');
            } else {
                const response = await api.post('/dishes', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                alert('Prato cadastrado com sucesso!');
            }

            navigate("/");
        } catch (error) {
            console.error('Erro ao cadastrar prato:', error);
            alert('Erro ao cadastrar/atualizar prato.');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        // Gerar uma URL para mostrar a pré-visualização da imagem
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    };

    return (
        <form className="add-dish-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="image">Imagem do prato</label>
                <div className="file-input">
                    <button
                        type="button"
                        className="select-image-button"
                        onClick={() => document.getElementById('image').click()}
                    >
                        🖼️ Selecione imagem
                    </button>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                </div>
                {imagePreview && (
                    <div className="image-preview">
                        <img src={imagePreview} alt="Preview da imagem" width="200px" />
                    </div>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Ex.: Salada Ceasar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="category">Categoria</label>
                <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Refeições">Refeições</option>
                    <option value="Pratos Principais">Pratos Principais</option>
                    <option value="Sobremesas">Sobremesas</option>
                    <option value="Bebidas">Bebidas</option>
                </select>
            </div>

            <div className="form-group ingredients">
                <label>Ingredientes</label>
                <div className="ingredients-container">
                    {ingredients.map((ingredient, index) => (
                        <div className="ingredient" key={index}>
                            <input
                                type="text"
                                placeholder="Adicionar ingrediente"
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddIngredient}>Adicionar Ingrediente</button>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="price">Preço</label>
                <input
                    type="number"
                    id="price"
                    placeholder="R$ 00.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Descrição</label>
                <textarea
                    id="description"
                    placeholder="Fale brevemente sobre o prato, seus ingredientes e composição."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <button type="submit" className="submit-button">Salvar alterações</button>
        </form>
    );
};

export default DishesForm;
