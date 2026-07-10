export default {
  name: 'cart-page-component',
  setup() {
    const cartStore = Vue.inject('cartStore');

    const removeFromCart = (index) => {
      if (index > -1 && index < cartStore.items.length) {
        cartStore.items.splice(index, 1);
      }
    };

    const updateQuantity = (index, quantity) => {
      const item = cartStore.items[index];
      if (!item) return;
      if (quantity > 0) {
        item.quantity = quantity;
      } else {
        removeFromCart(index);
      }
    };

    const cartTotal = Vue.computed(() => {
      return cartStore.items.length;
    });

    return {
      cartStore,
      removeFromCart,
      updateQuantity,
      cartTotal,
    };
  },
  template: /* html */ `
    <section class="container py-4">
      <router-link to="/items" class="btn btn-link ps-0 mb-3">
        <i class="bi bi-arrow-left me-1"></i>Continue shopping
      </router-link>

      <h1 class="h3 mb-4">Shopping Cart</h1>

      <div v-if="cartStore.items.length === 0" class="alert alert-info" role="alert">
        Your cart is empty. <router-link to="/items">Browse items</router-link> to add products.
      </div>

      <div v-else class="row">
        <div class="col-lg-8">
          <div class="card shadow-sm border-0 mb-4">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead class="table-light">
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in cartStore.items" :key="item.id + '-' + index">
                    <td>
                      <strong>{{ item.name }}</strong>
                      <br>
                      <small class="text-muted">{{ item.description }}</small>
                      <div v-if="item.inquiryData" class="mt-2 small text-muted">
                        <p class="mb-1"><strong>Inquiry details:</strong></p>
                        <p class="mb-1">{{ item.inquiryData.description }}</p>
                        <p class="mb-1"><strong>Email:</strong> {{ item.inquiryData.email || 'N/A' }}</p>
                        <p class="mb-0"><strong>Phone:</strong> {{ item.inquiryData.phone || 'N/A' }}</strong></p>
                      </div>
                    </td>
                    <td>
                      <div class="input-group" style="max-width: 120px;">
                        <button class="btn btn-outline-secondary btn-sm" @click="updateQuantity(index, item.quantity - 1)">
                          <i class="bi bi-dash"></i>
                        </button>
                        <input type="number" class="form-control form-control-sm text-center" v-model.number="item.quantity" @change="updateQuantity(index, item.quantity)" min="1">
                        <button class="btn btn-outline-secondary btn-sm" @click="updateQuantity(index, item.quantity + 1)">
                          <i class="bi bi-plus"></i>
                        </button>
                      </div>
                    </td>
                    <td>
                      <button class="btn btn-outline-danger btn-sm" @click="removeFromCart(index)">
                        <i class="bi bi-trash"></i>Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h5 class="card-title">Order Summary</h5>
              <hr>
              <div class="d-flex justify-content-between mb-2">
                <span>Total Items:</span>
                <strong>{{ cartTotal }}</strong>
              </div>
              <p class="text-muted small">Ready to proceed with your order? Contact us to finalize your purchase.</p>
              <button class="btn btn-success w-100" disabled>
                <i class="bi bi-check-circle me-1"></i>Checkout
              </button>
              <small class="text-muted d-block mt-2">Checkout feature coming soon</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
};
