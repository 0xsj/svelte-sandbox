/*
 *9. Palindrome Number
Solved
Easy
Topics
Companies
Hint

Given an integer x, return true if x is a
palindrome
, and false otherwise.



Example 1:

Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.

Example 2:

Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

Example 3:

Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

  *
 *
 * **/

function palindromeTry1(x: number): boolean {
  if (x < 0) {
    return false;
  }

  let y = x.toString().split("").reverse().join("");
  return y === x.toString();
}

function palindromeTry2(x: number): boolean {
  if (x < 0) {
    return false;
  }

  let original = x;
  let reversed = 0;

  while (original > 0) {
    const digit = original % 10;
    reversed = reversed * 10 + digit;
    original = Math.floor(original / 10);
  }

  return x == reversed;
}

function palindromeTry3(x: number): boolean {
  const str = x.toString();
  function isPalindrome(start: number, end: number): boolean {
    if (start >= end) return true;
    if (str[start] !== str[end]) return false;
    return isPalindrome(start + 1, end - 1);
  }
  return isPalindrome(0, str.length - 1);
}

function palindromeTry4(x: number): boolean {
  function reverseNum(n: number, reversed: number = 0): number {
    if (n === 0) return reversed;
    const last = n % 10;
    const newReversed = reversed * 10 + last;
    return reverseNum(Math.floor(n / 10), newReversed);
  }
  if (x < 0) return false;
  return x === reverseNum(x);
}

console.log(palindromeTry1(121));
console.log(palindromeTry2(121));
