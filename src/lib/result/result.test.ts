import { describe, expect, test } from "vitest";

import { Failure, Result, Success } from ".";

const data = [
    "",
    "data",
    {},
    { key: "value" },
    0,
    1,
    [],
    [""],
    [9],
    [{}],
    [{ key: "value" }],
    undefined,
    null,
];
const changedData = [
    "",
    "changed data",
    {},
    { key: "changed value" },
    0,
    1,
    [],
    [""],
    [9],
    [{}],
    [{ key: "changed value" }],
    undefined,
    null,
];

describe("Result lib", () => {
    describe("Success", () => {
        test("should return true when isSuccess is called", () => {
            const success = new Success("success");
            expect(success.isSuccess()).toBe(true);
        });
        test("should return false when isFailure is called", () => {
            const success = new Success("success");
            expect(success.isFailure()).toBe(false);
        });
        test("should return the data from the constructor when referenced the data property", () => {
            for (const d of data) {
                const success = new Success(d);
                expect(success.data).toBe(d);
            }
        });
        test("should return the data from the setData method", () => {
            for (let i = 0; i < data.length; i++) {
                const success = new Success(data[i]);
                expect(success.setData(changedData[i])).toBe(changedData[i]);
            }
        });
    });

    describe("Failure", () => {
        test("should return false when isSuccess is called", () => {
            const failure = new Failure("failure");
            expect(failure.isSuccess()).toBe(false);
        });
        test("should return true when isFailure is called", () => {
            const failure = new Failure("failure");
            expect(failure.isFailure()).toBe(true);
        });
        test("should return the data from the constructor when referenced the data property", () => {
            for (const d of data) {
                const failure = new Failure(d);
                expect(failure.data).toBe(d);
            }
        });
        test("should return the data from the setData method", () => {
            for (let i = 0; i < data.length; i++) {
                const failure = new Failure(data[i]);
                expect(failure.setData(changedData[i])).toBe(changedData[i]);
            }
        });
    });
});
