/**
 * @package     testajax
 * 
 * Handles ajax calls and ajax answers 
 * Supports buttons to call ajax functions
 *
 * @copyright   (C) 2018-2018 Thomas Finnern
 * @license     http://www.gnu.org/copyleft/gpl.html GNU/GPL
 * @author      finnern
 * @since       1.0.0
 */

//--------------------------------------------------------------------------------------
// 
//--------------------------------------------------------------------------------------

jQuery(document).ready(function ($) {

    // ToDo: Test following with commenting out
    if (typeof FormData === 'undefined') {
        alert("exit");
        return;
    }

    //--------------------------------------
    //
    //--------------------------------------

    //--------------------------------------
    // Links to server controller functions
    //--------------------------------------

    var urlIncreaseValue = './index.php?option=com_testajax&task=testajax.AjaxIncreaseValue' + Token;
    var urlAjaxError = 'index.php?option=com_testajax&task=testajax.AjaxError' + Token;
    var urlAjaxErrorDie = 'index.php?option=com_testajax&task=testajax.AjaxErrorDie' + Token;
    var urlAjaxErrorJexit = 'index.php?option=com_testajax&task=testajax.AjaxErrorJexit' + Token;
    var urlAjaxWarning = 'index.php?option=com_testajax&task=testajax.AjaxWarning' + Token;
    var urlAjaxNotice = 'index.php?option=com_testajax&task=testajax.AjaxNotice' + Token;

    //--------------------------------------
    // Function Button click ->increase value
    //--------------------------------------

    var buttonIncreaseValue = $('#btnIncreaseValue');
    buttonIncreaseValue.on('click', function (e) {

        //--------------------------------------
        // Handle number value from user
        //--------------------------------------

        //
        var formData = new FormData();

        // var test = jQuery('#jform_ajaxTestValue');
        var test = jQuery('input[name="jform[ajaxTestValue]"]');

        jQuery('input[name="jform[ajaxTestValue]"]').val('20');

        formData.strNumber = jQuery('#jform_ajaxTestValue').val();
        // formData.strNumber = jQuery('input[name="jform[ajaxTestValue]"]').val();

        alert ('strNumber: "' + formData.strNumber + '"');
        alert ('urlIncreaseValue: "' + urlIncreaseValue + '"');

        //--------------------------------------
        //
        //--------------------------------------

        var jqXHR = jQuery.ajax({
            url: urlIncreaseValue,
            type: 'POST',
            contentType: 'json',
            processData: false,
            cache: false,
            // timeout:20000, // 20 seconds timeout (was too short)
            data: formData
        })

        /*----------------------------------------------------
        On success / done
        ----------------------------------------------------*/

        .done(function (eData, textStatus, jqXHR) {
            //alert('done Success: "' + String(eData) + '"')

            console.log(': ajax returned in done');
            alert (': ajax returned in done');

            alert ('textStatus: ' + textStatus);



            var jData = '';

            //--- Handle PHP Error and notification messages first (separate) -------------------------
            var extract = extractDataMessages(eData);

            alert ("D01");
            jData = extract.Data;
            alert ("D02");
            writeMessage (extract.Message);

            alert ("D03");
            alert ('extract.Message: ' + extract.Message);
            alert ("D04");
            alert ('jData: "' + JData + '"');
            alert ("D05");

            // Check that JResponseJson data structure may be available
            if (!'success' in jData) {
                alert('returned wrong data');
                return;
            }

            alert ("E01");

            // ToDo: Handle JOOMLA Error and notification messages -> inside Json

            // jData.success
            // jData.messsage
            // jData.messages
            // jData.data

            //--- success -------------------------

            // Successful result
            if (jData.success == true) {
                alert ("F01");
                alert('XXX. Result success 05' + ' New Number: "' + jData.data.number + '"');
                alert ("F02");
                jQuery('input[name="jform[ajaxTestValue]"]').val(jData.data.number);
                alert ("F03");
            }
            else {
                alert ("05");
                alert('XXX. No success 05');
            }
        })

        /*----------------------------------------------------
        On fail / error
        ----------------------------------------------------*/

        .fail(function (jqXHR, textStatus, exceptionType) {

            console.log(': ajax returned in fail');
            alert (': ajax returned in fail');

            alert(' failed: "' + textStatus + '" -> "' + exceptionType + '" [' + jqXHR.status + ']');

            console.log(jqXHR);
        })

        /*----------------------------------------------------
        On always / complete
        ----------------------------------------------------*/
        .always(function (eData, textStatus, jqXHR) {
        })

        alert('buttonIncreaseValue.on click: '); // + JSON.stringify($(this)));
    });

    var buttonAjaxError = $('#btnAjaxError');
    buttonAjaxError.on('click', function (e) {
        alert('btnAjaxError');

        //
        var formData = new FormData();

        var jqXHR = jQuery.ajax({
            url: urlAjaxError,
            type: 'POST',
            contentType: 'json',
            processData: false,
            cache: false,
            // timeout:20000, // 20 seconds timeout (was too short)
            data: formData
        })
            .done(function (eData, textStatus, jqXHR) {
                alert (': ajax returned in done');
                ajaxDone ('#btnAjaxError', eData, textStatus, jqXHR);
            })

            .fail(function (jqXHR, textStatus, exceptionType) {
                ajaxFail ('#btnAjaxError', jqXHR, textStatus, exceptionType);
            })

            .always(function (eData, textStatus, jqXHR) {
                ajaxAlways ('#btnAjaxError', eData, textStatus, jqXHR);
            });

        alert('buttonAjaxError.on click: '); // + JSON.stringify($(this)));
    });

    var buttonAjaxErrorDie = $('#btnAjaxErrorDie');
    buttonAjaxErrorDie.on('click', function (e) {
        alert('btnAjaxErrorDie');

        //
        var formData = new FormData();

        var jqXHR = jQuery.ajax({
            url: urlAjaxErrorDie,
            type: 'POST',
            contentType: 'json',
            processData: false,
            cache: false,
            // timeout:20000, // 20 seconds timeout (was too short)
            data: formData
        })
            .done(function (eData, textStatus, jqXHR) {
                alert (': ajax returned in done');
                ajaxDone ('#btnAjaxErrorDie', eData, textStatus, jqXHR);
            })

            .fail(function (jqXHR, textStatus, exceptionType) {
                ajaxFail ('#btnAjaxErrorDie', jqXHR, textStatus, exceptionType);
            })

            .always(function (eData, textStatus, jqXHR) {
                ajaxAlways ('#btnAjaxErrorDie', eData, textStatus, jqXHR);
            });

        alert('buttonAjaxErrorDie.on click: '); // + JSON.stringify($(this)));
    });

    var buttonAjaxErrorJexit = $('#btnAjaxErrorJexit');
    buttonAjaxErrorJexit.on('click', function (e) {
        alert('btnAjaxErrorJexit');

        //
        var formData = new FormData();

        var jqXHR = jQuery.ajax({
            url: urlAjaxErrorJexit,
            type: 'POST',
            contentType: 'json',
            processData: false,
            cache: false,
            // timeout:20000, // 20 seconds timeout (was too short)
            data: formData
        })
            .done(function (eData, textStatus, jqXHR) {
                alert (': ajax returned in done');
                ajaxDone ('#btnAjaxErrorJexit', eData, textStatus, jqXHR);
            })

            .fail(function (jqXHR, textStatus, exceptionType) {
                ajaxFail ('#btnAjaxErrorJexit', jqXHR, textStatus, exceptionType);
            })

            .always(function (eData, textStatus, jqXHR) {
                ajaxAlways ('#btnAjaxErrorJexit', eData, textStatus, jqXHR);
            });

        alert('buttonAjaxErrorJexit.on click: '); // + JSON.stringify($(this)));
    });

    var buttonAjaxWarning = $('#btnAjaxWarning');
    buttonAjaxWarning.on('click', function (e) {

        //
        var formData = new FormData();

        alert('btnAjaxWarning');
        var jqXHR = jQuery.ajax({
            url: urlAjaxWarning,
            type: 'POST',
            contentType: 'json',
            processData: false,
            cache: false,
            // timeout:20000, // 20 seconds timeout (was too short)
            data: formData
        })
            .done(function (eData, textStatus, jqXHR) {
                alert (': ajax returned in done');
                ajaxDone ('#btnAjaxWarning', eData, textStatus, jqXHR);
            })

            .fail(function (jqXHR, textStatus, exceptionType) {
                ajaxFail ('#btnAjaxWarning', jqXHR, textStatus, exceptionType);
            })

            .always(function (eData, textStatus, jqXHR) {
                ajaxAlways ('#btnAjaxWarning', eData, textStatus, jqXHR);
            });

        alert('buttonAjaxWarning.on click: '); // + JSON.stringify($(this)));
    });

    var buttonAjaxNotice = $('#btnAjaxNotice');
    buttonAjaxNotice.on('click', function (e) {
        alert('btnAjaxNotice');

        //
        var formData = new FormData();

        var jqXHR = jQuery.ajax({
            url: urlAjaxNotice,
            type: 'POST',
            contentType: 'json',
            processData: false,
            cache: false,
            // timeout:20000, // 20 seconds timeout (was too short)
            data: formData
        })
            .done(function (eData, textStatus, jqXHR) {
                alert (': ajax returned in done');
                ajaxDone ('#btnAjaxNotice', eData, textStatus, jqXHR);
            })

            .fail(function (jqXHR, textStatus, exceptionType) {
                ajaxFail ('#btnAjaxNotice', jqXHR, textStatus, exceptionType);
            })

            .always(function (eData, textStatus, jqXHR) {
                ajaxAlways ('#btnAjaxNotice', eData, textStatus, jqXHR);
            });

        alert('buttonAjaxNotice.on click: '); // + JSON.stringify($(this)));
    });

    // alertType []
    // classAddition []
    function CreateAlertHtml(displayText, alertType, classAddition) {

        var Today = new Date();
        var ActTime = Today.toLocaleTimeString('en-GB');
        var OutText = "";

        OutText += '<div class="alert ' + classAddition + ' alert-block">';
        OutText += '    <button type="button" class="close" data-dismiss="alert">&times;</button>';
        OutText += '    <h4>' + alertType + '!</h4>';
        OutText += '    ' + displayText + ' :: ' + ActTime ;
        OutText += '</div>';

        return OutText;              // The function returns the product of p1 and p2
    }

    function CreateSuccessHtml(displayText) {

        var OutText = CreateAlertHtml(displayText, 'Sucess', 'alert-success')

        return OutText;
    }

    function CreateNoticeHtml(displayText) {

        var OutText = CreateAlertHtml(displayText, 'Notice', 'alert-info')

        return OutText;
    }

    function CreateWarningHtml(displayText) {

        var OutText = CreateAlertHtml(displayText, 'Warning', '')

        return OutText;
    }

    function CreateErrorHtml(displayText) {

        var OutText = CreateAlertHtml(displayText, 'Error', 'alert-error')

        return OutText;
    }


    function extractDataMessages(eData) {
        // Pre init
        var jData = "";
        var errMessage = "";

        alert ("EE01");

        // is first part php error- or debug- echo string ?
        // find start of json
        var StartIdx = eData.indexOf('{"');

        alert ("EE02");



        // No Json data
        if (StartIdx < 0) {
            alert ("EE03");

            errMessage = eData;
        }
        else {
            alert ("EE04");

            // Jquery starts at the beginning, no additional message
            if (StartIdx == 0) {
                alert ("EE05");
                alert("eData: '" + eData + "'");
                alert ("EE06");

                jData = jQuery.parseJSON(eData);

            }
            else {
                alert ("EE06");

                // StartIdx > 0
                // message part and json data existing
                errMessage = eData.substring(0, StartIdx - 1);

                alert ("EE07");

                var jsonText = eData.substring(StartIdx);
                alert ("EE08");

                jData = jQuery.parseJSON(jsonText);
                alert ("EE09");
            }

        }

        return {
            Data: jData,
            Message: errMessage
        };
    }

    function  writeMessage (message) {
        // append message to be viewed
        var messagesArea = $('#messagesArea');
        var OutHtml = CreateErrorHtml(message);
        messagesArea.append(OutHtml);
    }


    /**
            console.log(': Done with data before json object');
            // find error html text
            alert("A03");
            // append to be viewed
            var messagesArea = $('#Messages');
            alert("A04");
            var OutHtml = CreateErrorHtml(errorText);
            messagesArea.append(OutHtml);
            alert("A05");

            // extract json data of uploaded image
            alert("A06");
        }
        else {

            alert("C02: found data: '" + JSON.stringify(eData) + "'");

            /**
             var OutHtml = CreateSuccessHtml (eData);
             messagesArea.append(OutHtml);

             var OutHtml = CreateNoticeHtml (eData);
             messagesArea.append(OutHtml);

             var OutHtml = CreateWarningHtml (eData);
             messagesArea.append(OutHtml);
             /**

            alert("C02");
        }
    }
    return jData;
    /**/

    // ajaxDone
    //.done(function (eData, textStatus, jqXHR) {
    function ajaxDone (originText, eData, textStatus, jqXHR) {
        console.log(originText + ': ajax now in done section');
        alert (originText + ': ajax now in done section');

        /**
        // append message to be viewed
        var messagesArea = $('#messagesArea');
        var OutHtml = CreateErrorHtml(message);
        messagesArea.append(OutHtml);
        /**/

        alert ("textStatus: " + textStatus);
        alert ("edata: " + eData);
    }

    // ajaxFail
    //.fail(function (jqXHR, textStatus, exceptionType) {
    function ajaxFail (originText, jqXHR, textStatus, exceptionType) {
        console.log(originText + ': ajax now in fail section');
        alert (originText + ': ajax now in fail section');

        alert ("exceptionType: " + exceptionType);
        alert ("textStatus: " + textStatus);

    }

    // ajaxAlways
    //.always(function (eData, textStatus, jqXHR) {
    function ajaxAlways (originText, eData, textStatus, jqXHR) {
        console.log(originText + ': ajax now in always section');
        alert (originText + ': ajax now in always section');


    }

}) // ready
