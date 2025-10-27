import React from 'react';
import ProductItem from '../components/ProductItem'; 

function Cds() {
    return (
        <main>
            <section className="welcome">
                <h2>Colección de CDs</h2>
                <p>Descubre nuestra variedad de álbumes en formato CD, desde los clásicos hasta los lanzamientos más recientes.</p>
            </section>

            <section className="featured-products">
                <div className="product-grid">

                    <ProductItem
                        titulo="Gorillaz"
                        artista="Gorillaz"
                        tipo="CD"
                        precio="11.990"
                        imagenUrl="/assets/img/cd-gorillaz.jpg"
                        imagenAlt="CD Gorillaz"
                    />

                    <ProductItem
                        titulo="Toxicity"
                        artista="System of a Down"
                        tipo="CD"
                        precio="14.990"
                        imagenUrl="/assets/img/cd-toxicity.jpg"
                        imagenAlt="CD Toxicity"
                    />

                    <ProductItem
                        titulo="Nevermind"
                        artista="Nirvana"
                        tipo="CD"
                        precio="14.990"
                        imagenUrl="/assets/img/cd-nevermind.jpg"
                        imagenAlt="CD Nevermind"
                    />

                    <ProductItem
                        titulo="Blurryface"
                        artista="Twenty One Pilots"
                        tipo="CD"
                        precio="13.990"
                        imagenUrl="/assets/img/album-blurryface.jpeg"
                        imagenAlt="CD Blurryface"
                    />

                    <ProductItem
                        titulo="Positions"
                        artista="Ariana Grande"
                        tipo="CD"
                        precio="11.990"
                        imagenUrl="/assets/img/album-positions.jpeg"
                        imagenAlt="CD Positions"
                    />

                    <ProductItem
                        titulo="Pure Heroine"
                        artista="Lorde"
                        tipo="CD"
                        precio="12.990"
                        imagenUrl="/assets/img/album-pureheroine.png"
                        imagenAlt="CD PureHeroine"
                    />

                    <ProductItem
                        titulo="Supernova"
                        artista="Supernova"
                        tipo="CD"
                        precio="10.990"
                        imagenUrl="/assets/img/album-supernova.jpeg"
                        imagenAlt="CD Supernova"
                    />

                    <ProductItem
                        titulo="American Idiot"
                        artista="Green Day"
                        tipo="CD"
                        precio="16.990"
                        imagenUrl="/assets/img/album-americanidiot.png"
                        imagenAlt="CD AmericanIdiot"
                    />

                </div>
            </section>
        </main>
    );
}

export default Cds;