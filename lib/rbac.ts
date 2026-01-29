export type Role =
  | "STUDENT"
  | "COORD"
  | "DIRECTOR"
  | "DEAN"
  | "EXEC"
  | "COMPLIANCE"
  | "COMPANY";

export interface Scope {
  schoolId?: string;
  programId?: string;
  companyId?: string;
}

export interface AccessContext {
  role: Role;
  scope: Scope;
  targetSchoolId?: string;
  targetProgramId?: string;
  targetCompanyId?: string;
}

export function canAccessCase(context: AccessContext) {
  const { role, scope, targetSchoolId, targetProgramId, targetCompanyId } =
    context;

  if (role === "EXEC") return true;

  if (role === "DEAN" || role === "COORD") {
    return !!scope.schoolId && scope.schoolId === targetSchoolId;
  }

  if (role === "DIRECTOR") {
    return !!scope.programId && scope.programId === targetProgramId;
  }

  if (role === "COMPANY") {
    return !!scope.companyId && scope.companyId === targetCompanyId;
  }

  if (role === "STUDENT") {
    return scope.schoolId === targetSchoolId && scope.programId === targetProgramId;
  }

  return false;
}
