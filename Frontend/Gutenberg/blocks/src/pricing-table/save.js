import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save() {
    return (
        <section {...useBlockProps.save({ className: 'pricematrix-pricing-table-area' })}>
            <div className="pricematrix-pricing-table">
                <InnerBlocks.Content />
            </div>
        </section>
    );
}