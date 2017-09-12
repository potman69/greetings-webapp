const mongoose = require('mongoose');

module.exports = function(mongoUrl){
  mongoose.connect(mongoUrl);
  const Subject = mongoose.model('Subject', {name : String, counter: Number});
  
  return{
    Subject
  };
}
