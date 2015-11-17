extern crate rand;
use std::thread;
use std::time;

struct GameBoard {
  board_side: usize,
  storage: Vec<bool>,
}

impl GameBoard {
  fn new(board_side: usize, storage: Vec<bool>) -> GameBoard {
    GameBoard {
      board_side: board_side,
      storage: storage,
    }
  }

  fn rand(side_len: usize) -> GameBoard {
    let veclen: usize = side_len * side_len;
    let mut storage: Vec<bool> = Vec::with_capacity(veclen);

    for _ in 0..veclen {
      storage.push(rand::random::<bool>());
    }

    return GameBoard {
      board_side: side_len,
      storage: storage,
    };
  }

  fn get(& self, index: usize) -> bool { self.storage[index] }

  fn len(& self) -> usize { self.storage.len() }
}

fn add_row(index: i32, count: i32, row_len: usize, tot_len: usize) -> usize {
  let mut raw_idx: i32 = index + (count * (row_len as i32));
  let s_tot_len: i32 = tot_len as i32;
  if raw_idx < 0 {
    raw_idx = s_tot_len + raw_idx;
  }
  if raw_idx >= s_tot_len {
    raw_idx = raw_idx % s_tot_len;
  }
  return raw_idx as usize;
}

fn btoint(val: bool) -> u8 { if val { 1 } else { 0 } }

fn count_neighbors(index: usize, board: & GameBoard) -> u8 {
  let board_len = board.len();
  let board_side = board.board_side;
  let sindex: i32 = index as i32;
  return {
    btoint(board.get(add_row(sindex - 1, -1, board_side, board_len))) + // UL
    btoint(board.get(add_row(sindex, -1, board_side, board_len))) + // U
    btoint(board.get(add_row(sindex + 1, -1, board_side, board_len))) + // UR
    btoint(board.get(add_row(sindex - 1, 0, board_side, board_len))) + // L
    btoint(board.get(add_row(sindex + 1, 0, board_side, board_len))) + // R
    btoint(board.get(add_row(sindex - 1, 1, board_side, board_len))) + // BL
    btoint(board.get(add_row(sindex, 1, board_side, board_len))) + // B
    btoint(board.get(add_row(sindex + 1, 1, board_side, board_len))) // BR
  };
}

fn run_rule(value: bool, neighbors: u8) -> bool {
  return if value {
    neighbors == 2 || neighbors == 3
  } else {
    neighbors == 3
  }
}

fn update_board(board: GameBoard) -> GameBoard {
  let new_storage = board.storage.iter()
    .enumerate()
    .map(|(index, & cell)| {
      let num = count_neighbors(index, & board);
      return run_rule(cell, num);
    })
    .collect::<Vec<bool>>();
  return GameBoard::new(board.board_side, new_storage);
}

fn print_board(board: & GameBoard) {
  let mut printed = String::new();
  for (count, & cell) in board.storage.iter().enumerate() {
    printed.push_str(if cell { "# " } else { ". " });

    if (count + 1) % board.board_side == 0 {
      printed.push('\n');
    }
  }
  println!("{}", printed);
}

#[test]
fn t_new_board() {
  assert!(GameBoard::rand(200).storage.len() == 200 * 200);
}

fn main() {
  const BOARD_SIDE: usize = 30;
  let mut main_board = GameBoard::rand(BOARD_SIDE);
  loop {
    main_board = update_board(main_board);
    print_board(& main_board);
    thread::sleep(time::Duration::from_millis(500));
  }
}
