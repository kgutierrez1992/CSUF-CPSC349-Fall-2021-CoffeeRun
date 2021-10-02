(function(window){ 
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    class FormHandler {
        constructor(selector) {
            if (!selector) {
                throw new Error('no selector provided!');
            }

            this.$formElement = $(selector);
            if (this.$formElement === 0) {
                throw new Error('Could not find element with selector: ' + selector);
            }
        }
        addSubmitHandler(fn) {
            console.log('Setting submit handler for form.');
            this.$formElement.on('submit', function (event) {
                event.preventDefault();

                var data = {};
                $(this).serializeArray().forEach(function (item) {
                    data[item.name] = item.value;
                    console.log(item.name + ' is ' + item.value);
                });
                console.log(data);
                fn(data);
                this.reset();
                this.elements[0].focus();
            });

            FormHandler.prototype.addInputHandler = function (fn) {
                console.log('Setting input handler for form');
                this.$formElement.on('input', '[name="emailAddress"]', function (event) {
                    //event handler code here
                    var emailAddress = event.target.value;
                    console.log(fn(emailAddress));
                });
            };
        }
    }


    App.FormHandler = FormHandler;
    window.App = App;
    
})(window);