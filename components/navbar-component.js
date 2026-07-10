export default {
  name: 'navbar-component',
  setup() {
    const cartStore = Vue.inject('cartStore');

    const cartItemCount = Vue.computed(() => {
      return cartStore.items.reduce((total, item) => total + item.quantity, 0);
    });

    return {
      cartStore,
      cartItemCount,
    };
  },
  template: /* html */ `
    <nav class="navbar sticky-top bg-white border-bottom px-3">
      <span class="navbar-brand mb-0 h1"><i class="bi bi-bootstrap-fill me-2"></i>Web App Starter</span>

      <div class="ms-auto d-flex gap-2">
        <router-link class="btn btn-outline-primary btn-sm" to="/">
          <i class="bi bi-house me-1"></i>Home
        </router-link>
        <router-link class="btn btn-outline-primary btn-sm d-flex align-items-center" to="/items">
          <i class="bi bi-card-list me-1"></i>Items
        </router-link>
        <router-link class="btn btn-outline-primary btn-sm" to="/about">
          <i class="bi bi-info-circle me-1"></i>About
        </router-link>
        <button class="btn btn-outline-success btn-sm position-relative d-flex align-items-center" @click="$router.push('/cart')">
          <i class="bi bi-cart me-1"></i>Cart
          <span v-if="cartItemCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {{ cartItemCount }}
          </span>
        </button>
      </div>
    </nav>
  `,
};
