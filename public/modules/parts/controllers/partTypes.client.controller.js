'use strict';

angular.module('partTypes').controller('PartsController', ['$scope', '$stateParams', '$location', 'Authentication', 'PartType',
	function($scope, $stateParams, $location, Authentication, PartType) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var partType = new PartType({
                category: this.category,
                partName: this.partName,
                vendor: this.vendor,
                vndrPartNmbr: this.vndrPartNmbr,
                manufacturer: this.manufacturer,
                mnfPartNmbr: this.mnfPartNmbr,
                price: this.price,
                quantity: this.quantity
            });
			partType.$save(function(response) {
				$location.path('parts/' + response._id);
				$scope.title = '';
                $scope.category = '';
                $scope.partName = '';
                $scope.vendor = '';
                $scope.vndrPartNmbr = '';
                $scope.manufacturer = '';
                $scope.mnfPartNmbr = '';
                $scope.price = '';
                $scope.quantity = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(partType) {
			if (partType) {
				partType.$remove();

				for (var i in $scope.partTypes) {
					if ($scope.partTypes[i] === partType) {
						$scope.partTypes.splice(i, 1);
					}
				}
			} else {
				$scope.partType.$remove(function() {
					$location.path('parts');
				});
			}
		};

		$scope.update = function() {
			var partType = $scope.part;

			partType.$update(function() {
				$location.path('parts/' + partType._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.partTypes = PartType.query();
		};

		$scope.findOne = function() {
			$scope.partType = PartType.get({
				partId: $stateParams.partId
			});
		};
	}
]);
