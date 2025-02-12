import {beforeAll, describe, expect, it} from "vitest";
import {renderHook} from "@testing-library/react";
import {useLocalStorage} from "@hooks";
import {act} from "react-dom/test-utils";

describe('useLocalStorage', () => {

    beforeAll(() => localStorage.setItem("testKey", "test-item"));

    it("should return test-item from localStorage", () => {
        const {result} = renderHook(() => useLocalStorage<string>("testKey", ""));
        const [value] = result.current;
        expect(value).toEqual("test-item");
    });

    it("should return test-item-handler from handler", () => {
        const {result} = renderHook(() => useLocalStorage<string, string>("testKey", "",
            (value: string) => `${value}-handler`));
        const [value] = result.current;
        expect(value).toEqual("test-item-handler");
    });

    it("should return test-initialized if the key doesn't exist", () => {
        const {result} = renderHook(() => useLocalStorage<string>("testKey-not-exist", "test-initialized"));
        const [value] = result.current;
        expect(value).toEqual("test-initialized");
    });

    it("should return the value updated with the new value that was defined", async () => {
        const {result} = renderHook(() => useLocalStorage<string>("testKey", ""));
        const [, setValue] = result.current;
        await act(async () => setValue("test-item-updated"));
        const [value] = result.current;
        expect(value).toEqual("test-item-updated");
    });

    it("should return the new value that was defined", async () => {
        localStorage.clear();
        const {result} = renderHook(() => useLocalStorage<string>("testKey", ""));
        const [, setValue] = result.current;
        await act(async () => setValue("test-new-item"));
        const [value] = result.current;
        expect(value).toEqual("test-new-item");
    });

    it("should notify only the items with the good key", async () => {
        localStorage.clear();
        const hook1 = renderHook(() => useLocalStorage<string | undefined>("testKey1", undefined));
        const hook2 = renderHook(() => useLocalStorage<string | undefined>("testKey2", undefined));
        const [, setValue1] = hook1.result.current;
        const [, setValue2] = hook2.result.current;
        await act(async () => setValue1("test-new-item1"));
        await act(async () => setValue2("test-new-item2"));
        const [value1] = hook1.result.current;
        const [value2] = hook2.result.current;
        expect(value1).toEqual("test-new-item1");
        expect(value2).toEqual("test-new-item2");
    });
});