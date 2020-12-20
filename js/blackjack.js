let dealer_cards = [];
let player_cards = [];

let movement_intervales = [];


let balance = 100;
let bid;




function bidOutReview() {
    document.getElementById("bid_out").innerText = "Ставка - " + document.getElementById("bid").value;
}

function reviewBalance() {
    document.getElementById("bal").innerText = "Ваш баланс: " + balance;

    let max_old = Number.parseInt(document.getElementById("bid").getAttribute('max'));
    document.getElementById("bid").setAttribute('max', balance);

    document.getElementById("bid").setAttribute('value', (balance / max_old) * Number.parseInt(document.getElementById("bid").getAttribute('value')));
    bidOutReview();
}

function checkDefeat(points) {
    if (points > 21) {
        end('defeat');
    }
}

function returnPoints(array) {
    let points = 0;
    let aces = 0;

    for (let i in array) {
        points += Number.parseInt(array[i].points);
        if (array[i].isAce) {
            aces++;
        }
    }

    if (points > 21) {
        if (aces > 0) {
            while (points > 21 && aces > 0) {
                points -= 10;
                aces--;
            }
        }
    }

    return points;
}

function reviewPoints() {
    let player_points = returnPoints(player_cards);
    let dealer_points = returnPoints(dealer_cards);
    /*
    for (let i in player_cards) {
        player_points += Number.parseInt(player_cards[i].points);
    }
    for (let i in dealer_cards) {
        dealer_points += Number.parseInt(dealer_cards[i].points);
    }*/

    document.getElementById("dealer_points").innerText = "Карты диллера (" + dealer_points + " очков)";
    document.getElementById("player_points").innerText = "Ваши карты (" + player_points + " очков)";

    checkDefeat(player_points);

    if (player_points == 21) {
        stand();
    }
}

function addCard(array) {
    let fon_id = "";
    let card_id = "";

    if (array == player_cards) {
        fon_id = "fon_player";
        card_id = "card_player_";
    } else if (array == dealer_cards) {
        fon_id = "fon_dealer";
        card_id = "card_dealer_";
    }

    var d = document.createElement(card_id + (array.length + 1));
    d.className = "card";
    d.id = card_id + (array.length + 1);
    d.style.backgroundImage = returnRandomCard();

    let isAce = false;

    let points = 0;
    let number = d.style.backgroundImage.replace('url("img/cards/image_part_', '').replace('.jpg")', '').replace('00', '').replace('0', '');
    
    
    if (number == 1 || number == 14 || number == 27 || number == 40) {
        points = 11;
        isAce = true;
        // Туз
    } else if (
        (number >= 2 && number <= 10) ||
        (number >= 15 && number <= 23) ||
        (number >= 28 && number <= 36) ||
        (number >= 41 && number <= 49)
    )
    {
        // Цифры
        if (number < 11) {
            points = number;
        }
        else if (number < 24) {
            points = number - 13;
        }
        else if (number < 37) {
            points = number - 26;
        }
        else if (number < 50) {
            points = number - 39;
        }
    } else {
        // Картинки
        points = 10;
    }

    array.push(
        {
            points: points,
            end_position: (array.length) * 55 + 150,
            position: 0,
            movement: movement_intervales.length,
            speed: ((array.length) * 55 + 150) / 38,
            isAce: isAce
        }
    );

    let interval = setInterval(function (index, card_id) {
        array[index].position += array[index].speed;
        document.getElementById(card_id + (index + 1)).style.left = array[index].position + "px";
        if (array[index].position >= array[index].end_position) {
            clearInterval(movement_intervales[array[index].movement]);
        }
    }, 10, array.length - 1, card_id);

    movement_intervales.push(interval);
    document.getElementById(fon_id).appendChild(d);

    reviewPoints();
}


function start() {
    /*
    for (let i = 0; i < 12; i++) {
        if (document.getElementById("card_player_" + i)) {
            document.getElementById("card_player_" + i).remove();
        } else if (document.getElementById("card_dealer_" + i)) {
            document.getElementById("card_dealer_" + i).remove();
        }
    }*/

    for (let i in player_cards) {
        document.getElementById("card_player_" + (Number.parseInt(i) + 1)).remove();
    }
    for (let i in dealer_cards) {
        document.getElementById("card_dealer_" + (Number.parseInt(i) + 1)).remove();
    }

    dealer_cards = [];
    player_cards = [];
    movement_intervales = [];

    bid = Number.parseInt(document.getElementById("bid").value); 

    if (Number.isNaN(bid)) {
        bid = 0;
    }

    if (bid > balance) {
        bid = balance;
        document.getElementById("bid").value = balance;
    }

    balance -= bid;
    reviewBalance();


    addCard(player_cards);
    addCard(player_cards);

    addCard(dealer_cards);

    document.getElementById('game_result_message').hidden = true;
    document.getElementById('fon_action_button').hidden = false;

    reviewPoints();
    /*
    for (let i in movement_intervales) {
        clearInterval(movement_intervales[i]);
    }

    dealer_cards = [];
    player_cards = [];
    movement_intervales = [];*/

    //addCard(player_cards);
    
    
    /*
    for (let i = 0; i < 12; i++) {
        var d = document.createElement('card' + i);
        d.className = "card";
        d.id = "card" + i;
        d.style.left = (i * 110) + "px";

        position.push(i * 110);
        d.style.opacity = opacityCount(position[i], 683, 1.5);

        d.style.backgroundImage = returnRandomCard();
        document.getElementById("fon_movement").appendChild(d);

    }*/

    /*
    interval = setInterval(function () {
        
    }, 20);*/
}

function end(result) {
    //win
    //defeat
    //draw

    document.getElementById('game_result_message').hidden = false;
    let result_message = "";
    let color = "";

    if (result == 'win') {
        result_message = "Вы победили!";
        color = 'green';

        balance += bid * 2;
    } else if (result == 'defeat') {
        result_message = "Вы проиграли!";
        color = 'red';
    } else if (result == 'draw') {
        result_message = "Ничья!";
        color = 'orange';

        balance += bid;
    }

    document.getElementById('game_result_message').innerText = result_message;
    document.getElementById('game_result_message').style.backgroundColor = color;
    
    document.getElementById('fon_action_button').hidden = true;

    reviewBalance();
}


function take_card() {
    addCard(player_cards);
}

function stand() {
    document.getElementById('fon_action_button').hidden = true;

    while (returnPoints(dealer_cards) < 17) {
        addCard(dealer_cards);
    }

    if (returnPoints(dealer_cards) < returnPoints(player_cards)) {
        let rnd = Math.random() * 100;

        if (rnd <= 25) {
            addCard(dealer_cards);
        }
    }

    if (returnPoints(dealer_cards) <= 21) {
        if (returnPoints(dealer_cards) < returnPoints(player_cards)) {
            end('win');
        } else if (returnPoints(dealer_cards) > returnPoints(player_cards)) {
            end('defeat');
        } else {
            end('draw');
        }
    } else {
        end('win');
    }
}

function returnRandomCard() {
    let rnd = Math.floor(Math.random() * 52) + 1; 

    if (rnd < 10) {
        return 'url("img/cards/image_part_00' + rnd + '.jpg")';
    } else {
        return 'url("img/cards/image_part_0' + rnd + '.jpg")';
    }
}