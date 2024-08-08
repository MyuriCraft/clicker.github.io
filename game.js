const cookie_image = document.getElementById('cookie-image');
const cookie_number_display = document.getElementById('cookie-number');
const cookie_number_click_display = document.getElementById('cookie-number-click');
const cookie_number_second_display = document.getElementById('cookie-number-second');
const lore_text = document.getElementById('lore-text');
const sound = new Audio('./cute.mp3');

const cursor_update_btn = document.querySelector('#cursor>input');
const factory_update_btn = document.querySelector('#factory>input');
const multiplier_update_btn = document.querySelector('#multiplier>input');
const colab_btn = document.querySelector('#colab>input');

let cookies = 0;
let cookies_per_click = 1;
let cookies_per_second = 0;

let cursor_level = 1;
let cursor_price = 10;
let factory_level = 0;
let factory_price = 10;
let multiplier_level = 1;
let multiplier_price = 50;
let colab_level = 0;
let colab_price = 5000;

showCookies();

setInterval(gameloop, 1000);

/* Event Listener */
cookie_image.addEventListener('click', increment);

/* Cursor Increment */
cursor_update_btn.addEventListener('click', () => {
    cursor_level++;
    cookies_per_click = cookies_per_click + 1 * multiplier_level;
    cookies -= cursor_price;
    cursor_price *= 2;

    showCookies();
});

/* Factory */
factory_update_btn.addEventListener('click', () => {
    cookies -= factory_price;
    cookies_per_second = cookies_per_second + 1 * multiplier_level;
    factory_level++;
    factory_price *= 2;
    showCookies();
});

/* Multiplier */
multiplier_update_btn.addEventListener('click', () => {
    multiplier_level++;
    cookies -= multiplier_price;
    cookies_per_click = cursor_level * multiplier_level;
    cookies_per_second = factory_level * multiplier_level;
    multiplier_price *= 3;
    showCookies();
});

colab_btn.addEventListener('click', () => {
  colab_level++;
  cookies -= colab_price;
  cookies_per_click = cursor_level * colab_level;
  cookies_per_second = colab_level * multiplier_level;
  colab_price *= 3;
  showCookies();
});

function gameloop() {
    cookies += cookies_per_second;
    lore_text.innerHTML = 'Las notas de pronack han hecho que banco azteca caiga';
    showCookies();
}


function increment() {
    cookies += cookies_per_click;
    showCookies();  
    sound.play();
}


function showCookies() {
    //Cookies
    cookie_number_display.innerHTML = formatNumber(cookies);
    cookie_number_click_display.innerHTML = formatNumber(cookies_per_click);
    cookie_number_second_display.innerHTML = formatNumber(cookies_per_second);
    //Update View
    setUpdateView('cursor', cursor_level, cursor_price);
    setUpdateView('factory', factory_level, factory_price);
    setUpdateView('multiplier', multiplier_level, multiplier_price);
    setUpdateView('colab', colab_level, colab_price);
    //Disable Update Buttons
    setDisable(cookies >= cursor_price, cursor_update_btn);
    setDisable(cookies >= multiplier_price, multiplier_update_btn);
    setDisable(cookies >= factory_price, factory_update_btn);
    setDisable(cookies >= colab_price, colab_btn);
}


function setDisable(able, btn) {
    if (able) {
        btn.removeAttribute("disabled", "");
    }
    else {
        btn.setAttribute("disabled", "");
    }
}

function setUpdateView(id, level, price) {
    const level_display = document.querySelector('#'+id+'>.level');
    const price_display = document.querySelector('#'+id+' .price');
    level_display.innerHTML = level;
    price_display.innerHTML = formatNumber(price);
};


function formatNumber(num) {
    if (num > 1000000000) {
        return (num / 1000000000).toFixed(2) + ' Mil Mill.';
    }
    if (num > 1000000) {
        return (num / 1000000).toFixed(2) + ' Mill.';
    }
    if (num > 1000) {
        return (num / 1000).toFixed(2) + ' Mil.'
    }
    return num;
    
}