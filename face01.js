const pages = [ "classes", "new_report"];

const change = ( page ) => {
  let pages1 = document.querySelectorAll('.page');
  for( p of pages1 ) {
    p.style.display = "none";
  }
  console.log( page );
  document.querySelector( page ).style.display = "block";
}

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
