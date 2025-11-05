import CartView from "@/views/CartView.vue";
import CategoryView from "@/views/CategoryView.vue";
import NotFound from "@/views/NotFound.vue";
import ProductDetailsView from "@/views/ProductDetailsView.vue";
import ProductsView from "@/views/ProductsView.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "products", component: ProductsView },
  {
    path: "/category/:id/:subCategoryId?",
    name: "category",
    component: CategoryView,
  },
  {
    path: "/products/:id",
    name: "product-details",
    component: ProductDetailsView,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
