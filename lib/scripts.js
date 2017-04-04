window.$ = window.jQuery = require('jquery');
var Datastore = require('nedb');

//Database
db = new Datastore({ filename: 'db/references.db', autoload: true });

//Application
$(document).ready(function() {
  var submit = $('#submitbutton');

  //Submit form / add to database
  submit.click(function(e) {
    e.preventDefault();
    var form = $('.add-reference');
    var author = $('#author').val();
    var year = $('#year').val();
    var title = $('#title').val();

    addRef(author, year, title);
    //Reset form
    form[0].reset();
  })

});

//Add reference to database
function addRef(author, year, title) {

  //Reference properties
  var reference = {
    'author': author,
    'year': year,
    'title': title
  }

  //Insert to database
  db.insert(reference, function(err) {

  })

}
