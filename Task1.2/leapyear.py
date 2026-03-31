'''
There is a leap year every year whose number is perfectly divisible by four -
except for years which are both divisible by 100 and not divisible by 400.
The second part of the rule effects century years.
For example; the century years 1600 and 2000 are leap years,
but the century years 1700, 1800, and 1900 are not.
'''

def to_leap_year(year):
    '''Python program to check if the input year is a leap year or not'''
    if not year:
        raise ValueError("No value given") 
    if not isinstance(year, int):
        raise ValueError("Input should be an integer")
    if not year > 0:
        raise ValueError("Input should be a positive integer")
    
    if not year % 4 and (year % 100 or not year % 400): # A ∧ (¬B ∨ C)
        print(year, "is a leap year")
        return True
    print(year, "is not a leap year")
    return False

if __name__ == '__main__':#pragma: no cover
    import argparse
    parser = argparse.ArgumentParser(description='Check if the input year is a leap year or not')
    parser.add_argument('year',type=int, help='The year to check')
    args = parser.parse_args()

    to_leap_year(args.year)


