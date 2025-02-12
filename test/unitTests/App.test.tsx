import {describe, it, vi} from "vitest";

vi.mock("@components", () => ({Button: () => <div>Button</div>}));

describe("<App/>", () => {
    it("should ...", () => {

    });
});