app.controller("mainController", mainController);

function mainController($scope, $parse, productService) {
    console.log("Hello from main controller...");

    initController();

    function initController() {
        $scope.nameClass = "fas fa-sort";
        $scope.brandClass = "fas fa-sort";
        $scope.typeClass = "fas fa-sort";

        productService.GetAll().then(function (response) {
            $scope.products = response.data;
        });
    }

    $scope.addProduct = function (product) {
        productService.Insert(product).then(function (response) {
            alert("Product was added!");
            location.reload();
        });
    };

    $scope.editProduct = function (product) {
        var id = product.Id;

        productNameText = $parse("productNameText" + id);
        productBrandText = $parse("productBrandText" + id);
        productTypeText = $parse("productTypeText" + id);
        productNameInput = $parse("productNameInput" + id);
        productBrandInput = $parse("productBrandInput" + id);
        productTypeInput = $parse("productTypeInput" + id);
        hideEditButton = $parse("hideEditButton" + id);
        hideDeleteButton = $parse("hideDeleteButton" + id);
        showSaveButton = $parse("showSaveButton" + id);
        showCancelButton = $parse("showCancelButton" + id);

        productNameText.assign($scope, true);
        productBrandText.assign($scope, true);
        productTypeText.assign($scope, true);
        productNameInput.assign($scope, true);
        productBrandInput.assign($scope, true);
        productTypeInput.assign($scope, true);
        hideEditButton.assign($scope, true);
        hideDeleteButton.assign($scope, true);
        showSaveButton.assign($scope, true);
        showCancelButton.assign($scope, true);
    };

    $scope.saveEditProduct = function (id, product) {
        delete product.Id;

        productService.Update(id, product).then(function (response) {
            alert("Product was updated!");
            location.reload();
        });
    };

    $scope.cancelEditProduct = function (product) {
        var id = product.Id;

        productNameText = $parse("productNameText" + id);
        productBrandText = $parse("productBrandText" + id);
        productTypeText = $parse("productTypeText" + id);
        productNameInput = $parse("productNameInput" + id);
        productBrandInput = $parse("productBrandInput" + id);
        productTypeInput = $parse("productTypeInput" + id);
        hideEditButton = $parse("hideEditButton" + id);
        hideDeleteButton = $parse("hideDeleteButton" + id);
        showSaveButton = $parse("showSaveButton" + id);
        showCancelButton = $parse("showCancelButton" + id);

        productNameText.assign($scope, false);
        productBrandText.assign($scope, false);
        productTypeText.assign($scope, false);
        productNameInput.assign($scope, false);
        productBrandInput.assign($scope, false);
        productTypeInput.assign($scope, false);
        hideEditButton.assign($scope, false);
        hideDeleteButton.assign($scope, false);
        showSaveButton.assign($scope, false);
        showCancelButton.assign($scope, false);
    };

    $scope.deleteProduct = function (id) {
        productService.Delete(id).then(function () {
            alert("Product was deleted!");
            location.reload();
        });
    };

    $scope.sortCol = function (product) {
        if ($scope.sortColumn == product) {
            $scope.sortColumn = '-' + product;
            $scope.toggleClass("desc", product);
        }
        else if ($scope.sortColumn == '-' + product) {
            $scope.sortColumn = product;
            $scope.toggleClass("asc", product);
        }
        else {
            $scope.sortColumn = product;
            $scope.toggleClass("asc", product);
        }
    };

    $scope.toggleClass = function (order, product) {
        if (order == "asc") {
            if (product == "Name") {
                $scope.nameClass = "fas fa-sort-up";
                $scope.brandClass = "fas fa-sort";
                $scope.typeClass = "fas fa-sort";
            }

            if (product == "Brand") {
                $scope.brandClass = "fas fa-sort-up";
                $scope.nameClass = "fas fa-sort";
                $scope.typeClass = "fas fa-sort";
            }

            if (product == "Type") {
                $scope.typeClass = "fas fa-sort-up";
                $scope.nameClass = "fas fa-sort";
                $scope.brandClass = "fas fa-sort";
            }
        }
        else if (order == "desc") {
            if (product == "Name") {
                $scope.nameClass = "fas fa-sort-down";
                $scope.brandClass = "fas fa-sort";
                $scope.typeClass = "fas fa-sort";
            }

            if (product == "Brand") {
                $scope.brandClass = "fas fa-sort-down";
                $scope.nameClass = "fas fa-sort";
                $scope.typeClass = "fas fa-sort";
            }

            if (product == "Type") {
                $scope.typeClass = "fas fa-sort-down";
                $scope.nameClass = "fas fa-sort";
                $scope.brandClass = "fas fa-sort";
            }
        }
        
    };
}