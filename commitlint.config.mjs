/**
 * Conventional Commits (https://www.conventionalcommits.org), without scopes:
 * `feat: …`, never `feat(i18n): …`. The type says what kind of change it is and
 * the subject says where, so a scope only adds a second vocabulary to keep tidy.
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    /* The design snapshot and ADRs use long proper nouns; 72 is the git-log-friendly cap. */
    'header-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 100],
    'scope-empty': [2, 'always'],
  },
};
