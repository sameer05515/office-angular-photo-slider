angular
		.module('website', [ 'ngRoute','ngAnimate', 'ngTouch' ])
		.controller(
				'MainCtrl',
				function($scope, $http) {

					$scope.slides = [ {
						image : 'images/img00.jpg',
						description : 'Image 00'
					}, {
						image : 'images/img01.jpg',
						description : 'Image 01'
					}, {
						image : 'images/img02.jpg',
						description : 'Image 02'
					}, {
						image : 'images/img03.jpg',
						description : 'Image 03'
					}, {
						image : 'images/img04.jpg',
						description : 'Image 04'
					} ];
					// ///////////////////////////////////////////////
					$scope.checked_fruits = [ ".png", ".jpeg", ".jpg" ];
					$scope.fileNames = [];
					
					$scope.loadResult = function(myfolder) {
						console.log("Starting search for : " + myfolder);
						var urrrlll = "http://127.0.0.1:8888/FileService/fileService.jsp";
						$scope.slides=[];
						$http({
							method : 'POST',
							url : urrrlll,
							params : {
								'fileName' : myfolder,
								'extensions' : $scope.checked_fruits
							}
						}).success(
								function(data) {
									for (var i = 0; i < data.length; i++) {
										$scope.fileNames.push(data[i]);
										var objeee = angular.fromJson(data[i]);
										var objjj={};
										
										objjj.image="http://127.0.0.1:8888/FileService/my.jsp?documentId="+objeee.filePath;
										objjj.description=objeee.name;
										$scope.slides.push(objjj);
									}
									console.log("Starting search for : "
											+ $scope.fileNames);
								}).error(function(data) {
							alert(data + "Error")
						});

					};
					
					$scope.loadResult("C:/Users/premendra.kumar1/Desktop/important docs");
					
					// ///////////////////////////////////////////////

					

					$scope.direction = 'left';
					$scope.currentIndex = 0;

					$scope.setCurrentSlideIndex = function(index) {
						$scope.direction = (index > $scope.currentIndex) ? 'left'
								: 'right';
						$scope.currentIndex = index;
					};

					$scope.isCurrentSlideIndex = function(index) {
						return $scope.currentIndex === index;
					};

					$scope.prevSlide = function() {
						$scope.direction = 'left';
						$scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex
								: 0;
					};

					$scope.nextSlide = function() {
						$scope.direction = 'right';
						$scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex
								: $scope.slides.length - 1;
					};
				}).animation('.slide-animation', function() {
			return {
				beforeAddClass : function(element, className, done) {
					var scope = element.scope();

					if (className == 'ng-hide') {
						var finishPoint = element.parent().width();
						if (scope.direction !== 'right') {
							finishPoint = -finishPoint;
						}
						TweenMax.to(element, 0.5, {
							left : finishPoint,
							onComplete : done
						});
					} else {
						done();
					}
				},
				removeClass : function(element, className, done) {
					var scope = element.scope();

					if (className == 'ng-hide') {
						element.removeClass('ng-hide');

						var startPoint = element.parent().width();
						if (scope.direction === 'right') {
							startPoint = -startPoint;
						}

						TweenMax.fromTo(element, 0.5, {
							left : startPoint
						}, {
							left : 0,
							onComplete : done
						});
					} else {
						done();
					}
				}
			};
		});
