//Л е н о с т ь (кликабельные буквы)
//Место, куда вставляются буквы при нажатии (только один раз)
//Кнопка "Попробовать", которая проверяет есть ли такое слово в массиве 
//Если есть, выводится на экран, и обозначает в массиве, что слово использовалось
//больше к нему не обращается
var WORDS = [
    "лесть", 'олень', 'осень', 'отель', 'сонет',
    'енот', 'лень', 'лето', 'лось', 'ноль', 'осел', 'село', 'сено',
    'сеть', 'слон', 'соль', 'стол', 'стон', 'тело', 'тень', 'тлен',
    'ель', 'лес', 'лот', 'нос', 'сон', 'сто', 'тон', 'нет'
];
//кол-во угаданных слов
let amountGuessed = 0;
// текущая попытка
let currentGuess = [];
// следующая буква
let nextLetter = 0;
// создаём игровое поле
function initBoard() {
    // получаем доступ к блоку на странице
    let board = document.getElementById("game-board");

    // создаём новый блок на странице
    let row = document.createElement("div")
    // добавляем к нему класс, чтобы потом работать со строкой напрямую
    row.className = "letter-row"
    
    // создаём отдельные клетки
    // добавляем по 5 клеток в ряд(это максимальная длина слова в списке)
    for (let j = 0; j < 5; j++) {
        // создаём новый блок на странице
        let box = document.createElement("div")
        // добавляем к нему класс
        box.className = "letter-box"
        // вкладываем новый блок внутрь блока со строкой
        row.appendChild(box)
    }

    // как все 5 клеток готовы, добавляем строку на поле
    board.appendChild(row)
}

// рисуем игровое поле
initBoard();


//создаем список слов
function initList(){
    // получаем доступ к блоку на странице
    let list = document.getElementById("word-list");
    //создаем объект, где будет лежать слово из массива
    for(let i = 0; i < WORDS.length; i++){
        // создаём новый блок на странице
        let word = document.createElement("div")
        // добавляем к нему класс
        word.className = "word"
        // припысываем к блоку айди(слово, которое в нем находится) для легкого доступа
        word.id = WORDS[i];
        // создаём отдельные клетки в зависимости от длины слова
        for(let j = 0; j < WORDS[i].length; j++){
            let cutword = document.createElement("div");
            cutword.className = "cutword";
            //заносим побуквенно в каждую клетку
            cutword.textContent = WORDS[i][j];
            word.appendChild(cutword);
        }
        list.appendChild(word)
    }
}
initList();

// обработчик нажатия на клавиши
document.addEventListener("keydown", (e) => {

    // получаем код нажатой клавиши
    let pressedKey = String(e.key)
    // если нажат Backspace и в строке есть хоть один символ
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        // то удаляем последнюю введённую букву
        deleteLetter();
        // и выходим из обработчика
        return;
    }

    // если нажат Enter
    if (pressedKey === "Enter") {
        // проверяем введённое слово
        checkGuess();
        // и выходим из обработчика
        return;
    }

    // проверяем, есть ли введённый символ в русском алфавите
    let found = pressedKey.match(/[а-яА-ЯЁё]/gi)
    // если нет
    if (!found || found.length > 1) {
        // то выходим из обработчика
        return
    // иначе добавляем введённую букву в новую клетку
    } else {
        insertLetter(pressedKey)
    }
})

// выводим букву в клетку
function insertLetter (pressedKey) {
    // если клетки закончились
    if (nextLetter === 5) {
        // выходим из функции
        return;
    }
    //получаем доступ к буквам начального слова
    let initial = document.getElementById("initial-word");
    //проходим по всем кнопкам и отключаем нажатые 
    for(let i = 0; i < initial.children.length; i++){
        if (initial.children[i].textContent === pressedKey){
            initial.children[i].disabled = true;
        }
    }
    // получаем доступ к текущей строке
    let row = document.getElementsByClassName("letter-row")[0]
    // и к текущей клетке, где будет появляться буква
    let box = row.children[nextLetter]
    // меняем текст в блоке с клеткой на нажатый символ
    box.textContent = pressedKey
    // добавляем к клетке жирную обводку
    box.classList.add("filled-box")
    // добавляем введённый символ к массиву, в которой хранится наша текущая попытка угадать слово
    currentGuess.push(pressedKey)
    // помечаем, что дальше будем работать со следующей клеткой
    nextLetter += 1
}

// удаление символа
function deleteLetter () {
    // получаем доступ к буквам начального слова
    let initial = document.getElementById("initial-word");
    // получаем доступ к текущей строке
    let row = document.getElementsByClassName("letter-row")[0]
    // и к последнему введённому символу
    let box = row.children[nextLetter - 1]
    // очищаем содержимое клетки и возвращаем кнопку
    for (let i = 0; i < 7; i++){
        if (initial.children[i].textContent === box.textContent){
            initial.children[i].disabled = false;
        }
    }
    box.textContent = ""
    // убираем жирную обводку
    box.classList.remove("filled-box")
    // удаляем последний символ из массива с нашей текущей догадкой
    currentGuess.pop()
    // помечаем, что у нас теперь на одну свободную клетку больше
    nextLetter -= 1
}
// проверка введённого слова
function checkGuess () {
    // получаем доступ к текущей строке
    let row = document.getElementsByClassName("letter-row")[0]
    // переменная, где будет наша догадка
    let guessString = ''
  
    //получаем доступ к начальному слову и активируем кнопки
    let initial = document.getElementById("initial-word");
    for (let i = 0; i < 7; i++){
        initial.children[i].disabled = false;
    }
    // собираем все введённые в строке буквы в одно слово
    for (const val of currentGuess) {
        guessString += val
    }

    // если введённого слова нет в списке возможных слов — выводим уведомление
    if (!WORDS.includes(guessString)) {
        toastr.error("Такого слова нет в списке!")
        // и после вывода выходим из проверки догадки
        // очищаем введенное слово
        cleanLine();
        return;
    }
    let rightWords = document.getElementById(guessString);
    //помечаем угаданные слова, чтобы к ним еще раз не возвращаться 
    if(!rightWords.classList.contains("guessed")){
        for(let i = 0; i < rightWords.children.length; i++){
            //добавляем к клеткам класс для подсветки угаданого слова
            rightWords.children[i].classList.add("visible")
        }
        rightWords.classList.add("guessed");
        //увеличиваем счетчик угаданных слов
        amountGuessed += 1;
    }
    cleanLine();

    // если мы угадали все слова
    if (amountGuessed === WORDS.length) {
        // выводим сообщение об успехе
        toastr.success("Вы выиграли!")
        // выходим из проверки
        return
    }
}

//очистка строки букв
function cleanLine(){
    let row = document.getElementsByClassName("letter-row")[0];
    for(let i = 0; i < 5; i++){
        row.children[i].textContent = '';
        //приводим клетку в исходное состояние
        row.children[i].classList.remove("filled-box");
        //обнуляем позицию введенных букв и очищаем текущую попытку
        nextLetter = 0;
        currentGuess = [];   
    }
}
// обработчик нажатий на экранную клавиатуру
document.getElementById("initial-word").addEventListener("click", (e) => {
    // получаем нажатый элемент
    const target = e.target
    
    // если нажали не на нашу клавиатуру — выходим из обработчика
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    // получаем текст нажатой кнопки
    let key = target.textContent

    // имитируем нажатие этой кнопки на настоящей клавиатуре
    document.dispatchEvent(new KeyboardEvent("keydown", {'key': key}))
})