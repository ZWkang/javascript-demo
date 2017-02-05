// Is Prime

// Define a function isPrime that takes one integer argument and returns true or false depending on if the integer is a prime.

// Per Wikipedia, a prime number (or a prime) is a natural number greater than 1 that has no positive divisors other than 1 and itself.

// Example

// isPrime(5)
// => true
// Assumptions

// You can assume you will be given an integer input.
// You can not assume that the integer will be only positive. You may be given negative numbers.
// Bug!
// The Haskell version uses a wrong test case, where negative primes should also return True, e.g. it expects isPrime (-2) == True. Use abs or similar measures to take care of negative numbers. The test cases cannot get changed at this point. Sorry for the inconvenience.
function isPrime(num) {
  for (var i = 2; i < num; i++) if (num % i == 0) return false;
  return num >= 2; 
}

function isPrime(n) {
  if (n <= 1)
    return false;
  if (n <= 3 || n == 5 || n == 7 || n == 11)
    return true;
  if (n % 2 === 0 || n % 3 === 0)
    return false;
  for (var i = 5; i <= Math.pow(n, 0.5); i += 6)
    if (n % i === 0 || n % (i + 2) === 0)
      return false;
  return true;
}
