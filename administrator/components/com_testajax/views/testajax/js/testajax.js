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
        console.log("exit FormData === 'undefined' -> old browser ?");
        return;
    }

    //--------------------------------------
    //
    //--------------------------------------

    //--------------------------------------
    // Links to server controller functions
    //--------------------------------------

    var urlIncreaseValue = './index.php?option=com_testajax&task=testajax.AjaxIncreaseValue';
    var urlIncreaseValueEcho = './index.php?option=com_testajax&task=testajax.AjaxIncreaseValueEcho';
    var urlAjaxError = 'index.php?option=com_testajax&task=testajax.AjaxError';
    var urlAjaxErrorDie = 'index.php?option=com_testajax&task=testajax.AjaxErrorDie';
    var urlAjaxErrorJexit = 'index.php?option=com_testajax&task=testajax.AjaxErrorJexit';
    var urlAjaxErrorInCode = 'index.php?option=com_testajax&task=testajax.AjaxErrorInCode';
    var urlAjaxErrorException = 'index.php?option=com_testajax&task=testajax.AjaxErrorException';
    var urlAjaxWarning = 'index.php?option=com_testajax&task=testajax.AjaxWarning';
    var urlAjaxNotice = 'index.php?option=com_testajax&task=testajax.AjaxNotice';
    var urlAjaxAll = 'index.php?option=com_testajax&task=testajax.AjaxAll';

    var urlAjaxErrorNoCode = 'index.php?option=com_testajax&task=testajax.AjaxErrorNoCode';
    var urlAjaxErrorReturnHeader = 'index.php?option=com_testajax&task=testajax.AjaxErrorReturnHeader';

    //--------------------------------------
    // Function increase value
    //--------------------------------------

    var buttonIncreaseValue = jQuery('#btnIncreaseValue');

    function resetResultFields () {
// reset event check boxes
        //$('.myCheckbox').prop('checked', true);
        $('#done_event').prop('checked', false);
        //$('#done_event').prop('checked', true);
        $('#fail_event').prop('checked', false);
        //$('#fail_event').prop('checked', true);
        $('#always_event').prop('checked', false);
        //$('#always_event').prop('checked', true);

        var eDataTextArea = jQuery('#jform_eDataArea');
        eDataTextArea.val("");

        var jTextStatus = jQuery('#jform_textStatusDoneArea');
        jTextStatus.val ("");

        jTextStatus = jQuery('#jform_textStatusFailArea');
        jTextStatus.val ("");

        jTextStatus = jQuery('#jform_textStatusFailExceptionArea');
        jTextStatus.val ("");

        jTextStatus = jQuery('#jform_textStatusAlwaysArea');
        jTextStatus.val ("");



    }

    buttonIncreaseValue.on('click', function (e) {

        //--------------------------------------
        // Handle number value from user
        //--------------------------------------

        // Reserve data container
        var formData = new FormData();

        // Fetch user value
        formData.append ('strNumber', jQuery('#jform_ajaxTestValue').val());
        formData.append (Token, '1');

        resetResultFields ();


//        console.log('formData.strNumber: ' + formData.strNumber);
        //--------------------------------------
        // Define ajax ...
        //--------------------------------------

        var jqXHR = jQuery.ajax({
            url: urlIncreaseValue,
            type: 'POST',
            // Not working: contentType: 'json',
            contentType: false,
            processData: false,
            cache: false,
            // timeout:20000, // 20 seconds timeout (was too short)
            data: formData
        })

        /*----------------------------------------------------
        On success / done
        ----------------------------------------------------*/

        .done(function (eData, textStatus, jqXHR) {
            console.log('IncreaseValue: ajax returned in done');
            console.log ("edata: " + eData);
            $('#done_event').prop('checked', true);
            var jTextStatus = jQuery('#jform_textStatusDoneArea');
            jTextStatus.val (textStatus);

            //--- Handle PHP Error and notification messages first (separate) -------------------------

            // returns extract.preMessage, extract.jData
            var extract = extractDataMessages(eData);
            jData = extract.jData;

            writeUnexpectedErrorMessage (extract.preMessage);

            if (typeof jData !== "undefined") {

                // Check that JResponseJson data structure may be available
                if (typeof jData.success === "undefined") {
                    console.log('jData.success returned wrong data');
                    return;
                }

                console.log ("jData.success: " + jData.success);

                writeDataMessages(jData);

                //--- success -------------------------

                // Successful result
                if (jData.success == true) {

                    if (jData.data.number) {
                        console.log("jData.data.number: " + jData.data.number);
                        jQuery('input[name="jform[ajaxTestValue]"]').val(jData.data.number);
                    }
                }
                else {
                    console.log('XXX. No success 05');
                }
            }
            console.log('IncreaseValueEcho. exit done');
        })

        /*----------------------------------------------------
        On fail / error
        ----------------------------------------------------*/

        .fail(function (jqXHR, textStatus, exceptionType) {

            console.log('IncreaseValue: ajax returned in fail');
            console.log(' failed: "' + textStatus + '" -> "' + exceptionType + '" [' + jqXHR.status + ']');
            $('#fail_event').prop('checked', true);

            console.log(jqXHR);
        })

        /*----------------------------------------------------
        On always / complete
        ----------------------------------------------------*/
        .always(function (eData, textStatus, jqXHR) {
            console.log('IncreaseValue: ajax section always');
            $('#always_event').prop('checked', true);
            var jTextStatus = jQuery('#jform_textStatusAlwaysArea');
            jTextStatus.val (textStatus);

        });
    });

    //--------------------------------------
    // Function increase value with "unexpected" echo
    //--------------------------------------

    var buttonIncreaseValueEcho = jQuery('#btnIncreaseValueEcho');
    buttonIncreaseValueEcho.on('click', function (e) {

        //--------------------------------------
        // Handle number value from user
        //--------------------------------------

        // Reserve data container
        var formData = new FormData();

        // Fetch user value
        formData.append ('strNumber', jQuery('#jform_ajaxTestValue').val());
        formData.append (Token, '1');

        //--------------------------------------
        // Define ajax ...
        //--------------------------------------

        var jqXHR = jQuery.ajax({
            url: urlIncreaseValueEcho,
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            // timeout:20000, // 20 seconds timeout (was too short)
            data: formData
        })

        /*----------------------------------------------------
        On success / done
        ----------------------------------------------------*/

            .done(function (eData, textStatus, jqXHR) {
                console.log('IncreaseValueEcho: ajax returned in done');
                $('#done_event').prop('checked', true);
                var jTextStatus = jQuery('#jform_textStatusDoneArea');
                jTextStatus.val (textStatus);

                //--- Handle PHP Error and notification messages first (separate) -------------------------

                // returns extract.preMessage, extract.jData
                var extract = extractDataMessages(eData);
                jData = extract.jData;

                writeUnexpectedErrorMessage (extract.preMessage);

                if (typeof jData !== "undefined") {

                    // Check that JResponseJson data structure may be available
                    if (typeof jData.success === "undefined") {
                        console.log('jData.success returned wrong data');
                        return;
                    }

                    console.log ("jData.success: " + jData.success);

                    writeDataMessages(jData);

                    //--- success -------------------------

                    // Successful result
                    if (jData.success == true) {

                        if (jData.data.number) {
                            console.log("jData.data.number: " + jData.data.number);
                            jQuery('input[name="jform[ajaxTestValue]"]').val(jData.data.number);
                        }
                    }
                    else {
                        console.log('XXX. No success 05');
                    }
                }
                console.log('IncreaseValueEcho. exit done');
            })

            /*----------------------------------------------------
            On fail / error
            ----------------------------------------------------*/

            .fail(function (jqXHR, textStatus, exceptionType) {

                console.log('IncreaseValueEcho: ajax returned in fail');
                console.log(' failed: "' + textStatus + '" -> "' + exceptionType + '" [' + jqXHR.status + ']');
                $('#fail_event').prop('checked', true);

                console.log(jqXHR);
            })

            /*----------------------------------------------------
            On always / complete
            ----------------------------------------------------*/
            .always(function (eData, textStatus, jqXHR) {
                console.log('IncreaseValue: ajax section always');
                $('#always_event').prop('checked', true);
                var jTextStatus = jQuery('#jform_textStatusAlwaysArea');
                jTextStatus.val (textStatus);

            });

    });

    //--------------------------------------
    // Function ajax error
    //--------------------------------------

    var buttonAjaxError = jQuery('#btnAjaxError');
    buttonAjaxError.on('click', function (e) {
        console.log('btnAjaxError');

        //
        var formData = new FormData();
        formData.append (Token, '1');

        var jqXHR = jQuery.ajax({
            url: urlAjaxError,
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            // timeout:20000, // 20 seconds timeout (was too short)
            data: formData
        })
            .done(function (eData, textStatus, jqXHR) {
//                console.log (': ajax returned in done');
                ajaxDone ('#btnAjaxError', eData, textStatus, jqXHR);
            })

            .fail(function (jqXHR, textStatus, exceptionType) {
                ajaxFail ('#btnAjaxError', jqXHR, textStatus, exceptionType);
            })

            .always(function (eData, textStatus, jqXHR) {
                ajaxAlways ('#btnAjaxError', eData, textStatus, jqXHR);
            });

    });

    //--------------------------------------
    // Function ajax error die
    //--------------------------------------

    var buttonAjaxErrorDie = jQuery('#btnAjaxErrorDie');
    buttonAjaxErrorDie.on('click', function (e) {
//        console.log('btnAjaxErrorDie');

        //
        var formData = new FormData();
        formData.append (Token, '1');

        var jqXHR = jQuery.ajax({
            url: urlAjaxErrorDie,
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            // timeout:20000, // 20 seconds timeout (was too short)
            data: formData
        })
            .done(function (eData, textStatus, jqXHR) {
//                console.log (': ajax returned in done');
                ajaxDone ('#btnAjaxErrorDie', eData, textStatus, jqXHR);
            })

            .fail(function (jqXHR, textStatus, exceptionType) {
                ajaxFail ('#btnAjaxErrorDie', jqXHR, textStatus, exceptionType);
            })

            .always(function (eData, textStatus, jqXHR) {
                ajaxAlways ('#btnAjaxErrorDie', eData, textStatus, jqXHR);
            });

    });

    //--------------------------------------
    // Function ajax error Jexit
    //--------------------------------------

    var buttonAjaxErrorJexit = jQuery('#btnAjaxErrorJexit');
    buttonAjaxErrorJexit.on('click', function (e) {
//        console.log('btnAjaxErrorJexit');

        //
        var formData = new FormData();
        formData.append (Token, '1');

        var jqXHR = jQuery.ajax({
            url: urlAjaxErrorJexit,
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            // timeout:20000, // 20 seconds timeout (was too short)
            data: formData
        })
            .done(function (eData, textStatus, jqXHR) {
//                console.log (': ajax returned in done');
                ajaxDone ('#btnAjaxErrorJexit', eData, textStatus, jqXHR);
            })

            .fail(function (jqXHR, textStatus, exceptionType) {
                ajaxFail ('#btnAjaxErrorJexit', jqXHR, textStatus, exceptionType);
            })

            .always(function (eData, textStatus, jqXHR) {
                ajaxAlways ('#btnAjaxErrorJexit', eData, textStatus, jqXHR);
            });

    });
    //--------------------------------------
    // Function ajax error no code
    //--------------------------------------

    var buttonAjaxErrorNoCode = jQuery('#btnAjaxErrorNoCode');
    buttonAjaxErrorNoCode.on('click', function (e) {
//        console.log('btnAjaxErrorNoCode');

        //
        var formData = new FormData();
        formData.append (Token, '1');

        var jqXHR = jQuery.ajax({
            url: urlAjaxErrorNoCode,
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            // timeout:20000, // 20 seconds timeout (was too short)
            data: formData
        })
            .done(function (eData, textStatus, jqXHR) {
//                console.log (': ajax returned in done');
                ajaxDone ('#btnAjaxErrorInCode', eData, textStatus, jqXHR);
            })

            .fail(function (jqXHR, textStatus, exceptionType) {
                ajaxFail ('#btnAjaxErrorInCode', jqXHR, textStatus, exceptionType);
            })

            .always(function (eData, textStatus, jqXHR) {
                ajaxAlways ('#btnAjaxErrorInCode', eData, textStatus, jqXHR);
            });

    });


    //--------------------------------------
    // Function ajax error in code
    //--------------------------------------

    var buttonAjaxErrorInCode = jQuery('#btnAjaxErrorInCode');
    buttonAjaxErrorInCode.on('click', function (e) {
//        console.log('btnAjaxErrorInCode');

        //
        var formData = new FormData();
        formData.append (Token, '1');

        var jqXHR = jQuery.ajax({
            url: urlAjaxErrorInCode,
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            // timeout:20000, // 20 seconds timeout (was too short)
            data: formData
        })
            .done(function (eData, textStatus, jqXHR) {
//                console.log (': ajax returned in done');
                ajaxDone ('#btnAjaxErrorInCode', eData, textStatus, jqXHR);
            })

            .fail(function (jqXHR, textStatus, exceptionType) {
                ajaxFail ('#btnAjaxErrorInCode', jqXHR, textStatus, exceptionType);
            })

            .always(function (eData, textStatus, jqXHR) {
                ajaxAlways ('#btnAjaxErrorInCode', eData, textStatus, jqXHR);
            });

    });

    //--------------------------------------
    // Function ajax error in code
    //--------------------------------------

    var buttonAjaxErrorReturnHeader = jQuery('#btnAjaxErrorReturnHeader');
    buttonAjaxErrorReturnHeader.on('click', function (e) {
//        console.log('btnAjaxErrorReturnHeader');

        //
        var formData = new FormData();
        formData.append (Token, '1');

        var jqXHR = jQuery.ajax({
            url: urlAjaxErrorReturnHeader,
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            // timeout:20000, // 20 seconds timeout (was too short)
            data: formData
        })
            .done(function (eData, textStatus, jqXHR) {
//                console.log (': ajax returned in done');
                ajaxDone ('#btnAjaxErrorReturnHeader', eData, textStatus, jqXHR);
            })

            .fail(function (jqXHR, textStatus, exceptionType) {
                ajaxFail ('#btnAjaxErrorReturnHeader', jqXHR, textStatus, exceptionType);
            })

            .always(function (eData, textStatus, jqXHR) {
                ajaxAlways ('#btnAjaxErrorInCode', eData, textStatus, jqXHR);
            });

    });

    //--------------------------------------
    // Function ajax warning
    //--------------------------------------

    var buttonAjaxWarning = jQuery('#btnAjaxWarning');
    buttonAjaxWarning.on('click', function (e) {

        //
        var formData = new FormData();
        formData.append (Token, '1');

//        console.log('btnAjaxWarning');
        var jqXHR = jQuery.ajax({
            url: urlAjaxWarning,
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            // timeout:20000, // 20 seconds timeout (was too short)
            //data: formData
        })
            .done(function (eData, textStatus, jqXHR) {
//                console.log (': ajax returned in done');
                ajaxDone ('#btnAjaxWarning', eData, textStatus, jqXHR);
            })

            .fail(function (jqXHR, textStatus, exceptionType) {
                ajaxFail ('#btnAjaxWarning', jqXHR, textStatus, exceptionType);
            })

            .always(function (eData, textStatus, jqXHR) {
                ajaxAlways ('#btnAjaxWarning', eData, textStatus, jqXHR);
            });

//        console.log('buttonAjaxWarning.on click: EXIT'); // + JSON.stringify($(this)));
    });

    //--------------------------------------
    // Function ajax notice
    //--------------------------------------

    var buttonAjaxNotice = jQuery('#btnAjaxNotice');
    buttonAjaxNotice.on('click', function (e) {
//        console.log('btnAjaxNotice');

        //
        var formData = new FormData();
        formData.append (Token, '1');

        var jqXHR = jQuery.ajax({
            url: urlAjaxNotice,
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            // timeout:20000, // 20 seconds timeout (was too short)
            data: formData
        })
            .done(function (eData, textStatus, jqXHR) {
//                console.log (': ajax returned in done');
                ajaxDone ('#btnAjaxNotice', eData, textStatus, jqXHR);
            })

            .fail(function (jqXHR, textStatus, exceptionType) {
                ajaxFail ('#btnAjaxNotice', jqXHR, textStatus, exceptionType);
            })

            .always(function (eData, textStatus, jqXHR) {
                ajaxAlways ('#btnAjaxNotice', eData, textStatus, jqXHR);
            });

//        console.log('buttonAjaxNotice.on click: EXIT'); // + JSON.stringify($(this)));
    });

    //--------------------------------------
    // Function ajax mix of message types
    //--------------------------------------

    var buttonAjaxAll = jQuery('#btnAjaxAll');
    buttonAjaxAll.on('click', function (e) {
//        console.log('btnAjaxAll');

        //
        var formData = new FormData();
        formData.append (Token, '1');

        var jqXHR = jQuery.ajax({
            url: urlAjaxAll,
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            // timeout:20000, // 20 seconds timeout (was too short)
            data: formData
        })
            .done(function (eData, textStatus, jqXHR) {
//                console.log (': ajax returned in done');
                ajaxDone ('#btnAjaxAll', eData, textStatus, jqXHR);
            })

            .fail(function (jqXHR, textStatus, exceptionType) {
                ajaxFail ('#btnAjaxAll', jqXHR, textStatus, exceptionType);
            })

            .always(function (eData, textStatus, jqXHR) {
                ajaxAlways ('#btnAjaxAll', eData, textStatus, jqXHR);
            });

//        console.log('buttonAjaxAll.on click: EXIT'); // + JSON.stringify($(this)));
    });

    //--------------------------------------
    // Function
    //--------------------------------------

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

    //--------------------------------------
    // Function
    //--------------------------------------

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


    //--------------------------------------
    // Function
    //--------------------------------------

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

        console.log('eData extracted: "' + JSON.stringify (eData) + '"');

        // display result in display field. will render html
        var eDataTextArea = jQuery('#eDataTextArea');
        eDataTextArea.text(eData);
        // display result as text
        var jFormDataArea = jQuery('#jform_eDataArea');
        jFormDataArea.val (eData);

        var StartIdx;

        //  Complete thml page found ? -> return
        StartIdx = eData.indexOf('<!DOCTYPE html>');
        if (StartIdx < 0) {
            // Other data then complete html page

            // is first part php error- or debug- echo string ?
            // find start of json
            StartIdx = eData.indexOf('{"');

            console.log('StartIdx: "' + JSON.stringify (StartIdx) + '"');

            // No Json data
            if (StartIdx < 0) {
                preMessage = eData;
            }
            else {
                var jsonText;

                // Unexpected text in front to JSON data
                if (StartIdx > 0) {
                    // message part and json data existing
                    preMessage = eData.substring(0, StartIdx - 1);
                    jsonText = eData.substring(StartIdx);
                }
                else {
                    jsonText = eData;
                }

                jData = jQuery.parseJSON(jsonText);
            }
        }

        console.log('jData extracted: "' + JSON.stringify (jData) + '"');
