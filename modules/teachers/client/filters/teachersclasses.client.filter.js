(function () {
  'use strict';

  angular
    .module('teachers')
    .filter('teachersClassesFilter', teachersClassesFilter);

  teachersClassesFilter.$inject = [/*Example: '$state', '$window' */];

  function teachersClassesFilter(/*Example: $state, $window */) {
    return function (schoolClasses,teacher) {
      // teachersClassesFilter directive logic
      // ...
        var out = [];
        
        angular.forEach(schoolClasses,function(schoolClass){
            if(schoolClass.subjects.length>0){
            
                angular.forEach(schoolClass.subjects,function(subject){
                  
                    if(subject.teacher){
                        //console.log('youre here');
                        if(subject.teacher._id===teacher._id){
                           // console.log('found teachers subject');
                            if(out.indexOf(schoolClass)<0)
                                {
                                    //console.log('proceeding to add to array');
                                    out.push(schoolClass);        
                                }

                          } 
                    }
                });
            }
        });
        
        

      return out;
    };
  }
})();
