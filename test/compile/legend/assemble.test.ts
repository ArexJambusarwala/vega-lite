/* tslint:disable:quotemark */

import {parseUnitModelWithScale} from '../../util';

describe('legend/assemble', () => {
  it('merges legend of the same field with the default type.', () => {
    const model = parseUnitModelWithScale({
      $schema: 'https://vega.github.io/schema/vega-lite/v3.json',
      description: 'A scatterplot showing horsepower and miles per gallons.',
      data: {url: 'data/cars.json'},
      mark: 'point',
      encoding: {
        x: {field: 'Horsepower', type: 'quantitative'},
        y: {field: 'Miles_per_Gallon', type: 'quantitative'},
        color: {field: 'Origin', type: 'nominal'},
        shape: {field: 'Origin', type: 'nominal'}
      }
    });
    model.parseLegend();

    const legends = model.assembleLegends();
    expect(legends).toHaveLength(1);

    expect(legends[0].title).toEqual('Origin');
    expect(legends[0].stroke).toEqual('color');
    expect(legends[0].shape).toEqual('shape');
  });

  it('merges legend of the same field and favor symbol legend over gradient', () => {
    const model = parseUnitModelWithScale({
      data: {values: [{a: 'A', b: 28}, {a: 'B', b: 55}]},
      mark: 'bar',
      encoding: {
        x: {field: 'a', type: 'ordinal'},
        y: {field: 'b', type: 'quantitative'},
        color: {field: 'b', type: 'quantitative'},
        size: {field: 'b', type: 'quantitative'}
      }
    });

    model.parseLegend();

    const legends = model.assembleLegends();
    expect(legends).toHaveLength(1);
    expect(legends[0].title).toEqual('b');
    expect(legends[0].fill).toEqual('color');
    expect(legends[0].size).toEqual('size');
  });
});
