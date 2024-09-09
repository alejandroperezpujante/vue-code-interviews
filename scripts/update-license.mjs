#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs'
import { urlJoin, esMain } from './utils.mjs'

function updateLicenseYear() {
  const licensePath = urlJoin(import.meta.url, '..', 'LICENSE.txt')

  try {
    const licenseContent = readFileSync(licensePath, 'utf8')
    const currentYear = new Date().getFullYear()
    const updatedContent = licenseContent.replace(
      /Copyright \(c\) \d{4}/,
      `Copyright (c) ${currentYear}`
    )
    writeFileSync(licensePath, updatedContent, 'utf8')
    console.log('License year updated successfully.')
  } catch (error) {
    console.error('Error updating license year:', error)
  }
}

if (esMain(import.meta)) {
  console.log('Updating license year...')
  updateLicenseYear()
}
