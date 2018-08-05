<?php
/**
 * @package    TestAjax
 *
 * @author     Thomas Finnern <TestAjax@tomfinnern.de>
 * @copyright  (c) 2018 Thomas Finnern
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 * @link       https://github.com/ThomasFinnern
 */

use Joomla\CMS\MVC\View\HtmlView;

defined('_JEXEC') or die;

/**
 * TestAjax view.
 *
 * @package  [TestAjax
 * @since    1.0
 */
class TestAjaxViewTestAjax extends HtmlView
{

	/**
	 * Display the Hello World view
	 *
	 * @param   string  $tpl  The name of the template file to parse; automatically searches through the template paths.
	 *
	 * @return  void
	 */
	function display($tpl = null)
	{
		// Assign data to the view
		$this->msg = 'Test Ajax has life';

		// Display the view
		parent::display($tpl);
	}
}
