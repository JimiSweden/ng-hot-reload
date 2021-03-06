## 2.1.0
- Fixed/added ngAnimate support [#14](https://github.com/noppa/ng-hot-reload/issues/14)
  [759484a](https://github.com/noppa/ng-hot-reload/commit/759484ab8f713163cc216acd1b8201ff665592f4)
- Minor updates to the demo, made it clearer that the loader is not supposed to be used in production
  [97b6b52](https://github.com/noppa/ng-hot-reload/commit/97b6b523ebeb672b45b333e1807a20e8b0975db0)
- Switched to using slightly better Webpack devtool
  [f53eaf2](https://github.com/noppa/ng-hot-reload/commit/f53eaf2ceffbae42e923f5a2157a6e1c94caf11b)

## 2.0.3
- Updated build dependencies, no breaking changes

## 2.0.2
- Updated build dependencies, no breaking changes

## 2.0.0
- Fix [issue #4](https://github.com/noppa/ng-hot-reload/issues/4)
- Remove special support for UI-router  
  UI-router supports [routing to a component](https://ui-router.github.io/guide/ng1/route-to-component),
  which works much better with this library than the hacky route reloading that we tried to do before.
- Fix an issue that caused only the first component to update in cases where there were more than one
  instances of the component active
- Add options support for the Webpack loader
