/* This example requires Tailwind CSS v2.0+ */
import React from 'react'
import classNames from 'classnames'
import { Menu, Transition } from '@headlessui/react'
import { Outlet } from 'react-router-dom'

import { IS_MAINNET } from './lib/constants'
import { Auth } from './modules'
import { TXActivityFeed } from './components'

export const Layout: React.FC = () => {
  const { signOut, isSignedIn, userData, did } = Auth.useAuth()
  return (
    <>
      <div className="h-full">
        <div className="w-full h-1 bg-indigo-600" />
        <Transition
          show={isSignedIn}
          as={React.Fragment}
          enter="transition transform ease-out duration-250"
          enterFrom="transition transform opacity-0 -translate-y-full"
          enterTo="transition transform opacity-100 translate-y-0"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <header className="bg-white shadow">
            <div className="py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-start">
              <div className="flex items-center justify-between">
                <img
                  src="/trubit-black.svg"
                  width="150"
                  alt="Trubit Web Playground"
                  title="Trubit Web Playground"
                />
                <div className="ml-2">
                  {IS_MAINNET ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                      mainnet
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-purple-100 text-purple-800">
                      {process.env.NODE_ENV === 'test' ? 'mocknet' : 'testnet'}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center ml-auto">
                {isSignedIn ? (
                  <>
                    <TXActivityFeed />
                    <Menu as="div" className="ml-3 relative">
                      <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        {
                          <img
                            className="h-10 w-10 rounded-full"
                            src={
                              userData?.profile.avatar ||
                              `https://ui-avatars.com/api/?name=${did}&background=0D8ABC&color=fefefe`
                            }
                            alt={did || ''}
                            title={did || ''}
                          />
                        }
                      </Menu.Button>
                      <Transition
                        as={React.Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={signOut}
                                className={classNames(
                                  'w-full text-left px-4 py-2 text-sm text-gray-700',
                                  {
                                    'bg-gray-100': active,
                                  },
                                )}
                              >
                                Sign Out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                ) : null}
              </div>
            </div>
          </header>
        </Transition>
        <main>
          <div className="px-4 py-4 sm:px-0">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  )
}
