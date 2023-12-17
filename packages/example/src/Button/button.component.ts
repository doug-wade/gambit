import type { PropsStateMap, SetupContext, RenderContext } from '@tybalt/core';

import { defineComponent, html } from '@tybalt/core';
import { compose, oneOf, required } from '@tybalt/validator';

import { theme } from '../contexts';

import css from './button.css';
import { Reactive, derive } from '@tybalt/reactive';

export const BUTTON_VARIANTS = Object.freeze({
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    TERTIARY: 'tertiary',
});

export default defineComponent({
    name: 'example-button',
    emits: ['click'],
    css,
    props: {
        variant: {
            default: BUTTON_VARIANTS.PRIMARY,
            validator: compose(required(), oneOf(Object.values(BUTTON_VARIANTS))),
        },
    },
    render({ computedClass, clickHandler, theme }: RenderContext) {
        return html`<style>
                button {
                    --primary-color: ${theme.primaryColor};
                    --secondary-color: ${theme.secondaryColor};
                    --inverse-font-color: ${theme.inverseFontColor};
                    --font-color: ${theme.fontColor};
                    --font-family: ${theme.fontFamily};
                }
            </style>
            <button class="button ${computedClass}" @click="${clickHandler}">
                <slot></slot>
            </button>
        `;
    },
    setup({ variant }: PropsStateMap, { emit }: SetupContext) {
        const clickHandler = (evt: Event) => {
            evt.stopPropagation();
            emit('click');
        };
        const computedClass = derive([variant.reactive], ([variant]) => `button-${variant}`);

        return {
            clickHandler,
            computedClass,
        };
    },
    contexts: { theme },
});