//        console.log('preMessage extracted: "' + JSON.stringify (preMessage) + '"');
        /**/
        return {
            preMessage: preMessage,
            jData: jData
        }
         /**/
        // return preMessage, jData;
    }

    //--------------------------------------
    // Function
    //--------------------------------------

    function writeUnexpectedErrorMessage (message) {

        //console.log('Unexpected message JSON: "' + JSON.stringify (message) + '"');
        console.log('Unexpected message JSON: "' + JSON.stringify (message).length + '"');

        //if (typeof message !== "undefined") {
        if (message) {
            console.log('writeUnexpectedErrorMessage.mesage: "' + message + '"');
            // append message to be viewed
            var messagesArea = jQuery('#messagesArea');
            var OutHtml = CreateErrorHtml(message);
            messagesArea.append(OutHtml);
        }
    }

    //--------------------------------------
    // Function
    //--------------------------------------

    function writeDataMessages (jData) {
        var messagesArea = jQuery('#messagesArea');
        var OutHtml = "";
        var MainMessage = "";
        var JMessages = {};
        var OutHtml = "";
        messagesArea.append(OutHtml);

//        console.log ('M01');
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

            if (typeof jData.message !== "undefined") {

                MainMessage = jData.message;

                console.log ('jData.messages: ' + JSON.stringify(jData.messages));
                // On missing messages display standard message.
                // Otherwise use standard message as header
                if (! jData.messages) {

                    OutHtml = CreateNoticeHtml(MainMessage);
                    messagesArea.append(OutHtml);
                }
            }
        }

        // Messages list exists
        if (jData.messages) {
            if (typeof jData.messages !== "undefined") {
//                console.log ('M03B');
                var subMessages = jData.messages;
//                console.log ('M03C');
//                console.log("subMessages: " + JSON.stringify(subMessages))

                for (var msgType in subMessages) {
//                    console.log ('M03E');
//                    console.log ('msgType: ' + msgType);
                    if (subMessages.hasOwnProperty(msgType)) {
//                        console.log ('M0F');
                        var msgText = subMessages[msgType];
//                        console.log ('M0G');
//                        console.log ('msgText: ' + msgText);

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
//                        console.log ('M03P');
                        messagesArea.append(OutHtml);

//                        console.log ('M03Q');
                    }
                }

//                console.log ('M03L');
            }
        }
        else
        {
//            console.log ('M03X: No messages');
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

//        console.log ('M20');
    }


    //--------------------------------------
    // Function ajaxDone
    //--------------------------------------

    function ajaxDone (originText, eData, textStatus, jqXHR) {
        console.log(originText + ': ajax now in done section');
        console.log ("textStatus: " + textStatus);
        console.log ("eData: " + eData);
        $('#done_event').prop('checked', true);
        var jTextStatus = jQuery('#jform_textStatusDoneArea');
        jTextStatus.val (textStatus);

        /**
        // append message to be viewed
        var messagesArea = jQuery('#messagesArea');
        var OutHtml = CreateErrorHtml(message);
        messagesArea.append(OutHtml);
        /**/

        // returns extract.preMessage, extract.jData
        var extract = extractDataMessages(eData);
        jData = extract.jData;

        writeUnexpectedErrorMessage (extract.preMessage);

        if (typeof jData !== "undefined") {

            // Check that JResponseJson data structure may be available
            if (typeof jData.success === "undefined") {
                console.log('jData.success returned wrong data');
                return;
            }

//            console.log ("jData.success: " + jData.success);

            writeDataMessages (jData);
        }
        console.log(originText + ': ajax exit done');
    }

    //--------------------------------------
    // Function ajaxFail
    //--------------------------------------

    function ajaxFail (originText, jqXHR, textStatus, exceptionType) {
        console.log(originText + ': ajax now in fail section');
//        console.log (originText + ': ajax now in fail section');
        $('#fail_event').prop('checked', true);

        var jTextStatus = jQuery('#jform_textStatusFailArea');
        jTextStatus.val (textStatus);

        var jTextStatus = jQuery('#jform_textStatusFailExceptionArea');
        jTextStatus.val (exceptionType);

        //alert (JSON.stringify(jqXHR));
        // display result in display field. will render html
        var eDataTextArea = jQuery('#jform_eDataArea');
        eDataTextArea.text(JSON.stringify(jqXHR));
        //console.log ('textStatus: ' + JSON.stringify(textStatus));
        //console.log ('exceptionType: ' + JSON.stringify(exceptionType));
        console.log ('status: ' + jqXHR.status); // Number
        console.log ('readyState: ' + jqXHR.readyState);
        console.log ('responseText: ' + jqXHR.responseText);

        // alert(exceptionType);

//        console.log ("exceptionType: " + exceptionType);
//        console.log ("textStatus: " + textStatus);

    }

    //--------------------------------------
    // Function ajaxAlways
    //--------------------------------------

    function ajaxAlways (originText, eData, textStatus, jqXHR) {
        console.log(originText + ': ajax now in always section');
//        console.log (originText + ': ajax now in always section');
        $('#always_event').prop('checked', true);
        var jTextStatus = jQuery('#jform_textStatusAlwaysArea');
        jTextStatus.val (textStatus);

    }

}); // ready
