const imgArray = [];

function startApp() {
  loadData(1);
}

function ImageData(rawData) {
  for(let key in rawData) {
    this[key] = rawData[key];
  }
}

function loadImgArray(data){
  data.forEach( element => {
    imgArray.push(new ImageData(element));
  });
}

function loadData(page) {

  $.get(`./data/page-${page}.json`).then(data => {
    if (data.length) {
      loadImgArray(data);
      displayPage(data);
      attachListeners(data);
    } else {
      console.log('something went wrong with $.get');
    }
  }, 'json');
}

function displayPage(data) {
  const keywordArr = [];
  console.log(data);
  console.log(typeof data);

  data.forEach( (element) => {
    let template = $('#photoScript').html();
    let templateScript = Handlebars.compile(template);
    let context = { 'keyword' : element.keyword, 'title' : element.title, 'image_url' : element.image_url, 'description' : element.description };
    let html = templateScript(context);

    $('main').append(html);

    if (!keywordArr.includes(element.keyword)) {
      keywordArr.push(element.keyword);
    }

  });

  keywordArr.forEach(element => {
    const $newOption = $('#option-template').clone();
    $newOption.text(element);
    $newOption.attr('value', element);
    $('#selectPics').append($newOption);
  });
}


function attachListeners(data) {
  $('#selectPics').on('change', event => {
    const $choice = $(event.target).val();
    console.log($choice);

    if ($choice === 'default') {
      $('.photo-class').show();
    } else {
      $('.photo-class').hide();
      $('.photo-class[data-keyword="' + $choice + '"]').show();
    }

  });

  $('#selectFilter').on('change', event => {
    const $filter = $(event.target).val();
    
    if ($filter === 'Horns') {
      data.sort( (a,b) => a.horns - b.horns );
      $('main').empty();
      displayPage(data);
    } else if ( $filter === 'Title') {
      $('main').empty();
      data.sort( (a,b) => {
        if ( a.title > b.title ){
          return 1;
        } else if ( a.title < b.title ){
          return -1;
        } else return 0;
      });
      displayPage(data);
    } else displayPage(data);
  });
}

$(startApp);


