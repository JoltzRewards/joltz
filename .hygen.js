const inflection = require('inflection')
const path = require('path')
const findRoot = require('find-root')
const flatten = require('flatten')
const fs = require('fs')
const glob = require('glob')

// as per https://yarnpkg.com/blog/2018/02/15/nohoist/ -
// "workspaces" can be an array or an object that contains "packages"
function getPackages(packageJson) {
  if (!('workspaces' in packageJson)) {
    return null
  }
  const { workspaces } = packageJson
  if (Array.isArray(workspaces)) {
    return workspaces
  }
  return workspaces.packages || null
}

function getWorkspaces(from) {
  const root = findRoot(from, (dir) => {
    const pkg = path.join(dir, 'package.json')
    return fs.existsSync(pkg) && getPackages(require(pkg)) !== null
  })

  const packages = getPackages(require(path.join(root, 'package.json')))
  const flattened = flatten(
    packages.map((name) =>
      // The trailing / ensures only dirs are picked up
      glob.sync(path.join(root, `${name}/`)),
    ),
  )

  return { workspaces: flattened, packages }
}

module.exports = {
  templates: path.resolve(__dirname, '.templates'),
  helpers: {
    inflection,
    // componentCase: (s) => inflection.camelize(s),
    componentCase: (s) => {
      if (s.includes('-')) {
        // e.g. Toast-Notification
        // return 'ToastNotification'
        const parts = s.split('-')
        const titleCasing = parts.map((p) => inflection.titleize(p))

        return titleCasing.join('')
      }

      return inflection.titleize(s)
    },
    kebobCase: (s) => {
      const lowercaseString = s.toLowerCase()

      return inflection.dasherize(lowercaseString)
    },
    workspaces: getWorkspaces(__dirname).workspaces,
    packages: getWorkspaces(__dirname).packages,
    paths: {
      components: path.resolve(__dirname, 'packages/ui/src'),
    },
  },
}
