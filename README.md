# react-flexifit
A React component to make non-responsive elements, (such as iframes, canvas, etc) or components responsive.

Inspired by fitvids.

## Usage

### aspectRatio
```
import Flexifit from 'react-flexifit';

<Flexifit aspectRatio={1.5} >
  <iframe src="https://www.youtube.com/embed/1g6QJ5TfA7w"/>
</Flexifit>
```
Flexifit will ensure it's child element maintains the specified aspectRatio no matter the screen size.

### height/width
```
import Flexifit from 'react-flexifit';

<Flexifit height={200} width={250} >
  <iframe src="https://www.youtube.com/embed/1g6QJ5TfA7w"/>
</Flexifit>
```
Flexifit will calculate the appropriate aspect ratio and maintain that calculated aspectRatio.

## Considerations

* Flexifit will throw if anything other than one child is provided.
* If `aspectRatio` and `height`/`width` are provided, `aspectRatio` will win.
