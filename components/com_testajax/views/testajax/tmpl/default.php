<?php
/**
 * @package    TestAjax
 *
 * @author     Thomas Finnern <TestAjax@tomfinnern.de>
 * @copyright  (c) 2018 Thomas Finnern
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 * @link       https://github.com/ThomasFinnern
 */

use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Layout\FileLayout;

defined('_JEXEC') or die;

HTMLHelper::_('script', 'com_testajax/script.js', array('version' => 'auto', 'relative' => true));
HTMLHelper::_('stylesheet', 'com_testajax/style.css', array('version' => 'auto', 'relative' => true));

?>
<h1><?php echo $this->msg; ?></h1>
<?php

$layout = new FileLayout('testajax.page');

//$data = new stdClass;
//$data->text = 'Hello Joomla! (1)';
$data = array('text' => 'Hello Joomla! (2)');
echo $layout->render($data);


