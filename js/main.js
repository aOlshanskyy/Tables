// Коротко о сути, создается матрица нужных размеров и заполняется случайными числами от 0 до 3,
// которые будут затем отображать какой класс каждой ячейки. Теперь как осуществляется поиск одинаковых 
// соседей, просто выбираем элемент на который кликнули, заносит его в специальный массив, 
// и перебираем всех его соседей, если кто-то из соседей в матрице имеет такой же номер как и он, 
// тогда добавляем этот сосед в массив. Чтобы избежать того что мы вводим одни и те же элементы в массив, 
// мы обозначаем каждый пройденный элемент как пройден, и проверяем чтобы мы перебирали только элементы 
// в которых мы не были

function Table(numberX, numberY) {
    this.x = numberX;
    this.y = numberY;
    this.matrix = () => {
        let field = new Array(this.y);
        for (var i = 0; i < field.length; i++) {
            field[i] = new Array(this.x).fill().map(() => Math.round(Math.random() * 3));
        }
        return field;
    };
}

let classes = new Map();
classes.set(0, "spades");
classes.set(1, "clubs");
classes.set(2, "diamonds");
classes.set(3, "heard");

function draw(field) {
    for (let i = 0; i < field.length; i++) {
        console.log(i);
        for (let k = 0; k < field[i].length; k++) {
            let clsName = classes.get(field[i][k]);
            document.querySelector('#field').innerHTML += `<div class="field-block ${clsName}" data-x="${k}" data-y="${i}"></div>`;
        }
    }
}

function deleteCell(arrs, index) {
    let clas = classes.get(index);
    for (let i = 0; i < arrs.length; i++) {
        document.querySelector(`[data-x="${arrs[i][1]}"][data-y="${arrs[i][0]}"]`).classList.remove(`${clas}`);
        document.querySelector(`[data-x="${arrs[i][1]}"][data-y="${arrs[i][0]}"]`).classList.remove(`deleted`);
    }
}

function main() {
    document.querySelector('#field').innerHTML = '';
    const x = Number.parseInt(document.getElementById("numberOne").value);
    const y = Number.parseInt(document.getElementById("numberTwo").value);
    document.getElementById('field').style.width = `${60 * x}px`;
    const field = new Table(x, y);
    let matrix = field.matrix();
    draw(matrix);
    document.querySelectorAll('.field-block').forEach(function (element) {
        element.onclick = search;
    });
    function search() {
        document.querySelectorAll('.field-block').forEach(function (element) {
            element.classList.remove('deleted');
            element.classList.remove('active');
        });
        let x = this.dataset.x;
        let y = this.dataset.y;
        this.classList.add('active');
        let turn = new Array();
        let toDelete = new Array();
        turn.push([y, x]);
        let cell = matrix;
        let check = new Array(field.y);
        for (var i = 0; i < check.length; i++) {
            check[i] = new Array(field.x).fill(false);
        }

        while (turn.length >= 1) {
            let posY = Number.parseInt(turn[0][0]);
            let posX = Number.parseInt(turn[0][1]);
            toDelete.push(turn[0]);
            let element = cell[y][x];
            if (posY + 1 < cell.length && cell[posY + 1][posX] == element && !check[posY + 1][posX]) turn.push([posY + 1, posX]);
            if (0 <= posY - 1 && cell[posY - 1][posX] == element && !check[posY - 1][posX]) turn.push([posY - 1, posX]);
            if (posX + 1 < cell[posY].length && cell[posY][posX + 1] == element && !check[posY][posX + 1]) turn.push([posY, posX + 1]);
            if (0 <= posX - 1 && cell[posY][posX - 1] == element && !check[posY][posX - 1]) turn.push([posY, posX - 1]);
            document.querySelector(`[data-x="${posX}"][data-y="${posY}"]`).classList.add('deleted');
            check[posY][posX] = true;
            turn.splice(0, 1);
        }
        setTimeout(function() {deleteCell(toDelete, cell[y][x])}, 2000);
    }
}