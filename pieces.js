class Piece {
    constructor(color) {

        if (color !== 0 && color !== 1) {
            console.log("this.color is :", this.color)
            throw "Please provide a valid color---0 for white and 1 for black";
        }

        this.color = color;
    }

    isIllegalMove(x1, y1, x2, y2) {
        if (x1 < 0 || x1 > 7 || x2 < 0 || x2 > 7 || y1 < 0 || y1 > 7 || y2 < 0 || y2 > 7) {
            return true
        }

        if (x1 == x2 && y1 == y2) {
            return true;
        }
    }

    isPieceinBetween(state, xi, yi, xf, yf) {
        console.log(xi, yi, xf, yf)
        if (Math.abs((xi - xf) / (yi - yf)) == 1) {
            let signX = Math.sign(xf - xi);
            let signY = Math.sign(yf - yi);
            for (let i = signX * xi + 1, j = signY * yi + 1; i < signX * xf && j < signY * yf; i++ , j++) {
                if (state[signX * i][signY * j]) {
                    return true;
                }
            }
        }

        if (xf < xi) {
            let temp = xf;
            xf = xi;
            xi = temp;
        }

        if (yf < yi) {
            let temp = yf;
            yf = yi;
            yi = temp;
        }


        if (xi == xf) {
            //rook type movement
            for (let i = yi + 1; i < yf; i++) {
                if (state[xi][i]) {
                    return true;
                }
            }
        }

        if (yi == yf) {
            //rook type movement
            for (let i = xi + 1; i < xf; i++) {
                if (state[i][yi]) {
                    return true;
                }
            }
        }
    }
}

class rook extends Piece {
    constructor(color) {
        super(color)
        this.letter = this.color ? 'r' : 'R';
        this.moved = false;
    }

    isIllegalMove(x1, y1, x2, y2) {
        if (super.isIllegalMove(x1, y1, x2, y2)) {
            return true
        }

        if (x1 != x2 && y1 != y2)
            return true;
    }

    makeMove(board, xi, yi, xf, yf) {
        if (this.isIllegalMove(xi, yi, xf, yf)) {
            return null;
        }
        if (super.isPieceinBetween(board.state, xi, yi, xf, yf))
            return null;

        this.moved = true;
        let currState = board.state;
        currState[xi][yi] = null;
        currState[xf][yf] = this;
        return currState;
    }
}

class knight extends Piece {
    constructor(color) {
        super(color)
        this.letter = this.color ? 'n' : 'N'
    }

    isIllegalMove(x1, y1, x2, y2) {
        if (super.isIllegalMove(x1, y1, x2, y2)) {
            return true
        }

        if (!(Math.abs(x2 - x1) == 2 && Math.abs(y2 - y1) == 1) && !(Math.abs(x2 - x1) == 1 && Math.abs(y2 - y1) == 2)) {
            return true;
        }
    }

    makeMove(board, xi, yi, xf, yf) {
        if (this.isIllegalMove(xi, yi, xf, yf)) {
            return null;
        }
        let currState = board.state;
        currState[xi][yi] = null;
        currState[xf][yf] = this;
        return currState;
    }
}

class bishop extends Piece {
    constructor(color) {
        super(color)
        this.letter = this.color ? 'b' : 'B'
    }

    isIllegalMove(x1, y1, x2, y2) {
        if (super.isIllegalMove(x1, y1, x2, y2)) {
            console.log("this move is illegal in general")
            return true
        }

        if (y2 - y1 == 0)
            return true;

        if (Math.abs((x1 - x2) / (y1 - y2)) != 1)
            return true;
    }

    makeMove(board, xi, yi, xf, yf) {
        console.log("trying to move bishop")
        if (this.isIllegalMove(xi, yi, xf, yf)) {
            console.log("this move is illegal")
            return null;
        }
        if (super.isPieceinBetween(board.state, xi, yi, xf, yf)) {
            console.log("we found a Piece in the way of bishop")
            return null;
        }
        this.moved = true;
        let currState = board.state;
        currState[xi][yi] = null;
        currState[xf][yf] = this;
        return currState;
    }
}

class queen extends Piece {
    constructor(color) {
        super(color)
        this.letter = this.color ? 'q' : 'Q'
    }

