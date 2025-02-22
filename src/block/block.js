/**
 * BLOCK: jvm-details-summary
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
//import './editor.scss';
//import './style.scss';
import { Fragment } from '@wordpress/element';
import { InnerBlocks, RichText } from '@wordpress/editor';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
//const ALLOWED_BLOCKS = [ 'core/code', 'core/paragraph', 'core/image', 'core/freeform' ];

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'jvm/details-summary', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Details & Summary' ), // Block title.
	icon: 'controls-play', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Details' ),
		__( 'Summary' )
	],

	attributes: {
		summary: {
			type: 'string',
			source: 'html',
			selector: 'summary'
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {

		function onChangeSummary( newSummary ) {
			props.setAttributes( { summary: newSummary } );
		}

		// Creates a <p class='wp-block-cgb-block-jvm-details-summary'></p>.
		return (
			<details className={ props.className }>
				<summary>
					<RichText
						tagName='div'
						onChange={ onChangeSummary }
						value={props.attributes.summary}
						placeholder={ __( 'Titel goes here.' ) }
					/>
				</summary>
				<div>
					<InnerBlocks />
				</div>
			</details>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		return (
			<details className={ props.className }>
				<RichText.Content
					tagName='summary'
					value={ props.attributes.summary }
				/>
				<div>
					<InnerBlocks.Content />
				</div>
			</details>
		);
	},
} );
