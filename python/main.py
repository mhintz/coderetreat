import random
import unittest

def randomState(): return round(random.random())

def willBirth(numn): return numn == 3

def willDie(numn): return numn < 2 or numn > 3

class Cell:
  def __init__(self, position, status, everyone):
    self.position = position
    self.status = status
    self.everyone = everyone

  def countNeighbors(self):
    # counts over everyone
    pass

  def getNextState(self):
    neighbors = self.countNeighbors()
    pass

class Plane:
  # Previous implementation
  # for x in range(size) for y in range(size):
  #   self.cells.append(Cell((x, y), randomState(), self))
  def __init__(self, size, statesList):
    self.cells = []
    for state, index in statesList:
      self.cells.append( Cell( (index % size, round(index / size)), state, self) )

  def update():
    pass


class TestCell(unittest.TestCase):

  def test_countNeighbors(self):
    testCell = Cell((1, 1), 1, Plane(3, [1, 1, 0, 1, 1, 1, 0, 1, 1]))
    self.assertEqual(testCell.countNeighbors(), 2)

  def test_getNextState_dead_to_alive(self):
    testCell = Cell((1, 1), 0, Plane(3, [1, 1, 0, 1, 1, 1, 0, 1, 1]))
    self.assertEqual(testCell.getNextState(), 1)

  def test_getNextState_alive_to_dead(self):
    testCell = Cell((1, 1), 1, Plane(3, [1, 1, 0, 1, 1, 1, 0, 1, 1]))
    self.assertEqual(testCell.getNextState(), 0)



unittest.main()
