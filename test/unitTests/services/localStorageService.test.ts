import {beforeAll, describe, expect, it, vi} from "vitest";
import {LocalStorageService} from "@services";

describe("LocalStorageService", () => {
    const _localStorageService = new LocalStorageService();

    beforeAll(() => {
        localStorage.setItem("testKey", "test-item");
    });

    it("should retrieve stored data correctly", () => {
        expect(_localStorageService.GetValue<string>("testKey")).toEqual("test-item");
    });

    it("should set stored data correctly", () => {
        _localStorageService.SetValue<string>("testKey", "new-test-item");
        expect(_localStorageService.GetValue<string>("testKey")).toEqual("new-test-item");
    });

    it("should subscribe to a listener correctly", () => {
        const mockFn = {key: "test-key", handler: vi.fn()};
        _localStorageService.Subscribe(mockFn);
        _localStorageService.SetValue<string>("test-key", "");
        expect(mockFn.handler).toHaveBeenCalled();
    });

    it("should unsubscribe to a listener correctly", () => {
        const mockFn = {key: "test-key", handler: vi.fn()};
        _localStorageService.Subscribe(mockFn);
        _localStorageService.Unsubscribe(mockFn);
        _localStorageService.SetValue<string>("test-key", "");
        expect(mockFn.handler).not.toHaveBeenCalled();
    });
});