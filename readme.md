## React-Imager

The **imager** is used to replace <img> tag, and it will lazy to load the picture.

## Installation and usage
Install

```
npm install -S react-imager
```

Then use it in your app:

```
import React from 'react';
import Img from 'react-imager';

class App extends React.Component {

  successCallback(){

  }

  render() {
    return (
      <Img 
        src="./expamle.png" 
        thumbSrc="./thumb.png" 
        className="demo"/>
        onSuccess={this.successCallback}
    );
  }
}
```

## Props
It has all the attributes of the \<img\> tag, such as:
+ src
+ style
+ className
+ alt
+ thumbSrc: display before the src is loaded
+ errorSrc: display while load src failed
+ onSuccess: callback after the image is successfully loaded
+ onFailed: callback after the image is failed loaded

## License
MIT License

## Keywords
react image lazyload img