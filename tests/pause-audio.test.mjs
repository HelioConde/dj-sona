import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
const home=readFileSync(new URL('../src/Home.jsx',import.meta.url),'utf8')
const qa=readFileSync(new URL('../scripts/visual-qa.mjs',import.meta.url),'utf8')
test('ativar som respeita pausa manual e preferencia do sistema',()=>{
  assert.match(home,/if \(next && !reduceMotion && !videoPaused\)/)
  assert.match(home,/if \(reduceMotion \|\| videoPaused\)/)
  assert.match(home,/aria-pressed=\{videoPaused\}/)
})
test('playwright cobre a regressao audio vs pausa',()=>{
  assert.match(qa,/mobile-manual-pause\.png/)
  assert.match(qa,/video\.paused/)
})
