<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <title>Laravel</title>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" type="text/css" href="/css/app.css">
    </head>
    <body>
        <div id="app">
            <div class="container">
                <div class="row">
                    <div class="panel panel-default">
                        <!-- Default panel contents -->
                        <div class="panel-heading">List Users</div>
                        <div class="panel-body">
                            <user-dashboard></user-dashboard>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <my-component></my-component>
                    </div>
                    <div class="col-md-6">
                        <conditional-rendering></conditional-rendering>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <list-rendering></list-rendering>
                    </div>
                </div>
            </div>
        </div>
        <script src="/js/app.js"></script>
    </body>
</html>