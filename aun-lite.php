<?php
/**
 * Plugin Name:       Aun Lite
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       aun-lite
 *
 * @package CreateBlock
 */

use AunLite\AUN_Lite_REST_Controller;
use AunLite\AunLiteController;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

require_once __DIR__ . '/vendor/autoload.php';


function demo_sites_enqueue_scripts_styles()
{
	$demo_sites_script_assets = plugin_dir_path(__FILE__) . 'build/main.asset.php';
	// Check if we are on the Post Editor and the post type is "post".
	if (file_exists($demo_sites_script_assets)) {
		$assets = include $demo_sites_script_assets;
		wp_enqueue_script(
			'demo_sites_scripts',
			plugin_dir_url(__FILE__) . 'build/main.js',
			$assets['dependencies'],
			$assets['version'],
			true
		);

		// wp_enqueue_style(
		// 	'demo_sites_styles',
		// 	plugin_dir_url(__FILE__) . 'build/main-css.css',
		// 	array(),
		// 	$assets['version']
		// );

	}

	do_action( 'demo_sites_enqueue_scripts_styles' );
}
add_action('admin_enqueue_scripts', 'demo_sites_enqueue_scripts_styles');


/**
 * Register a custom menu page.
 */
function wpdocs_register_my_custom_menu_page(){
	add_menu_page(
		__( 'Aun Lite', 'aun-lite' ),
		__( 'Aun Lite', 'aun-lite' ),
		'manage_options',
		'custompage',
		'my_custom_menu_page'
	);


}
add_action( 'admin_menu', 'wpdocs_register_my_custom_menu_page' );

/**
 * Display a custom menu page
 */
function my_custom_menu_page(){
	echo "<div id='aun-lite'></div>";
}

// Register the controller
add_action('rest_api_init', function () {
    $controller = new AunLiteController();
    $controller->register_routes();
});
