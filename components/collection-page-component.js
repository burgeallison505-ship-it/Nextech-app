export default {
  name: 'collection-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    const cartStore = Vue.inject('cartStore');
    const showCustomProjectModal = Vue.ref(false);
    const showCharcuterieModal = Vue.ref(false);
    const formData = Vue.reactive({
      description: '',
      contactEmail: '',
      contactPhone: '',
      errorMessage: '',
      submitted: false,
    });
    const charcuterieText = Vue.ref('');

    const handleImageError = (item) => {
      if (item && item.imageUrl) {
        item.imageUrl = '';
      }
    };

    const addToCart = (item) => {
      if (item.id === 'custom-project') {
        showCustomProjectModal.value = true;
      } else if (item.id === 'charcuterie') {
        showCharcuterieModal.value = true;
      } else {
        cartStore.addToCart(item);
      }
    };

    const submitCustomProject = () => {
      if (!formData.description.trim()) {
        formData.errorMessage = 'Please explain what you want.';
        return;
      }
      if (!formData.contactEmail.trim() && !formData.contactPhone.trim()) {
        formData.errorMessage = 'Please provide an email address or phone number.';
        return;
      }
      formData.errorMessage = '';
      const customItem = itemsStore.items.find((item) => item.id === 'custom-project');
      if (customItem) {
        cartStore.addToCart({
          ...customItem,
          quantity: 1,
          inquiryData: {
            description: formData.description,
            email: formData.contactEmail,
            phone: formData.contactPhone,
          },
        });
      }
      formData.submitted = true;
      setTimeout(() => {
        formData.description = '';
        formData.contactEmail = '';
        formData.contactPhone = '';
        formData.submitted = false;
        showCustomProjectModal.value = false;
      }, 2000);
    };

    const submitCharcuterieBoard = () => {
      if (!charcuterieText.value.trim()) {
        formData.errorMessage = 'Please enter the text for the board.';
        return;
      }
      formData.errorMessage = '';
      const charcuterieItem = itemsStore.items.find((item) => item.id === 'charcuterie');
      if (charcuterieItem) {
        cartStore.addToCart({
          ...charcuterieItem,
          quantity: 1,
          inquiryData: {
            message: charcuterieText.value.trim(),
          },
        });
      }
      formData.submitted = true;
      setTimeout(() => {
        charcuterieText.value = '';
        formData.submitted = false;
        showCharcuterieModal.value = false;
      }, 2000);
    };

    const closeModal = () => {
      showCustomProjectModal.value = false;
      showCharcuterieModal.value = false;
      formData.description = '';
      formData.contactEmail = '';
      formData.contactPhone = '';
      formData.errorMessage = '';
      formData.submitted = false;
      charcuterieText.value = '';
    };

    return {
      itemsStore,
      cartStore,
      handleImageError,
      addToCart,
      showCustomProjectModal,
      showCharcuterieModal,
      formData,
      charcuterieText,
      submitCustomProject,
      submitCharcuterieBoard,
      closeModal,
    };
  },
  template: /* html */ `
    <section class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="h3 mb-0">Collection</h1>
        <span class="badge text-bg-light border">{{ itemsStore.items.length }} shown</span>
      </div>

      <div v-if="itemsStore.isLoading" class="alert alert-secondary" role="status">
        Loading items...
      </div>

      <div v-else-if="itemsStore.error" class="alert alert-danger" role="alert">
        {{ itemsStore.error }}
      </div>

      <div v-else-if="itemsStore.items.length === 0" class="alert alert-warning" role="alert">
        No items found in the dataset.
      </div>

      <div v-else class="row g-3">
        <div class="col-12 col-md-6 col-lg-4" v-for="item in itemsStore.items" :key="item.id">
          <article class="card h-100 shadow-sm border-0">
            <img
              v-if="item.imageUrl"
              :src="item.imageUrl"
              :alt="item.name"
              @error="handleImageError(item)"
              class="card-img-top collection-card-image object-fit-cover" />
            <div
              v-else
              class="collection-card-image d-flex align-items-center justify-content-center bg-light text-muted">
              No image available
            </div>

            <div class="card-body d-flex flex-column">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h2 class="h5 card-title mb-0">{{ item.name }}</h2>
                <span class="badge text-bg-primary ms-2">{{ item.category || 'General' }}</span>
              </div>

              <p class="card-text text-muted flex-grow-1 collection-description">
                {{ item.description || 'No description available.' }}
              </p>

              <p class="small mb-3"><strong>Location:</strong> {{ item.location || 'N/A' }}</p>

              <div class="d-grid gap-2">
                <button class="btn btn-success btn-sm" @click="addToCart(item)">
                  <i class="bi bi-cart-plus me-1"></i>Add to Cart
                </button>
                <router-link :to="'/items/' + item.id" class="btn btn-outline-secondary btn-sm">
                  View details
                </router-link>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div v-if="showCustomProjectModal">
        <div class="modal-backdrop fade show"></div>
        <div class="modal fade show d-block" role="dialog" tabindex="-1">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Custom Project Inquiry</h5>
                <button type="button" class="btn-close" @click="closeModal"></button>
              </div>
              <div class="modal-body">
                <p class="text-muted mb-3">Please explain what you want and provide your email or phone number.</p>
                <div v-if="formData.errorMessage" class="alert alert-danger" role="alert">
                  {{ formData.errorMessage }}
                </div>
                <div v-if="formData.submitted" class="alert alert-success" role="alert">
                  Thank you! We've received your request and will contact you soon.
                </div>
                <form @submit.prevent="submitCustomProject" v-if="!formData.submitted">
                  <div class="mb-3">
                    <label for="customDescription" class="form-label">What do you want?</label>
                    <textarea id="customDescription" class="form-control" v-model="formData.description" rows="4" required></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="customEmail" class="form-label">Email address</label>
                    <input id="customEmail" type="email" class="form-control" v-model="formData.contactEmail" placeholder="you@example.com" />
                  </div>
                  <div class="mb-3">
                    <label for="customPhone" class="form-label">Phone number</label>
                    <input id="customPhone" type="tel" class="form-control" v-model="formData.contactPhone" placeholder="(555) 123-4567" />
                  </div>
                  <div class="d-flex gap-2">
                    <button type="submit" class="btn btn-success">
                      <i class="bi bi-send me-1"></i>Submit Inquiry
                    </button>
                    <button type="button" class="btn btn-outline-secondary" @click="closeModal">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showCharcuterieModal">
        <div class="modal-backdrop fade show"></div>
        <div class="modal fade show d-block" role="dialog" tabindex="-1">
          <div class="modal-dialog modal-md">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Charcuterie Board Text</h5>
                <button type="button" class="btn-close" @click="closeModal"></button>
              </div>
              <div class="modal-body">
                <p class="text-muted mb-3">What should it say on the board?</p>
                <div v-if="formData.errorMessage" class="alert alert-danger" role="alert">
                  {{ formData.errorMessage }}
                </div>
                <div v-if="formData.submitted" class="alert alert-success" role="alert">
                  Your board text has been added to the cart.
                </div>
                <form @submit.prevent="submitCharcuterieBoard" v-if="!formData.submitted">
                  <div class="mb-3">
                    <label for="boardText" class="form-label">Board text</label>
                    <input id="boardText" type="text" class="form-control" v-model="charcuterieText" placeholder="e.g. The Smith Family" required />
                  </div>
                  <div class="d-flex gap-2">
                    <button type="submit" class="btn btn-success">
                      <i class="bi bi-send me-1"></i>Add to Cart
                    </button>
                    <button type="button" class="btn btn-outline-secondary" @click="closeModal">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
};
