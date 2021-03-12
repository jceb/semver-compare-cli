# semver-compare-cli

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

CLI wrapper of the semver-compare library

Compare two semver version strings on the command line. The exit code is 0
(equal), 1 (greater), or 2 (smaller). In addition, a predicate can be added
that's applied when comparing the two version.

The project is a wrapper around the
[semver-compare](https://github.com/substack/semver-compare) library.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Install

Install via npm:

```
yarn global add semver-compare-cli
```

or use [deno](https://deno.land) to run it without installation:

```
https://cdn.deno.land/semver_compare_cli/versions/v1.0.4/raw/cli-deno.js
```

## Usage

### Direct comparison

For a direct comparison of two versions the following exit codes are possible:

- `0` versions are equal
- `1` the first version is larger than the second version
- `2` the first version is smaller than the second version

Example, exit code is `2` because the first version is smaller than the second
version:

```
semver-compare 1.0.0 1.0.1
```

### Comparison with predicate

For a comparison with a predicate the following exit codes are possible:

- `0` predicate applies to the comparison of the two version
- `1` predicate doesn't apply

The following predicates are supported:

- `eq`: equal
- `ge`: greater than or equal
- `gt`: greater than
- `le`: lower than or equal
- `lt`: lower than

Example, exit code is `1` because the first version is smaller than the second
version:

```
semver-compare ge 1.0.0 1.0.1
```

## Maintainers

[@jceb](https://github.com/jceb)

## Contributing

PRs accepted.

Small note: If editing the README, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2021 Jan Christoph Ebersbach <jceb@e-jc.de>
