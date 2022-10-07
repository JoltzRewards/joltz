import { StorageBridge } from '../src'

describe('StorageBridge', () => {
  it('should support creating instances', () => {
    const bridge = new StorageBridge()

    expect(bridge).toBeInstanceOf(StorageBridge)
  })
})
