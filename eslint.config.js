(async () => {
  const flypeng = await import('@flypeng/eslint-config');
  module.exports = flypeng.default();
})();
