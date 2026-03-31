const max = 1000;   // Set upper bounds
const min = 0;      // Set lower bounds
let check4prime;    // global object

function init() {
  check4prime = new Check4Prime();
  check4prime.init();
}

class Check4Prime {

  constructor() {
    this.primeBucket = new Array(max + 1);
  }

  init() {
    // Initialize all elements to true, non-primes will be set to false later
    for (let i = 2; i <= max; i++) {
      this.primeBucket[i] = true;
    }
    // Do all multiples of 2 first
    let j = 2;
    for (let i = j + j; i <= max; i = i + j) { // start with 2j as 2 is prime
      this.primeBucket[i] = false; // set all multiples of 2 to false
    }

    for (j = 3; j <= Math.sqrt(max); j = j + 2) { // begin from 3 up to max
      if (this.primeBucket[j] == true) { // only do if primeBucket[j] is still a prime (not a multiple of 3, 5, 7, ...)
        for (let i = j + j; i <= max; i = i + j) { // start with 2j as j is a prime
          this.primeBucket[i] = false; // set all multiples of the prime to false
        }
      }
    }
  }
  primeCheck(num) {
    return this.primeBucket[num] === true;
  }


  /*
  Method to validate input
  */
  checkArgs() {
    /*
    for (var i=0; i < arguments.length; i++)
        console.log(arguments[i]);
    */

    // Check arguments for correct number of parameters if not throw new Error();
    if (arguments.length != 1) {
      throw new Error();
    }
    else {
      // If undefined throw new Error();
      if (arguments[0] === undefined)
        throw new Error();

      // If zero/empty throw new Error();
      if (arguments[0] === '' || arguments[0] === null)
        throw new Error();

      // Get integer from character
      let input = Number(arguments[0]);

      // Is not integer? throw new Error();
      if (isNaN(input))
        throw new Error();

      // If not a number throw new Error();
      if (!Number.isInteger(input))
        throw new Error();

      // If less than lower bounds throw new Error();
      if (input < min)
        throw new Error();

      if (input > max)   // If greater than upper bounds throw new Error();
        throw new Error();
    }
  }
} // end Check4Prime class



/*
do the automated tests cases when developer performs test
*/
function checkTest(num) {
  document.querySelector('#output').innerHTML = ''; // clear previous test results

  // this function is only called with true or false when
  // the developer performs the tests which becomes pass or fail
  //assert(num, "description");

  // run various automated tests
  test_Check4Prime_known_true();
  test_Check4Prime_known_false();
  test_Check4Prime_checkArgs_neg_input();
  test_Check4Prime_checkArgs_above_upper_bound();
  test_Check4Prime_checkArgs_char_input();
  test_Check4Prime_checkArgs_2_inputs();
  test_Check4Prime_checkArgs_zero_input();
  test_Check4Prime_checkArgs_undefined_input();
  test_Check4Prime_checkArgs_non_integer_input();
}

/*
do the check for prime when ordinary user is running solution, you can merge this function with checkTest() if you want
*/
function check(num) {
  checkTest(num) // when code is in production mode running the tests cases is commented away

  try {
    check4prime.checkArgs(num);
    // check4prime.checkArgs(parseInt(num));
    // either use this assertion or the alert box for output
    //assert(check4prime.primeCheck(num), description)
    alert(`Is number ${num} a prime? ${check4prime.primeCheck(num)}`)
  }
  catch (err) {
    let description = `Input/number: ${num}. Error in checkArgs()`;
    alert(description);
    // assert(check4prime.primeCheck(num), description);
  }
}


/*
append test result in list on web page
*/
function assert(outcome, description) {
  let output = document.querySelector('#output');
  let li = document.createElement('li');
  li.className = outcome ? 'pass' : 'fail';
  li.appendChild(document.createTextNode(description));
  output.appendChild(li);
}

/*
Test methods, recommended naming convention
(Test)_MethodToTest_ScenarioWeTest_ExpectedBehaviour
In test method the pattern we use is "tripple A"
Arrange, Act and Assert
*/


// Test case 1, check known true primes
function test_Check4Prime_known_true() {
  // The arrangement below is called tripple A

  // Arrange - here we initialize our objects
  let knownTrue = new Array(3, 17, 29, 997)

  // Act - here we act on the objects
  for (let num of knownTrue) {
    // Assert - here we verify the result
    assert(check4prime.primeCheck(num), `Test for known true primes with: ${num}`)
  }
}

// Test case 2, check known false primes
function test_Check4Prime_known_false() {
  let knownFalse = new Array(4, 18, 30, 1000)

  for (let num of knownFalse) {
    assert(!check4prime.primeCheck(num), `Test for known false primes with: ${num}`)
  }

}

// Test case 3, check negative input
function test_Check4Prime_checkArgs_neg_input() {
  try {
    check4prime.checkArgs(-1);
    assert(false, `Test for negative input: -1`);
  } catch (err) {
    assert(true, `Test for negative input: -1`);
  }
}
// Test case 4, check for upper bound limit
function test_Check4Prime_checkArgs_above_upper_bound() {
  let description = `Test for upper bound limit: 1001`;
  try {
    // the check4prime.checkArgs() method should throw an error if the input is above the upper bound limit
    // otherwise, the primeCheck method should return false
    check4prime.checkArgs(1001);
    assert(check4prime.primeCheck(1001), description);
  }
  catch (err) {
    // if an error is thrown, then the input is above the upper bound limit and this line is executed
    // since the method is expected to throw an error, the primeCheck method should return false
    // if our test case was successful to detect if the input was above the upper bound, true is sent to the assert method
    // in other words, our test case was successful if the error was thrown and the primeCheck method returned false
    // return either
    // assert(!check4prime.primeCheck(1001), description);
    // or
    assert(true, description);
  }
}

// Test case 5, check for char input
function test_Check4Prime_checkArgs_char_input() {
  try {
    check4prime.checkArgs('a');
    assert(false, `Test for char input: 'a'`);
  } catch (err) {
    assert(true, `Test for char input: 'a'`);
  }

}

// Test case 6, check for more than one input
function test_Check4Prime_checkArgs_2_inputs() {
  try {
    check4prime.checkArgs(1, 2);
    assert(false, `Test for more than one input: 1, 2`);
  } catch (err) {
    assert(true, `Test for more than one input: 1, 2`);
  }
}

// Test case 7, check for zero/empty input
function test_Check4Prime_checkArgs_zero_input() {
  try {
    check4prime.checkArgs();
    assert(false, `Test for zero/empty input: `);
  } catch (err) {
    assert(true, `Test for zero/empty input: `);
  }
}

// Test case 8, check for undefined input
function test_Check4Prime_checkArgs_undefined_input() {
  try {
    check4prime.checkArgs(undefined);
    assert(false, `Test for undefined input: undefined`);
  } catch (err) {
    assert(true, `Test for undefined input: undefined`);
  }
}

// Test case 9, check for non-integer input
function test_Check4Prime_checkArgs_non_integer_input() {
  try {
    check4prime.checkArgs(3.33);
    assert(false, `Test for non-integer input: 3.33`);
  } catch (err) {
    assert(true, `Test for non-integer input: 3.33`);
  }
}
