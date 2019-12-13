function add() {
    var div_element = document.createElement("li");
    div_element.innerHTML = '<input id="takumi"type="text" name="title" value="試験文字列"><button onclick="add()">+</button><button id="btn3">-</button>';
    var parent_object = document.getElementById("pp");
    parent_object.appendChild(div_element);
}
function add2(){
var del = document.getElementById("pp");
var lastElementChild = del.lastElementChild;
del.removeChild(lastElementChild);

}

window.addEventListener('load',() =>{
    document.querySelector('#btn3').addEventListener('click',() =>{
        add3();
    })
})

function add3(){
    let element1 = document.getElementById("takumi","btn3");
    element1.parentNode.removeChild(element1);
} 




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


