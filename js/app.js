


function startApp() {

  loadData();

  attachListeners();

}


function loadData() {

  const success = retrievedInfo => displayPage(retrievedInfo);

  $.get('./data/page-1.json', data => {
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
    $newPhoto.removeAttr('id');

    $('main').append($newPhoto);

    if (!keywordArr.includes(element.keyword)) {
      keywordArr.push(element.keyword);
    }

  });

  // remove photo template
  $('#photo-template').remove();

  keywordArr.forEach(element => {
    const $newOption = $('#option-template').clone();
    $newOption.text(element);
    $newOption.attr('value', element);

    $('select').append($newOption);
  });
}


function attachListeners() {
  $('select').on('change', event => {
    const $choice = $(event.target).val();
    console.log($choice);

    if ($choice === 'default') {
      $('.photo-class').show();
    } else {
      $('.photo-class').hide();
      $('.photo-class[data-keyword="' + $choice + '"]').show();
    }

  });
}

$(startApp);


