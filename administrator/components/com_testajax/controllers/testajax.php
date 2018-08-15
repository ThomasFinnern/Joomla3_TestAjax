<?php
/**
 * @package    TestAjax
 *
 * @author     Thomas Finnern <TestAjax@tomfinnern.de>
 * @copyright  (c) 2018 Thomas Finnern
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 * @link       https://github.com/ThomasFinnern
 */

use Joomla\CMS\MVC\Controller\AdminController;

defined('_JEXEC') or die;

/**
 * TestAjax Controller.
 *
 * @package  [TestAjax
 * @since    1.0
 */
class TestAjaxControllerTestAjax extends AdminController
{
	/**/
	function AjaxIncreaseValue()
	{
		JSession::checkToken() or jexit(JText::_('JINVALID_TOKEN'));

		$msg = 'AjaxIncreaseValue';

		$app = JFactory::getApplication();
		try {
			// Data from FormData
			$input = JFactory::getApplication()->input;
			$number = $input->get('strNumber', 0, 'INT');

			// Return increased number
			$number++;

			$ajaxAnswerObj ['number'] = $number;

			// Test: Is input smaller than zero -> tell bad result
			$hasError = false;
			if ($number < 0) {
				$hasError = true;
				$msg .= '<br> Resulting number must be bigger than zero';
			}

			// Test: If Number is now zero we produce an integer error
			if ($number < 0) {
				$hasError = true;
				$msg .= '<br> On resulting number zero we produce an integer division error';
				$TestNumber = 0 / $number;
				$msg .= '<br> ? division error survived ? Value ' . $TestNumber;
				$hasError = false;
			}

			// yyy comment all
			echo new JResponseJson($ajaxAnswerObj, $msg, $hasError);

		} catch (Exception $e) {
			// Failed Test 1

			echo new JResponseJson($e, $msg, $hasError);
		}

		$app->close();
	}

	/**/
	function AjaxError()
	{

	}

	/**/
	function AjaxWarning()
	{

	}

	/**/
	function AjaxNotice()
	{

	}

}


