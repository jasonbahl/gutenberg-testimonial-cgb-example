import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'cgb/testimonial', {
    title: __( 'Testimonial - CGB' ),
    icon: 'shield',
    category: 'common',
    keywords: [
        __( 'testimonial' ),
        __( 'create guten block Example' ),
        __( 'cgb' ),
    ],
    edit: function( props ) {
        return (
            <h2>Testimonial CGB - Step 1</h2>
        );
    },
    save: function( props ) {
        return (
            <h2>Testimonial CGB - Step 1</h2>
        );
    },
} );
