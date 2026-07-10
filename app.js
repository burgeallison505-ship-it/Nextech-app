import LandingPageComponent from './components/landing-page-component.js';
import AboutPageComponent from './components/about-page-component.js';
import NavbarComponent from './components/navbar-component.js';
import CollectionPageComponent from './components/collection-page-component.js';
import ItemDetailPageComponent from './components/item-detail-page-component.js';
import CartPageComponent from './components/cart-page-component.js';

const routes = [
  {
    path: '/',
    component: LandingPageComponent,
  },
  {
    path: '/about',
    component: AboutPageComponent,
  },
  {
    path: '/items',
    component: CollectionPageComponent,
  },
  {
    path: '/items/:id',
    component: ItemDetailPageComponent,
  },
  {
    path: '/cart',
    component: CartPageComponent,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

const app = Vue.createApp({
  setup() {
    const itemsStore = Vue.reactive({
      items: [],
      isLoading: true,
      error: '',
    });

    const cartStore = Vue.reactive({
      items: [],
      addToCart: function(item) {
        const hasInquiry = item.inquiryData && Object.keys(item.inquiryData).length > 0;
        const existingItem = this.items.find(cartItem => {
          if (cartItem.id !== item.id) return false;
          if (!hasInquiry && !cartItem.inquiryData) return true;
          if (hasInquiry && cartItem.inquiryData) {
            return JSON.stringify(cartItem.inquiryData) === JSON.stringify(item.inquiryData);
          }
          return false;
        });

        if (existingItem) {
          existingItem.quantity += item.quantity || 1;
        } else {
          this.items.push({ ...item, quantity: item.quantity || 1 });
        }
      },
    });

    fetch('items.csv')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load CSV data file.');
        }
        return response.text();
      })
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: ({ data, errors }) => {
            if (errors.length > 0) {
              itemsStore.error = 'There was a problem reading the CSV data.';
              itemsStore.items = [];
            } else {
              itemsStore.items = data.map((row) => ({
                id: String(row.id || '').trim(),
                name: String(row.name || '').trim(),
                description: String(row.description || '').trim(),
                category: String(row.category || '').trim(),
                imageUrl: String(row.image_url || '').trim(),
                location: String(row.location || '').trim(),
              }));
              itemsStore.error = '';
            }
            itemsStore.isLoading = false;
          },
          error: () => {
            itemsStore.error = 'There was a problem parsing CSV data.';
            itemsStore.items = [];
            itemsStore.isLoading = false;
          },
        });
      })
      .catch(() => {
        itemsStore.error = 'There was a problem loading data.';
        itemsStore.items = [];
        itemsStore.isLoading = false;
      });

    Vue.provide('itemsStore', itemsStore);
    Vue.provide('cartStore', cartStore);

    return {};
  },
});

app.component('navbar-component', NavbarComponent);

app.use(router);
app.mount('#app');
