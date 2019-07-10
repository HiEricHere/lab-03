


function startApp() {

  // get data
  $.get('/data/page-1.json', data => {
    if (data.length) {
      console.log('success');
    }
  }, 'json')

  // copy html photo teplate

  // attach it to the DOM

  // remove template


}



$(startApp);
