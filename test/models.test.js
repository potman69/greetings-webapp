const assert = require('assert');
const Models = require('../models')

describe ('models should be able to ', function(){
  var models = Models('mongodb://localhost/tutors-tests')

  beforeEach(function(done){
    models.Subject.remove({}, function(err){
      done(err);
    });

  })

  it('should Store to Mongodb', function(done){
    var subjectData = {name :'The test subject'};

    models.Subject.create(subjectData, function(err){
      done(err);

      models.Subject.find({name :'The test subject'}, function(err, subjects){
        assert.equal(1, subjects.lenght);
        done(err);
      });

    })
  })
})
