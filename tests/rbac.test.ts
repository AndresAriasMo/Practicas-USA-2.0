import { describe, expect, it } from "vitest";
import { canAccessCase } from "@/lib/rbac";

describe("RBAC access", () => {
  it("allows coord within same school", () => {
    expect(
      canAccessCase({
        role: "COORD",
        scope: { schoolId: "school-1" },
        targetSchoolId: "school-1"
      })
    ).toBe(true);
  });

  it("denies director outside program", () => {
    expect(
      canAccessCase({
        role: "DIRECTOR",
        scope: { programId: "prog-1" },
        targetProgramId: "prog-2"
      })
    ).toBe(false);
  });
});
