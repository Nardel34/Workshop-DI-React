import {useFetch} from "@hooks";
import {renderHook, waitFor} from "@testing-library/react";
import {afterAll, describe, expect, it, vi} from "vitest";

type ResponseApi = {
    data: string;
}

vi.mock('@services', async (importOriginal) => ({
    ...await importOriginal<typeof import("@services")>(),
    AuthService: vi.fn(() => ({
        accessToken: "test-token",
        UpdateToken: vi.fn(),
    })),
}));

describe("useFetch", () => {
    afterAll(() => {
        vi.restoreAllMocks();
    });

    it("should get data correctly", async () => {
        const url = "https://example.com/api/data";
        globalThis.fetch = vi.fn(() => Promise.resolve(
            new Response(JSON.stringify({data: "response"}), {"status" : 200 , "statusText" : "OK"})
        ) as Promise<Response>);

        const {result} = renderHook(() => useFetch<ResponseApi>(url));

        await waitFor(() => expect(result.current.result?.data).toEqual("response"));
        expect(fetch).toHaveBeenCalledWith(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            signal: expect.any(AbortSignal)
        });
    });

    it("should retrieve data correctly when url changed", async () => {
        let url = "https://example.com/api/data1";
        type MockResponse = { [url: string]: { data: string } };
        const mockResponses: MockResponse = {
            "https://example.com/api/data1": {data: "response1"},
            "https://example.com/api/data2": {data: "response2"},
        };
        globalThis.fetch = vi.fn((input) => {
            const response = mockResponses[input as string];
            if (response) {
                return Promise.resolve(
                    new Response(JSON.stringify(response), {"status" : 200 , "statusText" : "OK"})
                ) as Promise<Response>;
            }
            return Promise.reject(new Error("Not Found"));
        });

        const {result, rerender} = renderHook(() => useFetch<ResponseApi>(url));

        await waitFor(() => expect(result.current.result?.data).toEqual("response1"));
        url = "https://example.com/api/data2";
        rerender();
        await waitFor(() => expect(result.current.result?.data).toEqual("response2"));
    });

    it("should get data correctly with handler", async () => {
        const url = "https://example.com/api/data";
        globalThis.fetch = vi.fn(() => Promise.resolve(
            new Response(JSON.stringify({data: "response"}), {"status" : 200 , "statusText" : "OK"})
        ) as Promise<Response>);

        const {result} = renderHook(() => useFetch<ResponseApi, string>(url,
            (respApi: ResponseApi): string => {
                return respApi.data;
            }));

        await waitFor(() => expect(result.current.result).toEqual("response"));
        expect(fetch).toHaveBeenCalledWith(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            signal: expect.any(AbortSignal)
        });
    });
});
