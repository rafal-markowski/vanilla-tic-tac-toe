export default class OX {
    private readonly combinations:number[][];
    private readonly player1:string[];
    private readonly player2:string[];
    private p1Moves:number[];
    private p2Moves:number[];
    private winningFields:number[];
    private readonly game:HTMLElement;
    private readonly gameClass:string;
    private readonly gameFields:NodeList;
    private readonly gameFieldClass:string;
    private round:number;

    constructor({player1, player2, game, gameClass, gameFields, gameFieldClass}:{player1:string[], player2:string[], game:HTMLElement, gameClass:string, gameFields:NodeList, gameFieldClass:string}) {
        this.player1 = player1;
        this.player2 = player2;
        this.game = game;
        this.gameClass = gameClass;
        this.gameFields = gameFields;
        this.gameFieldClass = gameFieldClass;
        this.combinations = [
            [1, 2, 3], 
            [4, 5, 6],
            [7, 8, 9],

            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            
            [1, 5, 9],
            [7, 5, 3]
        ];
        this.init = this.init.bind(this);
        this.startGame = this.startGame.bind(this);
    }

    public init() {
        for(const field of <any>this.gameFields) {
            field.className = this.gameFieldClass;
        }
        this.round = 1;
        this.p1Moves = [];
        this.p2Moves = [];
        this.winningFields = [];

        this.game.classList.add(this.gameClass);
        this.game.addEventListener('click', this.startGame);
    }

    private startGame(e:Event) {
        this.playerMovement(<HTMLElement>e.target);
        
        if(this.winningFields.length === 3 || this.round === 10) {
            this.game.removeEventListener('click', this.startGame);
            this.game.classList.remove(this.gameClass);

            for(const field of this.winningFields) {
                for(const gameField of <any>this.gameFields) {
                    if(parseInt(gameField.dataset.number) === field) {
                        gameField.classList.add('game__field--winner');
                    }
                }
            } 
        }
    }

    private playerMovement(el:HTMLElement) {
        if(!el.classList.contains(this.gameFieldClass)) {
            return;
        }
        const number = parseInt(el.dataset.number);
            
        if(!this.p1Moves.includes(number) && !this.p2Moves.includes(number)) {
            if(this.round % 2 !== 0) {
                this.p1Moves.push(number);
                this.winner(this.p1Moves);
                el.classList.add(...this.player1);
            } else {
                this.p2Moves.push(number);
                this.winner(this.p2Moves);
                el.classList.add(...this.player2);
            }
            this.round++;
        }
    }

    private winner(moves:number[]) {
        for(const num of this.combinations) {
            if(moves.includes(num[0]) && moves.includes(num[1]) && moves.includes(num[2])) {
                this.winningFields = num;
                return;
            }
        }
    }
}