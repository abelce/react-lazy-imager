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

  render() {
    return (
      <Img src="xxx"/>
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

## License
MIT License

## Keywords
react image lazyload img