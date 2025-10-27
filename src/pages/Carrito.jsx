import React from 'react';

function Carrito() {

    const itemsEnCarrito = [];

    return (
        <main>
            <section className="welcome">
                <h2>Carrito</h2>

                {itemsEnCarrito.length === 0 ? (
                    <p>Tu carrito está vacío. Agrega productos para continuar.</p>
                ) : (
                    <div>
                        <p>Tus productos:</p>
                    </div>
                )}
            </section>
        </main>
    );
}

export default Carrito;