export type DocumentStatus = "APPROVED" | "REJECTED";

export interface DocumentReviewInput {
  status: DocumentStatus;
  observation?: string | null;
}

export function reviewDocument(input: DocumentReviewInput) {
  if (input.status === "REJECTED" && !input.observation) {
    throw new Error("Observation is required when rejecting a document.");
  }

  return {
    status: input.status,
    observation: input.observation ?? null,
    isLocked: input.status === "APPROVED"
  };
}
