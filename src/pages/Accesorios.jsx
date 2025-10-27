import React from 'react';
import ProductItem from '../components/ProductItem'; 

function Accesorios() {
    return (
        <main>
                <section className="welcome">
                    <h2>Accesorios</h2>
                    <p>Complementa tu pasión por la música con nuestra selección de accesorios únicos: desde artículos prácticos hasta piezas de colección diseñadas para fans como tú.</p>
                </section>
                <section className="accesorios">
                    <div className="product-grid">

                        <ProductItem
                            titulo="Llavero Gorillaz"
                            artista="Gorillaz"
                            tipo="Accesorio"
                            precio="10.990"
                            imagenUrl="assets/img/accesorio-llavero-gorillaz.webp"
                            imagenAlt="Llavero Gorillaz"
                        />

                        <ProductItem
                            titulo="Totebag Gorillaz"
                            artista="Gorillaz"
                            tipo="Accesorio"
                            precio="15.990"
                            imagenUrl="assets/img/accesorio-totebag-gorillaz.webp"
                            imagenAlt="Totebag Gorillaz"
                        />

                        <ProductItem
                            titulo="Mochila Gorillaz"
                            artista="Gorillaz"
                            tipo="Accesorio"
                            precio="26.990"
                            imagenUrl="assets/img/accesorio-mochila-gorillaz.webp"
                            imagenAlt="Mochila Gorillaz"
                        />

                        <ProductItem
                            titulo="Totebag Ariana Grande"
                            artista="Ariana Grande"
                            tipo="Accesorio"
                            precio="14.990"
                            imagenUrl="assets/img/accesorio-totebag-ariana.PNG"
                            imagenAlt="Totebag Ariana Grande"
                        />

                        <ProductItem
                            titulo="Jockey Ariana Grande"
                            artista="Ariana Grande"
                            tipo="Accesorio"
                            precio="12.990"
                            imagenUrl="assets/img/accesorio-jockey-ariana.webp"
                            imagenAlt="Jockey Ariana Grande"
                        />

                        <ProductItem
                            titulo="Jockey Sabrina Carpenter"
                            artista="Sabrina Carpenter"
                            tipo="Accesorio"
                            precio="12.990"
                            imagenUrl="assets/img/accesorio-jockey-sabrina.webp"
                            imagenAlt="Jockey Sabrina Carpenter"
                        />

                        <ProductItem
                            titulo="Botella Charlie XCX"
                            artista="Charlie XCX"
                            tipo="Accesorio"
                            precio="22.990"
                            imagenUrl="assets/img/accesorio-botella-charliexcx.webp"
                            imagenAlt="Botella Charlie XCX"
                        />

                        <ProductItem
                            titulo="Llavero Charlie XCX"
                            artista="Charlie XCX"
                            tipo="Accesorio"
                            precio="10.990"
                            imagenUrl="assets/img/accesorio-llavero-charliexcx.webp"
                            imagenAlt="Llavero Charlie XCX"
                        />

                        <ProductItem
                            titulo="Totebag Green Day"
                            artista="Green Day"
                            tipo="Accesorio"
                            precio="15.990"
                            imagenUrl="assets/img/accesorio-totebag-greenday.webp"
                            imagenAlt="Totebag Green Day"
                        />

                        <ProductItem
                            titulo="Set pines Green Day"
                            artista="Green Day"
                            tipo="Accesorio"
                            precio="8.990"
                            imagenUrl="assets/img/accesorio-pin-greenday.webp"
                            imagenAlt="Pin Green Day"
                        />

                        <ProductItem
                            titulo="Botella Katy Perry"
                            artista="Katy Perry"
                            tipo="Accesorio"
                            precio="22.990"
                            imagenUrl="assets/img/accesorio-botella-katyperry.webp"
                            imagenAlt="Botella Katy Perry"
                        />

                        <ProductItem
                            titulo="Llavero Katy Perry"
                            artista="Katy Perry"
                            tipo="Accesorio"
                            precio="10.990"
                            imagenUrl="assets/img/accesorio-llavero-katyperry.webp"
                            imagenAlt="Llavero Katy Perry"
                  
                             />

                </div>
            </section>
        </main>
    );
}

export default Accesorios;