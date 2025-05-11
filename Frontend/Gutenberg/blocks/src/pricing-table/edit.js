import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const { columns = 3 } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__("Layout Settings", "pricematrix")}
					initialOpen={true}
				>
					<SelectControl
						label={__("Number of Columns", "pricematrix")}
						value={columns}
						options={[
							{ label: "1 Column", value: 1 },
							{ label: "2 Columns", value: 2 },
							{ label: "3 Columns", value: 3 },
							{ label: "4 Columns", value: 4 },
						]}
						onChange={(value) =>
							setAttributes({ columns: parseInt(value, 10) })
						}
					/>
				</PanelBody>
			</InspectorControls>

			<section
				{...useBlockProps({ className: "pricematrix-pricing-table-area" , style: { maxWidth: "1000px" }})}
			>
				<div className="pricematrix-pricing-table">
					<div className={`pricematrix-editor-grid pricematrix-editor-cols-${columns}`}>
						<InnerBlocks
							allowedBlocks={["pricematrix/pricing-item"]}
							template={[["pricematrix/pricing-item"]]}
							templateLock={false}
						/>
					</div>
				</div>
			</section>
		</>
	);
}
