export default {
  name: 'landing-page-component',
  setup() {
    const currentPhotoIndex = Vue.ref(0);
    const touchStartX = Vue.ref(0);
    const photos = [
      { id: 1, title: 'Assembly', image: 'assets/assembly.jpeg' },
      { id: 2, title: 'Side', image: 'assets/side.jpeg' },
      { id: 3, title: 'Shelf', image: 'assets/shelf.jpeg' },
      { id: 4, title: 'Side Shelf', image: 'assets/side-shelf.jpeg' },
      { id: 5, title: 'Foot', image: 'assets/foot.jpeg' },
      { id: 6, title: 'Back', image: 'assets/back.jpeg' },
      { id: 7, title: 'Bottom of Side Shelf', image: 'assets/bottom-of-side-shelf.jpeg' },
    ];

    const nextPhoto = () => {
      currentPhotoIndex.value = (currentPhotoIndex.value + 1) % photos.length;
    };

    const previousPhoto = () => {
      currentPhotoIndex.value = (currentPhotoIndex.value - 1 + photos.length) % photos.length;
    };

    const handleTouchStart = (event) => {
      touchStartX.value = event.touches[0].clientX;
    };

    const handleTouchEnd = (event) => {
      const touchEndX = event.changedTouches[0].clientX;
      const diff = touchStartX.value - touchEndX;
      if (diff > 50) nextPhoto();
      if (diff < -50) previousPhoto();
    };

    return {
      currentPhotoIndex,
      photos,
      nextPhoto,
      previousPhoto,
      handleTouchStart,
      handleTouchEnd,
    };
  },
  template: /* html */ `
    <div class="container py-4">
      <h1 class="mb-3">Welcome to Rick's Custom Wood Designs</h1>
      <p class="lead">Handcrafted wooden pieces for your home and special occasions.</p>

      <div class="project-section mb-5" style="padding: 1.25rem;">
        <h2 class="h5 mb-2">High School Final Project</h2>
        <p class="mb-2 small">
          this is a project Allison started in high school for a final project in computers in design & production. she made it with recicled cherry wood floorboards. she finished it with her dad (Rick) over the summer. for the final project she had to design and build something that would help someone. so she made a shelf for her xbox, record player, records, and books. 
          
      </p>
        <div class="carousel-container"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd">
          <button class="carousel-button carousel-button-prev" @click="previousPhoto" aria-label="Previous photo">
            <i class="bi bi-chevron-left"></i>
          </button>
          <div class="carousel-viewer">
            <div class="photo-placeholder">
              <img :src="photos[currentPhotoIndex].image" :alt="photos[currentPhotoIndex].title" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
          </div>
          <button class="carousel-button carousel-button-next" @click="nextPhoto" aria-label="Next photo">
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>
        <div class="carousel-indicators">
          <span v-for="(photo, index) in photos" :key="photo.id"
            :class="['indicator', { active: index === currentPhotoIndex }]"
            @click="currentPhotoIndex = index"></span>
        </div>
      </div>

      <router-link to="/items" class="btn btn-primary mb-4"><i class="bi bi-list-check me-1"></i>View Our Collection</router-link>

      <div class="video-section mb-5">
        <h2 class="h4 mb-3">Watch Our Work</h2>
        <div class="video-placeholder">
          <p class="text-muted mb-0">We don't have anything yet—we're working on it right now. Sorry!</p>
        </div>
      </div>

      <h2 class="h4 mt-3">About Us</h2>
      <p>
        Allison and her dad (Rick) craft beautiful, custom wood projects. Whether you're looking for a personalized sign, a sturdy cutting board, or a shelf for your home, we create pieces designed to last and bring joy to any space.
      </p>
      <p>
        Browse our collection to see what we have made, or contact us about custom orders. Each piece is made with care and attention to detail.
      </p>

      <div class="contact-section mt-5">
        <h2 class="h4 mb-3">Contact Us</h2>
        <p class="mb-3">Have a custom project in mind? We'd love to hear from you!</p>
        <div class="contact-details">
          <div class="contact-item mb-3">
            <i class="bi bi-envelope me-2"></i>
            <strong>Email:</strong> <a href="mailto:contact@example.com">contact@example.com</a>
          </div>
          <div class="contact-item mb-3">
            <i class="bi bi-telephone me-2"></i>
            <strong>Phone:</strong> <a href="tel:+1-555-0123">(555) 123-4567</a>
          </div>
          <div class="contact-item">
            <i class="bi bi-geo-alt me-2"></i>
            <strong>Location:</strong> <span>Your City, State</span>
          </div>
        </div>
        <p class="mt-3 text-white small">We typically respond to inquiries within 24 hours.</p>
      </div>
    </div>
  `,
};
