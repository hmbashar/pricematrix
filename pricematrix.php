<?php
/**
 * Plugin Name: PriceMatrix - Advanced Pricing Solution
 * Description: A powerful pricing matrix solution for managing complex pricing structures and calculations.
 * Version: 1.0.0
 * Author: Md Abul Bashar
 * Author URI: https://facebook.com/hmbashar
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: pricematrix
 * Domain Path: /languages
 * Requires at least: 5.8
 * Requires PHP: 8.0
 * namespace: pricematrix
 *
 * @package PriceMatrix
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

final class PriceMatrix
{
    /**
     * Singleton instance
     */
    private static $instance = null;

    /**
     * PriceMatrix constructor.
     * Defines constants, loads files, and initializes hooks.
     */
    private function __construct()
    {
        $this->define_constants();
        $this->include_files();
        $this->init_hooks();
    }

    /**
     * Get singleton instance
     *
     * @return PriceMatrix
     */
    public static function get_instance()
    {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Define plugin constants.
     */
    private function define_constants()
    {
        define('PRICEMATRIX_VERSION', '1.0.0');
        define('PRICEMATRIX_PATH', plugin_dir_path(__FILE__));
        define('PRICEMATRIX_URL', plugin_dir_url(__FILE__));
        define('PRICEMATRIX_BASENAME', plugin_basename(__FILE__));
        define('PRICEMATRIX_FILE', __FILE__);
        define('PRICEMATRIX_NAME', 'pricematrix');
    }

    /**
     * Include necessary files.
     */
    private function include_files()
    {
        if (file_exists(PRICEMATRIX_PATH . 'vendor/autoload.php')) {
            require_once PRICEMATRIX_PATH . 'vendor/autoload.php';
        }
    }

    /**
     * Initialize hooks.
     */
    private function init_hooks()
    {
        add_action('plugins_loaded', [$this, 'plugin_loaded']);
        add_action('init', [$this, 'register_textdomain']);
        register_activation_hook(PRICEMATRIX_FILE, [$this, 'activate']);
        register_deactivation_hook(PRICEMATRIX_FILE, [$this, 'deactivate']);
    }

    /**
     * Load plugin textdomain.
     */
    public function register_textdomain()
    {
        load_plugin_textdomain('pricematrix', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }

    /**
     * Called when the plugin is loaded.
     */
    public function plugin_loaded()
    {
        if (class_exists('PriceMatrix\Manager')) {
            new \PriceMatrix\Manager();
        }
    }

    /**
     * Plugin activation hook.
     */
    public function activate()
    {
        if (class_exists('PriceMatrix\Activate')) {
            \PriceMatrix\Activate::activate();
        }
    }

    /**
     * Plugin deactivation hook.
     */
    public function deactivate()
    {
        if (class_exists('PriceMatrix\Deactivate')) {
            \PriceMatrix\Deactivate::deactivate();
        }
    }
}

/**
 * Initialize the PriceMatrix plugin.
 */
if (!function_exists('pricematrix_initialize')) {
    function pricematrix_initialize()
    {
        return PriceMatrix::get_instance();
    }

    pricematrix_initialize();
}