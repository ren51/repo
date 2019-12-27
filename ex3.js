window.addEventListener('load', () => {

    let repo = new Report();
    let repoUI = new ReportUI(repo, document.querySelector('#qa_hontai'), 0);
    let page = new Page(["#classes", "#new_report"], '.page');
    let pageUI = new PageUI();
    //let remaid = new remaid(repo);
    //repo.set_konkyo(document.querySelector('#kon_hontai'), 0);
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
        //console.log(57, temp);
        for (let number in report[num]["qanda"]) {
            var temp;
            if( number == 0 ) temp=temp_noup;
            else    temp=temp_up;
            let item = report[num].qanda[number];
            let content = temp.cloneNode(true);
            // 問と答えを入れておく
            content.querySelector('.textQ').value = item.q;
            content.querySelector('.textA').value = item.a;
            content.querySelector('.qa').setAttribute('id', 'qa' + number);
            console.log(item);




            //移動ボタン(上)
            if (number != 0) {
                content.querySelector('.change').addEventListener('click', (ev1) => {
                    this.save_qa();
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
                console.log( 85, content.querySelector('.change') );
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
        // //document.querySelector('.save').addEventListener('click', () => {
        //     localStorage.setItem('reminder', JSON.stringify(report[num].qanda));
        // })


    }
    save_qa() {
        var report = this.report.report;
        var num = this.number;
        let rep = [];
        let qa_element = document.querySelector('#qa_hontai');
        //console.log( qa_element.querySelectorAll('.qa') );
        for( let data of qa_element.querySelectorAll('.qa') ) {
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
        this.report = [];// 全部のデータを入れておく変数
        //グローバル変数は　ex2.html にある
        // テストデータの仮代入
        this.report[0] = {};
        this.report[0].qanda = [];
        this.report[0].konkyo = [];

        // テストデータの細かい部分を仮代入
        let qa = this.report[0].qanda;
        let k = this.report[0].konkyo;

        qa.push({ q: "00", a: "anser" });
        qa.push({ q: "01", a: "anser" });
        qa.push({ q: "02", a: "anser" });
        qa.push({ q: "03", a: "anser" });
        console.log(157,qa);
        // var data = JSON.parse(localStorage.getItem('reminder')) || qa;
        // this.data = data;
    }
    set_data() {
        document.querySelector('.save').addEventListener('click', () => {
             localStorage.setItem('reminder', JSON.stringify(qa));
         })

    }
    /**
     * 描述
     * @date 2019-12-13
     * @param {any} qanda   QandAの配列
     * @param {number} id1  入れ替えるID
     * @param {number} id2  入れ替えるID
     * @returns {any}
     */
    replace(qanda, id1, id2) {
        let change = qanda[id2];
        qanda[id2] = qanda[id1];
        qanda[id1] = change;
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