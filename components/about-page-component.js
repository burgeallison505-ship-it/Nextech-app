export default {
  name: 'about-page-component',
  setup() {
    const pastProjects = [
      { src: 'assets/assembly.jpeg', alt: 'Assembly' },
      { src: 'assets/sign.jpeg', alt: 'Custom Sign' },
      { src: 'assets/serving-tray.jpeg', alt: 'Serving Tray' },
      { src: 'assets/charcuterie.png', alt: 'Charcuterie Board' },
      { src: 'assets/basic-board.png', alt: 'Basic Cutting Board' },
      { src: 'assets/circle-tray.png', alt: 'Circle Tray' },
    ];
    return { pastProjects };
  },
  template: /* html */ `
    <section class="container py-4">
      <h1>About Rick's Custom Wood Designs</h1>
    
      <p>We're passionate about woodworking and creating handmade pieces that bring warmth and character to your home. Whether you're looking for kitchen essentials, decorative pieces, or personalized gifts, our work combines rustic charm with clean, modern design.</p>

      <h2 class="h5 mt-4">About Allison</h2>
      <p>I am Allison. I am the 4th kid out of 6 kids in my family. I wanted to make my website about woodworking because it is something I do with my dad for fun and it prepares me for the future. I am going to take over my dad's construction business. I have wanted to for as long as I could remember. When I am not working on woodworking projects, I enjoy reading and spending time with my friends and family.</p>
      <div class="d-flex justify-content-center mt-4" style="flex-wrap: wrap; gap: 100px;">
        <div style="max-width: 280px;">
          <img src="assets/family.jpeg" alt="Family" class="img-fluid rounded" style="width: 100%; height: auto; transform: rotate(90deg);">
        </div>
        <div style="max-width: 280px;">
          <img src="assets/me-dad.jpeg" alt="Me and Dad" class="img-fluid rounded" style="width: 100%; height: auto;">
        </div>
      </div>

      <h2 class="h5 mt-5">Past Projects</h2>
      <div class="row g-3 mt-2">
        <div class="col-12 col-sm-6 col-md-4" v-for="(project, index) in pastProjects" :key="index">
          <div class="border rounded-3 bg-light d-flex align-items-center justify-content-center overflow-hidden" style="height: 180px;">
            <img :src="project.src" :alt="project.alt" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
        </div>
      </div>
    </section>
  `,
};

