import { describe, expect, it } from "vitest";
import { checkLegalizationDeadline } from "@/lib/legalization";

describe("Legalization deadline", () => {
  it("flags alert on day 25", () => {
    const start = new Date("2024-01-01T00:00:00Z");
    const current = new Date("2024-01-26T00:00:00Z");

    const result = checkLegalizationDeadline(start, current);

    expect(result.status).toBe("DUE_SOON");
    expect(result.alertDay).toBe(25);
  });

  it("marks overdue after 30 days", () => {
    const start = new Date("2024-01-01T00:00:00Z");
    const current = new Date("2024-02-05T00:00:00Z");

    const result = checkLegalizationDeadline(start, current);

    expect(result.status).toBe("OVERDUE");
  });
});
