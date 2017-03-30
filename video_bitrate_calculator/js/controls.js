/*
An AngularJS video bitrate calculator.
  
Copyright (C) 2017, Adrian Raul Mos

This program is free software : you can redistribute it and / or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program.If not, see <http://www.gnu.org/licenses/>.*/


angular.module('myApp', [])
.controller('bitrateCalculator', ['$scope', function($scope) { 

    
    $scope.items = [];
	$scope.formats = [{name:"YUV 4:4:4", factor:3, depthMeaning:"Luminance channel Y depth"}, 
                      {name:"YUV 4:2:2", factor:2, depthMeaning:"Luminance channel Y depth"},
                      {name:"RGB"      , factor:3, depthMeaning:"One channel color depth"}];
    
    $scope.format=$scope.formats[1];
	$scope.frameFormat = $scope.format.name; 
    $scope.depthLabel =  $scope.format.depthMeaning;
    
    
    $scope.frameSizeInBits=0;
    $scope.width=1920;
    $scope.height=1080;
    $scope.depth=10;
    $scope.lcbit=3;
    $scope.framerate=60;
    $scope.count = 0;
    
    
    $scope.calculate = function() {
    	$scope.lcbit=$scope.depth*$scope.format.factor; 
        $scope.frameSizeInBits=$scope.lcbit*$scope.width*$scope.height; 
    };
    
     $scope.frameFormatChanged = function(selectedItem) {
       
        $scope.format = $scope.formats.find(x => x.name === selectedItem);    
        $scope.depthLabel =  $scope.format.depthMeaning;            
     	$scope.calculate();
    };
    
    
    $scope.add = function() {
    	var item  = {id: Date.now(),
        			 width: $scope.width,
                     height: $scope.height,
                     frameSizeInBits: $scope.frameSizeInBits,
                     framerate: $scope.framerate,
                     depth: $scope.depth,
                     lcbit: $scope.lcbit,
                     frameFormat: $scope.format.name,
                     factor: $scope.factor,
                     bitrate: $scope.frameSizeInBits / 8.0 * $scope.framerate /1000000000};
    
        $scope.items.push(item);   
    };
    
     $scope.getTotal = function(){
            var total = 0;
            for(var i = 0; i < $scope.items.length; i++) {
                total += $scope.items[i].bitrate;
            }
            return total;
     }
     
     $scope.remove = function(id){            
            var itemToRemove = $scope.items.find(x => x.id === id); 
            
            if (itemToRemove != null) {
	            var index = $scope.items.indexOf(itemToRemove);    
  				$scope.items.splice(index, 1);     
            }
     }
     
     $scope.removeAll = function(item){            
  			$scope.items=[];     
     }
     
    
    $scope.calculate();
}]);