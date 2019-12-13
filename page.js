const pages = [ "classes", "new_report"];/*ここで移動する変数の宣言*/


/*change を宣言　＝＞　ボタンなどを押された後の処理 */
const change = ( page ) => {　/*アロー関数 */
  let pages1 = document.querySelectorAll('.page');　/*クラスを指定する　（.pageはクラス名） */
  for( p of pages1 ) {　
    p.style.display = "none";
  }
  console.log( page );
  document.querySelector( page ).style.display = "block";
}

/* ボタンを押されたときの処理*/
window.addEventListener('load',() => {
  change( "#classes" );
  let nl = new nylon();
  document.querySelector('#new_btn').addEventListener('click', () => {
    nl.emit( "page", {page: '#new_report'});
  });

  let nl2 = new nylon();
  nl2.on ('page', (key, value) => {
    change( value.page );
  });
})
