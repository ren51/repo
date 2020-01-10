window.addEventListener('load', () => {

    let repo = new Report();
    let repoUI = new ReportUI(repo, document.querySelector('#qa_hontai'), 0,  document.querySelector('#kon_hontai'));
    let page = new Page(["#classes", "#new_report", "#new_konkyo"], '.page');
    let pageUI = new PageUI();
    //let remaid = new remaid(repo);
    repo.set_konkyo(document.querySelector('#kon_hontai'), 0);
    repo.set_sankou( document.querySelector('#san_hontai'), 0 );
});
class ReportUI {
    /**
     * 描述
     * @date 2019-12-13
     * @param {any} report  Report
     * @param {any} parent  DOMを置いておく要素
     * @param {number} number   レポート番号
     * @returns {any}
     */
    constructor(report, parent, number) {
        this.report = report;
        this.parent = parent;
        this.number = number;
        let nl = new nylon();
        nl.on('page', (key, value) => {
            this.set_qanda();
        })
    }
    /**
     * 描述
     * @date 2019-12-13
     * @param {any} element
     * @param {number} id1  入れ替えるID
     * @param {number} id2  入れ替えるID
     * @returns {any}
     */
    replace_dom(element, id1, id2) {
        console.log(73, id1, id2);
        let new_elm = element.childNodes[id1].cloneNode();
        let old_elm = element.replaceChild(new_elm, element.childNodes[id2]);
        element.replaceChild(old_elm, element.childNodes[id1]);
    }


    // set_konkyo() {
    //     var reportK = this.report.report;
    //     var numK = this.number;
    //     let tempK = document.querySelector('#temp0').content;
    //     // document.querySelector('#kon_start').addEventListener('click', () => {
    //     //     let temp = document.querySelector('#temp0').content;

    //     for (let number in reportK[numK]["konkyo"]) {
    //         let item = reportK[numK].konkyo[number];
    //         let content = tempK.cloneNode(true);
    //         //根拠を入れておく
    //         content.querySelector('.textK').value = item.k;
    //         content.querySelector('.kk').setAttribute('id', 'kk' + number);
    //         console.log('id', 'kk' + number);



    //         //削除ボタン
    //         content.querySelector('.delete2').addEventListener('click', (ev2) => {
    //             //console.log(ev2.srcElement.parentNode);
    //             let id2 = ev2.srcElement.parentNode.getAttribute('id');
    //             //console.log(id2);
    //             let number2 = id2.slice(2);
    //             reportK[numK].konkyo.splice(number2, 1);
    //             ev2.srcElement.parentNode.parentNode.removeChild(ev2.srcElement.parentNode);
    //             //console.log(number2);
    //         })
    //         //document.querySelector('#kon_hontai').appendChild( content );
    //         this.parent.appendChild(content);
    //     }


    //     //});
    // }

