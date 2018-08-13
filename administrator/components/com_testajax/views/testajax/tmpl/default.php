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

    <buttonmanualfile
            id="select_manual_file"
            type="buttonManualFile"
            class="btn btn-success"
            title="Select image files or a zip file containing images"
    >
        <span class="icon-copy" aria-hidden="true"></span>
        Select files
    </buttonmanualfile>




</div>
