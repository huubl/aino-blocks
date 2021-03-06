/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
	Component,
	Fragment,
} = wp.element;
const {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	MediaUpload,
	MediaUploadCheck,
	RichText,
} = wp.blockEditor;
const {
	Button,
	PanelBody,
	SelectControl,
	RangeControl,
} = wp.components;

/**
 * Block edit function
 */
class AuthorEdit extends Component {

	constructor() {
		super(...arguments);
	}

	render() {
		const {
			attributes,
			className,
			isSelected,
			setAttributes,
		} = this.props;

		const {
			imgID,
			imgURL,
			imgAlt,
			imgSize,
			imgRadius,
			name,
			info,
			infoTextColor,
			nameTextColor,
			alignment,
			layout,
		} = attributes;

		const onSelectImage = img => {
			setAttributes({
				imgID: img.id,
				imgURL: img.url,
				imgAlt: img.alt,
			});
		};
		const onRemoveImage = () => {
			setAttributes({
				imgID: null,
				imgURL: null,
				imgAlt: null,
			});
		}

		const imgSizeOptions = [
			{ value: "avatar-s", label: __("small", "ainoblocks") },
			{ value: "avatar-m", label: __("medium", "ainoblocks") }
		];

		const layoutOptions = [
			{ value: "stacked", label: __("stacked", "ainoblocks") },
			{ value: "floated-left", label: __("floated left", "ainoblocks") },
			{ value: "floated-right", label: __("floated right", "ainoblocks") }
		];

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={alignment}
						onChange={alignment => setAttributes({ alignment })}
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={__("Author Settings", "ainoblocks")}>
						<RangeControl
							label={__("Image Radius", "ainoblocks")}
							value={imgRadius}
							onChange={(imgRadius) => setAttributes({ imgRadius })}
							min={0}
							max={100}
						/>
						<SelectControl
							label={__("Image Size", "ainoblocks")}
							value={imgSize}
							options={imgSizeOptions}
							onChange={imgSize => setAttributes({ imgSize })}
						/>
						<SelectControl
							label={__("Layout", "ainoblocks")}
							value={layout}
							options={layoutOptions}
							onChange={layout => setAttributes({ layout })}
						/>
					</PanelBody>
					<PanelColorSettings
						title={__("Color Settings", "ainoblocks")}
						initialOpen={false}
						colorSettings={[
							{
								value: nameTextColor,
								onChange: nameTextColor => {
									setAttributes({ nameTextColor });
								},
								label: __("Name Text Color", "ainoblocks"),
							},
							{
								value: infoTextColor,
								onChange: infoTextColor => {
									setAttributes({ infoTextColor });
								},
								label: __("Info Text Color", "ainoblocks"),
							},
						]}
					>
					</PanelColorSettings>
				</InspectorControls>

				<div className={classnames(className, layout, imgSize)}
					style={{ textAlign: alignment }}
				>
					<div className={classnames(`${className}__avatar`)}>
						{!imgID ? (
							<MediaUploadCheck>
								<MediaUpload
									onSelect={onSelectImage}
									type="image"
									value={imgID}
									render={({ open }) => (
										<Button
											className={"button button-large"}
											onClick={open}
										>
											{icons.upload}
											{__(' Upload Image', 'ainoblocks')}
										</Button>
									)}
								>
								</MediaUpload>
							</MediaUploadCheck>
						) : (
								<div className={`${className}__image-wrapper`}>
									<img style={{
										borderRadius: imgRadius + '%',
									}}
										src={imgURL}
										alt={imgAlt}
									/>
									{isSelected ? (
										<Button
											className="remove-image"
											onClick={onRemoveImage}
										>
											{icons.remove}
										</Button>

									) : null}

								</div>
							)}
					</div>

					<div className={`${className}__text-wrapper`}>
						<RichText
							multiline="false"
							tagName="span"
							className={classnames(`${className}__name`, {
								'has-name-text-color': nameTextColor,
							})}
							style={{
								color: nameTextColor,
							}}
							placeholder={__('Name', 'ainoblocks')}
							value={name}
							onChange={(value) => setAttributes({ name: value })}
						/>
						<RichText
							multiline="false"
							tagName="span"
							className={classnames(`${className}__info`, {
								'has-info-text-color': infoTextColor,
							})}
							style={{
								color: infoTextColor,
							}}
							placeholder={__('Info', 'ainoblocks')}
							value={info}
							onChange={(value) => setAttributes({ info: value })}
						/>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default AuthorEdit;
