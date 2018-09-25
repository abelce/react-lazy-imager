
import * as React from 'react';
export default class ImageLoader extends React.Component<any, any> {
    static defaultProps: {
        src: string;
    };
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    load(): void;
    render(): JSX.Element;
}