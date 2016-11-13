const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const sinonChai = require('sinon-chai')

chai.use(chaiAsPromised)
chai.use(sinonChai)

global.expect = chai.expect
global.sinon = require('sinon')

const noop = () => {}

require.extensions['.css'] = noop
require.extensions['.less'] = noop
require.extensions['.ico'] = noop
require.extensions['.png'] = noop
require.extensions['.svg'] = noop
