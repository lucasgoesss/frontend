import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../config/axiosConfig';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './prato.css';

const PratoDetails = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Refeições');
    const [ingredients, setIngredients] = useState([]);
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [image, setImage] = useState('');
    const { id } = useParams()

    const fetchDishe = async (id) => {
        try {
            const response = await api.get(`/dishes/${id}`);

            setName(response.data.name);
            setCategory(response.data.category);
            setPrice(response.data.price);
            setDescription(response.data.description);
            setImage(`${process.env.REACT_APP_BACKEND_URL}/files/${response.data.image}`)
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

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    const formatQuantity = (num) => String(num).padStart(2, '0');

    const increaseQuantity = () => setQuantity(quantity + 1);

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const addToCart = () => {
        setTotalOrders(totalOrders + quantity);
        setQuantity(1);
    };

    return (
        <div className="menu-page">
            <Header
                togglePanel={togglePanel}
                isPanelOpen={isPanelOpen}
            />
            <main className="details">
                <a href="/" className="back-link">voltar</a>
                <div className="product-detail">
                    <div className="prato-image-container">
                        <img src={image} alt={name} />
                    </div>
                    <div className="info">
                        <h2>{name}</h2>
                        <p>{description}</p>
                        <div className="tags">
                            {ingredients && ingredients.map((ingredient, index) => (
                                <span key={index}>{ingredient}</span>
                            ))}
                        </div>
                        <div className="quantity-control">
                            <button onClick={decreaseQuantity}>-</button>
                            <span>{formatQuantity(quantity)}</span>
                            <button onClick={increaseQuantity}>+</button>
                        </div>
                        <button className="add-button" onClick={addToCart}>
                            incluir ∙ R$ {price}
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>

    );
};

export default PratoDetails;
