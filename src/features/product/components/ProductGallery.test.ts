import { describe, it, expect } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import ProductGallery from "./ProductGallery.vue";

describe("ProductGallery", () => {
  let wrapper: VueWrapper;

  describe("Main Image Display", () => {
    it("displays selected image", () => {
      wrapper = mount(ProductGallery, {
        props: {
          selectedImage: "https://example.com/image1.jpg",
          allImages: ["https://example.com/image1.jpg"],
          selectedIndex: 0,
        },
      });

      const mainImg = wrapper.find("img");
      expect(mainImg.attributes("src")).toBe("https://example.com/image1.jpg");
    });

    it("has alt text for main image", () => {
      wrapper = mount(ProductGallery, {
        props: {
          selectedImage: "https://example.com/image1.jpg",
          allImages: ["https://example.com/image1.jpg"],
          selectedIndex: 0,
        },
      });

      const mainImg = wrapper.find("img");
      expect(mainImg.attributes("alt")).toBe("Product image");
    });
  });

  describe("Thumbnail Grid", () => {
    it("does not show thumbnails when there is only one image", () => {
      wrapper = mount(ProductGallery, {
        props: {
          selectedImage: "https://example.com/image1.jpg",
          allImages: ["https://example.com/image1.jpg"],
          selectedIndex: 0,
        },
      });

      const thumbnails = wrapper.findAll("button");
      expect(thumbnails).toHaveLength(0);
    });

    it("shows thumbnails when multiple images exist", () => {
      wrapper = mount(ProductGallery, {
        props: {
          selectedImage: "https://example.com/image1.jpg",
          allImages: [
            "https://example.com/image1.jpg",
            "https://example.com/image2.jpg",
            "https://example.com/image3.jpg",
          ],
          selectedIndex: 0,
        },
      });

      const thumbnails = wrapper.findAll("button");
      expect(thumbnails).toHaveLength(3);
    });
  });

  describe("Thumbnail Selection", () => {
    it("emits selectImage event when thumbnail is clicked", async () => {
      wrapper = mount(ProductGallery, {
        props: {
          selectedImage: "https://example.com/image1.jpg",
          allImages: [
            "https://example.com/image1.jpg",
            "https://example.com/image2.jpg",
          ],
          selectedIndex: 0,
        },
      });

      const thumbnails = wrapper.findAll("button");
      await thumbnails[1]!.trigger("click");

      expect(wrapper.emitted("selectImage")).toBeTruthy();
      expect(wrapper.emitted("selectImage")![0]).toEqual([1]);
    });
  });
});
