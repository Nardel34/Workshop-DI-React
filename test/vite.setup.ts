import "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom/vitest";
import {vi} from "vitest";

type TransProps = {
    i18nKey: string;
}

Object.assign(navigator, {
    clipboard: {
        writeText: vi.fn().mockResolvedValue(null),
    },
});

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
        i18n: {
            options: {
                resources: {
                    fr: {translation: {key: "mock-frKey"}},
                    en: {translation: {key: "mock-frKey"}}
                }
            },
            language: "en"
        }
    }),
    Trans: ({ i18nKey }: TransProps) => i18nKey
}));

vi.mock("i18next", () => ({
    default: {t: (key: string) => key}
}));