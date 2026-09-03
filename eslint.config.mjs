import next from 'eslint-config-next/core-web-vitals';

// eslint-config-next v16 is already flat config (a Linter.Config[]), so it is
// re-exported directly — FlatCompat is only for legacy .eslintrc configs and
// crashes on this one. Its own global ignores cover .next/, out/ and build/.
export default next;
