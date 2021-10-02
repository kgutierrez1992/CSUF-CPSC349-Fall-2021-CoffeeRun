(function () {
    'use strict';
    const FORM_SELECTOR = '[data-coffee-order="form"]';
    const CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    const PAYMENT_FORM_SELECTOR = '[data-payment-order="form"]';

    var $ = window.jQuery;
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var CheckList = App.CheckList;

    var truck = new Truck('ncc-1701', new DataStore());
    window.truck = truck;

    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(truck.deliverOrder.bind(truck));

    var formHandler = new FormHandler(FORM_SELECTOR);
    formHandler.addSubmitHandler(function (data) {
        truck.createOrder.call(truck, data);
        checkList.addRow.call(checkList, data);
    });

    // loading payment form
    $(document).ready(function () {
        $('#paymentForm').load('/paymentform.html', function () {

            var paymentHandler = new FormHandler(PAYMENT_FORM_SELECTOR);
            paymentHandler.addSubmitHandler(function (data) {
                var title = data?.title ? data.title : '';
                var $div = $('<div></div>', {
                    'class': 'modal',
                    'id': 'payment_form',
                });

                var $p = $('<p></p>');
                $p.append('Thank you for your payment, ' + title + ' ' + data.username);
                $div.append($p);
                $div.append('<a href="#" rel="modal:close">Return to Order Page</a>');

                $($div).modal();
            });
        });
    });

})(window);