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
		// $token    = JSession::getFormToken();
		// Get instead of post problem
		// Wrong will return to done with error message
		// JSession::checkToken() or jexit(JText::_('JINVALID_TOKEN'));

		$msg = 'AjaxIncreaseValue';

		$app = JFactory::getApplication();
		try {
			/**
			// right place to check
			if ( ! JSession::checkToken()) {
				$msg = JText::_('JINVALID_TOKEN');
				$hasError = 1;
				echo new JResponseJson('', $msg, $hasError);
			}
			/**/

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
	function AjaxErrorDie()
	{
		//
		// Wrong will return to done with error message
		// JSession::checkToken() or jexit(JText::_('JINVALID_TOKEN'));
		die ("died immediately after enter of function");


	}

	/**/
	function AjaxErrorJexit()
	{
		//
		// Wrong will return to done with error message
		// JSession::checkToken() or jexit(JText::_('JINVALID_TOKEN'));

		jexit ("exited immediately after enter of function");
	}

	/**/
	function AjaxError()
	{
		$msg = 'AjaxError';

		$app = JFactory::getApplication();
		$app->enqueueMessage('User error in ajax call', 'error');
		$hasError = True;
		echo new JResponseJson('', 'Standard message in ' . $msg, $hasError);
	}

	/**/
	function AjaxWarning()
	{
		$msg = 'AjaxWarning';

		$app = JFactory::getApplication();
		$app->enqueueMessage('User warning in ajax call', 'warning');
		$hasError = False;
		echo new JResponseJson('', 'Standard message in ' . $msg, $hasError);
	}

	/**/
	function AjaxNotice()
	{
		$msg = 'AjaxNotice';

		$app = JFactory::getApplication();
		$app->enqueueMessage('User notice in ajax call', 'notice');
		$hasError = False;
		echo new JResponseJson('', 'Standard message in ' . $msg, $hasError);
	}

		/**
		$data['myRequest'] =$_REQUEST;
		$data['myFile'] =__FILE__;
		$data['myLine'] ='Line '.__LINE__;

		$app->enqueueMessage('This part was reached at line ' . __LINE__);
		$app->enqueueMessage('Then this part was reached at line ' . __LINE__);
		$app->enqueueMessage('Here was a small warning at line ' . __LINE__, 'warning');
		$app->enqueueMessage('Here was a big warning at line ' . __LINE__, 'error');

		$task_failed = false;
		echo new JResponseJson($data, 'My main response message',$task_failed);
		/**/
}


