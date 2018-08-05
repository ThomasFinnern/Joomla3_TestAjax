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

if ( !  empty ($displayData))
{
	// extract($displayData);

	if ( ! key_exists('text', $displayData))
	{
		return;
	}

	//$text = $displayData->text;  // (1)
	$text = $displayData['text']; // (2)

	echo $text;
}

