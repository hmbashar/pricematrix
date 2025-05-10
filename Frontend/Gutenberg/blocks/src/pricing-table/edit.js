import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Edit() {
    const blockProps = useBlockProps({
        className: 'pricematrix-pricing-table-area'
    });

    return (
        <section {...blockProps}>
            <div className="pricematrix-pricing-table">
                <InnerBlocks
                    allowedBlocks={['pricematrix/pricing-item']}
                    template={[
                        ['pricematrix/pricing-item']
                    ]}
                    templateLock={false}
                />
            </div>
        </section>
    );
}