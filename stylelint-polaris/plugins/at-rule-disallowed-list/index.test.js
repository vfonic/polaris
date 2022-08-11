const {messages, ruleName} = require('.');

testRule({
  ruleName,
  plugins: [__dirname],
  config: {
    // Using a RegExp ensures we disallow `@mixin id` and `@mixin id()`
    mixin: [/^disallowed-mixin/],
    include: [/^disallowed-mixin/, /^prefix-.+/, 'disallowed-include'],
    // Nifty pattern to disallow the usage of a given at-rule.
    disallowedAtRuleName: [/.*/],
  },
  accept: [
    {
      code: '@mixin allowed-mixin {}',
      description: 'Defining an allowed mixin name',
    },
    {
      code: '@mixin allowed-mixin($value) {}',
      description: 'Defining an allowed mixin name with parameters',
    },
    {
      code: '@include allowed-include {}',
      description: 'Defining an allowed include name',
    },
    {
      code: '@include allowed-include() {}',
      description: 'Defining an allowed include name with parameters',
    },
    {
      code: '@include valid-prefix-mixin {}',
      description: 'Defining an allowed include name with a valid prefix',
    },
  ],
  reject: [
    {
      code: `@include disallowed-include {}`,
      description: 'Defining a disallowed include name',
      message: messages.rejected(
        'include',
        'disallowed-include',
        'disallowed-include',
      ),
    },
    {
      code: '@mixin disallowed-mixin {}',
      description: 'Defining a disallowed mixin name',
      message: messages.rejected(
        'mixin',
        'disallowed-mixin',
        '^disallowed-mixin',
      ),
    },
    {
      code: '@mixin disallowed-mixin($value) {}',
      description: 'Defining a disallowed mixin name with parameters',
      message: messages.rejected(
        'mixin',
        'disallowed-mixin($value)',
        '^disallowed-mixin',
      ),
    },
    {
      code: '@include prefix-mixin {}',
      description: 'Defining an include name with a disallowed prefix',
      message: messages.rejected('include', 'prefix-mixin', '^prefix-.+'),
    },
    {
      code: '@disallowedAtRuleName {}',
      description: 'Defining a disallowed at-rule',
      message: messages.rejected('disallowedAtRuleName', '', '.*'),
    },
    {
      code: '@disallowedAtRuleName at-rule-id {}',
      description: 'Defining a disallowed at-rule with a custom at-rule-id',
      message: messages.rejected('disallowedAtRuleName', 'at-rule-id', '.*'),
    },
  ],
});
