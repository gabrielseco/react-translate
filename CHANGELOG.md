## [1.0.1](https://github.com/gabrielseco/react-translate/compare/v1.0.0...v1.0.1) (2020-08-21)


### Bug Fixes

* **deps:** update dependency @rogal/react-translate to v1.0.0 ([#50](https://github.com/gabrielseco/react-translate/issues/50)) ([aa700a5](https://github.com/gabrielseco/react-translate/commit/aa700a5a3c1dd3abc8013971ad1eb06bbcfd2e23))
* **deps:** update dependency html-react-parser to ^0.13.0 ([#51](https://github.com/gabrielseco/react-translate/issues/51)) ([8c02402](https://github.com/gabrielseco/react-translate/commit/8c0240291bd609245227c7920859d15de6a72d35))
* **deps:** update dependency next to v9.3.2 [security] ([#30](https://github.com/gabrielseco/react-translate/issues/30)) ([4c06dc2](https://github.com/gabrielseco/react-translate/commit/4c06dc248d61811db624f19acede794124a30fd7))
* **deps:** update dependency next to v9.5.2 ([#52](https://github.com/gabrielseco/react-translate/issues/52)) ([f2adc5b](https://github.com/gabrielseco/react-translate/commit/f2adc5b757abc73d5824ee5bc81da4d7bc9e7db2))



# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [to-be-deprecated]

## [unreleased]
### Added
### Changed
### Fixed
### Removed
### BREAKING CHANGES

## [1.0.0] - 2020-08-20
- Release it 🚀🚀🚀

## [1.0.0-beta.18] - 2020-08-01
### BREAKING CHANGES
  You cannot access anymore to context directly

### Added
- Improved useTranslate so you can access to properties of the context
### Removed
 - Remove exported context

## [1.0.0-beta.17] - 2020-07-26
### Fixed
  - Fixed an uncontrolled error when a deep translation was not defined in a json file

## [1.0.0-beta.16] - 2020-07-22
### Fixed
  - Fixed an uncontrolled error when you don't have the locale json assigned in your config

## [1.0.0-beta.15] - 2020-06-10
### BREAKING CHANGES
### Changed
  - instead of getting value as prop of the provider pass i18n prop and change Configuration interface to I18nConfiguration

## [1.0.0-beta.14] - 2020-02-04
### Added
  - Trans component accepts an array with translation so you can join phrases

### Fixed
  - Fix case when zero items and we should translate as plural

## [1.0.0-beta.13] - 2020-01-31
### Added
  - Posibility of using the t function outside of react components, now you can use it instancing a configuration and you can use it outside of React lifecycle

## [1.0.0-beta.12] - 2020-01-25

### Added
  - Update language when we change the value of the provider
 
## [1.0.0-beta.11] - 2020-01-19

### Added
  - Almost a stable beta version
