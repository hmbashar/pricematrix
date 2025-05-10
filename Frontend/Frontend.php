<?php
/**
 * Frontend.php
 *
 * This file contains the Frontend class, which is responsible for handling
 * the initialization and configuration of the PriceMatrix frontend.
 * It sets up necessary hooks, scripts, and frontend-specific functionalities.
 *
 * @package PriceMatrix\Frontend
 * @since 1.0.0
 */

namespace PriceMatrix\Frontend;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}
use PriceMatrix\Frontend\Gutenberg\Gutenberg;
/**
 * Class Frontend
 *
 * Handles the initialization and configuration of the PriceMatrix frontend.
 * This includes registering scripts, styles, and any other public-facing functionalities.
 *
 * @package PriceMatrix\Frontend
 * @since 1.0.0
 */
class Frontend
{

    /**
     * Gutenberg manager instance.
     *
     * @var Gutenberg
     */
    protected $gutenberg;
    /**
     * Frontend constructor.
     *
     * Initializes the PriceMatrix frontend.
     *
     * @since 1.0.0
     */
    public function __construct()
    {
        $this->initialize();
        $this->init_classes();
    }

    /**
     * Initialize the PriceMatrix frontend.
     *
     * Set up scripts, styles, and frontend configurations.
     *
     * @since 1.0.0
     */
    public function initialize()
    {
       

    }

    private function init_classes() {
        $this->gutenberg = Gutenberg::get_instance();
    }

 

}