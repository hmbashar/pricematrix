import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText,
	URLInput,
	InspectorControls,
	PanelColorSettings,
	__experimentalUnitControl as UnitControl,
} from "@wordpress/block-editor";
import {
	PanelBody,
	RangeControl,
	SelectControl,
	Button,
	BoxControl,
	Icon,
	TextControl,
} from "@wordpress/components";
import { plus, trash, check, close } from "@wordpress/icons";
import { useEffect } from "@wordpress/element";
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4

const FONT_OPTIONS = [
	{ label: "Default", value: "" },
	{ label: "Arial", value: "Arial, sans-serif" },
	{ label: "Georgia", value: "Georgia, serif" },
	{ label: "Poppins", value: "Poppins, sans-serif" },
	{ label: "Monospace", value: "monospace" },
];


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
		boxPadding,
		titleFontSize,
		titleFontFamily,
		titleColor,
		subtitleFontSize,
		subtitleFontFamily,
		subtitleColor,
		priceFontSize,
		priceFontFamily,
		priceColor,
		perFontSize,
		perColor,
		featureIconSize,
		featureTextColor,
		featureFontSize,
		featureFontFamily,
		featureGap,
		featureIconColor,
		featureAlignment,
		buttonWidth,
		buttonColor,
		buttonBg,
		buttonRadius,
		buttonHoverColor,
		buttonHoverBg,
        uniqueId,
	} = attributes;

	const addFeature = () => {
		setAttributes({ features: [...features, { text: "", icon: "" }] });
	};

	const removeFeature = (index) => {
		const updated = [...features];
		updated.splice(index, 1);
		setAttributes({ features: updated });
	};

    useEffect(() => {
        if (!attributes.uniqueId) {
            setAttributes({ uniqueId: `pricematrix-${uuidv4().slice(0, 8)}` });
        }
    }, []);

    const buttonClass = attributes.uniqueId;

	const blockProps = useBlockProps({
		className: "pricematrix-single-pricing-table",
		style: {
			padding: `${boxPadding?.top || 0}px ${boxPadding?.right || 0}px ${
				boxPadding?.bottom || 0
			}px ${boxPadding?.left || 0}px`,
		},
	});

	const uniqueClass = `pricematrix-button-${
		attributes.clientId || Math.random().toString(36).substr(2, 8)
	}`;

	return (
		<>
			<InspectorControls group="styles">
				<PanelBody title={__("Box Styling", "pricematrix")}>
					<BoxControl
						label={__("Padding", "pricematrix")}
						values={boxPadding}
						onChange={(value) => setAttributes({ boxPadding: value })}
					/>
				</PanelBody>

				<PanelBody
					title={__("Header Styling", "pricematrix")}
					initialOpen={false}
				>
					<PanelColorSettings
						title={__("Wave Colors", "pricematrix")}
						colorSettings={[
							{
								value: waveColor1,
								onChange: (v) => setAttributes({ waveColor1: v }),
								label: __("Right Wave"),
							},
							{
								value: waveColor2,
								onChange: (v) => setAttributes({ waveColor2: v }),
								label: __("Left Wave"),
							},
						]}
					/>
					<PanelColorSettings
						title={__("Title and Subtitle Colors", "pricematrix")}
						colorSettings={[
							{
								value: titleColor,
								onChange: (v) => setAttributes({ titleColor: v }),
								label: __("Title Color"),
							},
							{
								value: subtitleColor,
								onChange: (v) => setAttributes({ subtitleColor: v }),
								label: __("Subtitle Color"),
							},
						]}
					/>
					<RangeControl
						label={__("Title Font Size")}
						value={titleFontSize}
						onChange={(v) => setAttributes({ titleFontSize: v })}
						min={12}
						max={48}
					/>
					<SelectControl
						label={__("Title Font Family")}
						value={titleFontFamily}
						options={FONT_OPTIONS}
						onChange={(v) => setAttributes({ titleFontFamily: v })}
					/>
					<RangeControl
						label={__("Subtitle Font Size")}
						value={subtitleFontSize}
						onChange={(v) => setAttributes({ subtitleFontSize: v })}
						min={10}
						max={40}
					/>
					<SelectControl
						label={__("Subtitle Font Family")}
						value={subtitleFontFamily}
						options={FONT_OPTIONS}
						onChange={(v) => setAttributes({ subtitleFontFamily: v })}
					/>
				</PanelBody>

				<PanelBody
					title={__("Pricing Styling", "pricematrix")}
					initialOpen={false}
				>
					<RangeControl
						label={__("Price Font Size")}
						value={priceFontSize}
						onChange={(v) => setAttributes({ priceFontSize: v })}
						min={12}
						max={48}
					/>
					<SelectControl
						label={__("Price Font Family")}
						value={priceFontFamily}
						options={FONT_OPTIONS}
						onChange={(v) => setAttributes({ priceFontFamily: v })}
					/>
					<PanelColorSettings
						title={__("Price Color")}
						colorSettings={[
							{
								value: priceColor,
								onChange: (v) => setAttributes({ priceColor: v }),
								label: __("Price Color"),
							},
						]}
					/>
					<RangeControl
						label={__("Per Label Font Size")}
						value={perFontSize}
						onChange={(v) => setAttributes({ perFontSize: v })}
						min={10}
						max={30}
					/>
					<PanelColorSettings
						title={__("Per Label Color")}
						colorSettings={[
							{
								value: perColor,
								onChange: (v) => setAttributes({ perColor: v }),
								label: __("Per Color"),
							},
						]}
					/>
				</PanelBody>

				<PanelBody
					title={__("Features Styling", "pricematrix")}
					initialOpen={false}
				>
					<RangeControl
						label={__("Icon Size")}
						value={featureIconSize}
						onChange={(v) => setAttributes({ featureIconSize: v })}
						min={12}
						max={32}
					/>
					<RangeControl
						label={__("Gap Between Items")}
						value={featureGap}
						onChange={(v) => setAttributes({ featureGap: v })}
						min={0}
						max={32}
					/>
					<RangeControl
						label={__("Feature Font Size")}
						value={featureFontSize}
						onChange={(v) => setAttributes({ featureFontSize: v })}
						min={10}
						max={30}
					/>
					<SelectControl
						label={__("Feature Font Family")}
						value={featureFontFamily}
						options={FONT_OPTIONS}
						onChange={(v) => setAttributes({ featureFontFamily: v })}
					/>
					<PanelColorSettings
						title={__("Feature Color")}
						colorSettings={[
							{
								value: featureTextColor,
								onChange: (v) => setAttributes({ featureTextColor: v }),
								label: __("Text Color"),
							},
							{
								value: featureIconColor,
								onChange: (v) => setAttributes({ featureIconColor: v }),
								label: __("Icon Color"),
							},
						]}
					/>
					<SelectControl
						label={__("Feature Alignment", "pricematrix")}
						value={featureAlignment}
						onChange={(value) => setAttributes({ featureAlignment: value })}
						options={[
							{ label: __("Left", "pricematrix"), value: "flex-start" },
							{ label: __("Center", "pricematrix"), value: "center" },
							{ label: __("Right", "pricematrix"), value: "flex-end" },
						]}
					/>
				</PanelBody>
				<PanelBody
					title={__("Button Styling", "pricematrix")}
					initialOpen={false}
				>
					<UnitControl
						label={__("Button Width", "pricematrix")}
						onChange={(value) => setAttributes({ buttonWidth: value })}
						value={buttonWidth}
						units={["px", "%"]}
					/>
					<PanelColorSettings
						title={__("Colors", "pricematrix")}
						colorSettings={[
							{
								value: buttonColor,
								onChange: (value) => setAttributes({ buttonColor: value }),
								label: __("Text Color", "pricematrix"),
							},
							{
								value: buttonBg,
								onChange: (value) => setAttributes({ buttonBg: value }),
								label: __("Background Color", "pricematrix"),
							},
							{
								value: buttonHoverColor,
								onChange: (value) => setAttributes({ buttonHoverColor: value }),
								label: __("Hover Text Color", "pricematrix"),
							},
							{
								value: buttonHoverBg,
								onChange: (value) => setAttributes({ buttonHoverBg: value }),
								label: __("Hover Background", "pricematrix"),
							},
						]}
					/>
					<RangeControl
						label={__("Border Radius (px)", "pricematrix")}
						value={parseInt(buttonRadius)}
						onChange={(value) => setAttributes({ buttonRadius: `${value}px` })}
						min={0}
						max={50}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="pricematrix-single-pricing-table-header">
					<RichText
						tagName="h2"
						value={title}
						onChange={(v) => setAttributes({ title: v })}
						placeholder={__("Title")}
						style={{
							fontSize: titleFontSize,
							fontFamily: titleFontFamily,
							color: titleColor,
						}}
					/>
					<RichText
						tagName="h3"
						value={subtitle}
						onChange={(v) => setAttributes({ subtitle: v })}
						placeholder={__("Subtitle")}
						style={{
							fontSize: subtitleFontSize,
							fontFamily: subtitleFontFamily,
							color: subtitleColor,
						}}
					/>

					<svg
						className="pricematrix-wave pricematrix-wave-1"
						viewBox="0 0 270 175"
					>
						<path d="M0 0 H270 V120 Q200 150 0 90 Z" fill={waveColor1} />
					</svg>
					<svg
						className="pricematrix-wave pricematrix-wave-2"
						viewBox="0 0 270 175"
					>
						<path d="M270 0 H0 V120 Q70 150 270 90 Z" fill={waveColor2} />
					</svg>
				</div>

				<div className="pricematrix-single-pricing-price">
					<RichText
						tagName="h2"
						value={price}
						onChange={(v) => setAttributes({ price: v })}
						placeholder={__("Price")}
						style={{
							fontSize: priceFontSize,
							fontFamily: priceFontFamily,
							color: priceColor,
						}}
					/>
					<RichText
						tagName="span"
						value={per}
						onChange={(v) => setAttributes({ per: v })}
						placeholder={__("/month")}
						style={{ fontSize: perFontSize, color: perColor }}
					/>
				</div>

				<div
					className="pricematrix-single-pricing-content"
					style={{
						gap: `${featureGap || 10}px`,
						alignItems: featureAlignment,
					}}
				>
					{features.map((feature, index) => (
						<div
							key={index}
							className="pricematrix-feature-item"
							style={{
								display: "flex",
								alignItems: "center",
								gap: "5px",
							}}
						>
							<SelectControl
								value={feature.icon}
								options={[
									{ label: "icon", value: "" },
									{ label: "(✓)", value: "check" },
									{ label: "(×)", value: "close" },
								]}
								onChange={(v) => {
									const updated = [...features];
									updated[index].icon = v;
									setAttributes({ features: updated });
								}}
							/>
							{feature.icon === "check" && (
								<Icon
									icon={check}
									style={{
										width: featureIconSize,
										height: featureIconSize,
										color: featureIconColor,
										fill: featureIconColor,
									}}
								/>
							)}
							{feature.icon === "close" && (
								<Icon
									icon={close}
									style={{
										width: featureIconSize,
										height: featureIconSize,
										color: featureIconColor,
										fill: featureIconColor,
									}}
								/>
							)}

							<RichText
								tagName="p"
								value={feature.text}
								onChange={(v) => {
									const updated = [...features];
									updated[index].text = v;
									setAttributes({ features: updated });
								}}
								placeholder={__("Feature")}
								style={{
									fontSize: featureFontSize,
									fontFamily: featureFontFamily,
									color: featureTextColor,
								}}
							/>
							<Button
								icon={trash}
								isDestructive
								onClick={() => removeFeature(index)}
							/>
						</div>
					))}
					<Button
						isPrimary
						onClick={addFeature}
						icon={<Icon icon={plus} />}
						className="pricematrix-add-feature-btn"
					>
						{__("Add Feature", "pricematrix")}
					</Button>
				</div>

				<div className="pricematrix-single-pricing-buy">
					<RichText
						tagName="a"
						value={buttonText}
						onChange={(v) => setAttributes({ buttonText: v })}
						placeholder={__("Buy Now")}
						style={{
							display: "inline-block",
							width: buttonWidth || "auto",
							backgroundColor: buttonBg,
							color: buttonColor,
							borderRadius: buttonRadius,
							transition: "all 0.3s ease",
						}}
						className={`pricematrix-pricing-button ${buttonClass}`}
					/>

                    {(buttonHoverColor || buttonHoverBg) && (
                        <style>{`
                            .${buttonClass}:hover {
                                ${buttonHoverColor ? `color: ${buttonHoverColor} !important;` : ""}
                                ${buttonHoverBg ? `background-color: ${buttonHoverBg} !important;` : ""}
                            }
                        `}</style>
                    )}
					<URLInput
						value={buttonUrl}
						onChange={(v) => setAttributes({ buttonUrl: v })}
					/>
				</div>
			</div>
		</>
	);
}
