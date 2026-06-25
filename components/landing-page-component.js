export default {
  name: 'landing-page-component',
  template: /* html */ `
    <div class="container py-4">
      <h1 class="mb-3">Welcome to Rick's Custom Wood Designs</h1>
      <p class="lead">Handcrafted wooden pieces for your home and special occasions.</p>
      <router-link to="/items" class="btn btn-primary mb-4"><i class="bi bi-list-check me-1"></i>View Our Collection</router-link>

      <h2 class="h4 mt-3">About Us</h2>
      <p>
        Allison and her dad craft beautiful, custom wood projects. Whether you're looking for a personalized sign, a sturdy cutting board, or a rustic shelf for your home, we create pieces designed to last and bring joy to any space.
      </p>
      <p>
        Browse our collection to see what we have in stock, or contact us about custom orders. Each piece is made with care and attention to detail.
      </p>
    </div>
  `,
};
