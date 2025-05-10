<?php
namespace PriceMatrix;

/**
 * Class Activate
 * Handles plugin activation tasks
 * 
 * @package PriceMatrix
 */
class Activate {
    /**
     * Activation hook callback
     * 
     * @return void
     */
    public static function activate() {
        // Create necessary database tables if needed
        self::create_tables();
        
        // Set default options
        self::set_default_options();
        
        // Clear permalinks
        flush_rewrite_rules();
    }
    
    /**
     * Create necessary database tables
     * 
     * @return void
     */
    private static function create_tables() {
        global $wpdb;
        
        $charset_collate = $wpdb->get_charset_collate();
        
        // Example table creation
        $sql = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}pricematrix_prices (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            product_id bigint(20) NOT NULL,
            matrix_data longtext NOT NULL,
            created_at datetime NOT NULL,
            updated_at datetime NOT NULL,
            PRIMARY KEY  (id),
            KEY product_id (product_id)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
    
    /**
     * Set default plugin options
     * 
     * @return void
     */
    private static function set_default_options() {
        $default_options = [
            'version' => PRICEMATRIX_VERSION,
            'matrix_type' => 'basic',
            'currency' => 'USD',
            'decimal_points' => 2,
            'thousand_separator' => ',',
            'decimal_separator' => '.'
        ];
        
        foreach ($default_options as $option => $value) {
            if (false === get_option("pricematrix_{$option}")) {
                add_option("pricematrix_{$option}", $value);
            }
        }
    }
}