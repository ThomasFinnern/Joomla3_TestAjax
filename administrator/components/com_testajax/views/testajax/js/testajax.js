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
    // Button increase value
    //--------------------------------------

    var buttonIncreaseValue = $('#btnIncreaseValue');
    buttonIncreaseValue.on('click', function (e) {

        alert("010");

        //--------------------------------------
        // Handle number value from user
        //--------------------------------------

        // for function sendFileToServer
        var formData = new FormData();

        alert("020");

        var test = jQuery('#jform_ajaxTestValue');

        if (test.length == 0) {
            alert("030");
        }
        else
        {
            alert("Name: " + test.id);
        }
        alert("035");

        formData.strNumber = jQuery('#jform_ajaxTestValue').val();
        alert ('strNumber: "' + strNumber + '"');

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

            //--- Handle PHP Error and notification messages first (separate) -------------------------

            // is first part php error- or debug- echo string ?
            // find start of json
            var StartIdx = eData.indexOf('{"');
            if (StartIdx == 0) {
                jData = jQuery.parseJSON(eData);
            }
            else {
                console.log(': Success with message');
                // find error html text
                var errorText = eData.substring(0, StartIdx - 1);
                // append to be viewed
                var messagesArea = $('#Messages');
                messagesArea.append(errorText);

                // extract json data of uploaded image
                var jsonText = eData.substring(StartIdx);
                jData = jQuery.parseJSON(jsonText);
            }

            // Check that JResponseJson data structure may be available
            if (!'success' in jData) {
                alert('returned wrong data');
                return;
            }

            // ToDo: Handle JOOMLA Error and notification messages -> inside Json

            //--- success -------------------------

            // Sucessfull result
            if (jData.success == true) {
                alert('XXX. Result success 05' + ' New Number: "' + jData.number + '"');
            }
            else {
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


}) // ready
