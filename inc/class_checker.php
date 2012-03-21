<?php
/**
 * Class for changes check via Last-Modified header of kabam code
 *
 * class name is in lowerclass to match table name ("common" class __construct) and file name (__autoload function)
 *
 * @author Guillaume MOULIN <gmoulin.dev@gmail.com>
 * @copyright Copyright (c) Guillaume MOULIN
 *
 * @package KOCFIA
 * @category checker
 */
class checker extends common {
	protected $_table = 'checker';

	// Constructor
	public function __construct($id = null){
		//for "common" ($this->_db & co)
		parent::__construct($id);
	}
}
?>
