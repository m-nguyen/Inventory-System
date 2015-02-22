'use strict';

angular.module('inventory').controller('InventoryController', ['$scope', '$stateParams', '$location', 'Authentication', 'Inventory',
	function($scope, $stateParams, $location, Authentication, Inventory) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var partType = new Inventory($scope.partType);
			partType.$save(function(response) {
				$location.path('inventory/' + response._id + '/edit');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(partType) {
			if (partType) {
				partType.$remove();

				for (var i in $scope.inventory) {
					if ($scope.inventory[i] === partType) {
						$scope.inventory.splice(i, 1);
					}
				}
			} else {
				$scope.partType.$remove(function() {
					$location.path('inventory');
				});
			}
		};

		$scope.update = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var partType = new Inventory($scope.partType);

				partType.$update(function(response) {
					$scope.success = true;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		$scope.updateQuantity = function (partType, newVal){
			// only for parts that do NOT use part schema
			partType.quantity = newVal;
			partType.$update(partType, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.inventory = Inventory.query();
		};

		$scope.findOne = function() {
			$scope.partType = Inventory.get({
				partId: $stateParams.partId
			});
		};
	}
]);
