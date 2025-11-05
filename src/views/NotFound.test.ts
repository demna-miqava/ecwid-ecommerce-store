import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import NotFound from "./NotFound.vue";
import { createRouter, createMemoryHistory } from "vue-router";

describe("NotFound", () => {
  let wrapper: VueWrapper;
  let router: ReturnType<typeof createRouter>;

  beforeEach(async () => {
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: "/", component: { template: "<div>Home</div>" } },
        { path: "/:pathMatch(.*)*", component: NotFound },
      ],
    });

    await router.push("/non-existent-page");
    await router.isReady();

    wrapper = mount(NotFound, {
      global: { plugins: [router] },
    });
  });

  it("renders 404 heading", () => {
    const heading = wrapper.find("h1");
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe("404");
  });

  it("renders page not found message", () => {
    const subheading = wrapper.find("h2");
    expect(subheading.exists()).toBe(true);
    expect(subheading.text()).toBe("Page Not Found");
  });

  it("renders Go Back Home link", () => {
    const link = wrapper.find('a[href="/"]');
    expect(link.exists()).toBe(true);
    expect(link.text()).toBe("Go Back Home");
  });
});
