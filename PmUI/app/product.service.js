app.factory("productService", productService);

function productService($http, $q) {
    var service = {};
    var port = 60061;

    service.GetAll = GetAll;
    service.GetById = GetById;
    service.Insert = Insert;
    service.Update = Update;
    service.Delete = Delete;

    return service;

    function GetAll() {
        return $http.get("http://localhost:" + port + "/api/products");
    }

    function GetById(id) {
        return $http.get("http://localhost:" + port + "/api/products/" + id);
    }

    function Insert(product) {
        //debugger;
        return $http.post("http://localhost:" + port + "/api/products", angular.fromJson(product));
    }

    function Update(id, product) {
        console.log(product);
        //debugger;
        return $http.put("http://localhost:" + port + "/api/products/" + id, angular.fromJson(product));
    }

    function Delete(id) {
        //debugger;
        return $http.delete("http://localhost:" + port + "/api/products/" + id);
    }
}