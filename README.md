# coding-project-template

# npm audit report

jsonwebtoken  <=8.5.1
Severity: moderate
jsonwebtoken unrestricted key type could lead to legacy keys usage  - https://github.com/advisories/GHSA-8cf7-32gw-wr33
jsonwebtoken's insecure implementation of key retrieval function could lead to Forgeable Public/Private Tokens from RSA to HMAC - https://github.com/advisories/GHSA-hjrf-2m68-5959   
jsonwebtoken vulnerable to signature validation bypass due to insecure default algorithm in jwt.verify() - https://github.com/advisories/GHSA-qwph-4952-7xr6
fix available via `npm audit fix --force`
Will install jsonwebtoken@9.0.0, which is a breaking change
node_modules/jsonwebtoken

1 moderate severity vulnerability

To address all issues (including breaking changes), run:
  npm audit fix --force

