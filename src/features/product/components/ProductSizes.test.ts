import { describe, it, expect, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import ProductSizes from "./ProductSizes.vue";
import type { ProductOption } from "@/types/product";

describe("ProductSizes", () => {
  let wrapper: VueWrapper;
  let mockOption: ProductOption;

  beforeEach(() => {
    mockOption = {
      name: "Size",
      type: "SIZE",
      defaultChoice: 0,
      choices: [
        { text: "S", priceModifier: 0 },
        { text: "M", priceModifier: 5.0 },
        { text: "L", priceModifier: 10.0 },
      ],
    };
  });

  describe("Rendering", () => {
    it("renders option name", () => {
      wrapper = mount(ProductSizes, {
        props: {
          option: mockOption,
        },
      });

      expect(wrapper.text()).toContain("Size");
    });

    it("renders all size choices as buttons", () => {
      wrapper = mount(ProductSizes, {
        props: {
          option: mockOption,
        },
      });

      const buttons = wrapper.findAll("button");
      expect(buttons).toHaveLength(3);
      expect(buttons[0]!.text()).toContain("S");
      expect(buttons[1]!.text()).toContain("M");
      expect(buttons[2]!.text()).toContain("L");
    });

    it("displays price modifiers when not zero", () => {
      wrapper = mount(ProductSizes, {
        props: {
          option: mockOption,
        },
      });

      expect(wrapper.text()).toContain("+$5.00");
      expect(wrapper.text()).toContain("+$10.00");
    });

    it("does not display price modifier for zero value", () => {
      wrapper = mount(ProductSizes, {
        props: {
          option: mockOption,
        },
      });

      const firstButton = wrapper.findAll("button")[0];
      expect(firstButton!.text()).not.toContain("$");
    });
  });

  describe("v-model Behavior", () => {
    it("emits correct index for each button click", async () => {
      wrapper = mount(ProductSizes, {
        props: {
          option: mockOption,
        },
      });

      const buttons = wrapper.findAll("button");

      await buttons[0]!.trigger("click");
      expect(wrapper.emitted("update:modelValue")![0]).toEqual([0]);

      await buttons[1]!.trigger("click");
      expect(wrapper.emitted("update:modelValue")![1]).toEqual([1]);

      await buttons[2]!.trigger("click");
      expect(wrapper.emitted("update:modelValue")![2]).toEqual([2]);
    });
  });
});
