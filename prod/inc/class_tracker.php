<?php
/**
 * Class for paiement management
 *
 * class name is in lowerclass to match table name ("common" class __construct) and file name (__autoload function)
 *
 * @author Guillaume MOULIN <gmoulin.dev@gmail.com>
 * @copyright Copyright (c) Guillaume MOULIN
 *
 * @package Payement
 * @category Payements
 */
class tracker extends common {
	protected $_table = 'tracker';

	// Constructor
	public function __construct($id = null){
		//for "common" ($this->_db & co)
		parent::__construct($id);
	}

	/**
	 * check and parse form data for add or update
	 * errors are returned with form inputs ids as (id, text, type)
	 *
	 * @return array[]
	 */
	public function checkAndPrepareFormData(){
		$formData = array();
		$errors = array();

		$args = array(
			'url'			=> FILTER_SANITIZE_STRING,
			'msg'			=> FILTER_SANITIZE_STRING,
			'line'			=> FILTER_SANITIZE_NUMBER_INT,
		);

		foreach( $args as $field => $validation ){
			if( !filter_has_var(INPUT_POST, $field) ){
				die;
			}
		}

		$formData = filter_var_array($_POST, $args);

		if( $formData['url'] === false || $formData['msg'] === false || $formData['line'] === false ) die;

		foreach( self::$_fields[$this->_table] as $k => $v ){
			if( isset($formData[$v]) ) $this->_data[$v] = $formData[$v];
		}
	}
}
?>
