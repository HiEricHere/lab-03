


function startApp() {
  loadData();

}


function loadData() {

  const success = retrievedInfo => displayPage(retrievedInfo);

  $.get('/data/page-1.json', data => {
    if (data.length) {
      success(data);
    } else {
      console.log('something went wrong with $.get');
    }
  }, 'json');
}


function displayPage(data) {
  const keywordArr = [];

  data.forEach(element => {
    const $newPhoto = $('#photo-template').clone();

    $newPhoto.find('h2').text(element.title);
    $newPhoto.find('img').attr('src', element.image_url);
    $newPhoto.find('p').text(element.description);
    $newPhoto.attr('data-keyword', element.keyword);

    $('main').append($newPhoto);

    if (!keywordArr.includes(element.keyword)) {
      keywordArr.push(element.keyword);
    }

  });

  keywordArr.forEach(element => {
    const $newOption = $('#option-template').clone();
    $newOption.text(element);
    $newOption.attr('value', element);

    $('select').append($newOption);
  });
}

// get all the unique keyword out of returned data
// add those keywords to the select options
// setup listener on the select
// hide and diplay images based on what was selected


$(startApp);
