<?php
/**
 * @package    TestAjax
 *
 * @author     Thomas Finnern <TestAjax@tomfinnern.de>
 * @copyright  (c) 2018 Thomas Finnern
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 * @link       https://github.com/ThomasFinnern
 */

use Joomla\CMS\Language\Text;

defined('_JEXEC') or die;

/**
 * TestAjax helper.
 *
 * @package     A package name
 * @since       1.0
 */
class TestAjaxHelper
{
	/**
	 * Render submenu.
	 *
	 * @param   string  $vName  The name of the current view.
	 *
	 * @return  void.
	 *
	 * @since   1.0
	 */
	public function addSubmenu($vName)
	{
		JHtmlSidebar::addEntry(Text::_('COM_TESTAJAX'), 'index.php?option=com_testajax&view=testajax', $vName == 'testajax');
	}
}
