import React from 'react';
import './product-card.css'; // Estilização separada para o card
import { FaEdit } from 'react-icons/fa';

const ProductCard = ({ id, image, name, details, price }) => {
    const isAdmin = parseInt(localStorage.getItem('isAdmin', false));

    return (
        <div className="product-card">
            {isAdmin ?
                <button className="edit-button" onClick={() => { window.location.href = `/editar-prato/${id}`}}>
                    <FaEdit />
                </button>
: ''
}
            <div className="image-container" onClick={() => { window.location.href = `/prato/${id}` }}>
                <img src={`${process.env.REACT_APP_BACKEND_URL}/files/${image}`} alt={name} />
            </div>
            <p>{name}</p>
            <p className="details">{details}</p>
            <p className="price">R$ {price}</p>
            <button className="action-button">Incluir</button>
        </div>
    );
};

export default ProductCard;