module.exports = function(models) {

  const subjectList = [];


  const index = function(req, res, next) {

    models.Subject.find({}, function(err, subjects) {
      if (err) {
        return next(err);
      }
      res.render('subjects/index', {
        subjects
      });
    });

  };

  const addScreen = function(req, res) {
    res.render('subjects/add');
  }
  const add = function(req, res, next) {
    const language = req.body.language;
    var greeting = "";

    var subject = {
      name: req.body.subject
    };

    if (!subject || !subject.name) {
      req.flash('error', 'Name should not be blank');
      res.redirect('/subjects');
    } else if (!language) {
      req.flash('error', 'Please select language');
      res.redirect('/subjects');

    } else {
      models.Subject.findOne({
        name: req.body.subject
      }, function(err, results) {


        if (results == null) {
          models.Subject.create({
            name: req.body.subject,
            counter: 1
          }, function(err, results) {
            if (err) {
              return next(err);
            }

            if (language == "english") {
              greeting = "Hello " + results.name + " you have been greeted " + results.counter + " time today!";
            } else if (language == "afrikaans") {
              greeting = "Goeie more " + results.name + " jy is begroet " + results.counter + " keer vandag!";
            } else if (language == "xhosa") {
              greeting = "Mholo " + results.name + " uye wabuliswa " + results.counter + " namhlanje!";
            }
            res.render('subjects/add', {
              greeting: greeting
            });
          });

        }
        if (results) {
          results.counter = results.counter + 1;
          results.save();

          if (language == "english") {
            greeting = "Hello " + results.name + " you have been greeted " + results.counter + " times today!";
          } else if (language == "afrikaans") {
            greeting = "Goeie more " + results.name + " jy is begroet " + results.counter + " keer vandag!";
          } else if (language == "xhosa") {
            greeting = "Mholo " + results.name + " uye wabuliswa " + results.counter + " namhlanje!";
          }

          res.render('subjects/add', {
            greeting: greeting
          });
        }

      });
    }

  }

  return {
    index,
    add,
    addScreen
  }

}
