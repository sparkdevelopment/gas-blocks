<?php
/**
 * Plugin Name:       DocSlider
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Ryan Jarrett
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       docslider
 *
 * @package           gas
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function gas_docslider_block_init() {
	register_block_type( __DIR__ . '/build/docSlider' );
	register_block_type( __DIR__ . '/build/docSliderPage' );
}
add_action( 'init', 'gas_docslider_block_init' );

function gas_docslider_assets() {
	wp_enqueue_style( 'gas-docslider-block-css', plugins_url( 'node_modules/docslider/docSlider.css', __FILE__ ) );
	wp_enqueue_script( 'gas-docslider-block-js',plugins_url( 'node_modules/docslider/docSlider.min.js', __FILE__ ) );
}
add_action( 'enqueue_block_assets', 'gas_docslider_assets' );
