function isKingChecked(state, turn) {
    console.log("turn", turn)
    if (!state)
        throw "The state was empty";
    let whiteKing = {};
    let blackKing = {};
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (state[i][j] && state[i][j].letter == 'k') {
                blackKing = {
                    x: i,
                    y: j,
                    color: 1
                }
            }
            if (state[i][j] && state[i][j].letter == 'K') {
                whiteKing = {
                    x: i,
                    y: j,
                    color: 0
                }
            }
        }
    }

    let kings = [blackKing, whiteKing];
    king = kings[1 * (!turn)];
    let i, j;
    for (i = king.x + 1, j = king.y + 1; i < 8 && j < 8; i++ , j++) {
        if (state[i][j]) {
            break;
        }
    }
    if (i < 8 && j < 8) {
        if (state[i][j].color != king.color) {
            return true;
        }
    };

    for (i = king.x - 1, j = king.y + 1; i >= 0 && j < 8; i-- , j++) {
        if (state[i][j]) {
            break;
        }
    }
    if (i >= 0 && j < 8) {
        if (state[i][j].color != king.color) {
            return true;
        }
    };

    for (i = king.x - 1, j = king.y - 1; i >= 0 && j >= 0; i-- , j--) {
        if (state[i][j]) {
            break;
        }
    }
    if (i >= 0 && j >= 0) {
        if (state[i][j].color != king.color) {
            return true;
        }
    };

    for (i = king.x + 1, j = king.y - 1; i < 8 && j >= 0; i++ , j--) {
        if (state[i][j]) {
            break;
        }
    }
    if (i < 8 && j >= 0) {
        if (state[i][j].color != king.color) {
            return true;
        }
    };



    for (i = king.x, j = king.y; i < 8; i++) {
        if (state[i][j]) {
            break;
        }
    }
    if (i < 8) {
        if (state[i][j].color != king.color) {
            return true;
        }
    };

    for (i = king.x, j = king.y; j < 8; j++) {
        if (state[i][j]) {
            break;
        }
    }
    if (j < 8) {
        if (state[i][j].color != king.color) {
            return true;
        }
    };

    for (i = king.x, j = king.y; i >= 0; i--) {
        if (state[i][j]) {
            break;
        }
    }
    if (i >= 0) {
        if (state[i][j].color != king.color) {
            return true;
        }
    };

    for (i = king.x, j = king.y; j >= 0; j--) {
        if (state[i][j]) {
            break;
        }
    }
    if (j >= 0) {
        if (state[i][j].color != king.color) {
            return true;
        }
    };
    //write an algorithm to check if there is a piece attacking the king
    return false;
}

let colorScheme = {
    light: '#4CAF50',
    dark: '#D9F7DA',
    piece: '#000000'
}

class board {
    constructor(ctx, height, width) {
        console.log("A new board has been created")
        self = this;
        this.context = ctx;
        this.drawSquares = function () {
            let i = 0, j = 0;
            ctx.fillStyle = colorScheme.dark;
            ctx.moveTo(0, 0);
            ctx.lineTo(0, 800);
            ctx.stroke();
            ctx.lineTo(800, 800);
            ctx.stroke();
            ctx.lineTo(800, 0);
            ctx.stroke();
            ctx.lineTo(0, 0);
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = colorScheme.dark;
            for (i = 0; i < 900; i = i + 100) {
                for (j = 0; j < 900; j = j + 100) {
                    if ((i + j) % 200)
                        ctx.fillRect(i, j, 100, 100);
                }
            }
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = colorScheme.light;
            for (i = 0; i < 900; i = i + 100) {
                for (j = 0; j < 900; j = j + 100) {
                    if (!((i + j) % 200))
                        ctx.fillRect(i, j, 100, 100);
                }
            }
            ctx.closePath();

        };


        this.drawSquares();
        this.initialState = [
            [new rook(0), new knight(0), new bishop(0), new queen(0), new king(0), new bishop(0), new knight(0), new rook(0)],
            [new pawn(0), new pawn(0), new pawn(0), new pawn(0), new pawn(0), new pawn(0), new pawn(0), new pawn(0)],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [new pawn(1), new pawn(1), new pawn(1), new pawn(1), new pawn(1), new pawn(1), new pawn(1), new pawn(1)],
            [new rook(1), new knight(1), new bishop(1), new queen(1), new king(1), new bishop(1), new knight(1), new rook(1)]
        ]
        this.state = this.initialState;
        this.states = [];
        this.moves = [];
        this.states.push(this.state);
        this.drawState(this.state);

        this.move = 0;
        this.turn = 0;
        this.whiteKing = { x: 0, y: 4 };
        this.blackKing = { x: 7, y: 4 };
        this.castle = { black: false, white: false };
    }

