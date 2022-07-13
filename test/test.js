import assert from 'assert'
import renderedContent from '../example/dist/index.js'

assert.equal(
    renderedContent,
    '<p>Hello 👋 , my name is John Doe and I am 42 year old ✨</p>\n' +
    '&lt;b&gt;Very nice!&lt;/b&gt;'
)

console.log('Integration test passed 👍');
