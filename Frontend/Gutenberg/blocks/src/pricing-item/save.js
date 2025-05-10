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
	} = attributes;

	return (
		<div {...useBlockProps.save({ className: "pricematrix-single-pricing-table" })}>
			<div className="pricematrix-single-pricing-table-header">
				<RichText.Content tagName="h2" value={title} />
				{subtitle && <RichText.Content tagName="h3" value={subtitle} />}

				{/* Wave 1 */}
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

				{/* Wave 2 */}
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
					<RichText.Content value={price} />{" "}
					{per && <span>{per}</span>}
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
						{feature.icon === "check" && <Icon icon={check} />}
						{feature.icon === "close" && <Icon icon={close} />}
						<p className="pricematrix-feature-text">{feature.text}</p>
					</div>
				))}
			</div>

			<div className="pricematrix-single-pricing-buy">
				{buttonText && (
					<a href={buttonUrl}>
						{buttonText}
					</a>
				)}
			</div>
		</div>
	);
}