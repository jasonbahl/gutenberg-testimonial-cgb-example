import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { Component } = wp.element;
const { registerBlockType } = wp.blocks;

const BlockContent = () => {
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
	edit: EditBlock,
	save: function( props ) {
        return (
            <BlockContent />
        );
	},
} );
