let flag = false;
let working = true;

let flicker;

function load() {
    flag = false;
    document.getElementById('col1').style.color = '#ff1493';
    document.getElementById('col2').style.color = '#07f2d3';
    document.getElementById('col3').style.color = '#ff1493';

    flicker = setInterval(function () {
        if (flag) {
            document.getElementById('col1').style.color = '#ff1493';
            document.getElementById('col2').style.color = '#07f2d3';
            document.getElementById('col3').style.color = '#ff1493';
        } else {
            document.getElementById('col1').style.color = '#07f2d3';
            document.getElementById('col2').style.color = '#ff1493';
            document.getElementById('col3').style.color = '#07f2d3';
        }

        flag = !flag
    }, 1500);
    working = true;

    document.getElementById('button_flicker').style.backgroundImage = 'url("img/flicker_button_on.png")';
}

function clearFlicker() {
    if (working) {
        clearInterval(flicker);
        document.getElementById('col1').style.color = '#000000';
        document.getElementById('col2').style.color = '#000000';
        document.getElementById('col3').style.color = '#000000';

        working = false;

        document.getElementById('button_flicker').style.backgroundImage = 'url("img/flicker_button_off.png")';
    } else {
        load(); 
    }
}