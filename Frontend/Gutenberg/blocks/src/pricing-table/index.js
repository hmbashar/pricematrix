/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * The code used gets applied both to the front of your site and to the editor.
 */
import './style.css';

import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import metadata from './block.json';


registerBlockType(metadata, {
	edit: Edit,
	save: Save,
});