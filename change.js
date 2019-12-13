class Report {
    constructor() {
//グローバル変数は　ex2.html にある
        // テストデータの仮代入
        report[0] = {};
        report[0].qanda = [];
        report[0].konkyo = [];

        // テストデータの細かい部分を仮代入
        let qa = report[0].qanda;
        let k = report[0].konkyo;
        qa.push( { q: "ほんとうによいか？", a: "構わん"} );
        qa.push( { q: "まじで？", a: "あぁ"} );
        qa.push( { q: ':||はいつ？', a: 'まだまだ'});
        k.push( { k:'力也さん遅刻'});
        k.push({k:'結婚ラシュ！'});
    }
    
    //根拠のテキストボックス表示
    set_konkyo( element, num ) {
        document.querySelector('#kon_start').addEventListener('click', () => {
            let temp = document.querySelector('#temp0').content;
            
            for( let number in report[num].konkyo ) {
                let item = report[num].konkyo[number];
                let content = temp.cloneNode(true);
                //根拠を入れておく
                content.querySelector('.textK').value = item.k;
                content.querySelector('.kk').setAttribute('id', 'kk' + number );
                //console.log( 'id', 'kk' + number );
                


                //削除ボタン
                content.querySelector('.delete2').addEventListener('click', (ev2) => {
                    //console.log( ev2.srcElement.parentNode );
                    let id2 = ev2.srcElement.parentNode.getAttribute('id');
                    //console.log(id2);
                    let number2 = id2.slice(2);
                    report[num].konkyo.splice(number2,1);
                    ev2.srcElement.parentNode.parentNode.removeChild(ev2.srcElement.parentNode);
                    //console.log(number2);
                })
                //document.querySelector('#kon_hontai').appendChild( content );
                element.appendChild( content );
            }
           

        });
    }

    // 問と答えの表示
    set_qanda( element, num ) {
        document.querySelector('#start').addEventListener('click', () => {
            let temp = document.querySelector('#temp1').content;
            
            for( let number in report[num].qanda ) {
                let item = report[num].qanda[number];
                let content = temp.cloneNode(true);
                // 問と答えを入れておく
                content.querySelector('.textQ').value = item.q;
                content.querySelector('.textA').value = item.a;
                content.querySelector('.qa').setAttribute('id', 'qa' + number );
                //console.log( 'id', 'qa' + number );
                // 削除ボタン
                content.querySelector('.delete').addEventListener('click', (ev) => {
                    //console.log( ev.srcElement.parentNode );
                    let id = ev.srcElement.parentNode.getAttribute('id');
                    //console.log(id);
                    let number = id.slice(2);
                    report[num].qanda.splice(number,1);
                    //console.log( report[num].qanda.splice(number,1));
                    ev.srcElement.parentNode.parentNode.removeChild(ev.srcElement.parentNode);
                    //console.log(number);
                })
                //配列入れ替え
                content.querySelector('.moveup').addEventListener('click' ,(ev2) => {
                let upid = ev2.srcElement.parentNode.getAttribute('id');
                
                let number = upid.slice(2);
                report[num].qanda.splice(number,1);
                report[num].qanda.splice();
                let change = report[num].qanda.splice();
                
                let change2= report[num+1].qanda.splice();

                let change_box = change;
                change = change2;
                change2 = change_box; 

                })
                //document.querySelector('#qa_hontai').appendChild( content );
                element.appendChild( content );
            }
        });
    }
}