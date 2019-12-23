const selected = document.querySelectorAll('#difficulty > span');
const restartBtn = document.querySelector('#restart-btn');
let colors = [];
let colorBoxes = document.querySelectorAll('.colors');
let colorCtnr = document.querySelectorAll('.color-ctnr');
let easybtn = document.querySelector('#easy');
let hardBtn = document.querySelector('#hard');
let rgb = document.querySelector('#rgb-value');
const header = document.querySelector('header');
const body = document.querySelector('#body');
const controls = document.querySelector("#controls");
const message = document.querySelector('#message');


const newColors = _ => {
    colorBoxes.forEach((item, color) => {
        let a, b, c;
        a = genRandomNumber();
        b = genRandomNumber();
        c = genRandomNumber();
        color = item.style.backgroundColor = "rgb("+ a + ", " + b + ", " + c + ")";
        colors.push(color);
    });
}

const genRandomNumber = _ => {
    return Math.floor(Math.random() * 256);  
}

const switchEasy = _ => {
    let secCtnr = colorCtnr[1];
    secCtnr.parentNode.removeChild(secCtnr);
    hardBtn.classList.remove('selected');
    easybtn.classList.add('selected');
    colorBoxes = document.querySelectorAll('.colors');
    colorCtnr = document.querySelectorAll('.color-ctnr');
    newColors();
}

const switchHard = _ => {
    if (colorCtnr.length < 2) {
        colorCtnr[0].parentNode.insertAdjacentHTML('beforeend', `
        <div class="color-ctnr">
            <span class="colors"></span>
            <span class="colors"></span>
            <span class="colors"></span>
        </div>`); 
    }
    easybtn.classList.remove ('selected');
    hardBtn.classList.add('selected');
    colorCtnr = document.querySelectorAll('.color-ctnr');
    colorBoxes = document.querySelectorAll('.colors');
    newColors();
}

const updateRgb = _ => {
    if (colors.length === 6) {
        window.i = Math.floor(Math.random() * 6);
    } else {
        window.i = Math.floor(Math.random() * 3);
    }
    
    window.rgbCol = colors[i];
    let rgbVal = rgbCol.slice(4, -1);
    rgb.innerHTML = rgbVal;

}

const winGame = _ => {
    const correctCol = rgbCol;
    reset();
    header.style.backgroundColor = correctCol;
    colorBoxes.forEach(item => {
        item.style.backgroundColor = correctCol;
    });
    message.innerHTML = 'Correct!';
}

const reset = _ => {
    colors = [];
    header.style.backgroundColor = "#000";
    colorBoxes.forEach(item => {
        item.style.display = 'block';
    })
    message.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', _ => {
    newColors();
    updateRgb();
})

controls.addEventListener('click', e => {
    let target = e.target;
    if (target.id === "restart-btn") {
        reset();
        newColors();
        updateRgb();
    } else if(target.id === "easy") {
        reset();
        switchEasy();
        updateRgb();
    } else if (target.id === "hard") {
        reset();
        switchHard();
        updateRgb();
    }
})

body.addEventListener('click', e => {
    let target = e.target;
    console.log(target.style.backgroundColor);
    if(target.style.backgroundColor === rgbCol){
        winGame();
    } else {
        message.innerHTML = 'Try Again?';
        target.style.display = 'none';
    }
})
