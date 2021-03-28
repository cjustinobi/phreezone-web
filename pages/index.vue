<template>
  <div>
    <section id="hero">
      <div class="hero-container">
        <h3>Welcome to <strong>Phreezone</strong></h3>
<!--        <h1>We're Creative Builders</h1>-->
<!--        <h2>A well redefined online and offline network marketing company</h2>-->
        <nuxt-link to="/login" class="btn-get-started scrollto">Get Started</nuxt-link>
      </div>
    </section>

    <section id="services" class="services">
      <div class="container">

        <div class="section-title">
          <h2>Packages</h2>
<!--          <h3>We do offer awesome <span>Packages</span></h3>-->
<!--          <p>These are several avenues to help you succeede without sweating it.</p>-->
        </div>

        <div class="row">
          <div class="col-md-6 col-lg-4 mb-5 mb-lg-0">
            <div class="icon-box">
              <div class="icon"><i class="bx bx-bullseye"></i></div>
              <h4 class="title">Treasure</h4>
              <p class="description">{{ 5000 | currency }}</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-4 mb-5 mb-lg-0">
            <div class="icon-box silver">
              <div class="icon"><i class="bx bx-award"></i></div>
              <h4 class="title">Silver</h4>
              <p class="description">{{ 15000 | currency }}</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-4 mb-5 mb-lg-0">
            <div class="icon-box silver-star">
              <div class="icon"><i class="bx bxs-star-half"></i></div>
              <h4 class="title">Silver Star</h4>
              <p class="description">{{ 150000 | currency }}</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-4 mb-5 mb-lg-0">
            <div class="icon-box gold">
              <div class="icon"><i class="bx bxs-badge"></i></div>
              <h4 class="title">Gold</h4>
              <p class="description">{{ 300000 | currency }}</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-4 mb-5 mb-lg-0">
            <div class="icon-box platinum">
              <div class="icon"><i class="bx bx-medal"></i></div>
              <h4 class="title">Platinum</h4>
              <p class="description">{{ 600000 | currency }}</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-4 mb-5 mb-lg-0">
            <div class="icon-box royal">
              <div class="icon"><i class="bx bxs-badge-dollar"></i></div>
              <h4 class="title">VIP Royal</h4>
              <p class="description">{{ 1200000 | currency }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="portfolio" class="portfolio">
      <div class="container aos-init aos-animate" data-aos="fade-up">

        <div class="section-title">
          <h2>Products</h2>
          <p>Our Products ranges from Home appliances to Office equipments and health supplementary which highly
            beneficial.</p>
        </div>

        <ul id="portfolio-flters" class="d-flex justify-content-center aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
          <li data-filter="*" class="filter-active">All</li>
          <li data-filter=".filter-app" class="">Electronics</li>
          <li data-filter=".filter-card" class="">Household Item</li>
          <li data-filter=".filter-web" class="">Health Supplement</li>
        </ul>

        <div class="row portfolio-container aos-init aos-animate" data-aos="fade-up" data-aos-delay="200" style="position: relative; height: 1267.11px;">

          <div class="col-lg-4 col-md-6 portfolio-item filter-app" style="position: absolute; left: 0px; top: 0px;">
            <div class="portfolio-img"><img src="~assets/img/portfolio/portfolio-1.jpg" class="img-fluid" alt=""></div>
            <div class="portfolio-info">
              <h4>Provision</h4>
              <p>Prov</p>
              <a href="~assets/img/portfolio/portfolio-1.jpg" data-gall="portfolioGallery" class="venobox preview-link vbox-item" title="App 1"><i class="bx bx-plus"></i></a>
              <a href="portfolio-details.html" class="details-link" title="More Details"><i class="bx bx-link"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-web" style="position: absolute; left: 440px; top: 0px;">
            <div class="portfolio-img"><img src="~assets/img/portfolio/portfolio-2.jpg" class="img-fluid" alt=""></div>
            <div class="portfolio-info">
              <h4>Web 3</h4>
              <p>Wee</p>
              <a href="~assets/img/portfolio/portfolio-2.jpg" data-gall="portfolioGallery" class="venobox preview-link vbox-item" title="Web 3"><i class="bx bx-plus"></i></a>
              <a href="portfolio-details.html" class="details-link" title="More Details"><i class="bx bx-link"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-app" style="position: absolute; left: 880px; top: 0px;">
            <div class="portfolio-img"><img src="~assets/img/portfolio/portfolio-3.jpg" class="img-fluid" alt=""></div>
            <div class="portfolio-info">
              <h4>App 2</h4>
              <p>App</p>
              <a href="~assets/img/portfolio/portfolio-3.jpg" data-gall="portfolioGallery" class="venobox preview-link vbox-item" title="App 2"><i class="bx bx-plus"></i></a>
              <a href="portfolio-details.html" class="details-link" title="More Details"><i class="bx bx-link"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-card" style="position: absolute; left: 880px; top: 264px;">
            <div class="portfolio-img"><img src="~assets/img/portfolio/portfolio-4.jpg" class="img-fluid" alt=""></div>
            <div class="portfolio-info">
              <h4>Card 2</h4>
              <p>Card</p>
              <a href="~assets/img/portfolio/portfolio-4.jpg" data-gall="portfolioGallery" class="venobox preview-link vbox-item" title="Card 2"><i class="bx bx-plus"></i></a>
              <a href="portfolio-details.html" class="details-link" title="More Details"><i class="bx bx-link"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-web" style="position: absolute; left: 440px; top: 308.922px;">
            <div class="portfolio-img"><img src="~assets/img/portfolio/portfolio-5.jpg" class="img-fluid" alt=""></div>
            <div class="portfolio-info">
              <h4>Web 2</h4>
              <p>Web</p>
              <a href="~assets/img/portfolio/portfolio-5.jpg" data-gall="portfolioGallery" class="venobox preview-link vbox-item" title="Web 2"><i class="bx bx-plus"></i></a>
              <a href="portfolio-details.html" class="details-link" title="More Details"><i class="bx bx-link"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-app" style="position: absolute; left: 0px; top: 451.703px;">
            <div class="portfolio-img"><img src="~assets/img/portfolio/portfolio-6.jpg" class="img-fluid" alt=""></div>
            <div class="portfolio-info">
              <h4>App 3</h4>
              <p>App</p>
              <a href="~assets/img/portfolio/portfolio-6.jpg" data-gall="portfolioGallery" class="venobox preview-link vbox-item" title="App 3"><i class="bx bx-plus"></i></a>
              <a href="portfolio-details.html" class="details-link" title="More Details"><i class="bx bx-link"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-card" style="position: absolute; left: 880px; top: 569.078px;">
            <div class="portfolio-img"><img src="~assets/img/portfolio/portfolio-7.jpg" class="img-fluid" alt=""></div>
            <div class="portfolio-info">
              <h4>Card 1</h4>
              <p>Card</p>
              <a href="~assets/img/portfolio/portfolio-7.jpg" data-gall="portfolioGallery" class="venobox preview-link vbox-item" title="Card 1"><i class="bx bx-plus"></i></a>
              <a href="portfolio-details.html" class="details-link" title="More Details"><i class="bx bx-link"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-card" style="position: absolute; left: 880px; top: 869.109px;">
            <div class="portfolio-img"><img src="~assets/img/portfolio/portfolio-8.jpg" class="img-fluid" alt=""></div>
            <div class="portfolio-info">
              <h4>Card 3</h4>
              <p>Card</p>
              <a href="~assets/img/portfolio/portfolio-8.jpg" data-gall="portfolioGallery" class="venobox preview-link vbox-item" title="Card 3"><i class="bx bx-plus"></i></a>
              <a href="portfolio-details.html" class="details-link" title="More Details"><i class="bx bx-link"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-web" style="position: absolute; left: 440px; top: 960.766px;">
            <div class="portfolio-img"><img src="~assets/img/portfolio/portfolio-9.jpg" class="img-fluid" alt=""></div>
            <div class="portfolio-info">
              <h4>Web 3</h4>
              <p>Web</p>
              <a href="~assets/img/portfolio/portfolio-9.jpg" data-gall="portfolioGallery" class="venobox preview-link vbox-item" title="Web 3"><i class="bx bx-plus"></i></a>
              <a href="portfolio-details.html" class="details-link" title="More Details"><i class="bx bx-link"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'LandingPage',
    auth: 'guest',
  }
</script>

<style scoped>
  .silver i{
    color: #d4d416;
  }
  .silver:hover::before {
    background: #d4d416;
  }
  .silver-star i{
    color: #319ce3;
  }
  .silver-star:hover::before {
    background: #319ce3;
  }
  .gold i{
    color: #eeb60a;
  }
  .gold:hover::before {
    background: #eeb60a;
  }
  .platinum i{
    color: #d57266;
  }
  .platinum:hover::before {
    background: #d57266;
  }
  .royal i{
    color: #73c141;
  }
  .royal:hover::before {
    background: #73c141;
  }
  .icon-box:hover .title {
    color: #fff;
  }
</style>
