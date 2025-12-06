# cookie-fetcher
Used for fetching site-cookies to access beatmap download links

1. Prepare chromium profile `cookie-fetcher/puppeteer_profile`
```
admin@nekoha:~/git/mirror.nekoha.moe/cookie-fetcher/puppeteer_profile$ ll
total 236K
drwxrwxr-x 39 admin admin 4.0K Dec  6 18:56  .
drwxrwxr-x  7 admin admin 4.0K Nov  2 08:00  ..
drwxrwxr-x  2 admin admin 4.0K Oct 26 07:43  AmountExtractionHeuristicRegexes
drwxrwxr-x  2 admin admin 4.0K Oct 26 07:43  AutofillStates
drwxrwxr-x  3 admin admin 4.0K Oct 26 07:43  CertificateRevocation
drwxrwxr-x  2 admin admin 4.0K Oct 26 07:43  component_crx_cache
...
```
>By copying a puppeteer_profile from your local system <strong>with a logged in osu! account</strong> to your instance of the cookie-fetcher you want to use
