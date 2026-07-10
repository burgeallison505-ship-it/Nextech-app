export default {
  name: 'about-page-component',
  template: /* html */ `
    <section class="container py-4">
      <h1>About Rick's Custom Wood Designs</h1>
      <p>We're passionate about woodworking and creating handmade pieces that bring warmth and character to your home. Whether you're looking for kitchen essentials, decorative pieces, or personalized gifts, our work combines rustic charm with clean, modern design.</p>

      <h2 class="h5 mt-4">How We Work</h2>
      <p>Browse our collection of items we have made or reach out to discuss a custom project. We love taking on new ideas and working with customers to create exactly what they have in mind.</p>

      <h2 class="h5 mt-5">Past Projects</h2>
      <div class="row g-3 mt-2">
        <div class="col-12 col-sm-6 col-md-4" v-for="n in 6" :key="n">
          <div class="border rounded-3 bg-light d-flex align-items-center justify-content-center" style="height: 180px;">
            <span class="text-muted">Photo {{ n }}</span>
          </div>
        </div>
      </div>
    </section>
  `,
};
