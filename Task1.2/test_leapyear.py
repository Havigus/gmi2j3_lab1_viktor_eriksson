'''
Unit test for leapyear.py
Student version
'''

import unittest
import leapyear

known_values = ((1600, True), 
                (1700, False), 
                (1800, False), 
                (1900, False), 
                (1996, True), 
                (2000, True), 
                (2001, False), 
                (2002, False), 
                (2003, False),
                (2004, True),) 

class KnownValuesTest(unittest.TestCase):
    '''Confirm that known leap years are identified as leap years, and known non-leap years are not.'''
    def test_to_leap_year_known_values(self):
        for year in known_values:
            result = leapyear.to_leap_year(year[0])
            self.assertEqual(year[1], result)

class ToLeapYearBadInputsTest(unittest.TestCase):
    def test_none_input(self):
        '''to_leap_year should fail with None input'''
        self.assertRaises(ValueError, leapyear.to_leap_year, None)

    def test_0_as_input(self):
        '''to_leap_year should fail with 0 as input'''
        self.assertRaises(ValueError, leapyear.to_leap_year, 0)

    def test_negative_input(self):
        '''to_leap_year should fail with negative input'''
        self.assertRaises(ValueError, leapyear.to_leap_year, -1)

    def test_non_integer_input(self):
        '''to_leap_year should fail with non-integer input'''
        self.assertRaises(ValueError, leapyear.to_leap_year, 0.5)

    def test_string_input(self):
        '''to_leap_year should fail with string input'''
        self.assertRaises(ValueError, leapyear.to_leap_year, 'string')




if __name__ == '__main__':#pragma: no cover
    unittest.main()
