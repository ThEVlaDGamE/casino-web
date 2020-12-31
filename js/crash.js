let started = false;
let balance = 100;
let bid;

let coof;
let interval;

let coof_game_end;

let need_ticks_to_tick;
let ticks;
let circles;


let sett_crash_chance = 15;
let sett_little_coof = 60;
let sett_middle_coof = 30;

function bidOutReview() {
    document.getElementById("bid_out").innerText = "Ставка: " + document.getElementById("bid").value;
}

function reviewBalance() {
    document.getElementById("bal").innerText = "Ваш баланс: " + balance;

    let max_old = Number.parseInt(document.getElementById("bid").getAttribute('max'));
    document.getElementById("bid").setAttribute('max', balance);

    document.getElementById("bid").setAttribute('value', (balance / max_old) * Number.parseInt(document.getElementById("bid").getAttribute('value')));
    bidOutReview();
}

function start() {
    // Игра не идёт
    if (started == false) {
        need_ticks_to_tick = 100; // 1 тик - 10 миллисекунд
        ticks = 0;
        circles = 0;
        coof = 100;
        coof_game_end = 100;
        clearInterval(interval);
        document.getElementById("coof_output").style.backgroundColor = "green";

        started = true;

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

        // Расчёт конечного коэфициента
        if (Math.random() * 100 <= sett_crash_chance) {
            // Краш
            coof_game_end = Math.random() * 10;
        } else {
            // Игра
            let rnd = Math.random() * 100;
            if (rnd <= sett_little_coof) {
                // Маленькое - 1.10 - 2.00
                coof_game_end += Math.random() * 90;
            } else if (rnd <= sett_middle_coof) {
                // Среднее - 2.00 - 5.00
                coof_game_end += Math.random() * 300;
            } else {
                // Большое - 5.0+
                coof_game_end += Math.random() * 500;
            }
        }
        coof_game_end = Math.round(coof_game_end);

        console.log(coof_game_end);

        document.getElementById("button_start").innerText = "ЗАБРАТЬ";
        document.getElementById("coof_output").innerText = "1.00x";

        interval = setInterval(function () {
            ticks++;
            if (ticks >= need_ticks_to_tick) {
                ticks = 0;
                circles++;

                let text_coof = "";

                coof += 1;

                text_coof = Number.parseInt(coof) / 100;
                while ((text_coof.toString().length - 1) < coof.toString().length) {
                    text_coof += "0";
                }
                
                text_coof += "x";
                document.getElementById("coof_output").innerText = text_coof;

                if (need_ticks_to_tick > 3) {
                    need_ticks_to_tick -= need_ticks_to_tick / 100;
                }

                if (coof >= coof_game_end) {
                    // Заканчиваем игру
                    game_end();
                }
            }
        }, 10);
    } else {
        started = false;
        document.getElementById("button_start").innerText = "СТАРТ";

        balance += bid * (coof / 100);
        balance = Math.round(balance);
        reviewBalance();
    }
}


function game_end() {
    started = false;
    clearInterval(interval);

    document.getElementById("coof_output").style.backgroundColor = "red";
    document.getElementById("button_start").innerText = "СТАРТ";
}