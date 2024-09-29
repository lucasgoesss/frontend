import React, { useEffect, useState, useRef } from 'react';
import Header from '../../components/Header';
import Category from '../../components/Category';
import Footer from '../../components/Footer';
import './home.css'; // Estilização geral para a página
import api from '../../config/axiosConfig';

const HomePage = () => {
    const [dishesByCategory, setDishesByCategory] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const timeoutRef = useRef(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            fetchDishes({
                name: value
            });
            setIsPanelOpen(false);
        }, 500);
    };

    // Função para agrupar pratos por categoria
    const groupByCategory = (dishes) => {
        return dishes.reduce((acc, dish) => {
            const { category } = dish;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(dish);
            return acc;
        }, {});
    };

    const fetchDishes = async (params) => {
        try {
            const response = await api.get('/dishes', { params });
            const dishes = response.data;

            // Agrupa os pratos por categoria
            const groupedDishes = groupByCategory(dishes);
            setDishesByCategory(groupedDishes);
        } catch (error) {
            console.error('Erro ao buscar os pratos:', error);
        }
    };

    useEffect(() => {
        fetchDishes();
    }, []);

    return (
        <div className="menu-page">
            <Header
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                togglePanel={togglePanel}
                isPanelOpen={isPanelOpen}
            />
            <main>
                <section className="banner">
                    <h2>Sabores inigualáveis</h2>
                    <p>Sinta o cuidado no preparo com ingredientes selecionados</p>
                </section>

                {Object.keys(dishesByCategory).map((category) => (
                    <Category
                        key={category}
                        title={category}
                        products={dishesByCategory[category]}
                    />
                ))}
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
