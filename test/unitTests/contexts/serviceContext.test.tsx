import {ServiceContext, ServiceProvider} from "@contexts/ServiceContext.tsx";
import {render, screen} from "@testing-library/react";
import {FC, useContext} from "react";
import {describe, expect, it} from "vitest";

const TestDiUseContext: FC = () => {
    const {httpService} = useContext(ServiceContext);
    return <div>{httpService ? "available" : "unavailable"}</div>;
};

describe("ServiceContext", () => {
    it("should provide httpService to children components", () => {
        render(
            <ServiceProvider>
                <TestDiUseContext/>
            </ServiceProvider>
        );
        expect(screen.getByText("available")).toBeInTheDocument();
    });
});
