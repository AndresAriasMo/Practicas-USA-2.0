import { describe, expect, it } from "vitest";
import { reviewDocument } from "@/lib/documents";

describe("Document review", () => {
  it("locks approved documents", () => {
    expect(reviewDocument({ status: "APPROVED" }).isLocked).toBe(true);
  });

  it("requires observation on reject", () => {
    expect(() => reviewDocument({ status: "REJECTED" })).toThrowError();
  });
});
