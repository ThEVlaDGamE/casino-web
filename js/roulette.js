let position;
let move_speed;
let counter;

let interval;

let ImgCardsURL = 'url("img/cards/image_part_")'

function divMove() {
    /*
    setInterval(function () {
        document.getElementById("card").style.left = position + "px";

        if (position > 1000) {
            position = -10;
        }
        console.log(position);

        position += 3;
    }, 20);*/
    
    document.getElementById("card").remove();
    var d = document.createElement('card');
    /*d.style.width = 10 * position;
    position++;*/
    d.className = "card";
    d.id = "card";
    document.getElementById("fon").appendChild(d);
}

function opacityCount(x, k, rate) {
    return (1 - rate * (Math.abs(x - k) / k) * (Math.abs(x - k) / k));
}

function start() {
    position = [];
    move_speed = 15;
    counter = 0;
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
    
    interval = setInterval(function () {
        counter++;

        if (move_speed > 0) {
            move_speed -= (counter / 3000);
        } else {
            move_speed = 0;
            clearInterval(interval);
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