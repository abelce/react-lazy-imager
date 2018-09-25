import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class ImageLoader extends React.Component {

    static propTypes = {
        src: PropTypes.string.isRequired,
    }

    static defaultProps = {
        src: ''
    }

    componentDidMount() {
        this.load();
    }

    load = () => {
        if (!this.props.src) {
            return;
        }
        let img = ReactDOM.findDOMNode(this.imgRef);
        let observer = new IntersectionObserver(entries => {
          if (entries[0].intersectionRatio > 0) {
            let newImg = new Image();
            new Promise((resolve) => {
              newImg.src = this.props.src;
              newImg.onload = resolve;
            })
            .then(() => {
              img.src = this.props.src;
            })
            .finally(() => {
                newImg = null;
                observer.disconnect();
            })
          }
        })
        observer.observe(img);
    }

    render() {
        const {src, children, ...others} = this.props;
        return <img ref={(target) => this.imgRef = target} {...others}/>;
    }
}

export default ImageLoader;