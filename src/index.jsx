import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Imager extends React.Component {

    static propTypes = {
        src: PropTypes.string.isRequired,
        thumbSrc: PropTypes.string,
    }

    static defaultProps = {
        src: '',
        thumbSrc: '',
    }

    state = {
        loaded: false,
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
                this.setState({
                    loaded: true,
                });
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
        const {src, thumbSrc, children, ...others} = this.props;
        return <img 
          ref={(target) => this.imgRef = target}
          src={this.state.loaded ? src : (thumbSrc ? thumbSrc : src)}
          {...others}/>;
    }
}

export default Imager;