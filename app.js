$(document).ready(function () {

    $(".invoice-group").on('input', function () {
        var total_sum = 0;
        $(".invoice-group").each(function () {
            var rate = $('#input_rate').val();

            var qty = $('#input_qty').val();
            total_sum = rate * qty;
            console.log("this is rate " + rate);
            console.log("this is qty " + qty);

            //var after_multiplication = inputVal * inputVal;
            if ($.isNumeric(total_sum)) {
                console.log("this is total val " + total_sum);
            }

        });

        $('#dispay_ammount').text(total_sum);
        $('#sub_total_2nd').text(total_sum);

    });


    $('#invoiceDate').datetimepicker({
        format: 'MM-DD-YYYY',
        minDate: new Date()
    });
    $('#invoiceDueDate').datetimepicker({
        format: 'MM-DD-YYYY',
        minDate: new Date()
    });

    //target all Inputs

    $('input').focus(function () {
        $(this).css('border', '1px solid');
        $(this).css('background', '#ffe5c2');
    });
    $('input').focusout(function () {
        $(this).css('border', 'none');
        $(this).css('background', 'none');
    });

    // $("#billTo").on("click", function () {
    //     $("#billTo").attr("value", "Bill To:");

    // });

    // $("#billTo").on("click", function () {
    //     $("#billTo").attr("value", "Bill To:");
    // });

    // $("#billTo").on("click", function () {
    //     $("#billTo").attr("value", "Bill To:");
    // });

    // check all the state
    let customer_all_state = '';
    let bill_to_states = '';
    var customerStates = document.getElementById('customerStates').options;
    console.log(customerStates);
    var billToStates = document.getElementById('billToStats').options;
    console.log(billToStates);

    for (var i = 0; i < customerStates.length; i++) {
        customer_all_state = $(customerStates[i]).val();
        console.log(customer_all_state);
    }

    for (var j = 0; j < billToStates.length; j++) {
        bill_to_states = $(billToStates[j]).val();
        console.log(bill_to_states);
    }

    var status;
    $('#billToStats').on('change', function () {
        let selected_customer_state = $('#customerStates').val();
        let selected_bill_state = $('#billToStats').val();

        $('#billToStats').prop('disabled', 'disabled');
        $('#billToStats')
            .css('cursor', 'help')
            .attr('title', 'Refresh Page To Select States Again');
        if (selected_customer_state == selected_bill_state) {
            // alert('need no change');
            $('#sgst').text('SGST');
            $('#cess').show();
            $('table:first tr td:nth-last-child(3)').show();

            status = true;
            console.log(status);

            $('#addLineItem').on('click', function () {
                //$("#firstRow").after("<td><button class='btnDelete btn btn-xs'><i class='fa fa- window-close' aria-hidden='true'></i></button></td>");
                $('.btnDelete').css('display', 'block');
                $('#itemsBody').append(`<tr>
                                            <th scope="row">
                                                <textarea name="" id="" placeholder="Name Description.."></textarea>
                                                <br>
                                                <input type="text" placeholder="HSN/SAC">
                                            </th>
                                             <td>
                                                <input size="4" type="text" placeholder="2">
                                            </td>
                                            <td>
                                                <input size="4" type="text" placeholder="2">
                                            </td>
                                            <td>
                                                <input type="text" size="4" placeholder="20">
                                            </td>
                                            <td>
                                                <input type="text" size="4" placeholder="20">
                                            </td>
                                            <td>
                                                <input type="text" size="4" placeholder="0">
                                            </td>
                                            <td>
                                                <input type="text" size="4" placeholder="0">
                                            </td>
                                            <td><button style="display:block" class='btnDelete btn btn-xs'><i class="fa fa-window-close" aria-hidden="true"></i></button></td>
                                            </tr>
                                        `);
            });
        } else if (
            selected_customer_state == null &&
            selected_bill_state == selected_bill_state
        ) {
            // location.reload();
            //alert(false);
        } else if (
            selected_bill_state == null &&
            selected_customer_state == selected_customer_state
        ) {
            //location.reload();
            // alert (false)
        } else if (selected_customer_state != selected_bill_state) {
            $('#billToStats').prop('disabled', 'disabled');
            $('#billToStats')
                .css('cursor', 'help')
                .attr('title', 'Refresh Page To Select States Again');
            //changes occure in item area
            $('#sgst').text('IGST');
            $('#cgst').hide();
            $('table:first tr td:nth-last-child(3)').hide();

            // changes in total area
            $('#totalCGST').attr('placeholder', 'IGST');
            //$("#totalSGST").hide();
            $('#totalSGSTTR').remove();
            //$("#totalCGST").hide();
            //$("table:nth-child(2) tr:nth-last-child(2)").remove();
            console.log('b hide');

            $('#addLineItem').on('click', function () {
                //$("#firstRow").after("<td><button class='btnDelete btn btn-xs'><i class='fa fa- window-close' aria-hidden='true'></i></button></td>");
                $('.btnDelete').css('display', 'block');
                $('#itemsBody').append(`<tr>
                                            <th scope="row">
                                                <textarea name="" id="" placeholder="Name Description.."></textarea>
                                                <br>
                                                <input type="text" placeholder="HSN/SAC">
                                            </th>
                                            <td>
                                                <input size="4" type="text" placeholder="2">
                                            </td>
                                            <td>
                                                <input type="text" size="4" placeholder="20">
                                            </td>
                                            <td>
                                                <input type="text" size="4" placeholder="20">
                                            </td>
                                            <td>
                                                <input type="text" size="4" placeholder="0">
                                            </td>
                                            <td>
                                                <input type="text" size="4" placeholder="0">
                                            </td>
                                            
                                            <td><button style="display:block" class='btnDelete btn btn-xs'><i class="fa fa-window-close" aria-hidden="true"></i></button></td>
                                            </tr>
                                        `);
            });
            //  status = false;
        } else {
            window.location();
        }
    });

    $('#customerStates').on('change', function () {
        var optionSelected = $('option:selected', this);
        console.log(optionSelected);
        let selected_customer_state = $('#customerStates').val();
        let selected_bill_state = $('#billToStats').val();

        $('#customerStates').prop('disabled', 'disabled');
        $('#customerStates')
            .css('cursor', 'help')
            .attr('title', 'Refresh Page To Select States Again');
        if (selected_customer_state == selected_bill_state) {
            // alert('need no change');
            $('#sgst').text('SGST');
            $('#cgst').show();
            $('table:first tr td:nth-last-child(3)').show();
            console.log('show cs');
            $('#addLineItem').on('click', function () {
                //$("#firstRow").after("<td><button class='btnDelete btn btn-xs'><i class='fa fa- window-close' aria-hidden='true'></i></button></td>");
                $('.btnDelete').css('display', 'block');
                $('#itemsBody').append(`<tr>
                                            <th scope="row">
                                                <textarea name="" id="" placeholder="Name Description.."></textarea>
                                                <br>
                                                <input type="text" placeholder="HSN/SAC">
                                            </th>
                                            <td>
                                                <input size="4" type="text" placeholder="2">
                                            </td>
                                            <td>
                                                <input size="4" type="text" placeholder="2">
                                            </td>
                                            <td>
                                                <input type="text" size="4" placeholder="20">
                                            </td>
                                            <td>
                                                <input type="text" size="4" placeholder="20">
                                            </td>
                                            <td>
                                                <input type="text" size="4" placeholder="0">
                                            </td>
                                            <td>
                                                <input type="text" size="4" placeholder="0">
                                            </td>
                                            <td><button style="display:block" class='btnDelete btn btn-xs'><i class="fa fa-window-close" aria-hidden="true"></i></button></td>
                                            </tr>
                                        `);
            });
        } else if (
            selected_customer_state == null &&
            selected_bill_state == selected_bill_state
        ) {
            // location.reload();
            //alert(false);
        } else if (
            selected_bill_state == null &&
            selected_customer_state == selected_customer_state
        ) {
            //location.reload();
        } else if (selected_customer_state != selected_bill_state) {
            $('#customerStates').prop('disabled', 'disabled');
            $('#customerStates')
                .css('cursor', 'pointer')
                .attr('title', 'Refresh Page To Select States Again');
            $('#sgst').text('IGST');
            $('#cgst').hide();
            $('table:first tr td:nth-last-child(3)').hide();
            //state = false;
            // changes in total area
            $('#totalCGST').attr('placeholder', 'IGST');
            $('#totalSGSTTR').remove();
            // $("table:nth-child(2) tr:nth-last-child(2)").remove();
            console.log('show hide');
            $('#addLineItem').on('click', function () {
                //$("#firstRow").after("<td><button class='btnDelete btn btn-xs'><i class='fa fa- window-close' aria-hidden='true'></i></button></td>");
                $('.btnDelete').css('display', 'block');
                $('#itemsBody').append(`<tr>
                                            <th scope="row">
                                                <textarea name="" id="" placeholder="Name Description.."></textarea>
                                                <br>
                                                <input type="text" placeholder="HSN/SAC">
                                            </th>
                                            <td>
                                                <input size="4" type="text" placeholder="2">
                                            </td>
                                            <td>
                                                <input type="text" size="4" placeholder="20">
                                            </td>
                                            <td>
                                                <input type="text" size="4" placeholder="20">
                                            </td>
                                            <td>
                                                <input type="text" size="4" placeholder="0">
                                            </td>
                                            <td>
                                                <input type="text" size="4" placeholder="0">
                                            </td>
                                            
                                            <td><button style="display:block" class='btnDelete btn btn-xs'><i class="fa fa-window-close" aria-hidden="true"></i></button></td>
                                            </tr>
                                        `);
            });
        }
    });

    //delete button
    $('#itemsBody').on('click', '.btnDelete', function () {
        $(this)
            .closest('tr')
            .remove();
    });

    //VALIDATIONS CODE

    document
        .getElementById('yourCompanyName')
        .addEventListener('blur', valadateName);

    //For Name
    function valadateName() {
        const name = document.getElementById('yourCompanyName');
        const re = /^[A-Za-z]{2,10}$/;
        console.log(name);
        if (!re.test(name.value)) {
            console.log('not validate');
            $(name).css('border', 'solid,1px,red');
        } else {
            console.log('validate');
            //$(name).css('border', 'solid,1px,green')
        }
    }

    function valadatePhone() {
        const phone = document.getElementById('phone');
        const re = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;

        if (!re.test(phone.value)) {
            phone.classList.add('is-invalid');
        } else {
            phone.classList.remove('is-invalid');
        }
    }

    function inputTableValue() {
        const tableInput = document.getElementsByClassName('tableInput');
        for (let i = 0; i < tableInput.length; i++) {
            const element = tableInput[i];
            const selectName = $(element).val();
            if (isNaN(selectName) || selectName < 1 || selectName > 10) {
                text = 'Input not valid';
                console.log(text);
            } else {
                text = 'Input OK';
                console.log(text);
            }
        }
    }

    function calculationForSameStates() {
        var quantity = $('#quantity').val();

        var rate = $('rate').val();
        var ammount = $('');
        var SGST;
        var CGST;
        var CESS;

        ammount = quantity * rate;

        SGST += ammount * (SGST / 100);
        CGST = ammount * (CGST / 100);
        CESS = ammount * (CESS / 100);
    }
    //print Code

    function printDiv(divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;
    }

    // var tableForSameState = `<tr><th scope="row">
    //                                             <textarea name="" id="" placeholder="Name Description.."></textarea>
    //                                             <br>
    //                                             <input type="text" placeholder="HSN/SAC">
    //                                         </th>
    //                                         <td>
    //                                             <input size="4" type="text" placeholder="2">
    //                                         </td>
    //                                         <td>
    //                                             <input size="4" type="text" placeholder="2">
    //                                         </td>
    //                                         <td>
    //                                             <input type="text" size="4" placeholder="20">
    //                                         </td>
    //                                         <td>
    //                                             <input type="text" size="4" placeholder="20">
    //                                         </td>
    //                                         <td>
    //                                             <input type="text" size="4" placeholder="0">
    //                                         </td>
    //                                         <td>
    //                                             <input type="text" size="4" placeholder="0">
    //                                         </td>
    //                                         <td><button style="display:block" class='btnDelete btn btn-xs'><i class="fa fa-window-close" aria-hidden="true"></i></button></td>
    //                                         </tr>`;
    // var tableForDiffrentStates = `<tr>
    //                                         <th scope="row">
    //                                             <textarea name="" id="" placeholder="Name Description.."></textarea>
    //                                             <br>
    //                                             <input type="text" placeholder="HSN/SAC">
    //                                         </th>
    //                                         <td>
    //                                             <input size="4" type="text" placeholder="2">
    //                                         </td>
    //                                         <td>
    //                                             <input type="text" size="4" placeholder="20">
    //                                         </td>
    //                                         <td>
    //                                             <input type="text" size="4" placeholder="20">
    //                                         </td>
    //                                         <td>
    //                                             <input type="text" size="4" placeholder="0">
    //                                         </td>
    //                                         <td>
    //                                             <input type="text" size="4" placeholder="0">
    //                                         </td>

    //                                         <td><button style="display:block" class='btnDelete btn btn-xs'><i class="fa fa-window-close" aria-hidden="true"></i></button></td>
    //                                         </tr>`;

    // function addTable(stateOne,statetwo,el){
    //     if(stateOne == statetwo){
    //         $('#itemsBody').append(tableForSameState);
    //     }else if(stateOne != statetwo){
    //         $("#itemsBody").append(tableForDiffrentStates);
    //     }
    //     else{
    //         // last else
    //     }
    // }

    // $("#addLineItem").on("click", function () {
    //     //$("#firstRow").after("<td><button class='btnDelete btn btn-xs'><i class='fa fa- window-close' aria-hidden='true'></i></button></td>");
    //     $(".btnDelete").css("display", "block");
    //     $("#itemsBody").append(`<tr>
    //                                         <th scope="row">
    //                                             <textarea name="" id="" placeholder="Name Description.."></textarea>
    //                                             <br>
    //                                             <input type="text" placeholder="HSN/SAC">
    //                                         </th>
    //                                         <td>
    //                                             <input size="4" type="text" placeholder="2">
    //                                         </td>
    //                                         <td>
    //                                             <input type="text" size="4" placeholder="20">
    //                                         </td>
    //                                         <td>
    //                                             <input type="text" size="4" placeholder="20">
    //                                         </td>
    //                                         <td>
    //                                             <input type="text" size="4" placeholder="0">
    //                                         </td>
    //                                         <td>
    //                                             <input type="text" size="4" placeholder="0">
    //                                         </td>
    //                                         <td><button style="display:block" class='btnDelete btn btn-xs'><i class="fa fa-window-close" aria-hidden="true"></i></button></td>
    //                                         </tr>
    //                                     `);
    // });
});