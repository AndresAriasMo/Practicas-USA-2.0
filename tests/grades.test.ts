import { describe, expect, it } from "vitest";
import { calculateFinalScore } from "@/lib/grades";

describe("Final grade calculation", () => {
  it("calculates weighted score", () => {
    const result = calculateFinalScore({
      evaluation1: 4,
      evaluation2: 4.5,
      defense: 4.2,
      compliance: 5
    });

    expect(result.score).toBe(4.4);
    expect(result.complete).toBe(true);
  });

  it("returns null when missing inputs", () => {
    const result = calculateFinalScore({
      evaluation1: null,
      evaluation2: 4,
      defense: 4,
      compliance: 4
    });

    expect(result.score).toBeNull();
    expect(result.complete).toBe(false);
  });
});
