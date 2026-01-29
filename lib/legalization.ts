export type LegalizationStatus = "ON_TIME" | "DUE_SOON" | "OVERDUE";

export interface LegalizationResult {
  status: LegalizationStatus;
  daysSinceStart: number;
  alertDay?: 20 | 25 | 29;
}

export function checkLegalizationDeadline(
  startDate: Date,
  currentDate: Date
): LegalizationResult {
  const msInDay = 1000 * 60 * 60 * 24;
  const diff = Math.floor((currentDate.getTime() - startDate.getTime()) / msInDay);
  const daysSinceStart = Math.max(diff, 0);

  if (daysSinceStart >= 30) {
    return { status: "OVERDUE", daysSinceStart };
  }

  if ([20, 25, 29].includes(daysSinceStart)) {
    return {
      status: "DUE_SOON",
      daysSinceStart,
      alertDay: daysSinceStart as 20 | 25 | 29
    };
  }

  return { status: "ON_TIME", daysSinceStart };
}
