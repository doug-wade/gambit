---
layout: layout.html
title: Tybalt core
---

# @tybalt/core

Tybalt exports a set of utilities for making authoring web components easier. These are grouped together as `@tybalt/core`. A simple example of how to use this might be

```js
defineComponent({
    name: 'flip-a-coin',
    shadowMode: 'closed',
    setup(): { return { rand: Math.random() } },
    render({ rand }) {
        return html`
            <t-if condition="${rand >= .5}">
                <p slot="true">Heads</p>
                <p slot="false">Tails</p>
            </t-if>
        `;
    },
});
```

In this example, we create a new web component, `flip-a-coin`, that can be used as follows

```html
<flip-a-coin></flip-a-coin>
```

And will render, based on the value of a random number, one of the following two variants

```html
<flip-a-coin>
    # Shadow Root
    <p>Heads</p>
</flip-a-coin>
<flip-a-coin>
    # Shadow Root
    <p>Tails</p>
</flip-a-coin>
```

To see the full specification for how to define a component, see the api section below.

## Installation

### Bundlers

You can install the package from npm. For example, using the npm cli

```shell
npm install --save @tybalt/core
```

Alternatively, you can install using `pnpm` or `yarn`.

Once you've installed the package you'll need to include it in your bundle.
See the documentation from your bundler (webpack, swc, browserify, etc.) for
details.

### CDN

You can include Tybalt on your page directly by fetching it from a CDN. For example,
using unpkg

```js
import { defineComponent, html } from 'https://unpkg.com/@tybalt/core@0.0.10/dist/mjs/index.js';
```

Alternatively, you can use `cdnjs`, or `jsDelivr`.

## API

### defineComponent

`defineComponent` creates a new web component.

#### name

The name of the web component. This is used when creating a new instance of your web component.
For instance, if you create a new component with the name `my-component`

```javascript
defineComponent({
    name: 'my-component',
});
```

you can use it in your html with the same name

```html
<my-component />
```

Note that component names have to contain the `-` character.

#### emits

emits is an array of strings, which are the [CustomEvent types](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#parameters) of all of the events this component might emit.
This is used for static analysis purposes; if you emit an event that is not listed here or if you don't list an event here that you later emit it's totally fine.

```javascript
defineComponent({
    name: 'emits-example',
    emits: ['my-event'],
});
```

#### props

props is an object that determines how attributes are handled for your web component.

```javascript
import { required, string } from '@tybalt/validator';

defineComponent({
    name: 'props-example',
    props: {
        example: {
            default: 'foo',
            validator: compose(required(), string()),
        },
    },
});
```

#### setup

`setup` is a method that is called once a web component is connected to the DOM (it is called as part of
`connectedCallback`, once all of the props has been supplied).

```javascript
defineComponent({
    name: 'setup-script',
    setup(props) {
        return {
            myValue: 'my-value',
        };
    },
});
```

`setup` functions take two arguments. The first argument are the `props`, as specified in the `props` key on the argument to `defineComponent`.

```javascript
defineComponent({
    name: 'setup-props',
    props: {
        one: { default: 'one' },
        two: { default: 'two' },
    },
    setup({ one, two }) {
        console.log(`one ${one.value} two ${two.value}`);
    },
});
```

The second argument is the `context`. Currently, it has the `emit` function on it, which you can use to emit an event.

```javascript
defineComponent({
    name: 'setup-context',
    setup({}, { emit }): {
        emit('mounted');
    }
});
```

#### connectedCallback

Called as part of the [web component life cycle](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks).

```javascript
defineComponent({
    name: 'connected-callback',
    connectedCallback() {
        console.log('connected to the dom');
    },
});
```

#### disconnectedCallback

Called as part of the [web component life cycle](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks).

```javascript
defineComponent({
    name: 'disconnected-callback',
    disconnectedCallback() {
        console.log('disconnected from the dom');
    },
});
```

#### adoptedCallback

Called as part of the [web component life cycle](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks).

```javascript
defineComponent({
    name: 'adopted-callback',
    adoptedCallback() {
        console.log('adopted to the dom');
    },
});
```

#### shadowMode

The mode that the [shadow root mode](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/mode)
the dom should be attached in. One of: open, closed.

```javascript
defineComponent({
    name: 'shadow-mode',
    shadowMode: 'open',
});
```

### createContext

This method is used to [create a context](https://github.com/webcomponents-cg/community-protocols/blob/main/proposals/context.md)
for a web component or set of web components. This is a solution for how to share state between many web components, for example,
when implementing theming.

To create a new context, call `createContext`

```javascript
import { createContext } from '@tybalt/core';

export const theme = createContext('theme', {
    primaryColor: 'rebeccapurple',
    secondaryColor: 'bisque',
    fontFamily: 'Consolas',
    linkColor: '#ffcc99',
});
```

The import it into your component, and pass it to `contexts`

```javascript
import { theme } from '../contexts';

export default defineComponent({
    name: 'example-link',
    props: { href: {} },
    render({ href, theme }) {
        return html`
            <style>
                .a {
                    color: ${theme.linkColor};
                }
            </style>
            <a href="${href}"><slot></slot></a>
        `;
    },
    contexts: { theme },
});
```

Now, every time there is a new theme context (say when switching from a light theme to a dark theme), we'll call render with the new `theme`.

### render

Used for rendering an html template, as produced by the html tagged template literal, and renders it into a containing element. For instance, calling the following code

```javascript
const wrapper = document.createElement('div');
const template = html`<input type="text" @change="${listener}"></input>`;

render(template, wrapper);
```

Would produce an element with the following markup

```html
<div>
    <input type="text"></input>
</div>
```

With a listener for the `change` event attached to the `input`.

## Components

Tybalt exports a set of components for use for common templating tasks. These components are
registered as soon as you require the tybalt core library; there is no extra work needed to set
them up.

### t-if

Allows you to render one template if a condition is true, and another if that condition
is false.

In the following example, on December 25th the component will render `It's Christmas!`,
but on other days it will render `It's not Christmas`.

```javascript
defineComponent({
    name: 'is-it-christmas',
    render() {
        const today = new Date();
        const isChristmas = today.getMonth() === 11 && today.getDate() === '25';
        return html`
            <t-if condition="${isChristmas}">
                <span slot="true">It's Christmas!</span>
                <span slot="false">It's not Christmas.</span>
            </t-if>
        `;
    },
});
```

### t-switch

Allows you to render a single template out of many that corresponds to a value.

In the following example, when `getCity` returns Seattle, it will recommend you
visit the Space Needle; when `getCity` returns Moscow, it will recommend you visit
Red Square; and when `getCity` returns Madrid, it will recommend you visit the Reina
Sofia.

```javascript
defineComponent({
    name: 'city-switcher',
    render() {
        const city = getCity();
        return html`
            <t-switch condition="${city}">
                <div slot="Seattle">You're in Seattle; go see the Space Needle!</div>
                <div slot="Moscow">You're in Moscow; go see Krasnii Ploshad!</div>
                <div slot="Madrid">You're in Madrid; go to the Reina Sofia</div>
            </t-switch>
        `;
    },
});
```
