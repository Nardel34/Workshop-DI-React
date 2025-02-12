import {ToastService} from "@services";
import {Bounce, toast} from "react-toastify";
import {afterAll, describe, expect, it, vi} from "vitest";

vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
        warning: vi.fn(),
        info: vi.fn(),
        promise: vi.fn(),
    },
    Bounce: vi.fn(),
}));

describe("ToastService", () => {
    const toastService = new ToastService();
    const defaultOptions = {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    };

    afterAll(() => {
        vi.restoreAllMocks();
    });

    it("should call toast.success with correct parameters", () => {
        toastService.Success("Success message", 5000);
        expect(toast.success).toHaveBeenCalledWith("Success message", defaultOptions);
    });

    it("should call toast.error with correct parameters", () => {
        toastService.Error("Error message", 5000);
        expect(toast.error).toHaveBeenCalledWith("Error message", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    });

    it("should call toast.warning with correct parameters", () => {
        toastService.Warning("Warning message", 5000);
        expect(toast.warning).toHaveBeenCalledWith("Warning message", defaultOptions);
    });

    it("should call toast.info with correct parameters", () => {
        toastService.Info("Info message", 5000);
        expect(toast.info).toHaveBeenCalledWith("Info message", defaultOptions);
    });

    it("should call toast.promise with correct parameters", () => {
        const mockPromise = vi.fn().mockResolvedValue("test");
        toastService.Promise(
            mockPromise,
            {
                success: "Success",
                error: "Error",
                pending: "Pending..."
            },
            5000);
        expect(toast.promise).toHaveBeenCalledWith(
            mockPromise(),
            {
                pending: "Pending...",
                success: "Success",
                error: "Error"
            },
            defaultOptions);
    });
});
