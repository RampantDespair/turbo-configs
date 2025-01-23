import { describe, expect, test } from "@jest/globals";

describe("Sanity test", () => {
  test("1 should equal 1", () => {
    expect(1).toBe(1);
  });

  test("true should equal true", () => {
    expect(true).toBe(true);
  });
});
