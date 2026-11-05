/**
 * Return the indices of the two numbers in `nums` that add up to `target`.
 * Exactly one valid pair exists; the same element can't be used twice.
 */
export function twoSum(nums: number[], target: number): [number, number] {
  const map = new Map<number, number>();

  for (const [index, num] of nums.entries()) {
    const partner = target - num;
    if (map.has(partner)) {
      const partnerIndex = map.get(partner);
      if (partnerIndex !== undefined) {
        return [partnerIndex, index];
      }
    }
    map.set(num, index);
  }
  throw new Error('No partner found');
}

twoSum([3, 3], 6);
