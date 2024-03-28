import {test, expect} from 'vitest'
import renderer from 'react-test-renderer'
import InlineCenter from './InlineCenter'

test('renders default', () => {
  const tree = renderer.create(<InlineCenter>text</InlineCenter>).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders disabled', () => {
  const tree = renderer
    .create(<InlineCenter disabled>text</InlineCenter>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
