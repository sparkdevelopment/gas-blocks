/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import classnames from 'classnames';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	store as blockEditorStore,
	useInnerBlocksProps,
	BlockControls
} from '@wordpress/block-editor';
import { withDispatch, useDispatch, useSelect } from '@wordpress/data';
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
	store as blocksStore,
} from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
function DocSliderEditContainer(
	attributes,
	setAttributes,
	updateAlignment,
	updateColumns,
	clientId,
) {
	const ALLOWED_BLOCKS = ['gas/docsliderpage'];
	const classes = classnames({
		['docslider-container']: true,
	});
	const blockProps = useBlockProps({
		className: classes,
	});
	const { columnsIds, hasChildBlocks, rootClientId } = useSelect(
		(select) => {
			const { getBlockOrder, getBlockRootClientId } =
				select(blockEditorStore);

			const rootId = getBlockRootClientId(clientId);

			return {
				hasChildBlocks: getBlockOrder(clientId).length > 0,
				rootClientId: rootId,
				columnsIds: getBlockOrder(rootId),
			};
		},
		[clientId]
	);
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		renderAppender: InnerBlocks.ButtonBlockAppender
	});
	return (
		<>
			<BlockControls></BlockControls>
			<InspectorControls></InspectorControls>
			<div {...innerBlocksProps} />
		</>
	);
}

const DocSliderEditContainerWrapper = withDispatch(
	(dispatch, ownProps, registry) => ({
	})
)(DocSliderEditContainer)

function DocSliderPlaceholder({ clientId, name, setAttributes }) {
	const { blockType, defaultVariation, variations } = useSelect(
		(select) => {
			const {
				getBlockVariations,
				getBlockType,
				getDefaultBlockVariation,
			} = select(blocksStore);

			return {
				blockType: getBlockType(name),
				defaultVariation: getDefaultBlockVariation(name, 'block'),
				variations: getBlockVariations(name, 'block'),
			};
		},
		[name]
	);

	const { replaceInnerBlocks } = useDispatch(blockEditorStore);

	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<p>Add docSlider pages...</p>
		</div>
	);
}

const DocSliderEdit = (props) => {
	const { clientId } = props;
	const { hasInnerBlocks } = useSelect(
		(select) =>
			select(blockEditorStore).getBlocks(clientId).length > 0,
		[clientId]
	);
	const Component = DocSliderEditContainerWrapper;
	// const Component = hasInnerBlocks ? DocSliderEditContainerWrapper : DocSliderPlaceholder;

	return <Component {...props} />;
}

export default DocSliderEdit;
