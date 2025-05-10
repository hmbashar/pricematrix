<?php
/**
 * Manager.php
 *
 * This file contains the Manager class, which is responsible for initializing
 * the required configurations and functionalities for the PriceMatrix plugin.
 * It handles both admin and frontend initializations and ensures everything is set up properly.
 *
 * @package PriceMatrix\Inc
 * @since 1.0.0
 */

namespace PriceMatrix;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

use PriceMatrix\Admin\AdminManager;
use PriceMatrix\Frontend\Frontend;

/**
 * The Manager class for PriceMatrix.
 *
 * This class handles the initialization of PriceMatrix functionalities,
 * including admin and frontend setup.
 *
 * @package PriceMatrix\Inc
 * @since 1.0.0
 */
class Manager
{
    /**
     * Admin manager instance.
     *
     * @var AdminManager
     */
    protected $admin_manager;

    /**
     * Frontend manager instance.
     *
     * @var Frontend
     */
    protected $frontend;


    /**
     * Constructor for the Manager class.
     *
     * Initializes the PriceMatrix Manager by calling the init method.
     *
     * @since 1.0.0
     */
    public function __construct()
    {
        $this->init();
    }

    /**
     * Initialize the PriceMatrix Manager.
     *
     * Sets up admin, frontend, and Gutenberg components.
     *
     * @since 1.0.0
     */
    public function init()
    {
        $this->admin_manager = new AdminManager();
        $this->frontend = new Frontend();
    }
}