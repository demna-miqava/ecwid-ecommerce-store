import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Breadcrumb from "./Breadcrumb.vue";
import { createRouter, createMemoryHistory } from "vue-router";
import type { BreadcrumbItem } from "./Breadcrumb.vue";

describe("Breadcrumb", () => {
  let router: ReturnType<typeof createRouter>;

  beforeEach(() => {
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: "/", component: { template: "<div>Home</div>" } },
        {
          path: "/category/:id",
          component: { template: "<div>Category</div>" },
        },
        { path: "/products", component: { template: "<div>Products</div>" } },
        {
          path: "/:pathMatch(.*)*",
          component: { template: "<div>Catch All</div>" },
        },
      ],
    });
  });

  describe("Rendering", () => {
    it("renders single breadcrumb item", () => {
      const items: BreadcrumbItem[] = [{ label: "Home" }];

      const wrapper = mount(Breadcrumb, {
        props: { items },
        global: { plugins: [router] },
      });

      expect(wrapper.text()).toContain("Home");
    });

    it("renders multiple breadcrumb items", () => {
      const items: BreadcrumbItem[] = [
        { label: "Home", to: "/" },
        { label: "Category 1", to: "/category/12345" },
        { label: "Category 2" },
      ];

      const wrapper = mount(Breadcrumb, {
        props: { items },
        global: { plugins: [router] },
      });

      expect(wrapper.text()).toContain("Home");
      expect(wrapper.text()).toContain("Category 1");
      expect(wrapper.text()).toContain("Category 2");
    });

    it('renders items with links when "to" is provided', () => {
      const items: BreadcrumbItem[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
      ];

      const wrapper = mount(Breadcrumb, {
        props: { items },
        global: { plugins: [router] },
      });

      const links = wrapper.findAll("a");
      expect(links).toHaveLength(2);
      expect(links?.[0]?.attributes("href")).toBe("/");
      expect(links?.[1]?.attributes("href")).toBe("/products");
    });

    it('renders items without links when "to" is not provided', () => {
      const items: BreadcrumbItem[] = [
        { label: "Home", to: "/" },
        { label: "Current Page" },
      ];

      const wrapper = mount(Breadcrumb, {
        props: { items },
        global: { plugins: [router] },
      });

      const links = wrapper.findAll("a");
      expect(links).toHaveLength(1); // Only the first item should be a link

      const spans = wrapper.findAll("span");
      expect(spans.length).toBeGreaterThan(0);
      expect(wrapper.text()).toContain("Current Page");
    });
  });

  describe("Separators", () => {
    it("renders chevron separators between items", () => {
      const items: BreadcrumbItem[] = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
        { label: "Details" },
      ];

      const wrapper = mount(Breadcrumb, {
        props: { items },
        global: { plugins: [router] },
      });

      const chevrons = wrapper.findAll(".pi-chevron-right");
      expect(chevrons).toHaveLength(2); // 3 items = 2 separators
    });

    it("does not render separator after last item", () => {
      const items: BreadcrumbItem[] = [
        { label: "Home", to: "/" },
        { label: "Current" },
      ];

      const wrapper = mount(Breadcrumb, {
        props: { items },
        global: { plugins: [router] },
      });

      const listItems = wrapper.findAll("li");
      const lastItem = listItems[listItems.length - 1];
      if (lastItem) {
        expect(lastItem.find(".pi-chevron-right").exists()).toBe(false);
      }
    });

    it("renders no separators for single item", () => {
      const items: BreadcrumbItem[] = [{ label: "Home" }];

      const wrapper = mount(Breadcrumb, {
        props: { items },
        global: { plugins: [router] },
      });

      const chevrons = wrapper.findAll(".pi-chevron-right");
      expect(chevrons).toHaveLength(0);
    });
  });
});
