CREATE TYPE "Role" AS ENUM ('STUDENT', 'COORD', 'DIRECTOR', 'DEAN', 'EXEC', 'COMPLIANCE', 'COMPANY');
CREATE TYPE "EmailType" AS ENUM ('PERSONAL', 'INSTITUTIONAL', 'CORPORATE');
CREATE TYPE "Stage" AS ENUM ('PREINDUCTION', 'ACADEMIC_CHECK', 'FORMALIZATION_DOCS', 'LEGALIZATION', 'EVALUATION_1', 'FOLLOW_UP', 'EVALUATION_2', 'DEFENSE', 'CLOSE');
CREATE TYPE "DocumentReviewStatus" AS ENUM ('APPROVED', 'REJECTED');
CREATE TYPE "TicketStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'CLOSED');
CREATE TYPE "CompanyStatus" AS ENUM ('WITH_AGREEMENT', 'PENDING_COMPLIANCE', 'APPROVED', 'REJECTED');

CREATE TABLE "User" (
  "id" TEXT PRIMARY KEY,
  "primaryEmail" TEXT NOT NULL UNIQUE,
  "passwordHash" TEXT NOT NULL,
  "role" "Role" NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "UserEmail" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "type" "EmailType" NOT NULL,
  "verifiedAt" TIMESTAMP(3),
  "isPrimary" BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE "School" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL
);

CREATE TABLE "Program" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "schoolId" TEXT NOT NULL
);

CREATE TABLE "StaffScope" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "schoolId" TEXT,
  "programId" TEXT
);

