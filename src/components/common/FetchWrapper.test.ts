import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import FetchWrapper from "./FetchWrapper.vue";

describe("FetchWrapper", () => {
  describe("Loading State", () => {
    it("shows loading spinner when isLoading is true", () => {
      const wrapper = mount(FetchWrapper, {
        props: {
          data: undefined,
          isLoading: true,
          isError: false,
        },
      });

      expect(wrapper.text()).toContain("Loading...");
    });

    it("shows custom loading text when provided", () => {
      const wrapper = mount(FetchWrapper, {
        props: {
          data: undefined,
          isLoading: true,
          isError: false,
          loadingText: "Loading products...",
        },
      });

      expect(wrapper.text()).toContain("Loading products...");
    });

    it("uses loading slot when provided", () => {
      const wrapper = mount(FetchWrapper, {
        props: {
          data: undefined,
          isLoading: true,
          isError: false,
        },
        slots: {
          loading: '<div class="custom-loading">Custom Loading Content</div>',
        },
      });

      expect(wrapper.find(".custom-loading").exists()).toBe(true);
      expect(wrapper.text()).toContain("Custom Loading Content");
    });

    it("does not show loading when isLoading is false", () => {
      const wrapper = mount(FetchWrapper, {
        props: {
          data: { items: [] },
          isLoading: false,
          isError: false,
        },
      });

      expect(wrapper.text()).not.toContain("Loading...");
    });
  });

  describe("Error State", () => {
    it("shows default error message when isError is true", () => {
      const wrapper = mount(FetchWrapper, {
        props: {
          data: undefined,
          isLoading: false,
          isError: true,
        },
      });

      expect(wrapper.text()).toContain("Failed to load data");
    });

    it("shows custom error text when provided", () => {
      const wrapper = mount(FetchWrapper, {
        props: {
          data: undefined,
          isLoading: false,
          isError: true,
          errorText: "Could not load products",
        },
      });

      expect(wrapper.text()).toContain("Could not load products");
    });

    it("uses error slot when provided", () => {
      const wrapper = mount(FetchWrapper, {
        props: {
          data: undefined,
          isLoading: false,
          isError: true,
        },
        slots: {
          error: '<div class="custom-error">Custom Error Content</div>',
        },
      });

      expect(wrapper.find(".custom-error").exists()).toBe(true);
      expect(wrapper.text()).toContain("Custom Error Content");
    });
  });

  describe("Empty State", () => {
    it("shows empty message when data is undefined", () => {
      const wrapper = mount(FetchWrapper, {
        props: {
          data: undefined,
          isLoading: false,
          isError: false,
        },
      });

      expect(wrapper.text()).toContain("No data available");
    });

    it("shows empty message when data is empty array", () => {
      const wrapper = mount(FetchWrapper, {
        props: {
          data: [],
          isLoading: false,
          isError: false,
        },
      });

      expect(wrapper.text()).toContain("No data available");
    });

    it("shows empty message when data is empty object", () => {
      const wrapper = mount(FetchWrapper, {
        props: {
          data: {},
          isLoading: false,
          isError: false,
        },
      });

      expect(wrapper.text()).toContain("No data available");
    });

    it("shows custom empty text when provided", () => {
      const wrapper = mount(FetchWrapper, {
        props: {
          data: [],
          isLoading: false,
          isError: false,
          emptyText: "No products found",
        },
      });

      expect(wrapper.text()).toContain("No products found");
    });

    it("uses empty slot when provided", () => {
      const wrapper = mount(FetchWrapper, {
        props: {
          data: [],
          isLoading: false,
          isError: false,
        },
        slots: {
          empty: '<div class="custom-empty">Custom Empty Content</div>',
        },
      });

      expect(wrapper.find(".custom-empty").exists()).toBe(true);
      expect(wrapper.text()).toContain("Custom Empty Content");
    });
  });

  describe("Success State", () => {
    it("renders default slot when data exists", () => {
      const wrapper = mount(FetchWrapper, {
        props: {
          data: { items: [1, 2, 3] },
          isLoading: false,
          isError: false,
        },
        slots: {
          default: '<div class="content">Data Fetched</div>',
        },
      });

      expect(wrapper.find(".content").exists()).toBe(true);
      expect(wrapper.text()).toContain("Data Fetched");
    });

    it("passes data to default slot", () => {
      const testData = { items: ["a", "b", "c"] };
      const wrapper = mount(FetchWrapper, {
        props: {
          data: testData,
          isLoading: false,
          isError: false,
        },
        slots: {
          default: `<div>{{ data.items.length }} items</div>`,
        },
      });

      expect(wrapper.text()).toContain("3 items");
    });

    it("renders when data is non-empty array", () => {
      const wrapper = mount(FetchWrapper, {
        props: {
          data: [1, 2, 3],
          isLoading: false,
          isError: false,
        },
        slots: {
          default: '<div class="content">Array Content</div>',
        },
      });

      expect(wrapper.find(".content").exists()).toBe(true);
    });

    it("renders when data is non-empty object", () => {
      const wrapper = mount(FetchWrapper, {
        props: {
          data: { name: "Test", value: 123 },
          isLoading: false,
          isError: false,
        },
        slots: {
          default: '<div class="content">Object Content</div>',
        },
      });

      expect(wrapper.find(".content").exists()).toBe(true);
    });
  });
});
