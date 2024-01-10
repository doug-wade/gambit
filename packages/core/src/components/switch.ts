import { defineComponent, html } from '..';
import { string } from '@tybalt/parser';
import { required } from '@tybalt/validator';

export default defineComponent({
    name: 't-switch',

    props: {
        value: {
            validator: required,
            parser: string,
        },
    },
    render({ value }) {
        return html`<slot name="${value}"></slot>`;
    },
});
