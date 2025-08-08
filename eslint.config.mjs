import flypeng from '@flypeng/eslint-config';

/** @type {import('eslint').Linter.Config[]} */
export default [
    ...flypeng(),
    {
        ignores: ['*.md', 'dist', 'node_modules', 'build', 'coverage', 'docs'],
    },
];
