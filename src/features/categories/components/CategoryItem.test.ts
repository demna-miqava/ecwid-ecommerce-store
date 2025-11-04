import { describe, it, expect, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import CategoryItem from "./CategoryItem.vue";
import type { Category } from "@/types/category";
import { createRouter, createMemoryHistory } from "vue-router";

describe("CategoryItem", () => {
  let wrapper: VueWrapper;
  let router: ReturnType<typeof createRouter>;
  let mockCategory: Category;

  beforeEach(async () => {
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: "/", component: { template: "<div>Home</div>" } },
        {
          path: "/category/:id",
          component: { template: "<div>Category</div>" },
        },
        {
          path: "/category/:id/:subCategoryId",
          component: { template: "<div>Subcategory</div>" },
        },
      ],
    });

    await router.push("/");
    await router.isReady();

    mockCategory = {
      id: 1,
      name: "Electronics",
    };
  });

  describe("Rendering", () => {
    it("renders category name", () => {
      wrapper = mount(CategoryItem, {
        props: { category: mockCategory },
        global: { plugins: [router] },
      });

      expect(wrapper.text()).toContain("Electronics");
    });

    it("renders as a link", () => {
      wrapper = mount(CategoryItem, {
        props: { category: mockCategory },
        global: { plugins: [router] },
      });

      const link = wrapper.find("a");
      expect(link.exists()).toBe(true);
    });
  });

  describe("Navigation - Top Level Category", () => {
    it("generates correct route for top-level category", () => {
      wrapper = mount(CategoryItem, {
        props: { category: mockCategory },
        global: { plugins: [router] },
      });

      const link = wrapper.find("a");
      expect(link.attributes("href")).toBe("/category/1");
    });
  });

  describe("Navigation - Subcategory", () => {
    it("generates correct route for subcategory with parentId", () => {
      const subcategory: Category = {
        id: 5,
        name: "Laptops",
        parentId: 1,
      };

      wrapper = mount(CategoryItem, {
        props: { category: subcategory },
        global: { plugins: [router] },
      });

      const link = wrapper.find("a");
      expect(link.attributes("href")).toBe("/category/1/5");
    });
  });
});
