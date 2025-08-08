import flypeng from '@flypeng/eslint-config';

/** @type {import('eslint').Linter.Config[]} */
export default [
    ...flypeng(),
    {
        ignores: ['README.md', 'dist', 'node_modules', 'build', 'coverage'],
    },
];
