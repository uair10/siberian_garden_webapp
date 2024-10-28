import { createRouter, createWebHistory } from "vue-router";
import ProductList from "@/views/ProductList.vue";
import Cart from "@/views/Cart.vue";
import ProductDetailsPage from "@/views/ProductDetailsPage.vue";

const routes = [
  {
    path: "/",
    name: "index",
    component: ProductList,
    meta: { scrollToTop: false },
  },
  { path: "/cart/", name: "cart", component: Cart },
  {
    path: "/products/:id",
    name: "product-details",
    component: ProductDetailsPage,
    meta: { scrollToTop: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.scrollToTop) {
    window.scrollTo(0, 0);
  } else {
    next();
  }
});

export default router;