    /**
     * 描述
     * @date 2019-12-13
     * @param {any} element Q&A情報を追加するDOM要素    ex: document.querySelector('#kon_hontai')
     * @param {number} num  レポート番号    ex: 0
     * @returns {any}
     */
    set_qanda() {
        var report = this.report.report;
        var num = this.number;
        let temp_noup = document.querySelector('#temp1_noup').content;
        let temp_up = document.querySelector('#temp1').content;
        for (let number in report[num]["qanda"]) {
            var temp;
            if (number == 0) temp = temp_noup;
            else temp = temp_up;
            let item = report[num].qanda[number];
            let content = temp.cloneNode(true);
            // 問と答えを入れておく
            content.querySelector('.textQ').value = item.q;
            content.querySelector('.textA').value = item.a;
            content.querySelector('.qa').setAttribute('id', 'qa' + number);
            //console.log('id', 'qa' + number);


            //移動ボタン(上)
            if (number != 0) {
                content.querySelector('.change').addEventListener('click', (ev1) => {
                    let chid = ev1.srcElement.parentNode.getAttribute('id');
                    let number = chid.slice(2);
                    console.log(96, report);
                    console.log(96, report[num].qanda[number]);//確認用
                    this.report.replace(report[num].qanda, number, number - 1);
                    while (this.parent.firstChild) this.parent.removeChild(this.parent.firstChild);
                    new nylon().emit('page', { page: '#new_report' })
                    console.log(report[num].qanda[number]);//確認用
                    console.log(95, document.querySelectorAll('#qa_hontai .qa'));

                });
            } else {
                console.log(85, content.querySelector('.change'));
                //content.removeChild( content.querySelector('.change') );
            }
            // 削除ボタン
            content.querySelector('.delete').addEventListener('click', (ev) => {
                //console.log(ev.srcElement.parentNode);
                let id = ev.srcElement.parentNode.getAttribute('id');
                //console.log(id);
                let number = id.slice(2);
                report[num].qanda.splice(number, 1);
                ev.srcElement.parentNode.parentNode.removeChild(ev.srcElement.parentNode);
                console.log(number);
            })

            //document.querySelector('#qa_hontai').appendChild( content );
            this.parent.appendChild(content);
            //console.log(content);
        }

    }
    save_qa() {
        var report = this.report.report;
        var num = this.number;
        let rep = [];
        let qa_element = document.querySelector('#qa_hontai');
        //console.log( qa_element.querySelectorAll('.qa') );
        for (let data of qa_element.querySelectorAll('.qa')) {
            let q_text = data.querySelector('input').value;
            let a_text = data.querySelector('textarea').value;
            //console.log( 126, q_text, a_text );
            rep.push({ q: q_text, a: a_text });
        }
        //console.log( 130, this.report.report );
        this.report.report[num].qanda = rep;
        console.log(131, this.report.report[num].qanda);
        //localStorage.setItem('reminder', JSON.stringify(this.report.report[num].qanda));
    }
}



class Report {
    constructor() {
        this.report = [];
        //グローバル変数は　ex2.html にある
        // テストデータの仮代入
        this.report[0] = {};
        this.report[0].qanda = [];
        this.report[0].konkyo = [];
        this.report[0].sankou = [];

        // テストデータの細かい部分を仮代入
        let qa = this.report[0].qanda;
        let k = this.report[0].konkyo;
        let r = this.report[0].sankou;
        qa.push({ q: "ほんとうによいか？", a: "構わん" });
        qa.push({ q: "まじで？", a: "あぁ" });
        qa.push({ q: ':||はいつ？', a: 'まだまだ' });
        k.push({ k: '力也さん遅刻' });
        k.push({ k: '結婚ラシュ！' });
        r.push({ r: '参考文献のURLなどを記入' });
        r.push({ r: '参考文献のURLなどを記入' });
    }
//根拠の表示
    set_konkyo( element, num ) {
        document.querySelector('#b_kon').addEventListener('click', () => {
            let temp = document.querySelector('#temp0').content;
            
            for( let number in this.report[num].konkyo ) {
                let item = this.report[num].konkyo[number];
                let content = temp.cloneNode(true);

                //根拠を入れておく
                content.querySelector('.textK').value = item.k;
                content.querySelector('.kk').setAttribute('id', 'kk' + number );
                console.log( 'id', 'kk' + number );
                


                //削除ボタン
                content.querySelector('.delete2').addEventListener('click', (ev2) => {
                    console.log( ev2.srcElement.parentNode );
                    let id2 = ev2.srcElement.parentNode.getAttribute('id');
                    console.log(id2);
                    let number2 = id2.slice(2);
                    report[num].konkyo.splice(number2,1);
                    ev2.srcElement.parentNode.parentNode.removeChild(ev2.srcElement.parentNode);
                    console.log(number2);
                })
                //document.querySelector('#kon_hontai').appendChild( content );
                element.appendChild( content );
            }
           

        });
    }
//参考文献の表示
    set_sankou(element, num) {
        document.querySelector('#san_start').addEventListener('click', () => {
            let temp = document.querySelector('#temp3').content;

            for (let number in this.report[num].sankou) {
                let item = this.report[num].sankou[number];
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
    //入れ替え処理(下
    replace(qanda, id1, id2) {
        let change = qanda[id1];
        qanda[id1] = qanda[id2];
        qanda[id2] = change;
    }

}
class PageUI {
    constructor() {
        let nl = new nylon();
        document.querySelector('#b_qanda').addEventListener('click', () => {
            nl.emit("page", { page: '#new_report' });
        });
    }
}
