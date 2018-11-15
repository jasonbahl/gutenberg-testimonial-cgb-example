import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { Component } = wp.element;
const { registerBlockType } = wp.blocks;
const {
    RichText,
    InspectorControls,
    PanelColorSettings,
    MediaUpload,
} = wp.editor;

const {
    Button,
    PanelBody,
    SelectControl,
} = wp.components;

class Inspector extends Component {
    constructor( props ) {
        super( ...arguments );
    }
	render() {
        const backgroundColors = [
            { color: '#00d1b2', name: 'teal' },
            { color: '#3373dc', name: 'royal blue' },
            { color: '#209cef', name: 'sky blue' },
            { color: '#22d25f', name: 'green' },
            { color: '#ffdd57', name: 'yellow' },
            { color: '#ff3860', name: 'pink' },
            { color: '#7941b6', name: 'purple' },
            { color: '#392F43', name: 'black' },
        ];

        const alignOptions = [
            { value: 'left', label: __( 'Left' ) },
            { value: 'right', label: __( 'Right' ) }
        ];

        const { setAttributes, attributes: { background_color, alignment, text_color }} = this.props;

        return(
            <InspectorControls key="inspector">
                <PanelBody>
                    <PanelColorSettings
                        title={ __( 'Background Color' ) }
                        initialOpen={ false }
                        colorSettings={ [ {
                            value: background_color,
                            colors: backgroundColors,
                            onChange: (value) => setAttributes({ background_color: value}),
                            label: __( 'Background Color' ),

                        } ] }
                    />
                    <PanelColorSettings
                        title={ __( 'Text Color' ) }
                        initialOpen={ false }
                        colorSettings={ [ {
                            value: text_color,
                            colors: backgroundColors,
                            onChange: (value) => setAttributes({ text_color: value}),
                            label: __( 'Text Color' ),

                        } ] }
                    />
                    <SelectControl
                        label={ __( 'Alignment' ) }
                        description={ __( 'Left or right align the cite name and title.' ) }
                        options={ alignOptions }
                        value={ alignment }
                        onChange={ ( value ) => this.props.setAttributes( { alignment: value } ) }
                    />
				</PanelBody>
			</InspectorControls>
		);
	}
}

class EditBlockContent  extends Component {
	render() {
        const {
            attributes: {
                testimonial,
                avatarUrl,
                avatarId,
                name,
                background_color,
                text_color,
                alignment
            },
            setAttributes
        } = this.props;
		return[
			<Inspector { ...{ setAttributes, ...this.props } } />,
			<div id="cgb-testimonial" className="cgb-testimonial">
				<div className="cgb-testimonial-text">
					{testimonial}
				</div>
				<div className="cgb-testimonial-info">
					<div className="cgb-testimonial-avatar-wrap">
						<img src={avatarUrl}/>
					</div>
					<h2 className="cgb-testimonial-avatar-name">
						{name}
					</h2>
				</div>
			</div>,
		];
	}
};

class EditBlock extends Component {
	render( ) {
		return [
			<BlockContent />
		];
	}
}

registerBlockType( 'cgb/testimonial', {
	title: __( 'Testimonial - CGB' ),
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'testimonial' ),
		__( 'create guten block Example' ),
		__( 'cgb' ),
	],
    attributes: {
        testimonial: {
            type: 'string',
            default: 'This is a testimonial'
        },
        avatarUrl: {
            type: 'string',
            default: 'https://placehold.it/100x100'
        },
        avatarId: {
            type: 'int',
            default: null,
        },
        name: {
            type: 'string',
            default: 'Citation Name'
        },
        background_color: {
            type: 'string',
            default: 'blue'
        },
        text_color: {
            type: 'string',
            default: 'white'
        },
        alignment: {
            type: 'string',
            default: 'left'
        }
    },
	edit: EditBlockContent,
	save: function( props ) {
        const testimonial = 'Testimonial...';
        const avatarUrl = 'https://placehold.it/55x55';
        const name = 'Citation Name';
        return(
            <div id="cgb-testimonial" className="cgb-testimonial">
                <div className="cgb-testimonial-text">
                    {testimonial}
                </div>
                <div className="cgb-testimonial-info">
                    <div className="cgb-testimonial-avatar-wrap">
                        <img src={avatarUrl}/>
                    </div>
                    <h2 className="cgb-testimonial-avatar-name">
                        {name}
                    </h2>
                </div>
            </div>
        );
	},
} );
