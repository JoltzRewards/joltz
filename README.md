# Jotlz 

Joltz Monorepo

## Troubleshooting/Warnings

We are still in the process of getting everything cleaned up here. If you have trouble starting up the web playground, you can check out [the older repository](https://github.com/TrubitTech/experiments).

## Environment Setup

We are currently using node `v17.4.0`–you can (and should) use [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm) to make sure you're using the correct version while working in this repository.

## Preparing For Development

1. `git clone git@github.com:TrubitTech/TrubitTech.git`
2. `cd TrubitTech && yarn install`

## Starting the Web Playground

1. `cd applications/web-playground`
2. `yarn start`

---

## Publishing New Releases

When you are done working on a new branch, run `yarn changeset` from the root of the repository to generate a new changeset. Select the packages that should be included in the release, choose the release type, and provide a summary of your changes. Include the resulting changeset in your commits and open up a PR.

When your PR gets merged, a new changeset PR will be opened (or updated, if one already exists) detailing all of the changes in the upcoming release–when this PR is merged, packages will automatically be published out to NPM.
