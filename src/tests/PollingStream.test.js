import React from 'react';
import PollingStream from '../PollingStream'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('PollingStream', () => {
    it('should render componentFromStream and children', () => {
        const render = shallow(
            <PollingStream
                interval={1000}
                ref={(stream) => this.stream = stream}
                route='https://blockchain.info/ticker'>
                {(response) =>
                    Object.keys(response)
                        .map((symbol) => <p key={symbol}>{symbol} - {response[symbol].last}</p>)
                }
            </PollingStream>
        );

        expect(render.children().length).toBe(1)
        expect(render.find('ComponentFromStream').length).toBe(1)
    });
});