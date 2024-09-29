import React, { useState } from 'react';
import './header.css'; // Estilização separada para o header

const Header = ({ handleSearchChange, searchTerm, togglePanel, isPanelOpen }) => {
    const isAdmin = parseInt(localStorage.getItem('isAdmin', false));

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('token');
        window.location.href = '/login'; // Exemplo de redirecionamento após logout
    };

    return (
        <>
            <header className="header">
                <div className="menu-sandwich" onClick={togglePanel}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="logo">
                    <div className="icon"></div>
                    <h1>Moema Restaurante</h1>
                </div>
                <input type="text" className="search" value={searchTerm} onChange={handleSearchChange} placeholder="Busque por pratos ou ingredientes" />
                {isAdmin
                    ? <button className="favorites" onClick={() => { window.location.href = '/novo-prato' }}>Novo Prato</button>
                    : <button className="favorites">Pedidos (0)</button>
                }
                <div className="logout-icon" onClick={handleLogout} title="Logout">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6V5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-1M7 10l-5 5m0 0l5 5m-5-5h12" />
                    </svg>
                </div>
            </header>

            <div className={`full-screen-panel ${isPanelOpen ? 'open' : ''}`}>
                <div className="panel-content">
                    <button className="close-panel" onClick={togglePanel}>X</button>
                    <h2 className="panel-title">Menu</h2>
                    <input
                        type="text"
                        className="panel-search"
                        placeholder="Busque por pratos ou ingredientes"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <nav className="panel-menu">
                        {isAdmin ?
                            <a href="/novo-prato" className="panel-link">Novo Prato</a>
                            : ''}
                        <a href="/login" className="panel-link" onClick={handleLogout}>Sair</a>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Header;
