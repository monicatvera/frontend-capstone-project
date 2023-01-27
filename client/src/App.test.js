import { render, screen } from '@testing-library/react';
import App from './App';
async function withFetch() {
  const res = await fetch('/api')
  const res2 = await fetch('/menu')
  const json = await res.json()
 const json2 = await res2.json()

  return [json, json2]
}
const unmockedFetch = global.fetch
 
beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
})

afterAll(() => {
  global.fetch = unmockedFetch
})

describe('withFetch', () => {
  test('works', async () => {
    const json = await withFetch()
    expect(Array.isArray(json)).toEqual(true)
  })
})
;
