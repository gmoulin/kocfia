<?php
/**
 * class for database interractions shared functions
 *
 * class name is in lowerclass to match table name ("common" class __construct) and file name (__autoload function)
 *
 * @author Guillaume MOULIN <gmoulin.pro@gmail.com>
 * @copyright Copyright (c) Guillaume MOULIN
 *
 * @package Common
 * @category Common
 */
class common {
	/**
	 * @var object Contains the database connexion handler
	 */
	protected $_db;

	/**
	 * @var string Contains the table name
	 */
	protected $_table;

	/**
	 * @var array that contains the object 'properties'
	 */
	protected $_data = array();

	/**
	 * @var array Array that contains the fields of the table
	 */
	protected static $_fields = array();

	/**
	 * @var array Array that contains the default values
	 */
	protected static $_defvalues = array();


	/**
	 * @require _table: the table name
	 * @param integer $id: identifier
	 */
	public function __construct( $id = null ){
		try {
			//load the names of the fields of the table
			//but only if they're not already loaded

			if( is_null($this->_table) ) throw new Exception('Variable _table cannot be null');

			if( !isset(self::$_fields[$this->_table]) || empty(self::$_fields[$this->_table]) ){
				$this->getColumns();
			}

			$this->_db = init::getInstance()->dbh();

			//initialize the members to their default values
			foreach( self::$_fields[$this->_table] as $key=>$val ){
				$this->_data[$val] = self::$_defvalues[$this->_table][$val];
			}

			if( !empty($id) ){
				$this->load($id);
			}

		} catch ( PDOException $e ){
			erreur_pdo( $e, get_class( $this ), __FUNCTION__ );
		}
	}

	/*
	 * close the connection when the class is garbaged
	 */
	public function __destruct(){
		$this->_db = null;
	}

	/**
	 * fill the table fields into $_fields for the class defined $_table
	 */
	protected function getColumns(){
		try {
			$_db = init::getInstance()->dbh();

			$res = $_db->prepare("SHOW FIELDS FROM ".$this->_table);

			$res->execute();

			while( $r = $res->fetch() ){

				self::$_fields[$this->_table][] = $r['Field'];

				//get the type
				if( strpos($r['Type'], '(') !== false ){
					$type = substr($r['Type'], 0, strpos($r['Type'],'('));
				} else {
					$type = $r['Type'];
				}

				//inizialize the default value
				if( !empty($r['Default']) ){
					self::$_defvalues[$this->_table][ $r['Field'] ] = $r['Default'];

				} elseif( $r['Null'] == 'YES' ){
					self::$_defvalues[$this->_table][ $r['Field'] ] = null;

				} else {
					switch( strtoupper($type) ){
						//numeric
						case "BIT":
						case "TINYINT":
						case "BOOL":
						case "BOOLEAN":
						case "SMALLINT":
						case "MEDIUMINT":
						case "INT":
						case "INTEGER":
						case "BIGINT":
						case "FLOAT":
						case "DOUBLE":
						case "DECIMAL":
						case "DEC":
								self::$_defvalues[$this->_table][ $r['Field'] ] = 0;
							break;

						//string
						case "CHAR":
						case "VARCHAR":
						case "BINARY":
						case "VARBINARY":
						case "TINYBLOB":
						case "TINYTEXT":
						case "BLOB":
						case "TEXT":
						case "MEDIUMBLOB":
						case "MEDIUMTEXT":
						case "LONGBLOB":
						case "LONGTEXT":
						case "ENUM":
						case "SET":
								self::$_defvalues[$this->_table][ $r['Field'] ] = '';
							break;

						//date
						case "DATE":
								self::$_defvalues[$this->_table][ $r['Field'] ] = '0000-00-00';
							break;
						case "DATETIME":
								self::$_defvalues[$this->_table][ $r['Field'] ] = '0000-00-00 00:00:00';
							break;
						case "TIMESTAMP":
								self::$_defvalues[$this->_table][ $r['Field'] ] = '0000-00-00 00:00:00';
							break;
						case "TIME":
								self::$_defvalues[$this->_table][ $r['Field'] ] = '00:00:00';
							break;
						case "YEAR":
								self::$_defvalues[$this->_table][ $r['Field'] ] = '0000';
							break;

						default:
								throw new Exception('unknow column type');
							break;
					}
				}
			}

		} catch ( PDOException $e ){
			erreur_pdo( $e, get_class( $this ), __FUNCTION__ );
		}
	}

	/**
	 * return the instance data array
	 */
	public function getData() {
		return $this->_data;
	}

	/**
	 * __get() is automatically called from PHP when one refers to a member of the class wich is not defined.
	 * @param string $k: name of the member
	 */
	public function __get($k) {
		if( isset($this->_data[$k]) ){
			return $this->_data[$k];
		}
	}

	/**
	 * __set() is automatically called from PHP when one refers to a member of the class wich is not defined.
	 * @param string $k: name of the member
	 * @param string $v: value of the member
	 */
	public function __set($k, $v) {
		$this->_data[$k] = $v;
	}

	/**
	 * load data from the database
	 * @param integer $id: identifier of the record in the table
	 */
	public function load( $id ){
		try {
			if( empty($id) ){
				throw Exception('Can not load '.$this->_table.' entry, no id given.');
			}

			$res = $this->_db->prepare("
				SELECT t.* FROM ".$this->_table." t WHERE id = :id
			");

			$res->execute( array(':id' => $id) );

			$entry = $res->fetch();
			if( !empty($entry) ){
				foreach( self::$_fields[$this->_table] as $v ){
					$this->_data[$v] = $entry[$v];
				}
			}

		} catch ( PDOException $e ){
			erreur_pdo( $e, get_class( $this ), __FUNCTION__ );
		}
	}

	/**
	 * save data in the database
	 * insert for id = 0, else update
	 */
	public function save(){
		try {
			$params = array();

			//insert
			if( empty($this->_data['id']) ){
				$action = 'add';

				//build the insert starting from self::$fields
				$fields = array();
				$values = array();

				foreach( self::$_fields[$this->_table] as $key ){
					if( $key != 'id' ){
						$fields[] = $key;

						if( isset($this->_data[$key]) && !is_null($this->_data[$key]) ){
							$values[] = ':'.$key;
							$params[':'.$key] = $this->_data[$key];
						} else {
							$values[] = 'NULL';
						}
					}
				}

				$fields = implode(', ', $fields);
				$values = implode(', ', $values);
				$sql = "INSERT INTO ".$this->_table." (".$fields.") VALUES (".$values.")";

			//update
			} else {
				$action = 'update';

				//build the update starting from self::$fields
				$where = '';
				$field_value = '';

				foreach( self::$_fields[$this->_table] as $key ){
					if( $key == 'id' ){
						$where = ' '.$key.' = :id';
						$params[':id'] = $this->_data[$key];

					} elseif( isset($this->_data[$key]) and !is_null($this->_data[$key]) ){
						$field_value .= ' '.$key.' = :'.$key.',';
						$params[':'.$key] = $this->_data[$key];

					} else {
						$field_value .= ' '.$key.' = NULL,';
					}
				}
				$field_value = substr($field_value, 0, -1);
				$sql = "UPDATE ".$this->_table." SET ".$field_value." WHERE ".$where;
			}

			$q = $this->_db->prepare($sql);

			$q->execute($params);

			if( empty($this->_data['id']) ){
				$this->_data['id'] = $this->_db->lastInsertId();
			}

			return true;

		} catch ( PDOException $e ){
			erreur_pdo( $e, get_class( $this ), __FUNCTION__ );
		}
	}
}
?>
