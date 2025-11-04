import { describe, it, expect, vi, beforeEach } from "vitest";
import { useCategoryNavigation } from "./useCategoryNavigation";
import { ref } from "vue";
import type { Category } from "@/types/category";
import { mockCategories } from "@/__mocks__/testData";

// Mock vue-router
const mockRoute = {
  params: {} as Record<string, string | string[]>,
};

vi.mock("vue-router", () => ({
  useRoute: () => mockRoute,
}));

// Mock useGetCategories
const mockCategoriesData = ref<{ items: Category[] } | undefined>(undefined);

vi.mock("./useGetCategories", () => ({
  useGetCategories: () => ({
    data: mockCategoriesData,
  }),
}));

describe("useCategoryNavigation", () => {
  beforeEach(() => {
    mockRoute.params = {};
    mockCategoriesData.value = {
      items: mockCategories,
    };
  });

  describe("Current category id", () => {
    it("returns id from route params when viewing top-level category", () => {
      mockRoute.params = { id: "1" };

      const { currentCategoryId } = useCategoryNavigation();

      expect(currentCategoryId.value).toBe(1);
    });

    it("returns subCategoryId when viewing subcategory", () => {
      mockRoute.params = { id: "1", subCategoryId: "3" };

      const { currentCategoryId } = useCategoryNavigation();

      expect(currentCategoryId.value).toBe(3);
    });
  });

  describe("Current category", () => {
    it("finds correct category from id", () => {
      mockRoute.params = { id: "1" };

      const { currentCategory } = useCategoryNavigation();

      expect(currentCategory.value).toEqual({
        id: 1,
        name: "Electronics",
      });
    });

    it("finds correct subcategory from subCategoryId", () => {
      mockRoute.params = { id: "1", subCategoryId: "3" };

      const { currentCategory } = useCategoryNavigation();

      expect(currentCategory.value).toEqual({
        id: 3,
        name: "Laptops",
        parentId: 1,
      });
    });
  });
});
