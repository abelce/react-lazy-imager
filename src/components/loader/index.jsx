import React from 'react';
// import PropTypes from 'prop-types';

class Loader extends React.Component {

    // static propTypes = {
    //     src: PropTypes.string.reRequired,
    // }

    // static defaultProps = {
    //     src: ''
    // }

    static state = {
        laoded: false,
    }

    componentWillMount() {
        if (!this.props.src) {
            throw Error('src is null');
        }
    }

    componentDidMount() {
        this.load();
    }

    load = () => {
        if (this.props.src) {
            return;
        }
        let img = ReactDOM.findDOMNode(this.props.children);
        let observer = new IntersectionObserver(entries => {
          if (entries[0].intersectionRatio > 0) {
            let newImg = new Image();
            new Promise((resolve) => {
              newImg.src = this.props.src;
              newImg.onload = resolve;
            })
            .then(() => {
              img.src = src;
            })
            .finally(() => {
                newImg = null;
                observer.disconnect();
            })
          }
        })
        observer.observe(div);
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default Loaderl;