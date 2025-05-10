/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.css';
/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

document.querySelectorAll('.pricematrix-single-pricing-table-header').forEach((el) => {
    const wave1Color = (el.dataset.wave1 || '#4b278f').replace('#', '%23');
    const wave2Color = (el.dataset.wave2 || '#ff6f61').replace('#', '%23');

    // Update ::before
    const before = document.createElement('style');
    before.innerHTML = `
    .pricematrix-single-pricing-table-header::before {
        background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 270 175' preserveAspectRatio='none'><path d='M0 0 H270 V120 Q200 150 0 90 Z' fill='${wave1Color}'/></svg>") no-repeat center / cover;
    }
    `;
    el.appendChild(before);

    // Update ::after
    const after = document.createElement('style');
    after.innerHTML = `
    .pricematrix-single-pricing-table-header::after {
        background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 270 175' preserveAspectRatio='none'><path d='M270 0 H0 V120 Q70 150 270 90 Z' fill='${wave2Color}'/></svg>") no-repeat center / cover;
    }
    `;
    el.appendChild(after);
});


registerBlockType(metadata, {
	edit: Edit,
	save: Save,
});