    drawState(state) {
        let ctx = this.context;
        ctx.clearRect(0, 0, 800, 800);
        this.drawSquares();
        ctx.beginPath();
        ctx.fillStyle = colorScheme.piece;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (state[i][j]) {
                    let img = new Image;
                    img.src = `http://images.chesscomfiles.com/chess-themes/pieces/neo/128/${(state[i][j].color ? 'b' : 'w') + state[i][j].letter.toLowerCase()}.png`;
                    img.onload = function () {
                        ctx.drawImage(img, i * 100, j * 100, 100, 100);
                    };

                }
            }
        }

        ctx.closePath();
    }

    makemove(xi, yi, xf, yf) {
        let moveType = 'move';
        let piece = this.state[xi][yi];
        if (this.state[xf][yf])
            moveType = 'capture'
        if (!piece) {
            return;
        }

        let canMove = this.validateMove(piece, xi, yi, xf, yf);
        if (!canMove)
            return
        let newState = piece.makeMove(this, xi, yi, xf, yf);
        console.log("newState", newState)
        if (this.checkMove(newState)) {
            this.states.push(this.state);
            this.state = newState;
            this.drawState(newState)
            this.turn = +(!this.turn);
            var audio = new Audio(`sound/move.wav`);
            audio.play();
            if (moveType == 'capture')
                window.setTimeout(() => { audio.play() }, 150)
            if (this.turn)
                this.move++;

            console.log(this.move + " was the number of move played and the next turn is for player " + this.turn);
        }
        else {
            console.log("illegal move!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            return;
        }
    }

    validateMove(piece, xi, yi, xf, yf) {

        if ((piece.color !== this.turn)) {
            console.log("it is not your turn");
            return false;
        }

        if (this.state[xf] && this.state[xf][yf]) {
            if (this.state[xi][yi].color == this.state[xf][yf].color) {
                console.log("you cannot capture your own piece");
                return false;
            }
        }
        return true;
    }

    checkMove(state) {
        if (!state)
            return false;
        if (isKingChecked(state, this.turn)) {
            return false;
        }
        return true
    }
}

$(document).ready(function () {
    let canvas = document.getElementById("board");
    var ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    let myBoard = new board(ctx, 800, 800);
    let moveCordinates = {
        startX: null,
        startY: null,
        endX: null,
        endY: null,
    }

    document.getElementById("board").addEventListener("dragstart", function (e) {
        moveCordinates.startX = e.layerX;
        moveCordinates.startY = e.layerY;
        moveCordinates.endX = null;
        moveCordinates.endY = null;
    }, false);

    document.getElementById("board").addEventListener("dragend", function (e) {
        moveCordinates.endX = e.layerX;
        moveCordinates.endY = e.layerY;
        if (moveCordinates.startX && moveCordinates.startY && moveCordinates.endX && moveCordinates.endY) {
            let x1 = parseInt(moveCordinates.startX / 100);
            let y1 = parseInt(moveCordinates.startY / 100);
            let x2 = parseInt(moveCordinates.endX / 100);
            let y2 = parseInt(moveCordinates.endY / 100);
            myBoard.makemove(x1, y1, x2, y2);
            moveCordinates = {
                startX: null,
                startY: null,
                endX: null,
                endY: null,
            }
        }
    }, false);

    document.getElementById("board").addEventListener("click", function (e) {
        console.log(e.layerX, e.layerY);
        if (!moveCordinates.startX) {
            moveCordinates.startX = e.layerX;
            moveCordinates.startY = e.layerY;
            moveCordinates.endX = null;
            moveCordinates.endY = null;
        } else {
            moveCordinates.endX = e.layerX;
            moveCordinates.endY = e.layerY;
            if (moveCordinates.startX && moveCordinates.startY && moveCordinates.endX && moveCordinates.endY) {
                let x1 = parseInt(moveCordinates.startX / 100);
                let y1 = parseInt(moveCordinates.startY / 100);
                let x2 = parseInt(moveCordinates.endX / 100);
                let y2 = parseInt(moveCordinates.endY / 100);
                if (x1 == x2 && y1 == y2) {
                    moveCordinates = {
                        startX: e.layerX,
                        startY: e.layerY,
                        endX: null,
                        endY: null,
                    }
                }
                else {
                    myBoard.makemove(x1, y1, x2, y2);
                    moveCordinates = {
                        startX: null,
                        startY: null,
                        endX: null,
                        endY: null,
                    }
                }
            }
        }
    }, false);

});