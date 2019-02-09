'use strict';
$(document).ready(function () {
    // $("input").focus(function () {
    //     $(this).css("border", "1px solid");
    //     $(this).css("background", "#ffe5c2");
    // });
    // $("input").focusout(function () {
    //     $(this).css("border", "none");
    //     $(this).css("background", "none");
    // });

    $('#yourCompany').val('adjashdjashdajshj')
    $('#invioiceDate').datetimepicker({
        format: 'MM-DD-YYYY',
        minDate: new Date()
    });
    $('#invoiceDueDate').datetimepicker({
        format: 'MM-DD-YYYY',
        minDate: new Date()
    });

    // select inpput fild when page loads
    $('#yourCompany').select();

    // hiding element
    $('.igsttHead').hide();
    $('.cesstHead').hide();
    $('.tdigst').hide();
    $('.tdcess').hide();

    var states1 = '';
    var states2 = '';

    $('#states1 , #states2').on('change', function (e) {
        var firstSel = $('#states1').val();
        var secondSel = $('#states2').val();

        if (firstSel !== secondSel) {
            console.log('do changes');
            $('.igsttHead').show();
            $('.cesstHead').show();
            $('.tdigst').show();
            $('.tdcess').show();

            //hide sgst and cgst
            $('.cgstHead').hide();
            $('.sgstHead').hide();
            $('.tdcgst').hide();
            $('.tdsgst').hide();
            $('input').trigger('reset');
            $('#tab_logic tbody').on('keyup change', function () {
                cal_igst_cess();
            });
        } else {
            console.log('nochange');
            $('.igsttHead').hide();
            $('.cesstHead').hide();
            $('.tdigst').hide();
            $('.tdcess').hide();

            //hide sgst and cgst
            $('.cgstHead').show();
            $('.sgstHead').show();
            $('.tdcgst').show();
            $('.tdsgst').show();
            $('input').trigger('reset');
            $('#tab_logic tbody').on('keyup change', function () {
                calc();
            });
        }
    });

    var i = 1;
    $('#add_row').click(function () {
        var b = i - 1;
        $('#addr' + i)
            .html($('#addr' + b).html())
            .find('td:first-child')
            .html(i + 1);
        $('#tab_logic').append('<tr id="addr' + (i + 1) + '"></tr>');
        i++;
    });

    $('#itemsBody').on('click', '.btnDelete', function () {
        $(this)
            .closest('tr')
            .remove();
        calc();
    });

    $('#tab_logic tbody').on('keyup change', function () {
        calc();
    });

    $('#tax').on('keyup change', function () {
        calc_total();
    });

});

// function cal calculate gst and sgst values
function calc() {
    $('#tab_logic tbody tr').each(function (i, element) {
        var html = $(this).html();
        //       console.log(html);

        if (html != '') {
            var qty = $(this).find('.qty').val();
            var price = $(this).find('.price').val();
            var sgst = $(this).find('.sgst').val();
            //var cgst = $(this).find('.igst').val();
            var cgst = $(this).find('.cgst').val();
            $(this).find('.total').val(qty * price);
            var inline_tottal = qty * price;
            var sgst_totl = inline_tottal * (sgst / 100);
            var cgst_total = inline_tottal * (cgst / 100);
            console.log(cgst + sgst);
            console.log(inline_tottal);
            var final_inline_tax_total = sgst_totl + cgst_total + inline_tottal;
            $(this)
                .find('.inline_tax')
                .val(final_inline_tax_total.toFixed(2));
            var tax_amt_new_inline = sgst_totl + cgst_total;
            $(this)
                .find('.inline_tax_amount')
                .val(tax_amt_new_inline);
            console.log(true);
            calc_total();
        }
    });
}

// function to calculate igst and cess
function cal_igst_cess() {
    $('#tab_logic tbody tr').each(function (i, element) {
        var html = $(this).html();
        //       console.log(html);

        if (html != '') {
            var qty = $(this)
                .find('.qty')
                .val();
            var price = $(this)
                .find('.price')
                .val();
            var igst = $(this)
                .find('.igst')
                .val();
            //var cgst = $(this).find('.igst').val();
            var cess = $(this)
                .find('.cess')
                .val();
            $(this)
                .find('.total')
                .val(qty * price);
            var inline_tottal = qty * price;
            var cess_total = inline_tottal * (cess / 100);
            var igst_total = inline_tottal * (igst / 100);

            console.log(cess + igst);
            console.log(inline_tottal);

            var final_inline_tax_total = cess_total + igst_total + inline_tottal;
            $(this)
                .find('.inline_tax')
                .val(final_inline_tax_total.toFixed(2));
            var tax_amt_new_inline = cess_total + igst_total;
            $(this)
                .find('.inline_tax_amount')
                .val(tax_amt_new_inline);
            console.log(true);
            calc_total();
        }
    });
}

function calc_total() {
    var total = 0;
    var tax_inline_total = 0;
    $('.total').each(function () {
        total += parseInt($(this).val());
    });
    $('.inline_tax').each(function () {
        tax_inline_total += parseInt($(this).val());
    });
    $('#sub_total').val(total.toFixed(2));
    $('#total_amount').val(tax_inline_total.toFixed(2));
}