CREATE TABLE "PracticeCase" (
  "id" TEXT PRIMARY KEY,
  "studentId" TEXT NOT NULL,
  "schoolId" TEXT NOT NULL,
  "programId" TEXT NOT NULL,
  "currentStage" "Stage" NOT NULL DEFAULT 'PREINDUCTION',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "StageCheck" (
  "id" TEXT PRIMARY KEY,
  "caseId" TEXT NOT NULL,
  "stage" "Stage" NOT NULL,
  "status" TEXT NOT NULL,
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "DocumentType" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "isRequired" BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE "DocumentUpload" (
  "id" TEXT PRIMARY KEY,
  "caseId" TEXT NOT NULL,
  "documentTypeId" TEXT NOT NULL,
  "fileUrl" TEXT NOT NULL,
  "version" INTEGER NOT NULL DEFAULT 1,
  "hash" TEXT NOT NULL,
  "isLocked" BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "DocumentReview" (
  "id" TEXT PRIMARY KEY,
  "documentId" TEXT NOT NULL,
  "reviewerId" TEXT NOT NULL,
  "status" "DocumentReviewStatus" NOT NULL,
  "observation" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Company" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "status" "CompanyStatus" NOT NULL DEFAULT 'PENDING_COMPLIANCE',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "CompanyDocumentType" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "isRequired" BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE "CompanyDocumentUpload" (
  "id" TEXT PRIMARY KEY,
  "companyId" TEXT NOT NULL,
  "documentTypeId" TEXT NOT NULL,
  "fileUrl" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "CompanyComplianceReview" (
  "id" TEXT PRIMARY KEY,
  "companyId" TEXT NOT NULL,
  "reviewerId" TEXT NOT NULL,
  "status" "DocumentReviewStatus" NOT NULL,
  "observation" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Vacancy" (
  "id" TEXT PRIMARY KEY,
  "companyId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "salary" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "VacancyProgram" (
  "id" TEXT PRIMARY KEY,
  "vacancyId" TEXT NOT NULL,
  "programId" TEXT NOT NULL
);

CREATE TABLE "Application" (
  "id" TEXT PRIMARY KEY,
  "vacancyId" TEXT NOT NULL,
  "caseId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "PracticePlacement" (
  "id" TEXT PRIMARY KEY,
  "caseId" TEXT NOT NULL UNIQUE,
  "companyId" TEXT NOT NULL,
  "supervisorEmail" TEXT NOT NULL,
  "startDate" TIMESTAMP(3) NOT NULL,
  "endDate" TIMESTAMP(3),
  "city" TEXT NOT NULL,
  "modality" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Evaluation" (
  "id" TEXT PRIMARY KEY,
  "caseId" TEXT NOT NULL,
  "number" INTEGER NOT NULL,
  "score" DOUBLE PRECISION,
  "evaluatorEmail" TEXT NOT NULL,
  "submittedAt" TIMESTAMP(3)
);

CREATE TABLE "FollowUp" (
  "id" TEXT PRIMARY KEY,
  "caseId" TEXT NOT NULL,
  "notes" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Defense" (
  "id" TEXT PRIMARY KEY,
  "caseId" TEXT NOT NULL UNIQUE,
  "score" DOUBLE PRECISION,
  "juryNotes" TEXT,
  "scheduledAt" TIMESTAMP(3)
);

CREATE TABLE "ComplianceItem" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "semester" TEXT NOT NULL,
  "weight" DOUBLE PRECISION NOT NULL
);

CREATE TABLE "ComplianceScore" (
  "id" TEXT PRIMARY KEY,
  "caseId" TEXT NOT NULL,
  "itemId" TEXT NOT NULL,
  "score" DOUBLE PRECISION NOT NULL
);

CREATE TABLE "FinalGrade" (
  "id" TEXT PRIMARY KEY,
  "caseId" TEXT NOT NULL UNIQUE,
  "score" DOUBLE PRECISION,
  "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Ticket" (
  "id" TEXT PRIMARY KEY,
  "caseId" TEXT NOT NULL,
  "status" "TicketStatus" NOT NULL DEFAULT 'OPEN',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "TicketMessage" (
  "id" TEXT PRIMARY KEY,
  "ticketId" TEXT NOT NULL,
  "senderId" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Announcement" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "schoolId" TEXT,
  "programId" TEXT
);

CREATE TABLE "AuditLog" (
  "id" TEXT PRIMARY KEY,
  "action" TEXT NOT NULL,
  "entity" TEXT NOT NULL,
  "entityId" TEXT NOT NULL,
  "userId" TEXT,
  "ipAddress" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "EmailLog" (
  "id" TEXT PRIMARY KEY,
  "to" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "UserEmail" ADD CONSTRAINT "UserEmail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Program" ADD CONSTRAINT "Program_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "StaffScope" ADD CONSTRAINT "StaffScope_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StaffScope" ADD CONSTRAINT "StaffScope_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "StaffScope" ADD CONSTRAINT "StaffScope_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "PracticeCase" ADD CONSTRAINT "PracticeCase_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "PracticeCase" ADD CONSTRAINT "PracticeCase_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "PracticeCase" ADD CONSTRAINT "PracticeCase_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "StageCheck" ADD CONSTRAINT "StageCheck_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "PracticeCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DocumentUpload" ADD CONSTRAINT "DocumentUpload_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "PracticeCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DocumentUpload" ADD CONSTRAINT "DocumentUpload_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "DocumentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "DocumentReview" ADD CONSTRAINT "DocumentReview_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "DocumentUpload"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DocumentReview" ADD CONSTRAINT "DocumentReview_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "CompanyDocumentUpload" ADD CONSTRAINT "CompanyDocumentUpload_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CompanyDocumentUpload" ADD CONSTRAINT "CompanyDocumentUpload_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "CompanyDocumentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "CompanyComplianceReview" ADD CONSTRAINT "CompanyComplianceReview_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CompanyComplianceReview" ADD CONSTRAINT "CompanyComplianceReview_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Vacancy" ADD CONSTRAINT "Vacancy_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "VacancyProgram" ADD CONSTRAINT "VacancyProgram_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "VacancyProgram" ADD CONSTRAINT "VacancyProgram_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Application" ADD CONSTRAINT "Application_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Application" ADD CONSTRAINT "Application_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "PracticeCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PracticePlacement" ADD CONSTRAINT "PracticePlacement_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "PracticeCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PracticePlacement" ADD CONSTRAINT "PracticePlacement_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "PracticeCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "FollowUp" ADD CONSTRAINT "FollowUp_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "PracticeCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Defense" ADD CONSTRAINT "Defense_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "PracticeCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ComplianceScore" ADD CONSTRAINT "ComplianceScore_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "PracticeCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ComplianceScore" ADD CONSTRAINT "ComplianceScore_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "ComplianceItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "FinalGrade" ADD CONSTRAINT "FinalGrade_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "PracticeCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "PracticeCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TicketMessage" ADD CONSTRAINT "TicketMessage_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TicketMessage" ADD CONSTRAINT "TicketMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
