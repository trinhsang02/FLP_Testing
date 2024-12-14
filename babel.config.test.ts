import { describe, it, expect, vi } from 'vitest';

describe('babel.config.js', () => {
  it('should return the correct babel configuration', () => {
    const api = {
      cache: vi.fn()
    };

    const babelConfig = require('../babel.config.js');
    const config = babelConfig(api);

    expect(api.cache).toHaveBeenCalledWith(true);
    expect(config).toEqual({
      presets: ['babel-preset-expo']
    });
  });
});
