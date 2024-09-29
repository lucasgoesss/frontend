import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './novo-prato.css';
import api from '../../config/axiosConfig';
import DishesForm from '../../components/DishesForm';

const PratoPage = () => {
    const isAdmin = parseInt(localStorage.getItem('isAdmin', false));
    const navigate = useNavigate();
    const { id } = useParams()

    useEffect(() => {
        if (!isAdmin)
            navigate('/');
    }, [isAdmin])

    return (
        <div className="menu-page">
            <Header />
            <main>
                <a href="/" class="back-button">← voltar</a>
                <h1>{id ? 'Editar' : 'Adicionar'} Prato</h1>

                <DishesForm id={id} />

            </main>
            <Footer />
        </div>
    );
};

export default PratoPage;
