# Changelog

## [1.3.0](https://github.com/sindrekjr/reduceToChunks/compare/v1.2.0...v1.3.0) - 2020-09-21
### Added
- Generics! All uses of `any` have been replaced.
- Efficiency improvements to regular chunking by size.

### Changed
- Explicitly set `preserveEmptyEntries` to `false` (rather than `undefined`) by default.


## [1.2.0](https://github.com/sindrekjr/reduceToChunks/compare/v1.1.0...v1.2.0) - 2020-09-20
### Added
- Various new sections and improvements to [README](https://github.com/sindrekjr/reduceToChunks/blob/master/README.md).
- Dates to Changelog.

### Changed
- Start allowing passed functions to return `undefined`, which will result in the given item being filtered.
- Condensed "Usage" section in [README](https://github.com/sindrekjr/reduceToChunks/blob/master/README.md) while adding important notes and advanced examples.

### Removed
- Type `IndexResolvableFunction` in favour of inline notation.
- Redundant function `wholeNumber`.


## [1.1.0](https://github.com/sindrekjr/reduceToChunks/compare/v1.0.0...v1.1.0) - 2020-09-19
### Added
- New overload `reduceToChunks(array, chunkFunc, preserveEmptyEntries?)`, which allows resolving chunks through a passed function.
- Changelog.

## [1.0.0](https://github.com/sindrekjr/reduceToChunks/tree/v1.0.0) - 2020-09-19
Initial stable version with the basic functionality `reduceToChunks(array, chunkSize)`.
