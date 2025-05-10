<?php
namespace PriceMatrix\Frontend\Gutenberg;

/**
 * Class Gutenberg
 * Handles Gutenberg blocks registration and assets
 *
 * @package PriceMatrix\Gutenberg
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

use PriceMatrix\Frontend\Gutenberg\Blocks;

class Gutenberg {

    private $blocks;

    /**
     * Instance of the Gutenberg class.
     *
     * @var Gutenberg
     */
    private static $instance = null;

    /**
     * Get singleton instance.
     *
     * @return Gutenberg
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Gutenberg constructor.
     * Initialize the Gutenberg class.
     */
    private function __construct() {
        $this->define_constants();
        $this->init_classes();
    }

    /**
     * Define plugin constants.
     */
    private function define_constants() {
        define('PRICEMATRIX_GUTENBERG_PATH', plugin_dir_path(__FILE__));
        define('PRICEMATRIX_GUTENBERG_URL', plugin_dir_url(__FILE__));
        define('PRICEMATRIX_GUTENBERG_VERSION', PRICEMATRIX_VERSION);
        define('PRICEMATRIX_GUTENBERG_ASSETS', PRICEMATRIX_URL . 'Gutenberg/assets/');
    }

    /**
     * Initialize WordPress hooks.
     *
     * @return void
     */
    private function init_classes() {
        $this->blocks = Blocks::get_instance();
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