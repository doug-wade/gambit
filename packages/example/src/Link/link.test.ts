import { mount } from '@tybalt/test-utils';
import Link from './link.component';

const href = 'http://www.example.com';
const slot = '<div slot="content">mock slot value</div>';

const mountLink = async () => {
    const wrapper = await mount(Link, {
        slot,
        attributes: { href },
    });

    return wrapper;
};

describe('link', () => {
    it('renders an anchor tag', async () => {
        const wrapper = await mountLink();

        const actual = wrapper.find('a');

        expect(actual.exists()).toBeTruthy();
    });

    it('renders slotted content', async () => {
        const wrapper = await mountLink();

        expect(wrapper.html()).toContain('mock slot value');
    });

    it('has a prop for href', async () => {
        const wrapper = await mountLink();

        const actual = wrapper.find('a');

        expect(actual.attributes('href')).toBe(href);
    });

    it('adds the example-link class', async () => {
        const wrapper = await mountLink();

        const actual = wrapper.find('a');

        expect(actual.classes('example-link')).toBeTruthy();
    });
});
