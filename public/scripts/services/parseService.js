
'use strict';
window.app.factory('Parse', ['parseConstant','$rootScope', 'Error', function (parseConstant, $rootScope, Error) {


var file;
var parseFile;
var jobs = jobHandler();

function jobHandler () {
  var jobsObj = Parse.Object.extend("Jobs");
  var query = new Parse.Query(jobsObj);
  return query.find();
}
function applyHandler (res) {
    Error(null, 'Sucessfully applied for Job Title:\n\n' + res.attributes.job_title + ', Your Application has been submitted!');
    $rootScope.upLoading = false;
}
function successHandler(res) {
    Error(null, 'Success!!');
    $rootScope.upLoading = false;
}
function errorHandler(err) {
    Error(err, 'Their was an error with your request please try again.')
    $rootScope.upLoading = false;
}
function handleFiles() {
    file = this.files[0];
    parseFile = new Parse.File(file.name, file);
}


  return {
    upload: function(){
      var inputElement = document.getElementById("input");
      inputElement.addEventListener("change", handleFiles, false);
    },
    logoUpload: function(){
      var inputElements = document.getElementById("logo");
      inputElements.addEventListener("change", handleFiles, false);
    },
    postTypes: function(data){
      var typeObj = new Parse.Object("JobTypes");
      return typeObj.save(data);
    },
    getTypes: function(data){
      var typeObj = Parse.Object.extend("JobTypes");
      var query = new Parse.Query(typeObj);
      return query.find();
    },
    post: function(data){
      parseFile.save().then(function () {
          var resume = new Parse.Object('Resume');
          resume.set('attachment', parseFile);
          resume.save(data).then(applyHandler, errorHandler);
      });
    },
    profile: function(){
      parseFile.save().then(function(){
        Parse.User.current().set('profile', parseFile);
        Parse.User.current().save().then(successHandler, errorHandler);
      });
    },
    logo: function(){
      parseFile.save().then(function(){
        Parse.User.current().set('logo', parseFile);
        Parse.User.current().save().then(successHandler, errorHandler);
      });
    },
    get: function(){
      var resumeObj = Parse.Object.extend("Resume");
      var query = new Parse.Query(resumeObj);
      return query.find();
    },
    getById: function (id) {
      var resumeObj = Parse.Object.extend("Resume");
      var query = new Parse.Query(resumeObj);
      return query.get(id);
    },
    opened: function(resume) {
      var resumeObj = Parse.Object.extend("Resume");
      var query = new Parse.Query(resumeObj);
      return query.get(resume.id);
    },
    getJob: function(){
      var jobPosting = Parse.Object.extend("Jobs");
      var query = new Parse.Query(jobPosting);
      return query.find();
    },
    getJobById: function(id){
      var jobPosting = Parse.Object.extend("Jobs");
      var query = new Parse.Query(jobPosting);
      return query.get(id);
    },
    postJob: function(data){
      var jobPosting = new Parse.Object("Jobs");
      return jobPosting.save(data);
    },
    getJobs: function(){
      return jobs;
    }
  };
}]);
