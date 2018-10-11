app.config(appRoute);

function appRoute($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "templates/main/main.html",
            controller: "mainController"
        });
}