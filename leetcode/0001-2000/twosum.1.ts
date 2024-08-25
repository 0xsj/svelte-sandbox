// 1. Two Sum
// Solved
// Easy
// Topics
// Companies
// Hint

// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.

// Example 1:

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

// Example 2:

// Input: nums = [3,2,4], target = 6
// Output: [1,2]

// Example 3:

// Input: nums = [3,3], target = 6
// Output: [0,1]j
//

const nums = [2, 7, 9, 16];
const target = 9;

function twoSum1(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [0, 0];
}

function twoSum2(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const diff = target - num;

    if (map.has(diff)) {
      return [map.get(diff)!, i];
    }

    map.set(num, i);
  }
  return [];
}

function twoSum3(nums: number[], target: number): number[] | undefined {
  function findPair(
    start: number,
    visited: Map<number, number>
  ): number[] | undefined {
    if (start >= nums.length) return undefined;
    const current = nums[start];
    const complement = target - current;

    if (visited.has(complement)) return [visited.get(complement)!, start];
    visited.set(current, start);

    return findPair(start + 1, visited);
  }
  return findPair(0, new Map<number, number>());
}

console.log(twoSum2(nums, target));
