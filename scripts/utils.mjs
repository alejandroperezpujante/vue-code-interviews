// Code extracted from the following repositories, all credit to the original authors:
// - https://github.com/tschaub/es-main
// - https://github.com/mcollina/desm

import { dirname, extname, join } from 'node:path'
import { argv } from 'node:process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

/**
 * Get the directory name of a URL.
 * @param {string | URL} url - The URL to get the directory name from.
 * @returns {string} The directory name of the URL.
 */
export function urlDirname(url) {
  return dirname(fileURLToPath(url))
}

/**
 * Join a URL with a path.
 * @param {string | URL} url - The URL to join with the path.
 * @param {...string} paths - The paths to join to the URL.
 * @returns {string} The joined URL.
 */
export function urlJoin(url, ...paths) {
  return join(urlDirname(url), ...paths)
}

/**
 * Strip the extension from a filename if it has one.
 * @param {string} name A filename.
 * @return {string} The filename without a path.
 */
export function stripExt(name) {
  const extension = extname(name)
  if (!extension) {
    return name
  }

  return name.slice(0, -extension.length)
}

/**
 * Check if a module was run directly with node as opposed to being
 * imported from another module.
 * @param {ImportMeta} meta The `import.meta` object.
 * @return {boolean} The module was run directly with node.
 */
export function esMain(meta) {
  if (!meta || !argv[1]) {
    return false
  }

  const require = createRequire(meta.url)
  const scriptPath = require.resolve(argv[1])

  const modulePath = fileURLToPath(meta.url)

  const extension = extname(scriptPath)
  if (extension) {
    return modulePath === scriptPath
  }

  return stripExt(modulePath) === scriptPath
}
