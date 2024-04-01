# react-inline-center

[![npm version](https://badgen.net/npm/v/react-inline-center)](https://www.npmjs.com/package/react-inline-center)
[![minzipped size](https://badgen.net/bundlephobia/minzip/react-inline-center)](https://bundlephobia.com/result?p=react-inline-center)
![module](https://badgen.net/badge/module/esm,cjs?list=1)

Centering inline elements like magic:
- No need to add the wrapper element
- The child element (image, icon etc.) can be any size
- Only align to the first line of adjacent text

## Install

```
npm install react-inline-center
```

## Demo

- https://stackblitz.com/~/github.com/ambar/react-anything
- https://codesandbox.io/s/react-inline-center-hu81q

## Usage

```js
import InlineCenter from 'react-inline-center'

render(
  <>
    <Button>
      <InlineCenter>
        <MyIcon />
      </InlineCenter>
      label.
    </Button>
    <p>
      <InlineCenter>
        <image />
      </InlineCenter>
      text.
    </p>
  </>
)
```
