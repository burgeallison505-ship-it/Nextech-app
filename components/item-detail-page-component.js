export default {
  name: 'item-detail-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    const cartStore = Vue.inject('cartStore');
    const route = VueRouter.useRoute();

    const selectedItem = Vue.computed(() => {
      return itemsStore.items.find((item) => item.id === route.params.id);
    });

    const isCustomProject = Vue.computed(() => selectedItem.value && selectedItem.value.id === 'custom-project');

    const formData = Vue.reactive({
      description: '',
      contactEmail: '',
      contactPhone: '',
      submitted: false,
      errorMessage: '',
    });

    const handleImageError = (item) => {
      if (item && item.imageUrl) {
        item.imageUrl = '';
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
      formData.submitted = true;
      if (selectedItem.value) {
        cartStore.addToCart({
          ...selectedItem.value,
          quantity: 1,
          inquiryData: {
            description: formData.description,
            email: formData.contactEmail,
            phone: formData.contactPhone,
          },
        });
      }
      formData.description = '';
      formData.contactEmail = '';
      formData.contactPhone = '';
      setTimeout(() => {
        formData.submitted = false;
      }, 3000);
    };

    return {
      itemsStore,
      selectedItem,
      handleImageError,
      isCustomProject,
      formData,
      submitCustomProject,
    };
  },
  template: /* html */ `
    <section class="container py-4">
      <router-link to="/items" class="btn btn-link ps-0 mb-3">← Back to collection</router-link>

      <div v-if="itemsStore.isLoading" class="alert alert-secondary" role="status">
        Loading item details...
      </div>

      <div v-else-if="itemsStore.error" class="alert alert-danger" role="alert">
        {{ itemsStore.error }}
      </div>

      <div v-else-if="!selectedItem" class="alert alert-warning" role="alert">
        Item not found.
      </div>

      <article v-else class="card shadow-sm border-0 overflow-hidden">
        <img
          v-if="selectedItem.imageUrl"
          :src="selectedItem.imageUrl"
          :alt="selectedItem.name"
          @error="handleImageError(selectedItem)"
          class="item-detail-image w-100 object-fit-cover" />
        <div
          v-else
          class="item-detail-image w-100 d-flex align-items-center justify-content-center bg-light text-muted">
          No image available
        </div>

        <div class="card-body p-4">
          <div class="d-flex align-items-center gap-2 mb-2">
            <h1 class="h3 mb-0">{{ selectedItem.name }}</h1>
            <span class="badge text-bg-primary">{{ selectedItem.category || 'General' }}</span>
          </div>

          <p class="lead mb-3">{{ selectedItem.description || 'No description available.' }}</p>
          <p class="mb-0"><strong>Location:</strong> {{ selectedItem.location || 'N/A' }}</p>
          <p class="text-muted mt-2 mb-0"><strong>Item ID:</strong> {{ selectedItem.id }}</p>
        </div>
      </article>

      <div v-if="isCustomProject" class="card shadow-sm border-0 mt-4">
        <div class="card-body p-4">
          <h2 class="h4 mb-3">Custom Project Inquiry</h2>
          <p class="text-muted mb-3">Please explain what you want and provide your email or phone number so we can contact you.</p>

          <div v-if="formData.errorMessage" class="alert alert-danger" role="alert">
            {{ formData.errorMessage }}
          </div>

          <div v-if="formData.submitted" class="alert alert-success" role="alert">
            Thank you! We received your request and will reach out soon.
          </div>

          <form @submit.prevent="submitCustomProject">
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
            <button type="submit" class="btn btn-primary">Submit Inquiry</button>
          </form>
        </div>
      </div>
    </section>
  `,
};
