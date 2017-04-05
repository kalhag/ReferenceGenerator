window.$ = window.jQuery = require('jquery');
var Datastore = require('nedb');
//Start with empty database => run renderList()
var databaseContent = null;

var $refList = $('#reference-list');

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

//Map database
function renderList() {
  db.find({}, function(err, docs) {
    databaseContent = docs;
    findList();
  });

  document.getElementById('reference-list').innerHTML = "";

  function findList() {
    var dbLength = databaseContent.length;

    var appendRefList = databaseContent.map(function(entry) {
      var refItem = document.createElement('div');
      var refAuthor = document.createTextNode( entry.author );
      refItem.appendChild(refAuthor);
      document.getElementById('reference-list').appendChild(refItem);
    });
  }

}
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

  renderList();

}
