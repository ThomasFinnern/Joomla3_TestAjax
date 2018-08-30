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
	/* Send back increased number from user*/
	function AjaxIncreaseValue()
	{
		$msg = 'AjaxIncreaseValue';
		$hasError = false;

		$app = JFactory::getApplication();

		// do check token
		if ( ! JSession::checkToken()) {
			$errMsg = JText::_('JINVALID_TOKEN') . " (01)";
			$hasError = 1;
			echo new JResponseJson($msg, $errMsg, $hasError);
			$app->close();
		}

		try {
			// Number from FormData
			$input = JFactory::getApplication()->input;
			$number = $input->get('strNumber', 0, 'INT');

			// Return increased number
			$number++;
			$ajaxAnswerObj ['number'] = $number;

			// send created number
			echo new JResponseJson($ajaxAnswerObj, $msg, $hasError);

		} catch (Exception $e) {
			// Failed
			$hasError = 1;
			echo new JResponseJson($e, $msg, $hasError);
		}

		$app->close();
	}

	/* Send back increased number from user and 'accidentally' echo text out of json object */
	function AjaxIncreaseValueEcho()
	{
		// $token    = JSession::getFormToken();
		// Get instead of post problem
		// Wrong will return to done with error message
		// JSession::checkToken() or jexit(JText::_('JINVALID_TOKEN'));

		$msg = 'AjaxIncreaseValueEcho';
		$ajaxAnswerObj ['AjaxIncreaseValueEcho'] = True;
		$hasError = false;

		$app = JFactory::getApplication();
		try {
			/**/
			// right place to check
			if ( ! JSession::checkToken()) {
				$msg = JText::_('JINVALID_TOKEN') . " (02)";
				$hasError = 1;
				echo new JResponseJson('AjaxIncreaseValueEcho:', $msg, $hasError);
			}
			/**/

			// Number from FormData
			$input = JFactory::getApplication()->input;
			$number = $input->get('strNumber', 0, 'INT');

			// Return increased number
			$number++;

			// 'Accidentally' debug echo text before creating json data
			echo 'PHP: New number is "' . $number . '"';

			$ajaxAnswerObj ['number'] = $number;
			echo new JResponseJson($ajaxAnswerObj, $msg, $hasError);

			// send created number
		} catch (Exception $e) {
			// Failed
			$hasError = 1;
			echo new JResponseJson($e, $msg, $hasError);
		}

		$app->close();
	}

	/* Die the application without standard response */
	function AjaxErrorDie()
	{
		//
		die ("Died immediately after enter of function");
	}

	/* Use jexit the application without standard response */
	function AjaxErrorJexit()
	{
		//
		jexit ("exited immediately after enter of function");
	}

	/* Standard way to tell about error */
	function AjaxError()
	{
		$msg = 'AjaxError';
		// Test text
		$ajaxAnswerObj [$msg] = True;

		$app = JFactory::getApplication();
		$app->enqueueMessage('User error in ajax call', 'error');
		$hasError = True;
		echo new JResponseJson($ajaxAnswerObj, 'Standard error message in ' . $msg, $hasError);

		$app->close();
	}

	/* "unexpected" divide by zero error */
	function AjaxErrorInCode()
	{
		$msg = 'AjaxErrorInCode';
		$ajaxAnswerObj ['AjaxIncreaseValueEcho'] = True;

		$app = JFactory::getApplication();

		// Data from FormData
		$input = JFactory::getApplication()->input;

		// $number will result in "0"
		$number = $input->get('strNumber', 0, 'INT');

		// Create "unexpected" error ( ??? throw ???)
		$result = 15 / $number;

		// Would be the normal send data (and is send too)
		$hasError = false;
		echo new JResponseJson($ajaxAnswerObj, 'Otherwise OK: Standard message in ' . $msg, $hasError);

		$app->close();
	}

	/* Standard way to tell about warning */
	function AjaxWarning()
	{
		$msg = 'AjaxWarning';
		$ajaxAnswerObj [$msg] = True;

		$app = JFactory::getApplication();
		$app->enqueueMessage('User warning in ajax call', 'warning');
		$hasError = False;
		echo new JResponseJson($ajaxAnswerObj, 'Standard message in ' . $msg, $hasError);

		$app->close();
	}

	/* Standard way to tell about notice */
	function AjaxNotice()
	{
		$msg = 'AjaxNotice';
		//$ajaxAnswerObj ['AjaxIncreaseValueEcho'] = True;

		$app = JFactory::getApplication();
		$app->enqueueMessage('User notice in ajax call', 'notice');
		$hasError = False;
		echo new JResponseJson('', 'Standard message in ' . $msg, $hasError);
		// echo new JResponseJson($ajaxAnswerObj, 'Standard message in ' . $msg, $hasError);

		$app->close();
	}

	/* Send a mixture of standard notice, warning and error messages in jsonn format */
	function AjaxAll()
	{
		$msg = 'AjaxAll';
		$ajaxAnswerObj ['AjaxIncreaseValueEcho'] = True;

		$app = JFactory::getApplication();
		$app->enqueueMessage('User notice in ajax call', 'notice');
		$app->enqueueMessage('User warning in ajax call', 'warning');
		$app->enqueueMessage('User error in ajax call', 'error');

		$app->enqueueMessage('User notice in ajax call (2)', 'notice');
		$app->enqueueMessage('User warning in ajax call (2)', 'warning');
		$app->enqueueMessage('User error in ajax call (2)', 'error');

		$hasError = False;
		echo new JResponseJson($ajaxAnswerObj, 'Standard message in ' . $msg, $hasError);

		$app->close();
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


	/**/
	function AjaxErrorException()
	{
		// $token    = JSession::getFormToken();
		// Get instead of post problem
		// Wrong will return to done with error message
		// JSession::checkToken() or jexit(JText::_('JINVALID_TOKEN'));

		$msg = 'AjaxErrorException';
		$ajaxAnswerObj ['AjaxIncreaseValueEcho'] = True;
		$hasError = false;

		$app = JFactory::getApplication();
		try {

			// Data from FormData
			$input = JFactory::getApplication()->input;
			$number = $input->get('strNumberXXX', 0, 'INT');

			$result = 15 / $number;
			$ajaxAnswerObj ['number'] = $result;

			// PHP raise exception

			// yyy comment all
			echo new JResponseJson($ajaxAnswerObj, $msg, $hasError);

		} catch (Exception $e) {
			// Failed Test 1
			$hasError = 1;
			echo new JResponseJson($e, $msg, $hasError);
		}

		$app->close();
	}




}


