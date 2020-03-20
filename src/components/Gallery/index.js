import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image, Modal, Segment } from 'semantic-ui-react';

import './Gallery.scss';

class Gallery extends PureComponent {
	state = { open: false };

	close = () => this.setState({ open: false, image: null });

	onOpenProductImage = (image) => this.setState({ image: image.original, dimmer: true, open: true, });

	render() {
		const { open, dimmer } = this.state;
		const { images } = this.props;

		return (
			<>
				<Segment basic>
					<Image.Group>
						{
							images.map(img => (
								<Image
									src={img.thumb}
									onClick={() => this.onOpenProductImage(img)}
									className="gallery__thumb-image"
									key={img.thumb}
								/>
							))
						}
					</Image.Group>
				</Segment>
				<Modal dimmer={dimmer} open={open} onClose={this.close} closeIcon>
					<Modal.Content image>
						<Image
							wrapped
							src={this.state.image}
							size='large'
						/>
					</Modal.Content>
				</Modal>
			</>
		);
	}
}

Gallery.propTypes = {
	images: PropTypes.arrayOf(PropTypes.shape({
		thumb: PropTypes.string,
		original: PropTypes.string,
	}))
};

export default Gallery;
