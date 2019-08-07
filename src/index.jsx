import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import 'intersection-observer';

class Imager extends React.Component {

    static propTypes = {
        src: PropTypes.string.isRequired,
        thumbSrc: PropTypes.string,
        errorSrc: PropTypes.string,
        onSuccess: PropTypes.func,
        onFailed: PropTypes.func,
    }

    static defaultProps = {
        src: '',
        thumbSrc: '',
        onLoad: () => { },
    }

    state = {
        loaded: false,
    }

    constructor(props) {
        super(props);
        if (!this.props.src) {
            throw new Error('the src is required');
        }
        this.isLoading = false;
    }

    componentDidMount() {
        this.listener();
    }

    listener = () => {
        if (this.isLoading) {
            return;
        }
        let img = ReactDOM.findDOMNode(this.imgRef);
        let observer = new IntersectionObserver(entries => {
            if (entries[0].intersectionRatio > 0) {
                let newImg = new Image();
                this.isLoading = true;
                new Promise((resolve) => {
                    newImg.src = this.props.src;
                    newImg.onload = resolve;
                })
                    .then(() => {
                        this.setState({
                            loaded: true,
                        });
                        if (this.props.onSuccess) {
                            this.props.onSuccess();
                        }
                    })
                    .catch(() => {
                        if (this.props.onFailed) {
                            this.props.onFailed();
                        }
                        if (this.props.errorSrc) {
                            newImg.src = errorSrc;
                        }
                    })
                    .finally(() => {
                        this.isLoading = false;
                        newImg = null;
                        observer.disconnect();
                    })
            }
        })
        observer.observe(img);
    }

    render() {
        const { src, thumbSrc, ...others } = this.props;
        return <img
            ref={(target) => this.imgRef = target}
            src={this.state.loaded ? src : (thumbSrc ? thumbSrc : '')}
            {...others} />;
    }
}

export default Imager;