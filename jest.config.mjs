import nextJest from 'next/jest.js';

// next/jest compiles with SWC (the same compiler as `next build`), so no
// Babel config is needed — adding one would also switch Next off SWC.
const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default createJestConfig(config);
