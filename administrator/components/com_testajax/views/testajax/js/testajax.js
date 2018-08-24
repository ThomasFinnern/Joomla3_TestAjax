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
        alert("exit FormData === 'undefined' -> old browser ?");
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
    var urlAjaxErrorInCode = 'index.php?option=com_testajax&task=testajax.AjaxErrorInCode' + Token;
    var urlAjaxWarning = 'index.php?option=com_testajax&task=testajax.AjaxWarning' + Token;
    var urlAjaxNotice = 'index.php?option=com_testajax&task=testajax.AjaxNotice' + Token;
    var urlAjaxAll = 'index.php?option=com_testajax&task=testajax.AjaxAll' + Token;

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

        // jQuery('input[name="jform[ajaxTestValue]"]').val('20');

        formData.strNumber = jQuery('#jform_ajaxTestValue').val();

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
//            alert (': ajax returned in done');
//            alert ('textStatus: ' + textStatus);

            var jData = {};
            var UnexpectedErrorMessage = '';

            //--- Handle PHP Error and notification messages first (separate) -------------------------

            // returns extract.preMessage, extract.jData
            var extract = extractDataMessages(eData);
            jData = extract.jData;

//            alert ("D01");
            writeUnexpectedErrorMessage (extract.Message);

            if (typeof jData !== "undefined") {

//                alert ("D02");

                // Check that JResponseJson data structure may be available
                if (typeof jData.success === "undefined") {
                    alert('returned wrong data');
                    return;
                }

//                alert ("jData.success: " + jData.success);

//                alert("D03");
                writeDataMessages(jData);
//                alert("D04");


//                //alert('extract.Message: ' + extract.Message);
                /**
                alert("D04");
                alert('jData extracted: "' + jData + '"');
                alert("D05");
                /**/
//                alert("E01");

                // ToDo: Handle JOOMLA Error and notification messages -> inside Json

                // jData.success
                // jData.messsage
                // jData.messages
                // jData.data

                //--- success -------------------------

                // Successful result
                if (jData.success == true) {
//                    alert("F01");
//                    alert('XXX. Result success 05' + ' New Number: "' + jData.data.number + '"');
//                    alert("F02");
                    jQuery('input[name="jform[ajaxTestValue]"]').val(jData.data.number);
//                    alert("F03");
                }
                else {
//                    alert("05");
                    alert('XXX. No success 05');
                }
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
        });

//        alert('buttonIncreaseValue.on click: EXIT'); // + JSON.stringify($(this)));
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
//                alert (': ajax returned in done');
                ajaxDone ('#btnAjaxError', eData, textStatus, jqXHR);
            })

            .fail(function (jqXHR, textStatus, exceptionType) {
//                ajaxFail ('#btnAjaxError', jqXHR, textStatus, exceptionType);
            })

            .always(function (eData, textStatus, jqXHR) {
//                ajaxAlways ('#btnAjaxError', eData, textStatus, jqXHR);
            });

//        alert('buttonAjaxError.on click: EXIT'); // + JSON.stringify($(this)));
    });

    var buttonAjaxErrorDie = $('#btnAjaxErrorDie');
    buttonAjaxErrorDie.on('click', function (e) {
//        alert('btnAjaxErrorDie');

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
//                alert (': ajax returned in done');
                ajaxDone ('#btnAjaxErrorDie', eData, textStatus, jqXHR);
            })

            .fail(function (jqXHR, textStatus, exceptionType) {
                ajaxFail ('#btnAjaxErrorDie', jqXHR, textStatus, exceptionType);
            })

            .always(function (eData, textStatus, jqXHR) {
                ajaxAlways ('#btnAjaxErrorDie', eData, textStatus, jqXHR);
            });

//        alert('buttonAjaxErrorDie.on click: EXIT'); // + JSON.stringify($(this)));
    });

    var buttonAjaxErrorJexit = $('#btnAjaxErrorJexit');
    buttonAjaxErrorJexit.on('click', function (e) {
//        alert('btnAjaxErrorJexit');

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
//                alert (': ajax returned in done');
                ajaxDone ('#btnAjaxErrorJexit', eData, textStatus, jqXHR);
            })

            .fail(function (jqXHR, textStatus, exceptionType) {
                ajaxFail ('#btnAjaxErrorJexit', jqXHR, textStatus, exceptionType);
            })

            .always(function (eData, textStatus, jqXHR) {
                ajaxAlways ('#btnAjaxErrorJexit', eData, textStatus, jqXHR);
            });

