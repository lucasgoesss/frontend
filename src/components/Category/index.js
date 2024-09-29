import React from 'react';
import ProductCard from '../ProductCard';
import './category.css'; // Estilização separada para a categoria

const Category = ({ title, products }) => {
    return (
        <section className="category">
            <h3>{title}</h3>
            <div className="products">
                {products.map((product, index) => (
                    <ProductCard
                        key={index}
                        id={product.id}
                        image={product.image}
                        name={product.name}
                        details={product.details}
                        price={product.price}
                    />
                ))}
            </div>
        </section>
    );
};

export default Category;
