var repot ={};
repot.title = "課題名";
repot.shuchou = {};//主張
repot.konkyo = {};//根拠
repot.tioans ={};//問と答えの部分

function add() {
    var div_element = document.createElement("li");
    div_element.innerHTML = '<input class="uemoto" id="takumi" type="text" name="title" size="50"><button class="btn" onclick="add()">+</button><button class="btn" onclick="add2()">-</button><br><br>';
    
   var parent_object = document.getElementById("pp");
    parent_object.appendChild(div_element);
}

function add2(){
var del = document.getElementById("pp");
var lastElementChild = del.lastElementChild;
del.removeChild(lastElementChild);

}
window.addEventListener('load',() =>{
    document.querySelector('#bt1').addEventListener('click',() => {
        add();
    })
})
window.addEventListener('load',() =>{
    document.querySelector('#bt2').addEventListener('click',() => {
        add2();
    })
})

function add4( id ){
    let copy = document.querySelector('template');
    let parent = document.querySelector('#toioya');
    let content = copy.content.cloneNode(true);
    console.log(content);
    let con2 = content.querySelector('div');
    con2.setAttribute('id',id);
    parent.appendChild(content);

}
window.addEventListener('load', () => {
    document.querySelector('#add_qa').addEventListener('click', () => {
        add4('bar');
    })
})

function add5(){
    /* let copy = document.querySelector('template');
    let parent = document.querySelector('#toioya');
    let content = copy.content.cloneNode(true); */
    //let last = copy.lastElementChild;
   //let lastChild = document.querySelector('[#toioya]:last');
   let del = document.querySelector('#bar');
   del.parentNode.removeChild(del);
}

window.addEventListener('load',() => {
    document.querySelector('#del_qa').addEventListener('click',() =>{
        add5();
    })
})