//        alert('buttonAjaxErrorJexit.on click: EXIT'); // + JSON.stringify($(this)));
    });

    var buttonAjaxErrorInCode = $('#btnAjaxErrorInCode');
    buttonAjaxErrorInCode.on('click', function (e) {
//        alert('btnAjaxErrorInCode');

        //
        var formData = new FormData();

        var jqXHR = jQuery.ajax({
            url: urlAjaxErrorInCode,
            type: 'POST',
            contentType: 'json',
            processData: false,
            cache: false,
            // timeout:20000, // 20 seconds timeout (was too short)
            data: formData
        })
            .done(function (eData, textStatus, jqXHR) {
//                alert (': ajax returned in done');
                ajaxDone ('#btnAjaxErrorInCode', eData, textStatus, jqXHR);
            })

            .fail(function (jqXHR, textStatus, exceptionType) {
                ajaxFail ('#btnAjaxErrorInCode', jqXHR, textStatus, exceptionType);
            })

            .always(function (eData, textStatus, jqXHR) {
                ajaxAlways ('#btnAjaxErrorInCode', eData, textStatus, jqXHR);
            });

//        alert('buttonAjaxErrorInCode.on click: EXIT'); // + JSON.stringify($(this)));
    });

    var buttonAjaxWarning = $('#btnAjaxWarning');
    buttonAjaxWarning.on('click', function (e) {

        //
        var formData = new FormData();

//        alert('btnAjaxWarning');
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
//                alert (': ajax returned in done');
                ajaxDone ('#btnAjaxWarning', eData, textStatus, jqXHR);
            })

            .fail(function (jqXHR, textStatus, exceptionType) {
                ajaxFail ('#btnAjaxWarning', jqXHR, textStatus, exceptionType);
            })

            .always(function (eData, textStatus, jqXHR) {
                ajaxAlways ('#btnAjaxWarning', eData, textStatus, jqXHR);
            });

//        alert('buttonAjaxWarning.on click: EXIT'); // + JSON.stringify($(this)));
    });

    var buttonAjaxNotice = $('#btnAjaxNotice');
    buttonAjaxNotice.on('click', function (e) {
//        alert('btnAjaxNotice');

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
//                alert (': ajax returned in done');
                ajaxDone ('#btnAjaxNotice', eData, textStatus, jqXHR);
            })

            .fail(function (jqXHR, textStatus, exceptionType) {
                ajaxFail ('#btnAjaxNotice', jqXHR, textStatus, exceptionType);
            })

            .always(function (eData, textStatus, jqXHR) {
                ajaxAlways ('#btnAjaxNotice', eData, textStatus, jqXHR);
            });

