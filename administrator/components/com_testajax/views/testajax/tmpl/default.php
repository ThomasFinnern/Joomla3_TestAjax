<?php
/**
 * @package    TestAjax
 *
 * @author     Thomas Finnern <TestAjax@tomfinnern.de>
 * @copyright  (c) 2018 Thomas Finnern
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 * @link       https://github.com/ThomasFinnern
 */

defined('_JEXEC') or die;

$doc = JFactory::getDocument();
//$doc->addStyleSheet(JUri::root() . '/administrator/components/com_testajax/views/com_testajax/css/com_testajax.css');

$doc->addScript(JUri::root() . '/administrator/components/com_testajax/views/testajax/js/testajax.js');

$script[] = 'var Token = \'' . JSession::getFormToken() . '\';';
JFactory::getDocument()->addScriptDeclaration(implode("\n", $script));

?>
<div id="j-sidebar-container" class="span2">
	<?php echo $this->sidebar; ?>
</div>
<div id="j-main-container" class="span10">

    <form action="<?php echo JRoute::_('index.php?option=&view=com_testajax'); ?>"
          method="post" name="adminForm" id="adminForm" enctype="multipart/form-data"
          class="form-validate form-horizontal">

        <br>

        <div id="messagesArea"></div>


        <div class="control-group">
            <div class="control-label">
                <label id="jform_ajaxTestValue-lbl" for="jform_ajaxTestValue" class="hasPopover" title="" data-content="On click 'Increase Value' this value is increased if ajax call was successful" data-original-title="Value for increasing">
                    Test value
                </label>
            </div>
            <div class="controls">
                <input name="jform[ajaxTestValue]" id="jform_ajaxTestValue" value="0" aria-invalid="false" type="text"></input>
            </div>
        </div>

        <buttonIncreaseValue
                id="btnIncreaseValue"
                type="button"
                class="btn btn-success"
                title="On click increases test value with call to server over ajax. The PHP on the server increases the value and returns it"
        >
            <span class="icon-copy" aria-hidden="true"></span>
            Increase Value
        </buttonIncreaseValue>

        <buttonIncreaseValueEcho
                id="btnIncreaseValueEcho"
                type="button"
                class="btn btn-success"
                title="On click increases test value with call to server over ajax. The PHP on the server increases the value and returns it. Also the new value is echoed on server side. see the effect"
        >
            <span class="icon-copy" aria-hidden="true"></span>
            Increase Value and Echo parts
        </buttonIncreaseValueEcho>

        <br><br>

        <buttonAjaxError
                id="btnAjaxError"
                type="button"
                class="btn btn-danger"
                title="On click creates an error on ajax call on the server side"
        >
            <span class="icon-copy" aria-hidden="true"></span>
            Ajax error
        </buttonAjaxError>

        <!-- br><br -->

        <buttonAjaxErrorDie
                id="btnAjaxErrorDie"
                type="button"
                class="btn btn-danger"
                title="On click creates an error on ajax call on the server side with a die statemant"
        >
            <span class="icon-copy" aria-hidden="true"></span>
            Ajax error die
        </buttonAjaxErrorDie>

        <!--br><br-->

        <buttonAjaxErrorJexit
                id="btnAjaxErrorJexit"
                type="button"
                class="btn btn-danger"
                title="On click creates an error on ajax call on the server side with a Jexit statemant"
        >
            <span class="icon-copy" aria-hidden="true"></span>
            Ajax error Jexit
        </buttonAjaxErrorJexit>

        <buttonAjaxErrorInCode
                id="btnAjaxErrorInCode"
                type="button"
                class="btn btn-danger"
                title="On click creates an error on ajax call on the server side with a code error"
        >
            <span class="icon-copy" aria-hidden="true"></span>
            Ajax error from php code
        </buttonAjaxErrorInCode>

        <br><br>

        <buttonAjaxWarning
                id="btnAjaxWarning"
                type="button"
                class="btn btn-warning"
                title="On click creates a warning on ajax call on the server side"
        >
            <span class="icon-copy" aria-hidden="true"></span>
            Ajax Warning
        </buttonAjaxWarning>

        <br><br>

        <buttonAjaxNotice
                id="btnAjaxNotice"
                type="button"
                class="btn btn-info"
                title="On click creates an error on ajax call on the server side"
        >
            <span class="icon-copy" aria-hidden="true"></span>
            Ajax Notice
        </buttonAjaxNotice>

        <br><br>

        <buttonAjaxAll
                id="btnAjaxAll"
                type="button"
                class="btn"
                title="On click creates error, warning and notice on ajax call on the server side"
                style="background-color:DarkGoldenRod;color:white"
        >
            <span class="icon-copy" aria-hidden="true"></span>
            Ajax all at once
        </buttonAjaxAll>

        <br><br>

        <br><br>

        <div id="eDataArea">
            <div class="control-group">
                <div class="control-label">
                    <label id="jform_eDataArea-lbl" for="jform_eDataArea" class="hasPopover" title="" data-content="Area where ajax result 'eData' is displayed" data-original-title="ajax result edata">
                        Ajax result
                    </label>
                </div>
                <div class="controls">
                    <input name="jform[eDataArea]" id="jform_eDataArea" value="" aria-invalid="false" type="text"></input>
                </div>
            </div>
        </div>

        <div>
            <Strong>Text of eData</Strong>
            <div id="eDataTextArea">
            </div>
        </div>
        <?php echo JHtml::_('form.token'); ?>
    </form>

</div>
