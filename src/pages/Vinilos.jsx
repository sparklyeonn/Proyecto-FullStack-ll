import React from 'react';
import ProductItem from '../components/ProductItem'; 

function Vinilos() {
    return (
        <main>
                <section className="welcome">
                    <h2>Colección de Vinilos</h2>
                    <p>Explora nuestra exclusiva colección de vinilos y encuentra tus álbumes favoritos.</p>
                </section>

                {/* La sección se llama "vinilos" para coincidir con tu CSS */}
                <section className="vinilos">
                    <div className="product-grid">

                        <ProductItem
                            titulo="Vessel"
                            artista="Twenty One Pilots"
                            tipo="Vinilo"
                            precio="23.990"
                            imagenUrl="assets/img/album-vessel.jpeg"
                            imagenAlt="Vinilo Vessel - Twenty One Pilots"
                        />

                        <ProductItem
                            titulo="Blurryface"
                            artista="Twenty One Pilots"
                            tipo="Vinilo"
                            precio="21.990"
                            imagenUrl="assets/img/album-blurryface.jpeg"
                            imagenAlt="Vinilo Blurryface - Twenty One Pilots"
                        />

                        <ProductItem
                            titulo="Trench"
                            artista="Twenty One Pilots"
                            tipo="Vinilo"
                            precio="23.990"
                            imagenUrl="assets/img/album-trench.webp"
                            imagenAlt="Vinilo Trench - Twenty One Pilots"
                        />

                        <ProductItem
                            titulo="Scaled and Icy"
                            artista="Twenty One Pilots"
                            tipo="Vinilo"
                            precio="21.990"
                            imagenUrl="assets/img/album-scaledandicy.jpeg"
                            imagenAlt="Vinilo Scaled and Icy - Twenty One Pilots"
                        />

                        <ProductItem
                            titulo="Clancy"
                            artista="Twenty One Pilots"
                            tipo="Vinilo"
                            precio="22.990"
                            imagenUrl="assets/img/album-clancy.jpg"
                            imagenAlt="Vinilo Clancy - Twenty One Pilots"
                        />

                        <ProductItem
                            titulo="Breach"
                            artista="Twenty One Pilots"
                            tipo="Vinilo"
                            precio="21.990"
                            imagenUrl="assets/img/vinilo_top.webp"
                            imagenAlt="Vinilo Breach - Twenty One Pilots"
                        />

                        <ProductItem
                            titulo="Eternal Sunshine"
                            artista="Ariana Grande"
                            tipo="Vinilo"
                            precio="22.990"
                            imagenUrl="assets/img/vinilo_ag.png"
                            imagenAlt="Vinilo Eternal Sunshine - Ariana Grande"
                        />

                        <ProductItem
                            titulo="Dangerous Woman"
                            artista="Ariana Grande"
                            tipo="Vinilo"
                            precio="22.990"
                            imagenUrl="assets/img/album-dangerouswoman.jpg"
                            imagenAlt="Vinilo Dangerous Woman - Ariana Grande"
                        />

                        <ProductItem
                            titulo="Thank U, Next"
                            artista="Ariana Grande"
                            tipo="Vinilo"
                            precio="21.990"
                            imagenUrl="assets/img/album-thankunext.jpg"
                            imagenAlt="Vinilo Thank U, Next - Ariana Grande"
                        />

                        <ProductItem
                            titulo="Positions"
                            artista="Ariana Grande"
                            tipo="Vinilo"
                            precio="23.990"
                            imagenUrl="assets/img/album-positions.jpeg"
                            imagenAlt="Vinilo Positions - Ariana Grande"
                        />

                        <ProductItem
                            titulo="Yours Truly (10th Anniversary Edition)"
                            artista="Ariana Grande"
                            tipo="Vinilo"
                            precio="24.990"
                            imagenUrl="assets/img/album-yourstruly.jpg"
                            imagenAlt="Vinilo Yours Truly (10th Anniversary Edition) - Ariana Grande"
                        />

                        <ProductItem
                            titulo="Sweetener"
                            artista="Ariana Grande"
                            tipo="Vinilo"
                            precio="22.990"
                            imagenUrl="assets/img/album-sweetener.jpg"
                            imagenAlt="Vinilo Sweetener - Ariana Grande"
                        />

                        <ProductItem
                            titulo="My Everything (10th Anniversary Edition)"
                            artista="Ariana Grande"
                            tipo="Vinilo"
                            precio="24.990"
                            imagenUrl="assets/img/album-myeverything.jpg"
                            imagenAlt="Vinilo My Everything (10th Anniversary Edition) - Ariana Grande"
                     />

                </div>
            </section>
        </main>
    );
}
export default Vinilos;