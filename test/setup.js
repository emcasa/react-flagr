import {JSDOM} from 'jsdom'
import chai from 'chai'

const dom = new JSDOM('<!doctype html><html><body id="root"></body></html>')

global.window = dom.window
global.document = dom.window.document
global.navigator = {userAgent: 'node.js'}

global.expect = chai.expect
