/**
 * Conventional Commits (https://www.conventionalcommits.org).
 *
 * `scope` is optional and free-form: the natural scopes here are screens (`home`,
 * `about`, `projects`, `blog`, `resume`, `contact`), plus `i18n`, `theme`, `seo`.
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    /* The design snapshot and ADRs use long proper nouns; 72 is the git-log-friendly cap. */
    'header-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 100],
  },
};
