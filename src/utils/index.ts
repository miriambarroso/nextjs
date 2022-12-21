export function classNames(...classes: any[]): string {
  return classes.filter(Boolean).join(' ');
}

export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}
