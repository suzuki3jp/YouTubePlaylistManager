import { describe, expect, test } from "vitest";

import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE, getSafeLang } from "./settings";

describe("getSafeLang", () => {
    test("should return the specified language if it is included in available languages", () => {
        for (const lang of AVAILABLE_LANGUAGES) {
            expect(getSafeLang(lang)).toBe(lang);
        }
    });

    test("should return the default language if the specified language is not included in available languages", () => {
        const unexpectedLangs = ["", "fr", [], {}, null, undefined];

        for (const lang of unexpectedLangs) {
            expect(getSafeLang(lang)).toBe(DEFAULT_LANGUAGE);
        }
    });
});
