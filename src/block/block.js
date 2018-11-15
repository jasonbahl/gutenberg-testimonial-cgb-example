import classnames from 'classnames';

import './style.scss';
import './editor.scss';

import icons from './icons';

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
        return (
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

class CGBTestimonialBlock extends Component {

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
            <Inspector
                { ...{ setAttributes, ...this.props } }
            />,
            <div id="cgb-testimonial" className="cgb-testimonial" style={{
                backgroundColor: background_color,
                color: text_color,
                padding: '30px',
            }}>
                <RichText
                    tagName="div"
                    multiline="p"
                    placeholder={ __( 'Add testimonial text...' ) }
                    keepPlaceholderOnFocus
                    value={ testimonial }
                    formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
                    className={ classnames(
                        'cgb-testimonial-text'
                    ) }
                    style={ {
                        color: text_color
                    } }
                    onChange={ ( value ) => setAttributes( { testimonial: value } ) }
                />
                <div className={ classnames('cgb-testimonial-info', alignment)}>
                    <div className={classnames('cgb-testimonial-avatar-wrap')}>
                        <MediaUpload
                            buttonProps={ {
                                className: 'change-image'
                            } }
                            onSelect={
                                (img) => setAttributes({
                                    avatarUrl: img.url,
                                    avatarId: img.id
                                })
                            }
                            type="image"
                            value={ avatarId }
                            render={ ( { open } ) => (
                                <Button onClick={ open }>
                                    { ! avatarId ? <div className="icon">{icons.upload}</div> : <img
                                        className="cgb-testimonial-avatar"
                                        src={ avatarUrl }
                                        alt="avatar"
                                    />  }
                                </Button>
                            ) }
                        >
                        </MediaUpload>
                    </div>
                    <h2 className="cgb-testimonial-avatar-name">
                        <RichText
                            tagName="h2"
                            placeholder={ __( 'Add name...' ) }
                            keepPlaceholderOnFocus
                            value={ name }
                            formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
                            className={ classnames(
                                'cgb-testimonial-avatar-name'
                            ) }
                            style={ {
                                textAlign: alignment,
                                color: text_color
                            } }
                            onChange={ ( value ) => setAttributes( { name: value } ) }
                        />
                    </h2>
                </div>
            </div>
        ];
    }
}

registerBlockType( 'cgb/block-testimonial-cgb', {
    title: __( 'testimonial-cgb - CGB Block' ),
    icon: 'shield',
    category: 'common',
    keywords: [
        __( 'testimonial' ),
        __( 'quote' ),
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
    edit: CGBTestimonialBlock,
    save: function( props ) {
        const { attributes: { testimonial, avatarUrl, name, background_color, text_color, alignment }} = props;
        return (
            <div id="cgb-testimonial" className="cgb-testimonial" style={{
                backgroundColor: background_color,
                color: text_color
            }}>
                { testimonial && !! testimonial.length && (
                    <RichText.Content
                        tagName="div"
                        className="cgb-testimonial-text"
                        style={ {
                            color: text_color
                        } }
                        value={ testimonial }
                    />
                )}
                <div className={classnames('cgb-testimonial-info', alignment)}>
                    <div className="cgb-testimonial-avatar-wrap">
                        <img src={avatarUrl}/>
                    </div>
                    { name && !! name.length && (
                        <RichText.Content
                            tagName="h2"
                            className="cgb-testimonial-avatar-name"
                            style={ {
                                color: text_color
                            } }
                            value={ name }
                        />
                    )}
                </div>
            </div>
        );
    },
} );
