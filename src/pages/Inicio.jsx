import React from 'react';
import ProductItem from '../components/ProductItem'; 
import Carousel from 'react-bootstrap/Carousel'; 
import { Container, Row, Col } from 'react-bootstrap'; // Importamos Grid de Bootstrap

// --- URLs ---
const carouselImage1 = "/assets/img/vinilo_top.webp"; 
const carouselImage2 = "/assets/img/vinilo_ag.png";   
const carouselImage3 = "/assets/img/cd-gorillaz.jpg"; 
// --- Fin URLs ---


function Inicio() {
    return (
        <main>
            {/* Quitamos la sección de bienvenida, el carrusel será lo primero */}
            {/* <section className="welcome"> ... </section> */}

            {/* --- Carrusel ahora más prominente --- */}
            {/* Quitamos maxWidth y margin para que ocupe más */}
            <section className="carousel-section mb-5"> {/* mb-5 añade margen inferior */}
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={carouselImage1}
                            alt="Primer slide"
                            style={{ maxHeight: '500px', objectFit: 'cover' }} // Limita altura y ajusta imagen
                        />
                        <Carousel.Caption className="carousel-caption-custom bg-dark bg-opacity-50 p-3 rounded"> {/* Fondo semi-transparente */}
                            <h3>¡Nuevos Lanzamientos!</h3>
                            <p>Descubre lo último en vinilos y CDs.</p>
                            {/* Opcional: Añadir botón */}
                            {/* <Button variant="danger" as={Link} to="/vinilos">Ver Vinilos</Button> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                    {/* Repetir estructura para Carousel.Item 2 y 3, cambiando imágenes y texto */}
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={carouselImage2}
                            alt="Segundo slide"
                            style={{ maxHeight: '500px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption className="carousel-caption-custom bg-dark bg-opacity-50 p-3 rounded">
                            <h3>Ofertas Especiales</h3>
                            <p>Encuentra tus álbumes favoritos a precios increíbles.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                         <img
                            className="d-block w-100"
                            src={carouselImage3}
                            alt="Tercer slide"
                            style={{ maxHeight: '500px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption className="carousel-caption-custom bg-dark bg-opacity-50 p-3 rounded">
                            <h3>Clásicos que Perduran</h3>
                            <p>La música que marcó generaciones, ahora en Ritmo Lab.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </section>
            {/* --- Fin Carrusel --- */}

             {/* --- Bienvenida (Movida aquí) --- */}
             <Container className="text-center mb-5"> {/* Centramos y añadimos margen */}
                 <Row>
                     <Col>
                        {/* Podemos usar la fuente Fascinate aquí */}
                        <h2 style={{ fontFamily: "'Fascinate', cursive" }}>Bienvenid@ a Ritmo Lab</h2>
                         <p className="lead"> {/* lead hace el texto un poco más grande */}
                            Tu espacio digital para sumergirte en CDs, vinilos y artículos de colección.
                            Explora nuestro catálogo y conecta con la música que amas.
                        </p>
                    </Col>
                </Row>
             </Container>
             {/* --- Fin Bienvenida --- */}


            <section className="featured-products">
                 <Container> {/* Usamos Container para centrar */}
                     <h2 className="text-center">Productos Destacados</h2>
                     {/* Mantenemos tu clase product-grid para los estilos base */}
                     <div className="product-grid"> 
                        {/* Los ProductItem siguen igual */}
                         <ProductItem
                            titulo="Breach (2025)"
                            artista="Twenty One Pilots"
                            tipo="Vinilo"
                            precio="21.990"
                            imagenUrl="/assets/img/vinilo_top.webp"
                            imagenAlt="Portada de Breach"
                        />
                        {/* ... (los otros 3 productos) ... */}
                        <ProductItem
                            titulo="Botella - BRAT"
                            artista="Charli XCX"
                            tipo="Botella"
                            precio="22.990"
                            imagenUrl="/assets/img/accesorio-botella-charliexcx.webp"
                            imagenAlt="Botella de BRAT"
                        />
                    </div>
                </Container>
            </section>

             {/* ... (Sección de video sin cambios) ... */}
             <section className="video-section mt-5"> {/* mt-5 añade margen superior */}
                 <Container>
                     <h2 className="text-center">Últimos Lanzamientos</h2>
                     <div className="d-flex justify-content-center"> {/* Centrado con Flexbox de Bootstrap */}
                        <iframe
                            width="560" // Puedes hacerlo responsivo con clases de Bootstrap si quieres
                            height="315"
                            src="https://www.youtube.com/embed/V9PVRfjEBTI?si=pOhQ-VHKe09-EgJz"
                            title="YouTube video player"
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen 
                        ></iframe>
                    </div>
                </Container>
             </section>
         </main>
     );
 }

 export default Inicio;