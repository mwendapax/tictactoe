function listenClick (variable, func) {
    return variable.addEventListener('click', func, {once:true});
};


function getDomItems (selector) {

    return document.querySelector(selector);
}



const gameBoard = (function () {


    const boardItems = [];

    const domItems = (function () {
        const boxOne = getDomItems('.a');
        const boxTwo = getDomItems('.b');
        const boxThree = getDomItems('.c');
        const boxFour = getDomItems('.d');
        const boxFive = getDomItems('.e');
        const boxSix = getDomItems('.f');
        const boxSeven = getDomItems('.g');
        const boxEight = getDomItems('.h');
        const boxNine = getDomItems('.j');
        

        return {boxOne, boxTwo, boxThree, boxFour, boxFive, boxSix, boxSeven, boxEight, boxNine};
    })();

    const ctrlDomItems = (function () {
        const firstGo = getDomItems('.first-player');
        const lastGo = getDomItems('.second-player');
        const board = getDomItems('.game-board');
        const firstScore = getDomItems('.first-player-score');
        const secondScore = getDomItems('.second-player-score');
        const winnerScore = getDomItems('.winner-score');
        const mainContainer = getDomItems('main');
        const restart = getDomItems('.restart');

        return {firstGo, lastGo, board, firstScore, secondScore, winnerScore, mainContainer, restart};
    }) ();

    return {domItems,ctrlDomItems, boardItems};
}) ();



const players = (function () {

    let firstPlayer, secondPlayer;


    (function () {
        function createPlayer (playerName, playerMarker) {

            let name;
            let marker;
            let points = 0;
    
           const pointsUp = function() {
                points++;
            }
    
           const getPoints = function () {
                return points;
            }
    
            let changeNameMarker = (function () {
                name = playerName;
                marker = playerMarker;
    
                return {name, marker};
    
            })();
    
            return {name, marker, pointsUp, getPoints};
        }
    
        firstPlayer = createPlayer('First Player', 'X');
        secondPlayer = createPlayer('Second Player', 'O');
    })();




return {firstPlayer, secondPlayer};
})();

