window.addEventListener('load', () => {
    document.querySelector('#btnAdd').addEventListener('click', () => {
        saveStorage(kye,val);
        getStorrang(kye);
        add();
        addMemo(ttl,bdy);
        readMemo()
    });
})

memoArr = [];
var storageKye = 'memoobj';

window.addEventListener('load', () => {
    document.querySelector('#btnlod').addEventListener('click', () => {
        saveStorage(kye,val);
        saveMemo(ttl,bdy);
    });
})

//readMemo();

window.addEventListener('load', () => {
    document.querySelector('#btnReset').addEventListener('click', () => {
        resetMemo();
    });
})




function saveStorage(key,val){
    localStorage.setItem(key,JSON.stringify(val))
}

function getStorrang(key){
var obj = localStorage.getItem(key);
return JSON.parse(obj);
}

function add(){
    var ttl = document.querySelector('.mmemoFome #title').val();
    var bdy = document.querySelector('.mmemoFome #body').val();
    addMemo(ttl, bdy);
    saveMemo(ttl, bdy);
}

function addMemo(ttl,bdy){
    let temp = document.querySelector('#temp0').content;
    temp = temp.replace('%s',ttl).temp.replace('%s',bdy);

    document.querySelector('#memoArea').appendChild(temp);
    document.querySelector('#title').val('');
    document.querySelector('#body').val('');
}

//memoArr = [];
//var storageKye = 'memoobj';

function seveMemo(ttl,bdy){
    var memoobj={
        ttl : ttl,
        bdy : bdy
    };
    memoArr.push(memoobj);
    saveStorage(storageKye,memoArr);
}

function resetMemo(){
    document.querySelector('#memoArea').children().remove();
    window.localStorage.clear();
}

function readMemo(){
    var  ojs = getStorange(storageKye);
    if (ojs.length == null) return;
    for(var i = 0; i<ojs.length;i++){
    var memoObj = ojs[i];
    var ttl = memoObj.ttl;
    var bdy = memoObj.bdy;
    var memoObj ={
        ttl : ttl,
		bdy : bdy
    };
    memoArr.pushu(memoObj);
    saveStorage(storageKye,memoArr);
    addMemo(ttl,bdy);
    }
}

