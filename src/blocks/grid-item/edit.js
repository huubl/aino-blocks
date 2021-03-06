/**
 * External dependencies
 */
import classnames from 'classnames';
import get from 'lodash/get';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;
const { addFilter } = wp.hooks;
const {
	Component,
	Fragment,
} = wp.element;
const {
	compose,
	createHigherOrderComponent,
} = wp.compose;
const {
	InspectorControls,
	InnerBlocks,
} = wp.blockEditor;
const {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
} = wp.components;
const {
	withDispatch,
	withSelect,
} = wp.data;

/**
 * Block edit function
 */
class GridItemEdit extends Component {

	constructor() {
		super(...arguments);
	}

	render() {
		const {
			attributes,
			setAttributes,
			className,
			hasChildBlocks,
		} = this.props;

		const {
			gridColumnStart,
			gridColumnEnd,
			alignItem,
			justifyItem,
			stacking,
			stackOrder,
			gutter,
			overlapLeft,
			overlapRight,
		} = attributes;

		const alignItemOptions = [{
				value: 'start',
				label: __('start', 'ainoblocks')
			},
			{
				value: 'end',
				label: __('end', 'ainoblocks')
			},
			{
				value: 'center',
				label: __('center', 'ainoblocks')
			},
			{
				value: 'stretch',
				label: __('stretch', 'ainoblocks')
			}
		];

		const justifyItemOptions = [{
				value: 'start',
				label: __('start', 'ainoblocks')
			},
			{
				value: 'end',
				label: __('end', 'ainoblocks')
			},
			{
				value: 'center',
				label: __('center', 'ainoblocks')
			},
			{
				value: 'stretch',
				label: __('stretch', 'ainoblocks')
			}
		];

		const classNames = classnames(className, {
		});

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={__('Grid Item Settings', 'ainoblocks')}>
						<RangeControl
						label={__('Grid Column Start', 'ainoblocks')}
						value={gridColumnStart}
						onChange={(gridColumnStart) => setAttributes({ gridColumnStart })}
						min={1}
						max={13}
						allowReset={true}
						/>
						<RangeControl
							label={__('Grid Column End', 'ainoblocks')}
							value={gridColumnEnd}
							onChange={(gridColumnEnd) => setAttributes({ gridColumnEnd })}
							min={1}
							max={13}
							allowReset={true}
						/>
						<ToggleControl
							label={__('Add end gutters', 'ainoblocks')}
							checked={!!gutter}
							onChange={() => setAttributes({ gutter: !gutter })}
							help={!!gutter ? __('Toogle off to remove the spacing left and right of the grid item.', 'ainoblocks') : __('Toggle on for space left and right of the grid item.', 'ainoblocks')}
						/>
						<ToggleControl
							label={__('Overlap to left', 'ainoblocks')}
							checked={!!overlapLeft}
							onChange={() => setAttributes({ overlapLeft: !overlapLeft })}
							help={!!overlapLeft ? __('Toogle off to position grid item within grid container.', 'ainoblocks') : __('Toggle on to overlap grid item to left screen edge.', 'ainoblocks')}
						/>
						<ToggleControl
							label={__('Overlap to right', 'ainoblocks')}
							checked={!!overlapRight}
							onChange={() => setAttributes({ overlapRight: !overlapRight })}
							help={!!overlapRight ? __('Toogle off to position grid item within grid container.', 'ainoblocks') : __('Toggle on to overlap grid item to right screen edge.', 'ainoblocks')}
						/>
					</PanelBody>

					<PanelBody
						title={__('Aligment', 'ainoblocks')}
						initialOpen={false}
					>
						<SelectControl
							label={__('Align item', 'ainoblocks')}
							help={__('Aligns an item inside its grid area along the vertical column axis.', 'ainoblocks')}
							value={alignItem}
							options={alignItemOptions}
							onChange={alignItem => setAttributes({ alignItem })}
						/>
						<SelectControl
							label={__('Justify item', 'ainoblocks')}
							help={__('Aligns an item inside its grid area on the horizontal row axis.', 'ainoblocks')}
							value={justifyItem}
							options={justifyItemOptions}
							onChange={justifyItem => setAttributes({ justifyItem })}
						/>
					</PanelBody>

					<PanelBody
						title={__('Stacking', 'ainoblocks')}
						initialOpen={false}
					>
						<ToggleControl
							label={__('Stacking', 'ainoblocks')}
							checked={!!stacking}
							onChange={() => setAttributes({ stacking: !stacking })}
							help={!!stacking ? __('Toogle off to show grid items below the previous grid item.', 'ainoblocks') : __('Toggle on to allow stacking of grid item.', 'ainoblocks')}
						/>
						<RangeControl
							label={__('Stack Order', 'ainoblocks')}
							help={__('An item with greater stack order is always in front of an item with a lower stack order.', 'ainoblocks')}
							value={stackOrder}
							onChange={(stackOrder) => setAttributes({ stackOrder })}
							initialPosition={1}
							min={1}
							max={10}
						/>
					</PanelBody>
				</InspectorControls>

				<div className={classNames} >
					<InnerBlocks
						templateLock={ false }
						renderAppender={
							hasChildBlocks
								? undefined
								: () => <InnerBlocks.ButtonBlockAppender />
						}
					/>
				</div>
			</Fragment>
		);
	}
}

export default compose(
)(GridItemEdit);

/**
 * Override the default block element to add wrapper props.
 *
 * @param {Function} BlockListBlock Original component
 * @return {Function} Wrapped component
 */

const addCustomClassName = createHigherOrderComponent((BlockListBlock) => {

	return (props) => {

		const {
			attributes,
			className,
		} = props;

		const {
			gridColumnStart,
			gridColumnEnd,
			alignItem,
			justifyItem,
			stacking,
			stackOrder,
			gutter,
			overlapLeft,
			overlapRight,
		} = attributes;

		const classNames = classnames(className, {
			[`grid-column_start__${gridColumnStart}`]: gridColumnStart,
			[`grid-column_end__${gridColumnEnd}`]: gridColumnEnd,
			[`align-self__${alignItem}`]: alignItem,
			[`justify-self__${justifyItem}`]: justifyItem,
			[`stack-order__${stackOrder}`]: stackOrder,
			'no-gutter': ! gutter,
			'no-stacking': ! stacking,
			'overlap-left': overlapLeft,
			'overlap-right': overlapRight,
		});

		return <BlockListBlock {...props} className={classNames} />;
	};
}, 'addCustomClassName');

addFilter('editor.BlockListBlock',
	'ainoblocks/modify-spacing-save-settings',
	addCustomClassName
);
