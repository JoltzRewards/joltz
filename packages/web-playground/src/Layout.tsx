/* This example requires Tailwind CSS v2.0+ */
import React from 'react'
import classNames from 'classnames'
import { Menu, Transition } from '@headlessui/react'
import { IS_MAINNET } from './lib/constants'
import { signOut } from './lib/auth'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <div className="min-h-full">
        <div className="w-full h-1 bg-indigo-600" />
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-start">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Composer
            </h1>
            <div className="flex items-center ml-auto">
              {IS_MAINNET ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                  mainnet
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-purple-100 text-purple-800">
                  {process.env.NODE_ENV === 'test' ? 'mocknet' : 'testnet'}
                </span>
              )}
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    />
                  </Menu.Button>
                </div>
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
            </div>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="px-4 py-4 sm:px-0">
              {/* <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" /> */}
              {children}
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  )
}
