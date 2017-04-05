window.$ = window.jQuery = require('jquery');
var Datastore = require('nedb');
//Start with empty database => run renderList()
var databaseContent = null;

var $refList = $('#reference-list');

//Database
db = new Datastore({ filename: 'db/references.db', autoload: true });

//Application
$(document).ready(function() {
  //Render references
  renderList();

  var submit = $('#submitbutton');
  var removeButton = $('.remove-button');
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

  $(document).on('click', '.remove-button', function(e) {
    db.remove({ _id: this.id }, {}, function (err, numRemoved) {
      renderList();
    });
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
      var refH3 = document.createElement('h3');
      var refSub = document.createElement('p');
      var remove = document.createElement('div');

      refItem.className = 'ref-item';

      remove.className = 'remove-button';
      remove.id = entry._id;

      var removeCross = document.createTextNode( '✖' );
      var refAuthor = document.createTextNode( entry.author );
      var refYearTitle = document.createTextNode( entry.year + ' ' + entry.title );

      remove.appendChild( removeCross );
      refH3.appendChild( refAuthor );
      refSub.appendChild( refYearTitle );

      refItem.appendChild( remove );
      refItem.appendChild( refH3 );
      refItem.appendChild( refSub );

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
