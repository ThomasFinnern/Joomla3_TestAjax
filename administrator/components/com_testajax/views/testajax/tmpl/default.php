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

?>
<div id="j-sidebar-container" class="span2">
	<?php echo $this->sidebar; ?>
</div>
<div id="j-main-container" class="span10">

    <br>

    <div class="control-group">
        <div class="control-label">
            <label id="jform_ajaxTestValue-lbl" for="jform_ajaxTestValue" class="hasPopover" title="" data-content="On click 'Increase Value' this value is increased if ajax call was successful" data-original-title="JPEG Quality Percentage">
                Test value
            </label>
        </div>
        <div class="controls">
            <input name="jform[ajaxTestValue]" id="jform_ajaxTestValue" value="0" aria-invalid="false" type="text">
        </div>
    </div>

    <buttonIncreaseValue
            id="btnIncreaseValue"
            type="buttonIncreaseValue"
            class="btn btn-success"
            title="On click increases test value with call to server over ajax. The PHP on the server increases the value and returns it"
    >
        <span class="icon-copy" aria-hidden="true"></span>
        Increase Value (over ajax)
    </buttonIncreaseValue>

    <br><br>

    <buttonAjaxError
            id="btnAjaxError"
            type="buttonIncreaseValue"
            class="btn btn-error"
            title="On click creates an error on ajax call on the server side"
    >
        <span class="icon-copy" aria-hidden="true"></span>
        Ajax error
    </buttonAjaxError>

    <br><br>

    <buttonAjaxWarning
            id="btnAjaxWarning"
            type="buttonIncreaseValue"
            class="btn btn-warning"
            title="On click creates a warning on ajax call on the server side"
    >
        <span class="icon-copy" aria-hidden="true"></span>
        Ajax Warning
    </buttonAjaxWarning>

    <br><br>

    <buttonAjaxNotice
            id="btnAjaxError"
            type="buttonIncreaseValue"
            class="btn btn-notice"
            title="On click creates an error on ajax call on the server side"
    >
        <span class="icon-copy" aria-hidden="true"></span>
        Ajax Notice
    </buttonAjaxNotice>

</div>
