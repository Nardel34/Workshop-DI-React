import {ServiceContext} from "@contexts/ServiceContext";
import {IHttpService, ILocalStorageService, IToastService} from "@interfaces/services";
import {render} from "@testing-library/react";
import {ReactNode} from "react";
import {MemoryRouter} from "react-router-dom";
import {vi} from "vitest";
import {LocalStorageService} from "@services";
import {act} from "react-dom/test-utils";

export type ServiceMocks = {
    mockLocalStorageService?: ILocalStorageService,
    mockToastService?: IToastService,
    mockHttpService?: IHttpService,
};

export const renderRouterAndServiceContext = async (
    children: ReactNode,
    {
        mockLocalStorageService,
        mockHttpService,
        mockToastService,
    }: ServiceMocks = {},
    initialEntries?: string[]
) => {
    const serviceValue = {
        localStorageService: mockLocalStorageService ?? localStorageService,
        toastService: mockToastService ?? toastService,
        httpService: mockHttpService ?? httpService,
    };
    return await act(() => render(
        <MemoryRouter initialEntries={initialEntries}>
            <ServiceContext.Provider value={serviceValue}>{children}</ServiceContext.Provider>
        </MemoryRouter>
    ));
};

export const localStorageService = new LocalStorageService();

export const httpService: IHttpService = {
    GetAsync: vi.fn().mockResolvedValue("test-GetAsync"),
    PatchAsync: vi.fn().mockResolvedValue("test-PatchAsync"),
    PostAsync: vi.fn().mockResolvedValue("test-PostAsync"),
    DeleteAsync: vi.fn().mockResolvedValue("test-DeleteAsync"),
};

export const toastService: IToastService = {
    Error: vi.fn(),
    Info: vi.fn(),
    Success: vi.fn(),
    Warning: vi.fn(),
    Promise: vi.fn(),
};