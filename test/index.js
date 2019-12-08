import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import useToggleDemocracy from '../src/index';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

function HookWrapper({ options }) {
    const output = useToggleDemocracy(options);
    return (
        <span output={output} />
    );
}

const options = ['Foo', 'Bar', 'Baz'];

describe('toggle democracy', () => {
    it('must return correct initial state', () => {
        const wrapper = mount(<HookWrapper options={options} />);
        const [state] = wrapper.find('span').props().output;

        // Assert on pairs
        expect(Object.keys(state.pairs)).to.have.length(3);

        // Assert on leader
        expect(state.leader).to.be.equal('Foo');
    });

    it('must return correct pairs and leader after update', () => {
        const wrapper = mount(<HookWrapper options={options} />);
        const [state, api] = wrapper.find('span').props().output;

        // Update first pair to have 'Bar' selected
        const keys = Object.keys(state.pairs);
        api.updatePair(keys[0], 'Bar')

        // Hack to trigger re-render
        wrapper.setProps();

        // Assert on leader
        const [state2] = wrapper.find('span').props().output;
        expect(state2.leader).to.be.equal('Bar');

        // Assert on pairs
        expect(Object.keys(state2.pairs)).to.have.length(3);
    })   
    
    it('must return correct leader after options change', () => {
        const wrapper = mount(<HookWrapper options={options} />);
        wrapper.setProps({ options: ['Bar', 'Baz'] });
        wrapper.update();

        // Assert on leader
        const [state] = wrapper.find('span').props().output;
        expect(state.leader).to.be.equal('Bar');

        // Assert on pairs
        expect(Object.keys(state.pairs)).to.have.length(1);
    })
});
