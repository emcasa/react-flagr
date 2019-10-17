# react-flagr

React components to handle A/B testing with Flagr.

## Usage

```js
import * as Flagr from 'react-flagr'

render(
  <Flagr.Provider entityId="some-device-token" url="http://flagr.server">
    <Flagr.Switch flagKey="some">
      <Flagr.Case variant="A">
        Render variant A
      </Flagr.Case>
      <Flagr.Case variant="B">
        Render variant B
      </Flagr.Case>
    </Flagr.Switch>
  </Flagr.Provider>
)
```

## Pre-loading flags

```js
import * as Flagr from 'react-flagr'

const flags = await Flagr.fetchFlagBatch([
  'flag-a',
  'flab-b'
], {
  id: 'some-device-token'
})

// ...

render(
  <Flagr.Provider
    flags={flags}
    entityId="some-device-token"
    url="http://flagr.server">
    {/* ... */}
  </Flagr.Provider>
)
```
