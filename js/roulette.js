let position;
let move_speed;
let counter;

let interval;


let balance = 100;
let bid;
let choosenColor = "red";




function soundPlay(path) {
    var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = path; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
}

function bidOutReview() {
    document.getElementById("bid_out").innerText = "Ставка: " + document.getElementById("bid").value;
}

function opacityCount(x, k, rate) {
    return (1 - rate * (Math.abs(x - k) / k) * (Math.abs(x - k) / k));
}

function reviewBalance() {
    document.getElementById("bal").innerText = "Ваш баланс: " + balance;

    let max_old = Number.parseInt(document.getElementById("bid").getAttribute('max'));
    document.getElementById("bid").setAttribute('max', balance);

    document.getElementById("bid").setAttribute('value', (balance / max_old) * Number.parseInt(document.getElementById("bid").getAttribute('value')));
    bidOutReview();
}

function start() {
    //Ставка

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


    //soundClick();
    position = [];
    move_speed = 15;
    counter = 0;
    //choosenColor = "red";
    clearInterval(interval);

    for (let i = 0; i < 12; i++) {
        if (document.getElementById("card" + i)) {
            document.getElementById("card" + i).remove();
        }    
    }

    for (let i = 0; i < 12; i++) {
        var d = document.createElement('card' + i);
        d.className = "card";
        d.id = "card" + i;
        d.style.left = (i * 110) + "px";

        position.push(i * 110);
        d.style.opacity = opacityCount(position[i], 683, 1.5);

        d.style.backgroundImage = returnRandomCard();
        document.getElementById("fon_movement").appendChild(d);

    }
    
    if (document.getElementById("color_red").checked) {
        choosenColor = "red";
    } else if (document.getElementById("color_black").checked) {
        choosenColor = "black";
    }
    /*
    console.log(document.getElementById("color_black").value);
    console.log(document.getElementById("color_black").getAttribute('checked'));
    if (document.getElementById("color_red").value) {
        choosenColor = "red";
    } else if (document.getElementById("color_black").getAttribute('checked')) {
        choosenColor = "black";
    }*/

    //alert(choosenColor);
    
    interval = setInterval(function () {
        counter++;

        if (move_speed > 0) {
            move_speed -= (counter / 3000);
        } else {
            //soundPlay('snd/win.mp3');

            move_speed = 0;
            clearInterval(interval);

            document.getElementById("card" + 4).className = "card_choosen";

            let number = document.getElementById("card" + 4).style.backgroundImage;
            number = number.replace('url("img/cards/image_part_', '').replace('.jpg")', '').replace('00', '').replace('0', '');

            number = Number.parseInt(number);

            let result = "";
            if (((number >= 1) && (number <= 13)) || ((number >= 27) && (number <= 39))) {
                result = "red";
            } else {
                result = "black";
            }

            if (result == choosenColor) {
                balance += bid * 2;
            }

            reviewBalance();
            //console.log("." + number);
        }

        for (let i = 0; i < 12; i++) {
            position[i] += move_speed;


            let right = i + 1;
            if (right > 11) {
                right = 0;
            }

            document.getElementById("card" + i).style.left = (position[i]) + "px";
            if (
                /*(Number.parseInt(document.getElementById("card" + i).style.left.replace('px', '')) > 1315) ||*/
                ((position[right] > 0) && (position[right] < 110))
            )
            {
                position[i] = 0;
            }

            /*console.log(position[i]);
            //if (position[i] > 623 && position[i] < 722) {
            if (position[i] > 603 && position[i] < 725) {
                document.getElementById("card" + i).className = "card_choosen";
            } else {
                document.getElementById("card" + i).className = "card";
            }*/

            document.getElementById("card" + i).style.opacity = opacityCount(position[i], 683, 1.5);
            //document.getElementById("card" + i).style.opacity = (1 - 1.5 * (Math.abs(position[i] - 672) / 672) * (Math.abs(position[i] - 672) / 672));
            
        }
    }, 20);
}


function returnRandomCard() {
    let rnd = Math.floor(Math.random() * 52) + 1; 

    if (rnd < 10) {
        return 'url("img/cards/image_part_00' + rnd + '.jpg")';
    } else {
        return 'url("img/cards/image_part_0' + rnd + '.jpg")';
    }
}