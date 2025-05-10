<?php
namespace PriceMatrix;

/**
 * Class Deactivate
 * Handles plugin deactivation tasks
 * 
 * @package PriceMatrix
 */
class Deactivate {
    /**
     * Deactivation hook callback
     * 
     * @return void
     */
    public static function deactivate() {
        // Clear any scheduled hooks
        self::clear_scheduled_hooks();
        
        // Clear any transients
        self::clear_transients();
        
        // Clear rewrite rules
        flush_rewrite_rules();
    }
    
    /**
     * Clear any scheduled hooks
     * 
     * @return void
     */
    private static function clear_scheduled_hooks() {
        wp_clear_scheduled_hook('pricematrix_daily_cleanup');
        wp_clear_scheduled_hook('pricematrix_weekly_maintenance');
    }
    
    /**
     * Clear any transients
     * 
     * @return void
     */
    private static function clear_transients() {
        global $wpdb;
        
        $wpdb->query(
            $wpdb->prepare(
                "DELETE FROM {$wpdb->options} WHERE option_name LIKE %s OR option_name LIKE %s",
                $wpdb->esc_like('_transient_pricematrix_') . '%',
                $wpdb->esc_like('_transient_timeout_pricematrix_') . '%'
            )
        );
    }
}