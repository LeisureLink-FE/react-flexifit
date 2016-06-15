import test from 'tape';
import Flexifit from './index';
import { shallow } from 'enzyme';
import jsdom from 'jsdom';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

//Super gross but apparently enzyme requires a global browser-like env for `mount`
// https://github.com/airbnb/enzyme/issues/75
global.document = doc;
global.window = win;

// const wrapped = shallow(flexifit);

test('<Flexifit />', t => {

  t.plan(6)
  try {
    shallow(<Flexifit key="none" aspectRatio={1.7778} />);
  } catch(e) {
    t.ok(e, 'Flexifit should throw with a helpful error when used with no children.')
  }

  try {
    shallow(
      <Flexifit key="two" aspectRatio={1.7778}>
        <div/>
        <div/>
      </Flexifit>
    );
  } catch(e) {
    t.ok(e, 'Flexifit should throw with a helpful error when used with more than one child.')
  }

  t.equal(shallow(
    <Flexifit aspectRatio={1.7778}>
      <iframe src="https://www.youtube.com/embed/1g6QJ5TfA7w" frameBorder="0" allowFullscreen></iframe>
    </Flexifit>
  ).state().ratio, 1.7778, 'Flexifit should accept an `aspectRatio` prop and retain that in state as `ratio`')

  t.equal(shallow(
    <Flexifit width="560" height="315">
      <iframe src="https://www.youtube.com/embed/1g6QJ5TfA7w" frameBorder="0" allowFullscreen></iframe>
    </Flexifit>
  ).state().ratio, 560/315, 'Flexifit should accept `height` and `width` props and calculate the aspect ratio from that')

  t.equal(shallow(
    <Flexifit aspectRatio={1.7778}>
      <iframe src="https://www.youtube.com/embed/1g6QJ5TfA7w" frameBorder="0" allowFullscreen></iframe>
    </Flexifit>
  ).find('div').props().style.width, '100%', 'Flexifit should set it\'s width to 100%');

  t.equal(shallow(
    <Flexifit aspectRatio={1.5}>
      <iframe src="https://www.youtube.com/embed/1g6QJ5TfA7w" frameBorder="0" allowFullscreen></iframe>
    </Flexifit>
  ).find('div').props().style.height, `${1/1.5}px`, 'Flexifit should set it\'s height to the relative to the width and ratio');
});