function numberValidation(e) {
    var number = $(e).val();
    const re = /^[0-9]*$/;
    if (number < 0 && !re.test(number)) {
        $(e).val(0);
    }
}


//function validations on save Buttons
$('.saveBtn').on('click', function () {
    var yourCompany = $('#yourCompany').val();
    var yourName = $('#yourName').val();
    var invoiceTitle = $('#invoiceTitle').val();
    var ycity = $('#ycity').val();
    var states1 = $('#states1').val();

    var ycountry = $('#ycountry').val();
    //var invoiceId = $('#invoiceId').val();
    //  var invioiceDate = $('#invioiceDate').val();
    // var invoiceDueDate = $('#invoiceDueDate').val();
    var clientName = $('#clientName').val();
    var clientCompanyName = $('#clientCompanyName').val();
    var clientAddress = $('#clientAddress').val();
    //var states2 = $('#states2').val();
    var clientCountryName = $('#clientCountryName').val();


    const re = /[A-Za-z]/;

    let status = false;

    if (!re.test(yourCompany)) {
        $("#yourCompany").after(
            `<small class="yourCompany" style="color:red">error</small>`
        );
        setTimeout(() => {
            $('.yourCompany').remove();
        }, 3000);

    } else {
        status = true;
    }

    if (!re.test(yourName)) {
        $("#yourName").after(
            `<small class="yourName" style="color:red">error</small>`
        );
        setTimeout(() => {
            $('.yourName').remove();
        }, 3000);

    } else {
        status = true;
    }
    if (!re.test(invoiceTitle)) {
        $("#invoiceTitle").after(
            `<small class="invoiceTitle" style="color:red">error</small>`
        );
        setTimeout(() => {
            $('.invoiceTitle').remove();
        }, 3000);

    } else {
        status = true;
    }
    if (!re.test(ycity)) {
        $("#ycity").after(
            `<small class="ycity" style="color:red">error</small>`
        );
        setTimeout(() => {
            $('.ycity').remove();
        }, 3000);

    } else {
        status = true;
    }

    if (!re.test(ycountry)) {
        $("#ycountry").after(
            `<small class="ycountry" style="color:red">error</small>`
        );
        setTimeout(() => {
            $('.ycountry').remove();
        }, 3000);

    } else {
        status = true;
    }

    if (!re.test(clientName)) {
        $("#clientName").after(
            `<small class="clientName" style="color:red">error</small>`
        );
        setTimeout(() => {
            $('.clientName').remove();
        }, 3000);

    } else {
        status = true;
    }

    if (!re.test(clientCompanyName)) {
        $("#clientCompanyName").after(
            `<small class="clientCompanyName" style="color:red">error</small>`
        );
        setTimeout(() => {
            $('.clientCompanyName').remove();
        }, 3000);

    } else {
        status = true;
    }
    if (!re.test(clientAddress)) {
        $("#clientAddress").after(
            `<small class="clientAddress" style="color:red">error</small>`
        );
        setTimeout(() => {
            $('.clientAddress').remove();
        }, 3000);

    } else {
        status = true;
    }
    if (!re.test(clientCountryName)) {
        $("#clientCountryName").after(
            `<small class="clientCountryName" style="color:red">error</small>`
        );
        setTimeout(() => {
            $('.clientCountryName').remove();
        }, 3000);

    } else {
        status = true;
    }

    if (status == true) {
        // create json
        let obj = {
            "yourCompany": yourCompany,
            "yourName": yourName,
            "invoiceTitle": invoiceTitle,
            "ycity": ycity,
            "ycountry": ycountry,
            "clientName": clientName,
            "clientCompanyName": clientCompanyName,
            "clientAddress": clientAddress,
            "clientCountryName": clientCountryName
        }

        var newObj_ = JSON.parse(`{ "yourCompany":"${yourCompany}" ,
        "yourName": "${yourName}",
         "invoiceTitle": "${invoiceTitle}",
         "ycity": "${ycity}",
         "ycountry": "${ycountry}",
         "clientName": "${clientName}",
         "clientCompanyName": "${clientCompanyName}",
         "clientAddress": "${clientAddress}",
         "clientCountryName": "${clientCountryName}"}`);
        console.log(newObj_);

    }
})

function fillData(details) {

    $("#yourCompany").val(details.yourCompany)
    $("#yourName").val(details.yourName)
    $("#invoiceTitle").val(details.invoiceTitle)
    $("#ycity").val(details.ycity)
    $("#ycountry").val(details.ycountry)
    $("#clientName").val(details.clientName)
    $("#clientCompanyName").val(details.clientCompanyName)
    $("#clientAddress").val(details.clientAddress)
    $("#clientCountryName").val(details.clientCountryName)
    return true;
}

fillData({
    "yourCompany": "Gaurav",
    "yourName": "jkashkdhsakj",
    "invoiceTitle": "ajsdlaskjdlk",
    "ycity": "asdadas",
    "ycountry": "alkdsaidsp",
    "clientCompanyName": "iiiiiii",
    "clientCity": "alskdalsdjasd",
    "clientAddress": "qqwwww121",
    "clientCountryName": "indiaa"
})