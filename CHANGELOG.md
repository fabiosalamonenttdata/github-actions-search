# Changelog

## 1.0.0

### &nbsp;&nbsp;&nbsp;Features

- Support repositories where a branch other than 'main' is set as the default branch &nbsp;-&nbsp; by **d-kimsuon** [<samp>(87261)</samp>](https://github.com/fabiosalamonenttdata/github-actions-search/commit/87261ca)
- Auto focus on input erea &nbsp;-&nbsp; by **kimukei** [<samp>(51358)</samp>](https://github.com/fabiosalamonenttdata/github-actions-search/commit/51358d3)
- Add handleKeyDown EventListener to select item &nbsp;-&nbsp; by **kimukei** [<samp>(4bb18)</samp>](https://github.com/fabiosalamonenttdata/github-actions-search/commit/4bb1821)
- **i18n**:
  - Add multi-language support with auto-detection &nbsp;-&nbsp; by **Fabio Salamone** [<samp>(264d9)</samp>](https://github.com/fabiosalamonenttdata/github-actions-search/commit/264d9ae)
  - Add multi-language support with auto-detection &nbsp;-&nbsp; by **Fabio Salamone** [<samp>(caf87)</samp>](https://github.com/fabiosalamonenttdata/github-actions-search/commit/caf874c)
- **workflow**:
  - Enhance workflow file handling and display &nbsp;-&nbsp; by **Fabio Salamone** [<samp>(208b0)</samp>](https://github.com/fabiosalamonenttdata/github-actions-search/commit/208b09c)

### &nbsp;&nbsp;&nbsp;Bug Fixes

- Fetch the default branch name &nbsp;-&nbsp; by **kimukei** [<samp>(a2a38)</samp>](https://github.com/fabiosalamonenttdata/github-actions-search/commit/a2a386e)
- Allow release changelog author names in cspell &nbsp;-&nbsp; [<samp>(9e705)</samp>](https://github.com/fabiosalamonenttdata/github-actions-search/commit/9e70585)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/fabiosalamonenttdata/github-actions-search/compare/d9a383a6a8f8c099d185afbc9e476a11376d6e2d...1.0.0)

## 0.0.6

### &nbsp;&nbsp;&nbsp;Features

- Add multi-language support (English and Japanese) with automatic browser language detection
- Implement i18n (Internationalization) system with easy extensibility for future languages
- Add console logging for workflow discovery debugging
- **Display workflow names from YAML files**: Show the `name` field from workflow YAML files instead of just the filename, providing more meaningful workflow identification

### &nbsp;&nbsp;&nbsp;Bug Fixes

- Fix workflow files parsing to correctly extract entries from GitHub API response
- Resolve issue where "No results found" was shown despite workflows being present
- Fix CORS issue when fetching workflow YAML files from raw.githubusercontent.com

### &nbsp;&nbsp;&nbsp;Chore

- Increase visual regression test threshold to 0.04 to accommodate UI changes from new features
- Add workflow for updating visual regression snapshots on Linux via GitHub Actions

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/d-kimuson/github-actions-search/compare/v0.0.5...0.0.6)

## 0.0.5

_No significant changes_

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/d-kimuson/github-actions-search/compare/v0.0.4...0.0.5)

## 0.0.4

_No significant changes_

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/d-kimuson/github-actions-search/compare/v0.0.3...0.0.4)

## 0.0.3

### &nbsp;&nbsp;&nbsp;Features

- Auto focus on input erea &nbsp;-&nbsp; by **kimukei** [<samp>(51358)</samp>](https://github.com/d-kimuson/github-actions-search/commit/51358d3)
- Add handleKeyDown EventListener to select item &nbsp;-&nbsp; by **kimukei** [<samp>(4bb18)</samp>](https://github.com/d-kimuson/github-actions-search/commit/4bb1821)

### &nbsp;&nbsp;&nbsp;Bug Fixes

- Fetch the default branch name &nbsp;-&nbsp; by **kimukei** [<samp>(a2a38)</samp>](https://github.com/d-kimuson/github-actions-search/commit/a2a386e)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/d-kimuson/github-actions-search/compare/v0.0.2...0.0.3)

## 0.0.2

### &nbsp;&nbsp;&nbsp;Features

- Support repositories where a branch other than 'main' is set as the default branch &nbsp;-&nbsp; by **d-kimsuon** [<samp>(87261)</samp>](https://github.com/d-kimuson/github-actions-search/commit/87261ca)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/d-kimuson/github-actions-search/compare/v0.0.1...0.0.2)

## [0.0.1] - 2024-12-27

### Added

- Initial release
- Core functionality
  - Incremental search GitHub Actions's workflow
  - Personal pinning workflow
- Basic documentation

[Unreleased]: https://github.com/username/repository/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/username/repository/releases/tag/v0.0.1

## [Unreleased]

### Added

### Changed

### Removed

### Fixed
