angular.module('myapp').controller('listController', function($scope, $state, ModelAPI) {

	ModelAPI.getAllModels().then(function(models) {
		$scope.models = models.data;
	});

	$scope.openModel = function(model) {
		$state.go('conceptual', {
			'modelid': model._id
		});
	}

});