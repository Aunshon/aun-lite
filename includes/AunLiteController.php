<?php
namespace AunLite;

use WP_REST_Server;
use WP_REST_Response;

class AunLiteController extends \WP_REST_Controller {

    public function __construct() {
        $this->namespace = 'aun-lite/v1';
        $this->rest_base = 'data';
    }

    public function register_routes() {
        register_rest_route($this->namespace, '/' . $this->rest_base, array(
            array(
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => array($this, 'create_item'),
                'permission_callback' => array($this, 'create_item_permissions_check'),
                'args'                => $this->get_endpoint_args_for_item_schema(WP_REST_Server::CREATABLE),
            ),
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array($this, 'get_items'),
                'permission_callback' => array($this, 'get_items_permissions_check'),
            ),
        ));
    }

    public function create_item($request) {
        $name = sanitize_text_field($request['name']);
        $age = intval($request['age']);
		$extentions = $request['extentions'] ?? [];

        $current_data = get_option('aun_lite_data', array());
		$current_item = apply_filters( 'aun_save_data_before', array('name' => $name, 'age' => $age), $request );

        $current_data = $current_item;

        update_option('aun_lite_data', $current_data);

		foreach ( $extentions as $namespace => $extention ) {
			do_action( 'aun_save_data_after_'. $namespace, $extention );
		}

	    do_action( 'aun_save_data_after', $request );

	    return new WP_REST_Response(array('message' => 'Data saved successfully', 'data' => $current_data), 200);
    }

    public function get_items($request) {
        $data = get_option('aun_lite_data', array());

        // Apply filter to the data
        $filtered_data = apply_filters('aun_lite_data_array', $data);
	    $filtered_data['extentions'] = apply_filters( 'aun_get_item_extention', [] );

        return new WP_REST_Response($filtered_data, 200);
    }

    public function create_item_permissions_check($request) {
        return true;
    }

    public function get_items_permissions_check($request) {
        return true;
    }

    public function get_item_schema() {
        if ($this->schema) {
            return $this->schema;
        }

        $rest_scmema = apply_filters(
            'aun_lite_schema',
            array(
                'name' => array(
                    'description' => esc_html__('Name of the person.', 'your-text-domain'),
                    'type'        => 'string',
                    'required'    => true,
                ),
                'age'  => array(
                    'description' => esc_html__('Age of the person.', 'your-text-domain'),
                    'type'        => 'integer',
                    'required'    => true,
                ),
                'extentions'  => array(
                    'description' => esc_html__('Extentions', 'your-text-domain'),
                    'type'        => 'object',
                    'properties'  => apply_filters( 'aun_schema_extention', [] ),
                ),
            )
         );

        $this->schema = array(
            '$schema'    => 'http://json-schema.org/draft-04/schema#',
            'title'      => 'aun_lite_data',
            'type'       => 'object',
            'properties' => $rest_scmema,
        );

        return $this->schema;
    }
}
