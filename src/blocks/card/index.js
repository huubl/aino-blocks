/**
* WordPress dependencies
*/
const { __, _x } = wp.i18n;
const { registerBlockCollection } = wp.blocks;

/**
 * Internal dependencies
 */
import icon from './icon';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import './styles/style.scss';
import './styles/editor.scss';

/**
 * Register block
 */
const { attributes, name } = metadata;

const settings = {
	title: __('Card', 'ainoblocks'),
	description: __('Insert a card to highlight important content such as quotes or special notices. The card has a box style format that can be customised.', 'ainoblocks'),
	category: typeof registerBlockCollection === 'function' ? 'design' : 'ainoblocks',
	icon,
	keywords: [
		__('card', 'ainoblocks'),
		__('container', 'ainoblocks'),
		__('wrapper', 'ainoblocks'),
		__('box', 'ainoblocks'),
		__('aino blocks', 'ainoblocks'),
	],
	supports: {
		align: ['wide', 'full'],
	},
	color: {
		gradients: true
	},
	example: {
		attributes: {
			borderRadius: '20',
			shadowName: 'shadow-a',
			paddingTop: '9',
			paddingBottom: '9',
			paddingLeft: '9',
			paddingRight: '9',
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: __( 'You can include any kind of block inside a card. It is a great block to be used on coloured backgrounds.', 'ainoblocks' ),
				},
			},
		],
	},
	attributes,
	edit,
	save,
};

export { name, settings };
