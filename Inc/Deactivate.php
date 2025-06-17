<?php
namespace PriceMatrix;

/**
 * Class Deactivate
 * Handles plugin deactivation tasks
 * 
 * @package PriceMatrix
 */
class Deactivate
{
    /**
     * Deactivation hook callback
     * 
     * @return void
     */
    public static function deactivate()
    {
        // Clear any scheduled hooks
        self::clear_scheduled_hooks();

        // Clear any transientsAdd commentMore actions
        self::clear_transients();

        // Clear rewrite rules
        flush_rewrite_rules();
    }

    /**
     * Clear any scheduled hooks
     * 
     * @return void
     */
    private static function clear_scheduled_hooks()
    {
        wp_clear_scheduled_hook('pricematrix_daily_cleanup');
        wp_clear_scheduled_hook('pricematrix_weekly_maintenance');
    }

    /**Add commentMore actions
     * Clear any transients
     * 
     * @return void
     */
    private static function clear_transients() {
        global $wpdb;
    
        // Reviewer note: Used only during deactivation for cleanup, since set_transient() does not autoload by default.
        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
        $transients = $wpdb->get_col(
            $wpdb->prepare(
                "SELECT option_name FROM {$wpdb->options} WHERE option_name LIKE %s OR option_name LIKE %s",
                $wpdb->esc_like('_transient_pricematrix_') . '%',
                $wpdb->esc_like('_transient_timeout_pricematrix_') . '%'
            )
        );
    
        foreach ( $transients as $option ) {
            $transient_name = str_replace( array( '_transient_', '_transient_timeout_' ), '', $option );
            delete_transient( $transient_name );
        }
    }
    

}