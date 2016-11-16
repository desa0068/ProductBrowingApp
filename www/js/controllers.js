angular.module('starter.controllers', ['ionic-ratings', 'ngStorage'])

.controller('DashCtrl', function ($scope) {})

.controller('CategoriesCtrl', function ($scope, categoryService) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	//$scope.$on('$ionicView.enter', function(e) {
	//});


	//  $scope.chats = Chats.all();
	//  $scope.remove = function(chat) {
	//    Chats.remove(chat);
	//  };

	$scope.categorieslist = categoryService.get().then(function (data) {
			$scope.categories = data;
			console.log($scope.categories);
			console.log('category returned to controller.');
		},
		function (data) {
			console.log('category retrieval failed.')
		});
})

.controller('ProductCtrl', function ($scope, $stateParams, productService) {
	$scope.productlist = productService.get().then(function (data) {

			var catId = $stateParams.categoryID;
			var numProducts = data.length;
			$scope.products = [];
			var i = 0;
			while (i < numProducts) {
				if (catId == data[i].cat_id) {
					$scope.products.push(data[i]);
				}
				i++;
			}
			console.log($scope.products);
			console.log('product returned to controller.');
		},
		function (data) {
			console.log('product retrieval failed.')
		});

})

.controller('ProductDetailCtrl', function ($scope, productService, $stateParams, ratingService) {

	$scope.catId = $stateParams.productID;
	$scope.productDetails = [];
	productService.get().then(function (data) {

			var numProducts = data.length;
			var i = 0;
			while (i < numProducts) {
				if ($scope.catId == data[i]._id) {
					$scope.productDetails.push(data[i]);
				}
				i++;
			}
			console.log($scope.productDetails);

			if (ratingService.get($scope.catId) == null) {
				$scope.ratingsObject.rating = $scope.productDetails[0].rating;
			}
			//$scope.rating = $scope.productDetails[0].rating;

			console.log('product returned to controller.');

		},
		function (data) {
			console.log('product retrieval failed.')
		});

	//console.log();
	$scope.rating = ratingService.get($scope.catId)


	$scope.ratingsObject = {
		iconOn: 'ion-ios-star',
		iconOff: 'ion-ios-star-outline',
		iconOnColor: 'rgb(200, 200, 100)',
		iconOffColor: 'rgb(200, 100, 100)',
		rating: $scope.rating,
		minRating: 1,
		callback: function (rating) {
			$scope.ratingsCallback(rating);
		}
	};


	$scope.ratingsCallback = function (rating) {
		console.log('Selected rating is : ', rating);
		ratingService.add(rating, $scope.catId);

	};



})

.controller('AccountCtrl', function ($scope) {
	$scope.settings = {
		enableFriends: true
	};
});