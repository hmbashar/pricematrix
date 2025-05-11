import { useBlockProps, RichText } from "@wordpress/block-editor";
import { Icon, check, close } from "@wordpress/icons";

export default function save({ attributes }) {
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
		titleFontSize,
		titleFontFamily,
		titleColor,
		subtitleFontSize,
		subtitleFontFamily,
		subtitleColor,
		boxPadding,
		boxBorder,
		boxShadow,
		buttonBg,
		buttonColor,
		buttonRadius,
		buttonWidth,
		buttonHoverColor,
		buttonHoverBg,
		uniqueId,
	} = attributes;

	return (
		<div
			{...useBlockProps.save({
				className: "pricematrix-single-pricing-table",
				style: {
					padding: `${boxPadding?.top || 0} ${boxPadding?.right || 0} ${
						boxPadding?.bottom || 0
					} ${boxPadding?.left || 0}`,
					border: boxBorder?.width
						? `${boxBorder.width} ${boxBorder.style} ${boxBorder.color}`
						: undefined,
					boxShadow: boxShadow || undefined,
				},
			})}
		>
			<div className="pricematrix-single-pricing-table-header">
				<RichText.Content
					tagName="h2"
					value={title}
					style={{
						...(titleFontSize && { fontSize: titleFontSize }),
						...(titleFontFamily && { fontFamily: titleFontFamily }),
						...(titleColor && { color: titleColor }),
					}}
				/>
				{subtitle && (
					<RichText.Content
						tagName="h3"
						value={subtitle}
						style={{
							fontSize: subtitleFontSize,
							fontFamily: subtitleFontFamily,
							color: subtitleColor,
						}}
					/>
				)}

				{/* Wave SVGs */}
				<svg
					className="pricematrix-wave pricematrix-wave-1"
					viewBox="0 0 270 175"
					preserveAspectRatio="none"
				>
					<path
						d="M0 0 H270 V120 Q200 150 0 90 Z"
						fill={waveColor1 || "#b381e3"}
					/>
				</svg>
				<svg
					className="pricematrix-wave pricematrix-wave-2"
					viewBox="0 0 270 175"
					preserveAspectRatio="none"
				>
					<path
						d="M270 0 H0 V120 Q70 150 270 90 Z"
						fill={waveColor2 || "#9b51e0"}
					/>
				</svg>
			</div>

			<div className="pricematrix-single-pricing-price">
				<h2>
					<RichText.Content value={price} />
					{per && <span style={{ fontSize: "14px" }}>{per}</span>}
				</h2>
			</div>

			<div className="pricematrix-single-pricing-content">
				{features.map((feature, index) => (
					<div
						className="pricematrix-feature-item"
						key={index}
						style={{
							display: "flex",
							alignItems: "center",
							gap: "8px",
							marginBottom: "10px",
						}}
					>
						{feature.icon === "check" && (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="24"
								height="24"
							>
								<path d="M16.7 7.1l-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 8z"></path>
							</svg>
						)}
						{feature.icon === "close" && <Icon icon={close} />}
						<p className="pricematrix-feature-text">{feature.text}</p>
					</div>
				))}
			</div>

			<div className="pricematrix-single-pricing-buy">
				{buttonText && (
					<a
						href={buttonUrl}
						className={`pricematrix-pricing-button ${uniqueId}`}
						style={{
							backgroundColor: buttonBg,
							color: buttonColor,
							borderRadius: buttonRadius,
							width: buttonWidth || "auto",
							display: "inline-block",
						}}
					>
						{buttonText}
					</a>
				)}
				{(buttonHoverColor || buttonHoverBg) && (
					<style>{`.${uniqueId}:hover {
			${buttonHoverColor ? `color: ${buttonHoverColor} !important;` : ""}
			${buttonHoverBg ? `background-color: ${buttonHoverBg} !important;` : ""}
		}`}</style>
				)}
			</div>
		</div>
	);
}
