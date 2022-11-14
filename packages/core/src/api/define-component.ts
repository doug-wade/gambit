import useObservable from '../api/use-observable';
import { compose, required, matchesPattern, shouldThrow, withMessage } from '@gambit/validator';

import type { DefineComponentsOptions, PropsStateMap, SetupContext } from '../types';

const nameValidator = shouldThrow(withMessage(compose(required(), matchesPattern(/.*-.*/)), `web component names are required and must contain a hyphen`));

export default ({ name, emits, props = {}, setup, connectedCallback, disconnectedCallback, adoptedCallback } : DefineComponentsOptions) => {
    nameValidator.validate(name);

    const clazz = class extends HTMLElement {

        #context: SetupContext;
        #props: PropsStateMap;

        constructor() {
            super();
    
            this.#props = Object.entries(props).reduce((accumulator, [key, value]) => {
                return { ...accumulator, key: useObservable({ initialValue: value.default, subscriber: value.validator }) };
            }, {});

            const emit = (type: string, detail: any) => {
                if (emits && !emits?.includes(type)) {
                    console.warn(`unexpected event emitted with type ${type} and detail ${detail}`);
                }
                this.dispatchEvent(new CustomEvent(type, { detail }));
            }

            this.#context = {
                emit
            };
        }

        connectedCallback() {
            connectedCallback?.apply(this);

            setup?.call(this, this.#props, this.#context);
        }

        disconnectedCallback() {
            disconnectedCallback?.apply(this);
        }

        adoptedCallback() {
            adoptedCallback?.apply(this);
        }

        attributeChangedCallback(name: string, oldValue: any, newValue: any) {
            this.#props[name].handler(newValue);
        }
    };

    customElements.define(name, clazz);

    return clazz;
};