(function game () {
    let {domItems, ctrlDomItems, boardItems} = gameBoard;
    let {firstPlayer, secondPlayer} = players;
    let i = 0, n = 0, k = 0;
    
    //
    let {firstGo, lastGo} = gameBoard.ctrlDomItems;



    function createForm () {
        function createNodeItem (name, element) {
            name = document.createElement(element);

            return name;
        }
    
        const {mainContainer} = gameBoard.ctrlDomItems;
        mainContainer.setAttribute('style', 'grid-template-rows: 1fr 3fr 1fr')

        // name input;

        let formItems = createNodeItem('formItems', 'div');
        let form = createNodeItem('form', 'form');

        formItems.classList.add('form-items');

        form.setAttribute('action', '#');
        form.setAttribute('method', 'post');

       let formFirst = createNodeItem('formFirst', 'div');
       let getName = createNodeItem('getName', 'div');
        getName.classList.add("get-name");

        let nameLabel = createNodeItem('nameLabel', 'label');
        nameLabel.setAttribute('for', 'name');
        nameLabel.textContent = 'Enter Player Name';

        let inputLabel = createNodeItem('inputLabel', 'input');
        inputLabel.setAttribute('type', 'text');
        inputLabel.setAttribute('id', 'name');
        inputLabel.setAttribute('name', 'form_name');

        // marker input;

        let makeMarker = createNodeItem('makeMarker', 'div');
        makeMarker.classList.add('get-marker');

        let markerLabel = createNodeItem('markerLabel', 'label');
        markerLabel.setAttribute('for', 'marker');
        markerLabel.textContent = 'Enter Player Marker';

        let markerInput = createNodeItem('markerInput', 'input');
        markerInput.setAttribute('type', 'text');
        markerInput.setAttribute('id', 'marker');
        markerInput.setAttribute('name', 'form_marker');
        markerInput.setAttribute('maxlength', '1');

        // button; 

        let button = createNodeItem('button', 'div');
        button.classList.add('button');

        let buttonInput = createNodeItem('buttonInput', 'button');
        buttonInput.setAttribute('type', 'button');
        buttonInput.textContent = 'Save';


        button.addEventListener('click', (e) => {
           let names = getDomItems('#name').value;
           let marker = getDomItems('#marker').value;

            if (n === 1 ) {
                firstPlayer.name = names;
                firstPlayer.marker = marker;
                firstGo.textContent = firstPlayer.name;
                n--;
            }

            if (k === 1) {
                secondPlayer.name = names;
                secondPlayer.marker = marker;
                lastGo.textContent = secondPlayer.name;
                console.log(secondPlayer);
                k--;
            }
            e.preventDefault();
            formItems.innerHTML = '';
            mainContainer.setAttribute("style", 'grid-teplate-rows: 1fr 4fr');
        });

        form.appendChild(formFirst);
        getName.appendChild(nameLabel);
        getName.appendChild(inputLabel);
        formFirst.appendChild(getName);
        formFirst.appendChild(makeMarker);
        makeMarker.appendChild(markerLabel);
        makeMarker.appendChild(markerInput);
        form.appendChild(button);
        button.appendChild(buttonInput);
        formItems.appendChild(form);
        mainContainer.appendChild(formItems);



    
    }

    (function changePlayer () {
        listenClick(firstGo,() => {
            n++;
            createForm();
            
        });
        listenClick(lastGo, () => {
            k++;
            createForm();
        });
    }) ();
    //

    function checkWinner () {
        //check rows;

        if(boardItems[0] == boardItems[1] && boardItems[1] === boardItems[2]){
            if(boardItems[0] === firstPlayer.marker) {
                firstPlayer.pointsUp();
            } else {
                secondPlayer.pointsUp();
            }
        };
        if(boardItems[3] === boardItems[4] && boardItems[4] === boardItems[5]) {
            if(boardItems[3] === firstPlayer.marker) {
                firstPlayer.pointsUp();
            }else {
                secondPlayer.pointsUp();
            }
        };
        if(boardItems[6] === boardItems[7] && boardItems[7] === boardItems[8]) {
            if(boardItems[6] === firstPlayer.marker) {
                firstPlayer.pointsUp();
            } else {
                secondPlayer.pointsUp();
            }
        }

        // Check Columns;

        if(boardItems[0] === boardItems[3] && boardItems[3] === boardItems[6]) {
            if(boardItems[0] === firstPlayer.marker) {
                firstPlayer.pointsUp();
            }else {
                secondPlayer.pointsUp();
            }
        };
        if(boardItems[1] === boardItems[4] && boardItems[4] === boardItems[7]) {
            if(boardItems[1] === firstPlayer.marker) {
                firstPlayer.pointsUp();
            }else {
                secondPlayer.pointsUp();
            }
        };
        if(boardItems[2] === boardItems[5] && boardItems[5] === boardItems[8]) {
            if (boardItems[2] === firstPlayer.marker) {
                firstPlayer.pointsUp();
            } else {
                secondPlayer.pointsUp();
            }
        };

        // Check Diagonals;

        if (boardItems[0] === boardItems[4] && boardItems[4] === boardItems[8]) {
            if (boardItems[0] === firstPlayer.marker) {
                firstPlayer.pointsUp();
            } else {
                secondPlayer.pointsUp();
            }
        };
        if (boardItems[2] === boardItems[4] && boardItems[4] === boardItems[6]) {
            if(boardItems[2] === firstPlayer.marker) {
                firstPlayer.pointsUp();
            }else {
                secondPlayer.pointsUp();
            }
        };
    }

    
    (function mapClick () {


        listenClick(domItems.boxOne, () => {
            
            if ( !(i%2)) {
                boardItems[0] = firstPlayer.marker;
                domItems.boxOne.textContent = boardItems[0];
             }else {
                boardItems[0] = secondPlayer.marker;
                domItems.boxOne.textContent = boardItems[0];
             }


        });
        listenClick(domItems.boxTwo, () => {
                        if ( !(i%2)) {
                            boardItems[1] = firstPlayer.marker;
                            domItems.boxTwo.textContent = boardItems[1];
             }else {
                boardItems[1] = secondPlayer.marker;
                domItems.boxTwo.textContent = boardItems[1];
             }

        });
        listenClick(domItems.boxThree, () => {
                        if ( !(i%2)) {
                            boardItems[2] = firstPlayer.marker;
                            domItems.boxThree.textContent = boardItems[2];
             }else {
                boardItems[2] = secondPlayer.marker;
                domItems.boxThree.textContent = boardItems[2];
             }

        });
        listenClick(domItems.boxFour, () => {
                        if ( !(i%2)) {
                            boardItems[3] = firstPlayer.marker;
                            domItems.boxFour.textContent = boardItems[3];
             }else {
                boardItems[3] = secondPlayer.marker;
                domItems.boxFour.textContent = boardItems[3];
             }

        });
        listenClick(domItems.boxFive, () => {
                        if ( !(i%2)) {
                            boardItems[4] = firstPlayer.marker;
                            domItems.boxFive.textContent = boardItems[4];
             }else {
                boardItems[4] = secondPlayer.marker;
                domItems.boxFive.textContent = boardItems[4];
             }

        });
        listenClick(domItems.boxSix, () => {
                        if ( !(i%2)) {
                            boardItems[5] = firstPlayer.marker;
                            domItems.boxSix.textContent = boardItems[5];
             }else {
                boardItems[5] = secondPlayer.marker;
                domItems.boxSix.textContent = boardItems[5];
             }

        });
        listenClick(domItems.boxSeven, () => {
                        if ( !(i%2)) {
                            boardItems[6] = firstPlayer.marker;
                            domItems.boxSeven.textContent = boardItems[6];
             }else {
                boardItems[6] = secondPlayer.marker;
                domItems.boxSeven.textContent = boardItems[6];
             }

        });
        listenClick(domItems.boxEight, () => {
                        if ( !(i%2)) {
                            boardItems[7] = firstPlayer.marker;
                            domItems.boxEight.textContent = boardItems[7];
             }else {
                boardItems[7] = secondPlayer.marker;
                domItems.boxEight.textContent = boardItems[7];
             }

        });
        listenClick(domItems.boxNine, () => {
                        if ( !(i%2)) {
                            boardItems[8] = firstPlayer.marker;
                            domItems.boxNine.textContent = boardItems[8];
             }else {
                boardItems[8] = secondPlayer.marker;
                domItems.boxNine.textContent = boardItems[8];
             }

        });

        (function restart () {


            let {restart} = ctrlDomItems;
    
            restart.addEventListener('click', () => {

                for (item in domItems) {
                    item.textContent = '';
                } 

                gameBoard.boardItems = [];
                i = 0;

            })
        })();

    })();
    
    function currentPlayer () {
        if (!(i % 2 && i < 8)) {
            ctrlDomItems.firstGo.style.border = '4px solid whitesmoke';
            ctrlDomItems.lastGo.style.border = '1px solid white';
        } else {

            if (i < 8){
                ctrlDomItems.lastGo.style.border = '4px solid whitesmoke';
                ctrlDomItems.firstGo.style.border = '1px solid white';
            }
        }
    }

    function createAppend (name, content, appendTo) {
        name = document.createElement('p');
        name.textContent = content;
        appendTo.appendChild(name);

        return name;
    }

    function getScores () {
        createAppend('firstResults', firstPlayer.getPoints(), ctrlDomItems.firstScore);
        createAppend('secondResults', secondPlayer.getPoints(), ctrlDomItems.secondScore);

        if(firstPlayer.getPoints() > secondPlayer.getPoints()) {
            createAppend('winner', firstPlayer.name, ctrlDomItems.winnerScore);
        }else if (secondPlayer.getPoints() > firstPlayer.getPoints()) {
            createAppend('winner', secondPlayer.name, ctrlDomItems.winnerScore)
        } else {
            createAppend('Draw', 'Draw', ctrlDomItems.winnerScore);
        }
    }

    (function mapDomToBoard () {

        ctrlDomItems.board.addEventListener('click', () => {
            if (i === 8) {
                checkWinner();
                getScores();
                console.log('j');
                i++;
            }else {
                i++;
                currentPlayer();
            }
        })
    })();
    


    
    
    })();
