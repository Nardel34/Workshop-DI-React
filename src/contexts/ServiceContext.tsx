import {IHttpService, ILocalStorageService, IToastService} from "@interfaces/services";
import {HttpService, LocalStorageService, ToastService} from "@services";
import {createContext, ReactNode, useMemo} from "react";

type Children = {
    readonly children: ReactNode;
};

export interface IServiceContext {
    localStorageService: ILocalStorageService;
    toastService: IToastService;
    httpService: IHttpService;
}

const toastService = new ToastService();
const localStorageService = new LocalStorageService();
const httpService = new HttpService(toastService);

export const ServiceContext = createContext<IServiceContext>({
    localStorageService,
    toastService,
    httpService
});

export function ServiceProvider({children}: Children): ReactNode {
    const serviceValue = useMemo(
        () => ({
            localStorageService,
            toastService,
            httpService
        }),
        []
    );

    return (
        <ServiceContext.Provider value={serviceValue}>
            {children}
        </ServiceContext.Provider>
    );
}



