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

    var urlIncreaseValue = 'index.php?option=com_testajax&task=testajax.AjaxIncreaseValue';
    var urlAjaxError = 'index.php?option=com_testajax&task=testajax.AjaxError';
    var urlAjaxWarning = 'index.php?option=com_testajax&task=testajax.AjaxWarning';
    var urlAjaxNotice = 'index.php?option=com_testajax&task=testajax.AjaxNotice';

    //--------------------------------------
    // Function Button click ->increase value
    //--------------------------------------

    var buttonIncreaseValue = $('#btnIncreaseValue');
    buttonIncreaseValue.on('click', function (e) {

        //--------------------------------------
        // Handle number value from user
        //--------------------------------------

        // for function sendFileToServer
        var formData = new FormData();

        // var test = jQuery('#jform_ajaxTestValue');
        var test = jQuery('input[name="jform[ajaxTestValue]"]');

        jQuery('input[name="jform[ajaxTestValue]"]').val('20');

        formData.strNumber = jQuery('#jform_ajaxTestValue').val();
        // formData.strNumber = jQuery('input[name="jform[ajaxTestValue]"]').val();

        alert ('strNumber: "' + formData.strNumber + '"');

        //--------------------------------------
        //
        //--------------------------------------

        var jqXHR = jQuery.ajax({
            xhr: function () {
                var xhrobj = jQuery.ajaxSettings.xhr();
                if (xhrobj.upload) {
                    xhrobj.upload.addEventListener('progress', function (event) {
                        var percent = 0;
                        // if (event.lengthComputable) {
                        var position = event.loaded || event.position;
                        var total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil(position / total * 100);
                        }
                        //Set progress
                        statusBar.setProgress(percent);
                    }, false);
                }
                return xhrobj;
            },
            url: urlIncreaseValue,
            type: "POST",
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
            //alert('done Success: "' + String(eData) + '"')

            console.log(': Success');

            var jData;

            alert ("done");

            //--- Handle PHP Error and notification messages first (separate) -------------------------

            // is first part php error- or debug- echo string ?
            // find start of json
            var StartIdx = eData.indexOf('{"');

            // Jquery starts at the beginning, no additional message
            if (StartIdx == 0) {
                alert ("B01");

                alert ("B02:" + eData);

                jData = jQuery.parseJSON(eData);

                alert ("A10");
            }
            else {
                alert ("A02:" + StartIdx);

                // part of JSOn existing
                if(StartIdx > 0) {
                    console.log(': Success with message');
                    // find error html text
                    var errorText = eData.substring(0, StartIdx - 1);
                    alert("A03");
                    // append to be viewed
                    var messagesArea = $('#Messages');
                    alert("A04");
                    messagesArea.append(errorText);
                    alert("A05");

                    // extract json data of uploaded image
                    var jsonText = eData.substring(StartIdx);
                    alert("A06");
                    jData = jQuery.parseJSON(jsonText);
                    alert("A06");
                }
                else
                {
                    // No Json data
                    // append message to be viewed
                    var messagesArea = $('#messagesArea');
                    alert("C01");
                    var OutHtml = CreateErrorHtml (eData);
                    messagesArea.append(OutHtml);

                    var OutHtml = CreateSucessHtml (eData);
                    messagesArea.append(OutHtml);

                    var OutHtml = CreateNoticeHtml (eData);
                    messagesArea.append(OutHtml);

                    var OutHtml = CreateWarningHtml (eData);
                    messagesArea.append(OutHtml);

                    /**
                     *

                     Date and time / only time ...

                    <div class="alert">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <strong>Warning!</strong> Best check yo self, you're not looking too good.
                    </div>

                     <div class="alert alert-block">
                     <button type="button" class="close" data-dismiss="alert">&times;</button>
                     <h4>Warning!</h4>
                     Best check yo self, you're not...
                     </div>

                     http://getbootstrap.com/2.3.2/components.html

                     <div class="alert alert-info">
                     ...
                     </div>




                     */
                    alert("C02");
                }
            }

            alert ("03");

            // Check that JResponseJson data structure may be available
            if (!'success' in jData) {
                alert('returned wrong data');
                return;
            }

            alert ("04");

            // ToDo: Handle JOOMLA Error and notification messages -> inside Json

            //--- success -------------------------

            // Sucessfull result
            if (jData.success == true) {
                alert ("05");
                alert('XXX. Result success 05' + ' New Number: "' + jData.number + '"');
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

            console.log(': fail');

            alert(' failed: "' + textStatus + '" -> "' + exceptionType + '" [' + jqXHR.status + ']');

            console.log(jqXHR);
        })

        /*----------------------------------------------------
        On always / complete
        ----------------------------------------------------*/

        .always(function (eData, textStatus, jqXHR) {
            alert ('always: "' + textStatus + '"');
        });


        alert('buttonIncreaseValue.on click: '); // + JSON.stringify($(this)));
    });

    var buttonAjaxError = $('#btnAjaxError');
    buttonAjaxError.on('click', function (e) {
        alert('buttonAjaxError.on click: '); // + JSON.stringify($(this)));
    });

    var buttonAjaxWarning = $('#btnAjaxWarning');
    buttonAjaxWarning.on('click', function (e) {
        alert('buttonAjaxWarning.on click: '); // + JSON.stringify($(this)));
    });

    var buttonAjaxNotice = $('#btnAjaxNotice');
    buttonAjaxNotice.on('click', function (e) {
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
        OutText += '    ' + ActTime + ' ' + displayText;
        OutText += '</div>';

        return OutText;              // The function returns the product of p1 and p2
    }

    function CreateSucessHtml(displayText) {

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






}) // ready
