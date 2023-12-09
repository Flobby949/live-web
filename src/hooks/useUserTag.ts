export function useTagContains(tag: number, target: number) {
  return (tag & target) === target
}
