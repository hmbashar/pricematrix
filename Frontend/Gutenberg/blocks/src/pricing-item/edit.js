import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText,
	URLInput,
	InspectorControls,
	PanelColorSettings,
} from "@wordpress/block-editor";
import { PanelBody, Button, Icon, SelectControl } from "@wordpress/components";
import { trash, check, close } from "@wordpress/icons";

export default function Edit({ attributes, setAttributes }) {
	const {
		title,
		subtitle,
		price,
		per,
		features = [],
		buttonText,
		buttonUrl,
		waveColor1,
		waveColor2,
	} = attributes;

	const addFeature = () => {
		const newFeatures = [...features, { text: "", icon: "" }];
		setAttributes({ features: newFeatures });
	};

	const removeFeature = (index) => {
		const newFeatures = [...features];
		newFeatures.splice(index, 1);
		setAttributes({ features: newFeatures });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Wave Colors", "pricematrix")} initialOpen={false}>
					<PanelColorSettings
						title={__("Right Wave Color", "pricematrix")}
						colorSettings={[
							{
								value: waveColor1,
								onChange: (value) => setAttributes({ waveColor1: value }),
								label: __("Right Wave Color", "pricematrix"),
							},
						]}
					/>
					<PanelColorSettings
						title={__("Left Wave Color", "pricematrix")}
						colorSettings={[
							{
								value: waveColor2,
								onChange: (value) => setAttributes({ waveColor2: value }),
								label: __("Left Wave Color", "pricematrix"),
							},
						]}
					/>
				</PanelBody>
			</InspectorControls>

			<div
				{...useBlockProps({ className: "pricematrix-single-pricing-table" })}
			>
				<div className="pricematrix-single-pricing-table-header">
					<RichText
						tagName="h2"
						value={title}
						onChange={(value) => setAttributes({ title: value })}
						placeholder={__("Title", "pricematrix")}
					/>
					<RichText
						tagName="h3"
						value={subtitle}
						onChange={(value) => setAttributes({ subtitle: value })}
						placeholder={__("Subtitle", "pricematrix")}
					/>

					{/* Wave 1 */}
					<svg
						className="pricematrix-wave pricematrix-wave-1"
						viewBox="0 0 270 175"
						preserveAspectRatio="none"
					>
						<path
							d="M0 0 H270 V120 Q200 150 0 90 Z"
							fill={waveColor1 || "#6D4AB0"}
						/>
					</svg>

					{/* Wave 2 */}
					<svg
						className="pricematrix-wave pricematrix-wave-2"
						viewBox="0 0 270 175"
						preserveAspectRatio="none"
					>
						<path
							d="M270 0 H0 V120 Q70 150 270 90 Z"
							fill={waveColor2 || "#4b278f"}
						/>
					</svg>
				</div>

				<div className="pricematrix-single-pricing-price">
					<RichText
						tagName="h2"
						value={price}
						onChange={(value) => setAttributes({ price: value })}
						placeholder={__("Price", "pricematrix")}
					/>
					<RichText
						tagName="span"
						value={per}
						onChange={(value) => setAttributes({ per: value })}
						placeholder={__("/month", "pricematrix")}
					/>
				</div>

				<div className="pricematrix-single-pricing-content">
					{features.map((feature, index) => (
						<div
							key={index}
							className="pricematrix-feature-item"
							style={{
								display: "flex",
								alignItems: "center",
								gap: "8px",
								justifyContent: "space-between",
								marginBottom: "10px",
							}}
						>
							<div
								style={{
									flex: 1,
									display: "flex",
									alignItems: "center",
									gap: "8px",
								}}
							>
								<SelectControl
									value={feature.icon}
									options={[
										{ label: __("icon", "pricematrix"), value: "" },
                                        { label: "(✓)", value: "check" },
                                        { label: "(×)", value: "close" },
									]}
									onChange={(value) => {
										const newFeatures = [...features];
										newFeatures[index].icon = value;
										setAttributes({ features: newFeatures });
									}}
								/>

								{feature.icon === "check" && <Icon icon={check} />}
								{feature.icon === "close" && <Icon icon={close} />}

								<RichText
									tagName="p"
									className="pricematrix-feature-text"
									value={feature.text}
									onChange={(value) => {
										const newFeatures = [...features];
										newFeatures[index].text = value;
										setAttributes({ features: newFeatures });
									}}
									placeholder={__("Feature", "pricematrix")}
								/>
							</div>
							<Button
								isDestructive
								onClick={() => removeFeature(index)}
								icon={trash}
								label={__("Remove", "pricematrix")}
							/>
						</div>
					))}

					<Button
						isPrimary
						onClick={addFeature}
						icon="plus"
						style={{ marginTop: "15px" }}
						className="pricematrix-add-feature-btn"
					>
						{__("Add Feature", "pricematrix")}
					</Button>
				</div>

				<div className="pricematrix-single-pricing-buy">
					<RichText
						tagName="a"
						value={buttonText}
						onChange={(value) => setAttributes({ buttonText: value })}
						placeholder={__("Buy Now", "pricematrix")}
					/>
					<URLInput
						value={buttonUrl}
						onChange={(value) => setAttributes({ buttonUrl: value })}
					/>
				</div>
			</div>
		</>
	);
}