//        alert('buttonAjaxNotice.on click: EXIT'); // + JSON.stringify($(this)));
    });

    var buttonAjaxAll = $('#btnAjaxAll');
    buttonAjaxAll.on('click', function (e) {
//        alert('btnAjaxAll');

        //
        var formData = new FormData();

        var jqXHR = jQuery.ajax({
            url: urlAjaxAll,
            type: 'POST',
            contentType: 'json',
            processData: false,
            cache: false,
            // timeout:20000, // 20 seconds timeout (was too short)
            data: formData
        })
            .done(function (eData, textStatus, jqXHR) {
//                alert (': ajax returned in done');
                ajaxDone ('#btnAjaxAll', eData, textStatus, jqXHR);
            })

            .fail(function (jqXHR, textStatus, exceptionType) {
                ajaxFail ('#btnAjaxAll', jqXHR, textStatus, exceptionType);
            })

            .always(function (eData, textStatus, jqXHR) {
                ajaxAlways ('#btnAjaxAll', eData, textStatus, jqXHR);
            });

//        alert('buttonAjaxAll.on click: EXIT'); // + JSON.stringify($(this)));
    });

    // alertType []
    // classAddition []
    function CreateAlertHtml(displayText, alertType, classAddition) {

        var Today = new Date();
        var ActTime = Today.toLocaleTimeString('en-GB');
        var OutText = "";

        OutText += '<div class="alert ' + classAddition + ' alert-block">';
        OutText += '    <button type="button" class="close" data-dismiss="alert">&times;</button>';
        OutText += '    <h4>'  + ActTime + '  ' + alertType + '!</h4>';
        OutText += '    ' + displayText;
        OutText += '</div>';

        return OutText;
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


    /**
     {
         "success": true,
         "message": "Standard message in AjaxAll",
         "messages": {
         "notice": ["User notice in ajax call"],
             "warning": ["User warning in ajax call"],
             "error": ["User error in ajax call"]
         },
         "data": ""
     }
     /**/

    function extractDataMessages(eData) {
        // Pre init
        var jData = {};
        var preMessage = "";

//        alert ("EX01");

        // is first part php error- or debug- echo string ?
        // find start of json
        var StartIdx = eData.indexOf('{"');

//        alert ("EX02");

        // No Json data
        if (StartIdx < 0) {
//            alert ("EX03");

            preMessage = eData;
        }
        else {
            var jsonText;

//            alert ("EX04");

            // Unexpected text in front to JSON data
            if (StartIdx > 0) {
//                alert ("EX05");
                // message part and json data existing
                preMessage = eData.substring(0, StartIdx - 1);

//                alert ("EX06");

                jsonText = eData.substring(StartIdx);
            }
            else
            {
//                alert ("EX07");
               jsonText = eData;
            }

//            alert ("EX08");
            jData = jQuery.parseJSON(jsonText);

        }

//        alert ("EX20");
//        alert('jData extracted: "' + JSON.stringify (jData) + '"');
//        alert ("EX21");
//        //alert('preMessage extracted: "' + JSON.stringify (preMessage) + '"');
//        alert('preMessage extracted: "' + preMessage + '"');
//        alert ("EX22");
        /**/
        return {
            preMessage: preMessage,
            jData: jData
        }
         /**/
        // return preMessage, jData;
    }

    function writeUnexpectedErrorMessage (message) {

        if (typeof message !== "undefined") {
            // append message to be viewed
            var messagesArea = $('#messagesArea');
            var OutHtml = CreateErrorHtml(message);
            messagesArea.append(OutHtml);
        }
    }


    function writeDataMessages (jData) {
        var messagesArea = $('#messagesArea');
        var OutHtml = "";
        var MainMessage = "";
        var JMessages = {};
        var OutHtml = "";
        messagesArea.append(OutHtml);

//        alert ('M01');
        /**
        if (typeof jData === "undefined") {
            return;
        }
        /**/

        // jdata empty ?
        if ( ! jData) {
            return;
        }

        // Message exists
        if (jData.message) {
//            alert ('M02A');
            if (typeof jData.message !== "undefined") {
//                alert ('M02B');
                MainMessage = jData.message;
//                alert ('M02C');
                if (!jData.messages) {

                    OutHtml = CreateNoticeHtml(MainMessage);
                    messagesArea.append(OutHtml);
//                    alert ('M02D');
                }
            }
        }
        else
        {
//            alert ('M02X: No message');
        }

 /**/
//      alert ('M03');
        // Messages list exists
        if (jData.messages) {
//            alert ('M03A');
            if (typeof jData.messages !== "undefined") {
//                alert ('M03B');
                var subMessages = jData.messages;
//                alert ('M03C');
//                alert("subMessages: " + JSON.stringify(subMessages))

                for (var msgType in subMessages) {
//                    alert ('M03E');
//                    alert ('msgType: ' + msgType);
                    if (subMessages.hasOwnProperty(msgType)) {
//                        alert ('M0F');
                        var msgText = subMessages[msgType];
//                        alert ('M0G');
//                        alert ('msgText: ' + msgText);

                        switch(msgType) {
                            case 'success':
                                OutHtml = CreateSuccessHtml (MainMessage + '<br>::' + msgText);
                                break;
                            case 'notice':
                                OutHtml = CreateNoticeHtml (MainMessage + '<br>::' + msgText);
                                break;
                            case 'warning':
                                OutHtml = CreateWarningHtml (MainMessage + '<br>::' + msgText);
                                break;
                            case 'error':
                                OutHtml = CreateErrorHtml (MainMessage + '<br>::' + msgText);
                                break;
                            default:
                                OutHtml = CreateNoticeHtml (MainMessage + '<br>??' + msgType + '<br>::' + msgText);
                                break;
                        }
//                        alert ('M03P');
                        messagesArea.append(OutHtml);

//                        alert ('M03Q');
                    }
                }

//                alert ('M03L');
            }
        }
        else
        {
//            alert ('M03X: No messages');
        }

        /**
        else {
            // At least one message found
            if (MainMessage)
            {
                CreateNoticeHtml (MainMessage);
            }
            create
        }
        /**/

//        alert ('M20');
    }




    // ajaxDone
    //.done(function (eData, textStatus, jqXHR) {
    function ajaxDone (originText, eData, textStatus, jqXHR) {
        console.log(originText + ': ajax now in done section');
//        alert (originText + ': ajax now in done section');

//        alert ("textStatus: " + textStatus);
//        alert ("edata: " + eData);

        /**
        // append message to be viewed
        var messagesArea = $('#messagesArea');
        var OutHtml = CreateErrorHtml(message);
        messagesArea.append(OutHtml);
        /**/

            // returns extract.preMessage, extract.jData
        var extract = extractDataMessages(eData);

        jData = extract.jData;
        writeUnexpectedErrorMessage (extract.Message);

        if (typeof jData !== "undefined") {

            // Check that JResponseJson data structure may be available
            if (typeof jData.success === "undefined") {
//                alert('returned wrong data');
                return;
            }

//            alert ("jData.success: " + jData.success);

            writeDataMessages (jData);
        }
    }

    // ajaxFail
    //.fail(function (jqXHR, textStatus, exceptionType) {
    function ajaxFail (originText, jqXHR, textStatus, exceptionType) {
        console.log(originText + ': ajax now in fail section');
//        alert (originText + ': ajax now in fail section');

//        alert ("exceptionType: " + exceptionType);
//        alert ("textStatus: " + textStatus);

    }

    // ajaxAlways
    //.always(function (eData, textStatus, jqXHR) {
    function ajaxAlways (originText, eData, textStatus, jqXHR) {
        console.log(originText + ': ajax now in always section');
//        alert (originText + ': ajax now in always section');
    }

}); // ready
