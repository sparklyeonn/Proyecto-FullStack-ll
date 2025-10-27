import React from 'react';
import ProductItem from '../components/ProductItem'; 

function Inicio() {
    return (
        <main>
            <section className="welcome">
                <h2>Bienvenid@ a nuestra tienda de música!</h2>
                <p>
                    En Ritmo Lab, entendemos que la música es más que un simple sonido; es una experiencia.
                    Por eso, hemos creado un espacio digital para que te sumerjas en una gran variedad de CDs,
                    vinilos y artículos de colección. Nuestra tienda está diseñada para que encuentres fácilmente
                    lo que buscas y te conectes con la música que amas.
                    Te invitamos a explorar nuestro catálogo y a sumergirte en el ritmo.
                </p>
            </section>

            <section className="featured-products">
                <h2>Productos Destacados</h2>
                <div className="product-grid">

                    <ProductItem
                        titulo="Breach (2025)"
                        artista="Twenty One Pilots"
                        tipo="Vinilo"
                        precio="21.990"
                        imagenUrl="/assets/img/vinilo_top.webp"
                        imagenAlt="Portada de Breach"
                    />

                    <ProductItem
                        titulo="Eternal Sunshine (2025)"
                        artista="Ariana Grande"
                        tipo="Vinilo"
                        precio="22.990"
                        imagenUrl="/assets/img/vinilo_ag.png"
                        imagenAlt="Portada de ES"
                    />

                    <ProductItem
                        titulo="DeBÍ TiRAR MáS FOToS (2025)"
                        artista="Bad Bunny"
                        tipo="CD"
                        precio="16.990"
                        imagenUrl="/assets/img/cd-dtmf.jpeg"
                        imagenAlt="Portada de DTMF"
                    />

                    <ProductItem
                        titulo="Botella - BRAT"
                        artista="Charli XCX"
                        tipo="Botella"
                        precio="22.990"
                        imagenUrl="/assets/img/accesorio-botella-charliexcx.webp"
                        imagenAlt="Botella de BRAT"
                    />

                </div>
            </section>

            <section className="video-section">
                <h2>Últimos Lanzamientos</h2>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/V9PVRfjEBTI?si=pOhQ-VHKe09-EgJz"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>
            </section>
        </main>
    );
}

export default Inicio;