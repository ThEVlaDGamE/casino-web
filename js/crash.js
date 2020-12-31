let started = false;
let game_running = false;

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
function calculate_coof_game_end() {
    if (Math.random() * 100 <= sett_crash_chance) {
        // Краш
        return Math.random() * 10;
    } else {
        // Игра
        let rnd = Math.random() * 100;
        if (rnd <= sett_little_coof) {
            // Маленькое - 1.10 - 2.00
            return Math.random() * 90;
        } else if (rnd <= sett_middle_coof) {
            // Среднее - 2.00 - 5.00
            return Math.random() * 300;
        } else {
            // Большое - 5.0+
            return Math.random() * 500;
        }
    }
    
}



function randomize_history() {
    for (let i = 1; i < 11; i++) {
        let return_coof = Math.round(calculate_coof_game_end()) + 100;
        let coof2 = return_coof / 100;

        if (coof2.toString().length == 1) {
            coof2 += ".";
        }
        while ((coof2.toString().length - 1) < return_coof.toString().length) {
            coof2 += "0";
        }
        document.getElementById("history" + i).innerText = coof2 + "x";

        choose_history_color("history" + i, return_coof);
    }
}

function choose_history_color(id, coof3) {
    if (coof3 <= 110) {
        document.getElementById(id).style.backgroundColor = "red";
    } else if (coof3 <= 300) {
        document.getElementById(id).style.backgroundColor = "royalblue";
    } else {
        document.getElementById(id).style.backgroundColor = "green";
    }
}

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

function change_history() {
    for (let i = 2; i < 11; i++) {
        document.getElementById("history" + (Number.parseInt(i) - 1)).innerText = document.getElementById("history" + i).innerText;
        choose_history_color("history" + (Number.parseInt(i) - 1), Number.parseFloat(document.getElementById("history" + (Number.parseInt(i) - 1)).innerText.toString().replace(`x`,``)) * 100);
        choose_history_color("history" + i, Number.parseFloat(document.getElementById("history" + i).innerText.toString().replace(`x`,``)) * 100);
    }

    let text_coof2 = (Number.parseInt(coof_game_end) / 100);
    if (text_coof2.toString().length == 1) {
        text_coof2 += ".";
    }
    while ((text_coof2.toString().length - 1) < coof_game_end.toString().length) {
        text_coof2 += "0";
    }
    document.getElementById("history10").innerText = text_coof2 + "x";
    choose_history_color("history10", coof_game_end);
}

function start() {
    // Игра не идёт
    if (started == false) {
        if (game_running) {
            change_history();
        }

        need_ticks_to_tick = 100; // 1 тик - 10 миллисекунд
        ticks = 0;
        circles = 0;
        coof = 100;
        coof_game_end = 100;
        clearInterval(interval);
        document.getElementById("coof_output").style.backgroundColor = "green";

        started = true;
        game_running = true;

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
        coof_game_end = Math.round(calculate_coof_game_end() + 100);

        //console.log(coof_game_end);

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
                    need_ticks_to_tick -= need_ticks_to_tick / 25;
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
    game_running = false;

    clearInterval(interval);

    document.getElementById("coof_output").style.backgroundColor = "red";
    document.getElementById("button_start").innerText = "СТАРТ";

    change_history();
}