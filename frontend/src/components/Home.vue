<script setup>

</script>

<template>
    <div class="home-wrapper">
        <!-- HERO SECTION / BANNER BIENVENIDA -->
        <header class="hero-section">
            <h1>Bienvenido al Sistema de Gestión</h1>
            <p>Control de stock, productos y reportes en tiempo real.</p>
        </header>

        <!-- CONTENIDO PRINCIPAL -->
        <div class="home-grid">

            <!-- COLUMNA 1: NOTICIAS / NOVEDADES -->
            <section class="home-main">
                <h2 class="section-title">Últimas Novedades</h2>

                <article class="news-card">
                    <span class="badge info">Actualización</span>
                    <h3>Nueva restricción de seguridad implementada</h3>
                    <p>Se optimizó el sistema de validación de usuarios en el backend para prevenir duplicados de emails
                        y nombres en la base de datos.</p>
                    <span class="date">Hace 10 minutos</span>
                </article>

                <article class="news-card">
                    <span class="badge success">Sistema</span>
                    <h3>Control de stock mínimo activo</h3>
                    <p>Recordá revisar las alertas visuales en la tabla de productos. Los ítems que estén por debajo de
                        su stock mínimo ahora se resaltarán automáticamente.</p>
                    <span class="date">Ayer</span>
                </article>
            </section>

            <!-- COLUMNA 2: PRODUCTOS DESTACADOS -->
            <section class="home-products">
                <h2 class="section-title">Productos Recientes</h2>

                <div class="product-mini-card">
                    <div class="product-info">
                        <h4>Manzanas Rojas Premium</h4>
                        <p>Categoría: Frutas | Stock: 150 u.</p>
                    </div>
                    <span class="product-price">$120.00</span>
                </div>

                <div class="product-mini-card">
                    <div class="product-info">
                        <h4>Monitor Gamer 27"</h4>
                        <p>Categoría: Electrónica | Stock: 5 u.</p>
                    </div>
                    <span class="product-price">$280,000</span>
                </div>

                <div class="product-mini-card critical-stock">
                    <div class="product-info">
                        <h4>Aceite de Girasol 1.5L</h4>
                        <p>Categoría: Almacén | Stock: 2 u. (Crítico)</p>
                    </div>
                    <span class="product-price">$1,800</span>
                </div>
            </section>

            <!-- COLUMNA 3: PUBLICIDADES / ENLACES -->
            <aside class="home-sidebar">
                <h2 class="section-title">Promociones</h2>

                <div class="ad-banner">
                    <p class="ad-label">PUBLICIDAD</p>
                    <h3>¡Plan Premium Activo!</h3>
                    <p>Disfrutá de soporte técnico 24/7 y respaldos automáticos en la nube.</p>
                    <a href="#" class="ad-link">Saber más</a>
                </div>

                <div class="ad-banner alternative">
                    <p class="ad-label">ANUNCIO</p>
                    <h3>¿Necesitás hardware?</h3>
                    <p>Revisá los componentes compatibles con nuestro sistema de trazabilidad de stock.</p>
                </div>
            </aside>

        </div>
    </div>
</template>

<style scoped>
.home-wrapper {
    background-color: #0f172a;
    color: #f8fafc;
    min-height: 100vh;
    padding: 30px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    box-sizing: border-box;
}

/* Hero Banner */
.hero-section {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    padding: 40px;
    border-radius: 12px;
    border: 1px solid #334155;
    margin-bottom: 30px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.hero-section h1 {
    margin: 0 0 10px 0;
    font-size: 28px;
    color: #f8fafc;
}

.hero-section p {
    margin: 0;
    color: #94a3b8;
    font-size: 16px;
}

/* Grid Layout */
.home-grid {
    display: grid;
    grid-template-columns: 2fr 1.5fr 1fr;
    gap: 25px;
}

@media (max-width: 1024px) {
    .home-grid {
        grid-template-columns: 1fr;
    }
}

.section-title {
    font-size: 18px;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 20px;
    color: #f8fafc;
    letter-spacing: 0.5px;
    border-bottom: 2px solid #334155;
    padding-bottom: 8px;
}

/* Tarjetas de Noticias */
.news-card {
    background-color: #1e293b;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #334155;
    margin-bottom: 15px;
    position: relative;
}

.news-card h3 {
    margin: 10px 0 8px 0;
    font-size: 16px;
}

.news-card p {
    margin: 0 0 12px 0;
    color: #94a3b8;
    font-size: 14px;
    line-height: 1.5;
}

.news-card .date {
    font-size: 12px;
    color: #64748b;
}

/* Badges */
.badge {
    font-size: 11px;
    font-weight: 700;
    padding: 4px 8px;
    border-radius: 4px;
    text-transform: uppercase;
}

.badge.info {
    background-color: rgba(59, 130, 246, 0.2);
    color: #60a5fa;
}

.badge.success {
    background-color: rgba(16, 185, 129, 0.2);
    color: #34d399;
}

/* Tarjetas de Productos */
.product-mini-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1e293b;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #334155;
    margin-bottom: 12px;
}

.product-info h4 {
    margin: 0 0 4px 0;
    font-size: 14px;
}

.product-info p {
    margin: 0;
    font-size: 12px;
    color: #94a3b8;
}

.product-price {
    font-weight: 700;
    color: #10b981;
    font-size: 15px;
}

.critical-stock {
    border-left: 4px solid #ef4444;
}

.critical-stock .product-price {
    color: #ef4444;
}

/* Publicidades (Sidebar) */
.ad-banner {
    background: linear-gradient(135deg, #065f46 0%, #047857 100%);
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 15px;
    border: 1px solid #059669;
}

.ad-banner.alternative {
    background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
    border: 1px solid #4338ca;
}

.ad-label {
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 1px;
    margin: 0 0 8px 0;
    color: rgba(255, 255, 255, 0.6);
}

.ad-banner h3 {
    margin: 0 0 8px 0;
    font-size: 15px;
}

.ad-banner p {
    margin: 0 0 12px 0;
    font-size: 13px;
    color: #e2e8f0;
    line-height: 1.4;
}

.ad-link {
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    background: rgba(255, 255, 255, 0.2);
    padding: 6px 12px;
    border-radius: 4px;
    display: inline-block;
    transition: background 0.2s;
}

.ad-link:hover {
    background: rgba(255, 255, 255, 0.3);
}
</style>