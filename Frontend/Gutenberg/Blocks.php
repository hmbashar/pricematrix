<?php
namespace PriceMatrix\Frontend\Gutenberg;

/**
 * Class Main
 *
 * Handles the loading and initialization of PriceMatrix blocks.
 *
 * @package PriceMatrix\Blocks
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class Blocks {
    /**
     * Instance of the main class.
     *
     * @var Main
     */
    private static $instance = null;

    /**
     * Get the singleton instance.
     *
     * @return Main
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Initialize the main class.
     */
    private function __construct() {
        $this->init_hooks();
        $this->include_files();
    }

    /**
     * Include necessary files.
     */
    private function include_files() {
        // Add any necessary file includes here
    }

    /**
     * Initialize WordPress hooks.
     *
     * @return void
     */
    private function init_hooks() {
        add_action('init', [$this, 'register_blocks']);  
    }

    /**
     * Register all blocks.
     */
    public function register_blocks() {
        if (function_exists('wp_register_block_types_from_metadata_collection')) {
            wp_register_block_types_from_metadata_collection(
                PRICEMATRIX_GUTENBERG_PATH . 'blocks/build',
                PRICEMATRIX_GUTENBERG_PATH . 'blocks/build/blocks-manifest.php'
            );
            return;
        }

        if (function_exists('wp_register_block_metadata_collection')) {
            wp_register_block_metadata_collection(
                PRICEMATRIX_GUTENBERG_PATH . 'blocks/build',
                PRICEMATRIX_GUTENBERG_PATH . 'blocks/build/blocks-manifest.php'
            );
        }

        $manifest_data = require PRICEMATRIX_GUTENBERG_PATH . 'blocks/build/blocks-manifest.php';
        foreach (array_keys($manifest_data) as $block_type) {
            register_block_type(PRICEMATRIX_GUTENBERG_PATH . "blocks/build/{$block_type}");
        }
    }

    /**
     * Prevent cloning of the instance.
     *
     * @return void
     */
    private function __clone() {}

    /**
     * Prevent unserializing of the instance.
     *
     * @return void
     */
    public function __wakeup() {
        throw new \Exception("Cannot unserialize singleton");
    }
}