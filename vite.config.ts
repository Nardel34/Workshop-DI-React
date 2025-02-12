/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react-swc";
import path from "path";
import {defineConfig} from "vite";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@hooks": path.resolve(__dirname, "./src/hooks/index.ts"),
            "@services": path.resolve(__dirname, "./src/services/index.ts"),
            "@interfaces/services": path.resolve(__dirname, "./src/interfaces/services/index.ts"),
            "@types": path.resolve(__dirname, "./src/types/index.ts"),
            "@contexts": path.resolve(__dirname, "./src/contexts"),
            "@components": path.resolve(__dirname, "./src/components/index.ts"),
            "~": path.resolve(__dirname, "./"),
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./test/vite.setup.ts",
        env: {
            IS_REACT_ACT_ENVIRONMENT: "true",
        },
        include: ["test/**/*.test.[jt]s?(x)"],
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
            include: ["src/*"],
            exclude: [
                "src/interfaces/*",
                "src/types/*",
                "src/main.tsx",
                "src/vite-env.d.ts",
            ],
        },
    },
});
