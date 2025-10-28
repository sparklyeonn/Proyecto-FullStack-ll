import React from 'react';
import ProductItem from '../components/ProductItem.jsx';
import Carousel from 'react-bootstrap/Carousel';
import { Container, Row, Col } from 'react-bootstrap';
import { productos } from '../data/productos.js';

const carouselImage1 = "/assets/img/vinilo_top.webp";
const carouselImage2 = "/assets/img/vinilo_ag.png";
const carouselImage3 = "/assets/img/cd-gorillaz.jpg";

function Inicio() {

    const destacadosIds = [
        'vinilo-breach',
        'vinilo-eternal-sunshine',
        'cd-dtmf',
        'acc-botella-charlie'
    ];
    const productosDestacados = productos.filter(p => destacadosIds.includes(p.id));

    return (
        <main>
            <Container as="section" className="carousel-section mb-5 mt-4">
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={carouselImage1}
                            alt="Primer slide"
                            style={{ maxHeight: '500px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption className="carousel-caption-custom bg-dark bg-opacity-50 p-3 rounded">
                            <h3>¡Nuevos Lanzamientos!</h3>
                            <p>Descubre lo último en vinilos y CDs.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
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
            </Container>

            <Container className="text-center mb-5">
                <Row>
                    <Col>
                        <h2 style={{ fontFamily: "'Fascinate', cursive" }}>Bienvenid@ a Ritmo Lab</h2>
                        <p className="lead">
                            Tu espacio digital para sumergirte en CDs, vinilos y artículos de colección.
                            Explora nuestro catálogo y conecta con la música que amas.
                        </p>
                    </Col>
                </Row>
            </Container>

            <section className="featured-products">
                <Container>
                    <h2 className="text-center">Productos Destacados</h2>
                    <div className="product-grid">

                        {productosDestacados.map(producto => (
                            <ProductItem
                                key={producto.id}
                                producto={producto}
                            />
                        ))}

                    </div>
                </Container>
            </section>

            <section className="video-section mt-5">
                <Container>
                    <h2 className="text-center">Últimos Lanzamientos</h2>
                    <div className="d-flex justify-content-center">
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
                </Container>
            </section>
        </main>
    );
}

export default Inicio;