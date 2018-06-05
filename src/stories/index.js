import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import JPlot from '../JPlot';
import JPlotController from '../JPlotController';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

storiesOf('JPlot', module)
  .add('no data', () => <JPlot />)
  .add('with data', () => <JPlot
    selectedPoint={{age: 0, id: 0}}
    onPointClick={ action('Point clicked ') }
    focusedPoint={{age: 0, id: 0}}
    metric={'age'}
    delPlot={ action('Plot delete clicked') }
    data={[
      { age: 0, id: 0 },
      { age: 1, id: 1 },
      { age: 2, id: 2 },
      { age: 3, id: 3 },
    ]} />
  );
