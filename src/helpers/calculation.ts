export function calculatePercentageChange(
  previousValue: number,
  currentValue: number
): number {
  const change = currentValue - previousValue;
  const percentageChange = (change / Math.abs(previousValue)) * 100;
  return percentageChange;
}
export function getLastMonthPercentage(
  lastMonthPayments: number,
  allTimePayments: number
): number {
  const percentage = (lastMonthPayments / allTimePayments) * 100;
  return percentage;
}
