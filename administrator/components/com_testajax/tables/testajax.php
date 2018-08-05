<?php
/**
 * @package    TestAjax
 *
 * @author     Thomas Finnern <TestAjax@tomfinnern.de>
 * @copyright  (c) 2018 Thomas Finnern
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 * @link       https://github.com/ThomasFinnern
 */

use Joomla\CMS\Table\Table;

defined('_JEXEC') or die;

/**
 * TestAjax table.
 *
 * @since       1.0
 */
class TableTestAjax extends Table
{
	/**
	 * Constructor
	 *
	 * @param   JDatabaseDriver  $db  Database driver object.
	 *
	 * @since   1.0
	 */
	public function __construct(JDatabaseDriver $db)
	{
		parent::__construct('#__testajax_items', 'item_id', $db);
	}
}
