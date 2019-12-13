
class References {
    constructor() {
        //グローバル変数は　ex2.html にある
        // テストデータの仮代入
        report[0] = {};
        report[0].sankou = [];

        // テストデータの細かい部分を仮代入
        let r = report[0].sankou;

        r.push({ r: '力也さん遅刻' });
        r.push({ r: 'aaaaa' });
        console.log(r);

        
    }
    //参考文献の表示
    set_sankou(element, num) {
        document.querySelector('#san_start').addEventListener('click', () => {
            let temp = document.querySelector('#temp3').content;

            for (let number in report[num].sankou) {
                let item = report[num].sankou[number];
                let content = temp.cloneNode(true);

                //根拠を入れておく
                content.querySelector('.textS').value = item.r;
                content.querySelector('.ss').setAttribute('id', 'ss' + number);
                console.log('id', 'ss' + number);



                //削除ボタン
                content.querySelector('.delete3').addEventListener('click', (ev2) => {
                    console.log(ev2.srcElement.parentNode);
                    let id2 = ev2.srcElement.parentNode.getAttribute('id');
                    console.log(id2);
                    let number2 = id2.slice(2);
                    report[num].sankou.splice(number2, 1);
                    ev2.srcElement.parentNode.parentNode.removeChild(ev2.srcElement.parentNode);
                    console.log(number2);
                })
                //document.querySelector('#kon_hontai').appendChild( content );
                element.appendChild(content);
            }


        });
    }
}