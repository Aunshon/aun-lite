<?php

namespace AunLite;

abstract class AbstractDataExtiontion {

	public function __construct() {
		add_filter( 'aun_get_item_extention', [ $this, 'add_item_extention_data' ] );
		add_filter( 'aun_schema_extention', [ $this, 'add_extention_schema' ] );
		add_action('demo_sites_enqueue_scripts_styles',[ $this, 'enqueue_demo_sites_scripts' ] );
		add_action('aun_save_data_after_'. $this->get_namespace(),[ $this, 'save_extention_data' ] );
	}

	abstract public function add_item_extention_data( $extentions );

	abstract public function add_extention_schema( $properties );

	abstract public function get_namespace(): string;

	abstract public function enqueue_demo_sites_scripts(): void;

	abstract public function save_extention_data( $extention_data ): void;
}
