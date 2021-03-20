function start() {
    const x = Number.parseInt(document.getElementById("numberOne").value);
    const y = Number.parseInt(document.getElementById("numberTwo").value);
    let field = new Array(y);
    let check = new Array(y);
    for (var i = 0; i < field.length; i++) {
        field[i] = new Array(x).fill().map(() => Math.round(Math.random() * 3));
        check[i] = new Array(x).fill(false);
    }
   
    let classes = new Map();
    classes.set(0, "spades");
    classes.set(1, "clubs");
    classes.set(2, "diamonds");
    classes.set(3, "heard");
    document.querySelector('#field').innerHTML = draw(field);
    update();



    function draw(data) {
        let result = ['<table border=1>'];
        for (let i = 0; i < data.length; i++) {
            result.push('<tr>');
            for (let j = 0; j < data[i].length; j++) {
                let clsName = classes.get(field[i][j]);
                result.push(`<td class='${clsName}' data-x='${j}' data-y='${i}'></td>`);
            }
            result.push('</tr>');
        }
        result.push('</table>');
        return result.join('\n');
    }
    
    function deleteCell(arrs) {
        for (let i = 0; i < arrs.length; i++) {
            field[arrs[i][0]].splice(arrs[i][1], 1);
        }
        loop(field);
    }

    function update() {
        document.querySelectorAll('td').forEach(function (element) {
            element.onclick = search;
        });

        function search() {
            document.querySelectorAll('td').forEach(function (element) {
                element.classList.remove('deleted');
                element.classList.remove('active');
            });

            let x = this.dataset.x;
            let y = this.dataset.y;
            this.classList.add('active');
            let turn = new Array();
            let toDelete = new Array();
            turn.push([y, x]);
            let check = new Array(field.length);
            for (var i = 0; i < check.length; i++) {
                check[i] = new Array(field[i].length).fill(false);
            }
            while (turn.length >= 1) {
                let posY = Number.parseInt(turn[0][0]);
                let posX = Number.parseInt(turn[0][1]);
                toDelete.push(turn[0]);
                let element = field[y][x];
                if (posY + 1 < field.length && field[posY + 1][posX] == element && !check[posY + 1][posX]) turn.push([posY + 1, posX]);
                if (0 <= posY - 1 && field[posY - 1][posX] == element && !check[posY - 1][posX]) turn.push([posY - 1, posX]);
                if (posX + 1 < field[posY].length && field[posY][posX + 1] == element && !check[posY][posX + 1]) turn.push([posY, posX + 1]);
                if (0 <= posX - 1 && field[posY][posX - 1] == element && !check[posY][posX - 1]) turn.push([posY, posX - 1]);
                document.querySelector(`[data-x="${posX}"][data-y="${posY}"]`).classList.add("deleted");
                check[posY][posX] = true;
                turn.splice(0, 1);
            }
            setTimeout(function () { deleteCell(toDelete) }, 2000);
        }
    }

    function loop(field) {
        document.querySelector('#field').innerHTML = draw(field);
        update();
    }

}