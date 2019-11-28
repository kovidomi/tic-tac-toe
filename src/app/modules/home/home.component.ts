import { Component, OnInit } from '@angular/core';
import * as TicTacToe from 'tictactoejs';
import { Tile } from 'src/app/model/tile.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private game = new TicTacToe.TicTacToe();
  private currentStatus: String = "";

  private tilesArray: Tile[][];

  constructor() { }

  ngOnInit() {
    this.fillTiles();
    this.game.turn();
  }

  fillTiles() {
    this.tilesArray = [
      [new Tile("7"),new Tile("8"),new Tile("9")],
      [new Tile("4"),new Tile("5"),new Tile("6")],
      [new Tile("1"),new Tile("2"),new Tile("3")]
    ];
    this.mapBoardToTiles();
  }

  onReset() {
    this.game.reset();
    this.game.turn();
    this.fillTiles();
    this.currentStatus = "";
  }

  mapBoardToTiles() {
    let col = 0;
    let row = 0;
    let board: String = this.game.ascii2();

    for (let i = 0; i < board.length; i++) {
      if (board[i] === '.' || board[i] === 'X' || board[i] === 'O') {
        this.tilesArray[row][col].text = board[i];
        col++;
      } else if (board[i] === '\n') {
        row++;
        col = 0;
      }
    }
  }

  onItemClick(col, row) {
    this.game.moveArray(col, row);
    this.game.turn();
    this.mapBoardToTiles();

    if (this.game.gameOver() || this.game.isDraw()) {
      if (this.game.status() === 'X' || this.game.status() == 'O') {
        this.currentStatus = this.game.status() + " has won the game!"
        return
      }
      this.currentStatus = "Draw!"
    }
  }
}
