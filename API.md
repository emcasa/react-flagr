# API

## Provider

Initializes `react-flagr`'s context.

### Props

| prop          | type     | description
|---------------|----------|---------
| flags         | `Object` | Preloaded flag variants.
| url           | `String` | Url to the Flagr server.
| entityId      | `String` | -
| entityType    | `String` | -
| entityContext | `Object` | -

### Context

| prop      | type       | description
|-----------|------------|-----------------
| flags     | `Object`   | Resolved flags.
| fetchFlag | `Function` | Fetches a flag and updates `react-flagr`'s context.

## Switch

Renders the first child `Case` element which matches the `variantKey` from flagr's `postEvaluation` response for a given `flagKey`.
All children of `Switch` should be instances of `Case`.

### Props

| prop    | type     | description
|---------|----------|--------
| flagKey | `String` | -

## Case

### Props

| prop     | type                     | description
|----------|--------------------------|---------------
| variant  | `String|null`            | Target variant value. Omitting this prop results in a "default" case which is rendered when no other `Case` matches.
| children | `React.Element|Function` | React element or a render function which takes the `postEvaluation` response.

----------------------

## withFlagr

Injects `react-flagr`'s context into a component.

## withFlag(flagKey, [mapFlagToProps])

Provides the `postEvaluation` response for a `flagKey`.

### Arguments

| argument            | type              | description
|---------------------|-------------------|---------------
| 1. `flagKey`        | `String|Function` | Flag key or a function which maps props to a flag key.
| 2. `mapFlagToProps` | `Function`        | Function to map flagr's `postEvaluation` response to an object which is merged to the target component's props. Defaults to mapping the response object to `flag`.

----------------------

## fetchFlag(flagKey, entity, [options])

Get flags form `/evaluation` API.

### Arguments

| argument      | type           | description
|---------------|----------------|---------------
| 1. `flagKey`  | `String`       | -
| 2. `entity`   | `FlagrEntity`  | -
| 3. `options`  | `FlagrOptions` | -

## fetchFlagBatch(flagKeys, entity, [options])

Get flags form `/evaluation/batch` API.

### Arguments

| argument      | type           | description
|---------------|----------------|---------------
| 1. `flagKeys` | `String[]`     | -
| 2. `entity`   | `FlagrEntity`  | -
| 3. `options`  | `FlagrOptions` | -
