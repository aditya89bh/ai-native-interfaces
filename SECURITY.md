# Security policy

## Supported versions

`ai-native-interfaces` follows semantic versioning. Security fixes are provided for the latest published minor release.

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a vulnerability

Please report vulnerabilities privately — do not open a public issue for security problems.

- Preferred: open a private advisory via GitHub Security Advisories at
  https://github.com/aditya89bh/ai-native-interfaces/security/advisories/new
- Include a description, affected version(s), reproduction steps or a proof of concept, and the potential impact.

You can expect an initial acknowledgement within a few days. Once the report is triaged, we will work with you on a fix and a coordinated disclosure timeline, and will credit you in the release notes if you wish.

## Scope

This library is presentational and has no runtime dependencies and no network, storage, or backend access. The most relevant classes of issues are therefore:

- Cross-site scripting via rendered props or unsafe HTML handling.
- Supply-chain concerns in the published package (`dist/`) or the build/release pipeline.

General usage questions are not security issues — please use [SUPPORT.md](SUPPORT.md) instead.
