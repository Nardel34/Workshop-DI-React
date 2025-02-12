import {HttpService, ToastService} from "@services";
import {describe, expect, it, vi} from "vitest";
import {RequestError} from "@types";

type RequestData = { key?: string };

describe("HttpService", () => {
    const _requestData = {key: "value"};
    const _url = "https://example.com/api/data";
    const _toastService = new ToastService();
    const _httpService = new HttpService(_toastService);

    it("should post data correctly", async () => {
        globalThis.fetch = vi.fn(() => Promise.resolve(
            new Response(JSON.stringify({data: "response"}), {"status" : 200 , "statusText" : "OK"})
        ) as Promise<Response>);

        const responseData = await _httpService.PostAsync<RequestData, { data: string }>(_url, _requestData);

        expect(responseData).toEqual({data: "response"});
        expect(fetch).toHaveBeenCalledWith(_url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(_requestData),
        });
    });

    it("should get data correctly", async () => {
        globalThis.fetch = vi.fn(() => Promise.resolve(
            new Response(JSON.stringify({data: "response"}), {"status" : 200 , "statusText" : "OK"})
        ) as Promise<Response>);

        const abortController = new AbortController();
        const responseData = await _httpService.GetAsync<{ data: string }>(_url, abortController.signal);

        expect(responseData).toEqual({data: "response"});
        expect(fetch).toHaveBeenCalledWith(_url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            signal: expect.any(AbortSignal)
        });
    });

    it("should delete data correctly", async () => {
        globalThis.fetch = vi.fn(() => Promise.resolve(
            new Response(JSON.stringify(undefined), {"status" : 204 , "statusText" : "OK"})
        ) as Promise<Response>);

        const responseData = await _httpService.DeleteAsync<{ data: string }>(_url);

        expect(responseData).toEqual(undefined);
        expect(fetch).toHaveBeenCalledWith(_url, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        });
    });

    it("should patch data correctly", async () => {
        globalThis.fetch = vi.fn(() => Promise.resolve(
            new Response(JSON.stringify({data: "response"}), {"status" : 200 , "statusText" : "OK"})
        ) as Promise<Response>);

        const responseData = await _httpService.PatchAsync<RequestData, { data: string }>(
            _url,
            _requestData
        );

        expect(responseData).toEqual({data: "response"});
        expect(fetch).toHaveBeenCalledWith(_url, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(_requestData),
        });
    });

    it("should throw an error if response isn't ok", async () => {
        globalThis.fetch = vi.fn(() => Promise.resolve(
            new Response(JSON.stringify({message: "Bad Request"}), {status : 400 , statusText : "Bad Request"})
        ) as Promise<Response>);

        await expect(_httpService.PostAsync<RequestData, { data: string } | RequestError>
        (_url, _requestData)).rejects.toThrow("400 : Bad Request");
    });

    it("should throw an error if the fetch throw something", async () => {
        const test = new Error("Fetch error");
        globalThis.fetch = vi.fn(() => {
            throw test;
        });
        await expect(_httpService.GetAsync<RequestData>(_url)).rejects.toThrow("Fetch error");
    });

    it("should handle request abort", async () => {
        globalThis.fetch = vi.fn(() => {
            const error = new Error("Request aborted");
            error.name = "AbortError";
            throw error;
        });

        await expect(_httpService.GetAsync<RequestData>(_url)).rejects.toThrow("Request aborted");
    });
});
