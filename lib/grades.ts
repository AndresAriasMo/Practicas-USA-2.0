export interface GradeInputs {
  evaluation1: number | null;
  evaluation2: number | null;
  defense: number | null;
  compliance: number | null;
}

export function calculateFinalScore(inputs: GradeInputs) {
  const { evaluation1, evaluation2, defense, compliance } = inputs;

  if ([evaluation1, evaluation2, defense, compliance].some((value) => value == null)) {
    return { score: null, complete: false };
  }

  const score =
    evaluation1 * 0.35 +
    evaluation2 * 0.35 +
    defense * 0.2 +
    compliance * 0.1;

  return { score: Number(score.toFixed(2)), complete: true };
}
