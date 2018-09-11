# Joomla3_TestAjax
## Start with using ajax in a Joomla! component
To explain some behavior on the  javascript and the php section of a joomla! component using ajax i did create a component which shows some aspects of the handling.

I try to summarize parts of what i learned when i did image upload with drag and drop for the RSGallery2 component [on github](https://github.com/RSGallery2/RSGallery2_Component)

---
### Code for ajax calls and response events

This application does use the jquery ajax call for a more easy handling.
The standard "xhttp ..." request is similar. Parts automated by jQuery must then be programmed additional.

#### Call of ajax function
```javascript
    //--------------------------------------
    // Define ajax ...
    //--------------------------------------

    var jqXHR = jQuery.ajax({
        url: urlIncreaseValue,
        type: 'POST',
        contentType: false,
        processData: false,
        cache: false,
        //timeout:20000, // 20 seconds timeout (was too short for image upload)
        data: formData
    })
```

* url:
   The url looks like: <br>
   urlIncreaseValue = './index.php?option=com_testajax&task=testajax.AjaxIncreaseValue';<br>
   The part testajax.AjaxIncreaseValue leads to testajax.php in controller and starts function AjaxIncreaseValue there
* type: 'POST'<br>
   Type of data send to server ->
* contentType: false<br>
   // Not working: contentType: 'json',

* processData: false<br>

* cache: false<br>

* timeout:20000<br>
   May be set
* data: formData<br>
   Special formatted data see below

#### Valid answer of request
```
    .done(function (eData, textStatus, jqXHR) {

    }
```
Example of a valid eData
```
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
```

* "success": true<br>
   True /or false dependent on setting of the answer on php side
* "message": "Standard message in AjaxAll"<br>

* "messages": {...}<br>

* "data": ""<br>
  JSON coded values set on PHP side

ToDo:
textStatus: ''

success / fail ....

jqXHR: ''

#### Failed answer of request

```
    .fail(function (jqXHR, textStatus, exceptionType) {

    }
```

jqXHR: ''

textStatus: ''

exceptionType: ''

#### Finishing event of request

```
    .always(function (eData, textStatus, jqXHR) {

    }
```

jqXHR: ''

textStatus: ''

jqXHR: ''


#### Transferring data to the server

ToDo: Token and others




---
### Joomla code on the server side

```php
/* Return a mixture of standard notice, warning and error messages in json format */
function AjaxAll()
{
  $msg = 'AjaxAll';
  $ajaxAnswerObj ['AjaxAll'] = True;

  $app = JFactory::getApplication();

  $app->enqueueMessage('User notice in ajax call', 'notice');
  $app->enqueueMessage('User warning in ajax call', 'warning');
  $app->enqueueMessage('User error in ajax call', 'error');

  $hasError = False;
  echo new JResponseJson($ajaxAnswerObj, 'Standard message in ' . $msg, $hasError);

  $app->close();
}
```
Joomla supports JSON answers for ajax requests

(1)

(2)


---
### The "testajax" component
The component supports buttons to issue several ajax situations and shows the resulting data in a separate text box.

 ![MainView](https://github.com/ThomasFinnern/Joomla3_TestAjax/blob/master/.doc/images/MainView.png?raw=true)

.... <br>

```
        /*----------------------------------------------------
        On success / done
        ----------------------------------------------------*/

        .done(function (eData, textStatus, jqXHR) {
            console.log('IncreaseValue: ajax returned in done');
            console.log ("edata: " + eData);

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
```

```
        /*----------------------------------------------------
        On fail / error
        ----------------------------------------------------*/

        .fail(function (jqXHR, textStatus, exceptionType) {

            console.log('IncreaseValue: ajax returned in fail');
            console.log(' failed: "' + textStatus + '" -> "' + exceptionType + '" [' + jqXHR.status + ']');

            console.log(jqXHR);
        })
```

```
        /*----------------------------------------------------
        On always / complete
        ----------------------------------------------------*/
        .always(function (eData, textStatus, jqXHR) {
            console.log('IncreaseValue: ajax section always');

        });
```

```
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
```

```
    function extractDataMessages(eData) {
        // Pre init
        var jData = {};
        var preMessage = "";

        console.log('eData extracted: "' + JSON.stringify (eData) + '"');

        // display result in extra field
        var eDataTextArea = jQuery('#eDataTextArea');
        eDataTextArea.text(eData);
        var jFormDataArea = jQuery('#jform_eDataArea');
        jFormDataArea.val (eData);
        //jQuery('input[name="jform[eDataArea]"]').val(eData);
        //jQuery('input[name="jform[eDataArea]"]').val(JSON.stringify (eData));


        // is first part php error- or debug- echo string ?
        // find start of json
        var StartIdx = eData.indexOf('{"');

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
            else
            {
               jsonText = eData;
            }

            jData = jQuery.parseJSON(jsonText);

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

```

```
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
```

```
```

```
```

```
```




 ![IncreaseValue](https://github.com/ThomasFinnern/Joomla3_TestAjax/blob/master/.doc/images/Desc.IncreaseValue.png?raw=true)

 * (1) Increase Value

 * (2) Increase Value and Echo parts

 * (3) Increase result


 ![ErrorButtons](https://github.com/ThomasFinnern/Joomla3_TestAjax/blob/master/.doc/images/Desc.ErrorButtons.png?raw=true)

 * (1) Ajax error

 * (2)  Ajax error die

 * (3)  Ajax error Jexit

 * (4)  Ajax error from php code


 ![OtherButtons](https://github.com/ThomasFinnern/Joomla3_TestAjax/blob/master/.doc/images/Desc.OtherButtons.png?raw=true)

 * (1) Ajax warning

 * (2) Ajax notice

 * (3) Ajax all at once


 ![ResultArea](https://github.com/ThomasFinnern/Joomla3_TestAjax/blob/master/.doc/images/Desc.ResultArea.png?raw=true)

 * (1) Ajax result



#### Origin of code and ideas

Parts of what i learned can be found in Joomla! code itself and most other parts i found on stackoveflow or stackexchange. Thanks to the people answering questions there
