angular.module("visualjgroups")
    .controller('operationCtrl', ['$scope', '$location','$http','$timeout',
        function ($scope, $location,$http,$timeout) {

            // modèle de la page
            var operation = $scope.operation;
            $scope.showTable = true;
          
          
             $http.get('http://localhost:8080//visualisationjg-webapi/getAdr') 
            .then(function(json) {
              $scope.adr = json.data.data.rep; 
              $scope.adress = $scope.adr[0];
             
              
          return $http.get('http://localhost:8080//visualisationjg-webapi/getMbeanPro/'+$scope.adr[0]+'/');
              
            })
          .then(function(json) {
       //  console.log('http://localhost:8080//visualisationjg-webapi/getMbeanPro/'+$scope.adr[0]+'/');
        	 // console.log("protocols", json);
              $scope.protocols = json.data.data;
              console.log("list protocl **** ", $scope.protocols[0]);
              $scope.protocolMb = $scope.protocols[0]; 
              $scope.listOper = $scope.protocolMb.listOper;
              $scope.methods = $scope.protocolMb.listOper[0];

              $timeout(function(){
                  $('.selectpicker').selectpicker();
                    });
      	   
              
            });	
             $scope.onChange = function(protocolMb){       
            	    $scope.listOper = protocolMb.listOper;
            	    $scope.methods = protocolMb.listOper[0];
            	  //   console.log("opet **************** ", $scope.listOper); 
            	    $timeout(function(){
                        $('.selectpicker').selectpicker('refresh');
                          });
            	   
            	 
            	    };
            	$scope.invoke = function(){
            		
            		$http.get('http://localhost:8080//visualisationjg-webapi/invokeMethod/'+$scope.protocolMb.label+'/'+ $scope.methods.nameOp+'/'+$scope.adress+'/').success(function (data) {
                   //   console.log("voir adrrese ",'http://localhost:8080//visualisationjg-webapi/invokeMethod/'+$scope.protocolMb.label+'/'+ $scope.methods.nameOp+'/'+$scope.adress+'/');
            			// $scope.showTable = true;
            			var result  = data;
                        $scope.result = result.data;
                       
                        console.log("------------------------------- ", $scope.result[0]);
                    }).error(function (data) {
                        //
                       
                    });
            
            	};
            	     
        }]);
