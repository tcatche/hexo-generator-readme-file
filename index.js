
'use strict';
const generator = require('./src/generator')

hexo.extend.generator.register('issues', function(locals) {
  return generator(this, locals)
})
