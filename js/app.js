


function startApp() {
  let photoInfo = loadData();
  console.log(photoInfo);
  // displayData(data);

}



// get data
function loadData() {

  const success = retrievedInfo => displayPage(retrievedInfo);

  $.get('/data/page-1.json', data => {
    if (data.length) {
      console.log(data);
      success(data);
    } else {
      console.log('something went wrong with $.get');
    }
  }, 'json');
}

// copy html photo teplate

function displayPage(data) {
  data.forEach(element => {
    const $newPhoto = $('#photo-template').clone();

    $newPhoto.find('h2').text(element.title);
    $newPhoto.find('img').attr('src', element.image_url);
    $newPhoto.find('p').text(element.description);


    $('main').append($newPhoto);

  });
}

// attach it to the DOM

// remove template




$(startApp);
