## [1.0.2](https://github.com/gabrielseco/react-translate/compare/v1.0.1...v1.0.2) (2020-12-17)


### Bug Fixes

* **deps:** update dependency @rogal/react-translate to v1.0.1 ([b488e2f](https://github.com/gabrielseco/react-translate/commit/b488e2fba0da9005866bfeac4cf5f791b01048bc))
* **deps:** update dependency html-react-parser to ^0.14.0 ([94f0eb6](https://github.com/gabrielseco/react-translate/commit/94f0eb65ab200814502cce2dbc9cf902242d632b))
* **deps:** update dependency next to v10 ([#160](https://github.com/gabrielseco/react-translate/issues/160)) ([4d2a3d4](https://github.com/gabrielseco/react-translate/commit/4d2a3d40f81d5d081318ad6743997f27e5de0fbf))
* **deps:** update dependency next to v10.0.1 ([13184cd](https://github.com/gabrielseco/react-translate/commit/13184cd4b56ce6b570a0b31f8ee55ea11d2e28a8))
* **deps:** update dependency next to v10.0.2 ([bb3a0ac](https://github.com/gabrielseco/react-translate/commit/bb3a0ac93f9a203215de7485dabdc6678145685a))
* **deps:** update dependency next to v10.0.3 ([8330ca6](https://github.com/gabrielseco/react-translate/commit/8330ca658c3b43c52ea646b88e2a73447d613460))
* **deps:** update dependency next to v9.5.3 ([4f76dce](https://github.com/gabrielseco/react-translate/commit/4f76dcefb06350dcab92d7164aba7757e3d910bc))
* **deps:** update dependency next to v9.5.4 ([bf35c3d](https://github.com/gabrielseco/react-translate/commit/bf35c3dbdf1096041cdba013f9e983093683a8e1))
* **deps:** update dependency next to v9.5.5 ([a7b1015](https://github.com/gabrielseco/react-translate/commit/a7b10154fa42b97587c2fa9d8e824f1c203c1ab8))



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


## [1.0.1] - 2020-08-21

### Fixed
- withTranslate bug props not passed to decorated component


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
