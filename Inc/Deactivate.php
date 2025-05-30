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

}