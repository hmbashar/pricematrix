import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { columns = 3 } = attributes;

	return (
		<section {...useBlockProps.save({ className: `pricematrix-pricing-table-area pricematrix-cols-${columns}` })}>
			<div className="pricematrix-pricing-table">
				<InnerBlocks.Content />
			</div>
		</section>
	);
}