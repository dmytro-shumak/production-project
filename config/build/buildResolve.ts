import type { ResolveOptions } from 'webpack';
import type { BuildOptions } from './types/config';

export const buildResolve = ({ paths }: BuildOptions): ResolveOptions => ({
  extensions: ['.tsx', '.ts', '.js'],
  preferAbsolute: true,
  modules: [paths.src, 'node_modules'],
  mainFiles: ['index'],
  alias: {},
});