    isIllegalMove(x1, y1, x2, y2) {
        console.log("checking if queen move was illegal")
        if (super.isIllegalMove(x1, y1, x2, y2)) {
            return true
        }

        console.log("checking if queen made a general illegal move")

        // if(y2-y1==0)
        //     return true;
        if (Math.abs((x1 - x2) / (y1 - y2)) != 1 && (x1 != x2 && y1 != y2)) {
            return true
        }

    }

    makeMove(board, xi, yi, xf, yf) {
        if (this.isIllegalMove(xi, yi, xf, yf)) {
            return null;
        }
        if (super.isPieceinBetween(board.state, xi, yi, xf, yf))
            return null;

        this.moved = true;
        let currState = board.state;
        currState[xi][yi] = null;
        currState[xf][yf] = this;
        return currState;
    }
}

class king extends Piece {
    constructor(color) {
        super(color)
        this.letter = this.color ? 'k' : 'K'
        this.moved = false;
    }

    isIllegalMove(x1, y1, x2, y2) {
        if (super.isIllegalMove(x1, y1, x2, y2)) {
            return true
        }
        if (Math.abs(x1 - x2) > 1 || Math.abs(y1 - y2) > 1) {
            return true;
        }
    }

    makeMove(board, xi, yi, xf, yf) {
        let castle = false
        if (xi == 0 && yi == 4) {
            if (xf == 0 && (yf == 6 || yf == 2))
                castle = true
        }
        if (xi == 7 && yi == 4)
            if (xf == 7 && (yf == 6 || yf == 2)) {
                castle = true
            }
        if (castle) {
            this.castle(board, xi, yi, xf, yf)
        } else if (this.isIllegalMove(xi, yi, xf, yf, castle)) {
            console.log("you cant castle for some reason")
            return null;
        }

        this.moved = true;
        let currState = board.state;
        currState[xi][yi] = null;
        currState[xf][yf] = this;
        return currState;
    }

}

class pawn extends Piece {
    constructor(color) {
        super(color)
        this.letter = this.color ? 'p' : 'P'
    }

    isIllegalMove(x1, y1, x2, y2, capture) {
        if (super.isIllegalMove(x1, y1, x2, y2)) {
            return true
        }

        let sign = 1;
        if (this.color === 1) {
            sign = sign * -1;
        }

        if (!capture) {
            if (y1 != y2) {
                return true;
            }

            if (x1 == 1 && this.color === 0) {
                if (x2 != 2 && x2 != 3) {
                    return true;
                }
            }
            else if (x1 == 6 && this.color === 1) {
                if (x2 != 5 && x2 != 4) {
                    return true;
                }
            }
            else if (x2 - x1 != sign) {
                return true;
            }

        }
        else {
            if (x2 - x1 != sign)
                return true;

            if (Math.abs(y1 - y2) != 1) {
                return true;
            }
        }
    }

    makeMove(board, xi, yi, xf, yf) {
        let capture = false;
        if (board.state[xf] && board.state[xf][yf]) {
            capture = true;
        }
        if (this.isIllegalMove(xi, yi, xf, yf, capture)) {
            return null;
        }

        this.moved = true;
        let currState = board.state;
        currState[xi][yi] = null;
        currState[xf][yf] = this;
        if (currState[xf][yf].letter == 'p') {
            console.log('wtfwtfwtfwtfwtfwtfwtfwtfwtfwtfwtfwtf', xf)
            if (xf == 0) {
                console.log('now this was supposed to eb a promotion')
                if (confirm("do you want to promote to a queen")) {
                    currState[xf][yf] = new queen(1)
                } else if (confirm("do you want to promote to a rook")) {
                    currState[xf][yf] = new rook(1)
                } else if (confirm("do you want to promote to a knight")) {
                    currState[xf][yf] = new knight(1)
                } else if (confirm("do you want to promote to a bishop")) {
                    currState[xf][yf] = new bishop(1)
                }

            }

        }
        else if (currState[xf][yf].letter == 'P') {
            console.log('WTFWTFWTFWTFWTFWTFWTFWTFWTFWTFWTFWTF', xf)
            if (xf == 7) {
                console.log('now this was supposed to eb a promotion')
                if (confirm("do you want to promote to a queen")) {
                    currState[xf][yf] = new queen(0)
                } else if (confirm("do you want to promote to a rook")) {
                    currState[xf][yf] = new rook(0)
                } else if (confirm("do you want to promote to a knight")) {
                    currState[xf][yf] = new knight(0)
                } else if (confirm("do you want to promote to a bishop")) {
                    currState[xf][yf] = new bishop(0)
                }
            }

        }
        return currState;
    }
}


