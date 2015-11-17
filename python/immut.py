import unittest
import random

def randState(): return random.randint(0, 1)

def getBoard(side): return map(lambda x: map(lambda y: randState(), range(side)), range(side))

  return [randState() for x in range(side) for y in range(side)]

class Tests():
  def test_board(self):


