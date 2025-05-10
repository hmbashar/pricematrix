import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { title, subtitle, price, per, features, buttonText, buttonUrl } = attributes;

    return (
        <div {...useBlockProps.save({ className: 'pricematrix-single-pricing-table' })}>
            <div className="pricematrix-single-pricing-table-header">
                <RichText.Content tagName="h2" value={title} />
                {subtitle && <RichText.Content tagName="h3" value={subtitle} />}
            </div>
            <div className="pricematrix-single-pricing-price">
                <h2>
                    <RichText.Content value={price} /> <span>{per}</span>
                </h2>
            </div>
            <div className="pricematrix-single-pricing-content">
                {features.map((feature, index) => (
                    <p key={index}>{feature}</p>
                ))}
            </div>
            <div className="pricematrix-single-pricing-buy">
                <a href={buttonUrl}>{buttonText}</a>
            </div>
        </div>
    );
}