import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { CollectionIcon, CheckIcon, XIcon } from '@heroicons/react/outline'
import cx from 'classnames'
import fetch from 'cross-fetch'
import {
  connectWebSocketClient,
  Subscription,
  AccountsApi,
  Configuration,
} from '@stacks/blockchain-api-client'
import { CheckmarkIcon, Spinner } from '@stacks/ui'
import { Transaction } from '@stacks/stacks-blockchain-api-types'
import { Auth } from '../../modules'
import { IS_MAINNET } from '../../lib/constants'

export enum TransactionType {
  'smart_contract' = 'Contract Deployment',
  'token_transfer' = 'Token Transfer',
  'contract_call' = 'Contract Call',
  'poison_microblock' = 'Poison Microblock',
  'coinbase' = 'Coinbase',
}

export enum TransactionStatus {
  'success' = 'Success',
  'abort_by_response' = 'Aborted',
  'abort_by_post_condition' = 'Aborted',
}

export const TXActivityFeed = () => {
  const { wallet } = Auth.useAuth()
  const [isFetching, setIsFetching] = React.useState(true)
  const subscription = React.useRef<Subscription | null>(null)
  const [transactions, setTransactions] = React.useState<Transaction[] | null>(
    null,
  )
  // const transactions = [
  //   {
  //     txId: 'xxx-yyy',
  //     network: 'testnet',
  //     recipient: 'STX010101',
  //     url:
  //       'https://explorer.stacks.co/txid/0x4809d959009c0aa8cf0de46c9011255bcb427a69d2724f0964336192278d1c8c?chain=mainnet',
  //     time: new Date().toLocaleDateString(),
  //   },
  //   {
  //     recipient: 'STX020202',
  //     txId: 'yyy-zzz',
  //     network: 'testnet',
  //     url:
  //       'https://explorer.stacks.co/txid/0x4809d959009c0aa8cf0de46c9011255bcb427a69d2724f0964336192278d1c8c?chain=mainnet',
  //     time: new Date().toLocaleDateString(),
  //   },
  // ]

  const api = React.useMemo(
    () =>
      new AccountsApi(
        new Configuration({
          fetchApi: fetch,
          basePath: `https://stacks-node-api.${
            IS_MAINNET ? 'mainnet' : 'testnet'
          }.stacks.co`,
        }),
      ),
    [],
  )

  React.useEffect(() => {
    async function getTransactions() {
      if (!wallet) return

      const response = await api.getAccountTransactions({
        principal: wallet,
        limit: 50,
      })

      setTransactions(response.results as Transaction[])
      setIsFetching(false)
    }

    getTransactions()
  }, [api, wallet])

  // const getSubscription = React.useCallback(async () => {
  //   if (wallet) {
  //     // const client = await connectWebSocketClient(
  //     //   'wss://stacks-node-api.testnet.stacks.co/',
  //     // )
  //     // const sub = await client.subscribeAddressTransactions(wallet, (event) =>
  //     //   console.log('sub event:', event),
  //     // )

  //     // return setSubscription(sub)
  //   }

  //   return
  // }, [wallet])

  React.useEffect(() => {
    async function getSubscription() {
      const client = await connectWebSocketClient(
        'wss://stacks-node-api.testnet.stacks.co/',
      )

      const sub = await client.subscribeAddressTransactions(wallet!, (event) =>
        console.info('address tx:', event),
      )

      subscription.current = sub
    }

    if (!subscription.current && wallet) {
      getSubscription()
    }

    return () => {
      if (subscription.current) {
        subscription.current.unsubscribe()
      }
    }

    // return () => {
    //   subscription.unsubscribe()
    // }
  }, [wallet, subscription])

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={cx(
              'group bg-white rounded-full inline-flex items-center text-base border border-gray-300 p-3',
            )}
          >
            {isFetching ? (
              <Spinner size="sm" className="text-gray-600" />
            ) : (
              <CollectionIcon
                width={16}
                className="text-gray-600 group-hover:text-gray-500"
              />
            )}
            <span
              className={cx(
                'absolute bottom-0.5 right-0.5 w-2.5 h-2.5 block rounded-full ring-2 ring-white bg-green-400',
                {
                  'animate-ping': true,
                },
              )}
            />
            <span
              className={cx(
                'absolute bottom-0.5 right-0.5 w-2.5 h-2.5 block rounded-full ring-3 ring-white bg-green-400',
              )}
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="rounded-lg overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 absolute z-10 right-0 transform translate-x-3 mt-3 w-screen max-w-xs">
              <div className="ring-1 ring-black ring-opacity-5 bg-white">
                <div className="relative flex flex-col items-stretch justify-start max-h-80 overflow-scroll ">
                  {transactions?.map((tx) => (
                    <a
                      key={tx.tx_id}
                      href={`https://explorer.stacks.co/txid/${tx.tx_id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-start p-4 py-3 border-solid border-gray-100 border-b-2 block hover:bg-gray-50 transition ease-in-out duration-150"
                    >
                      <div className="flex items-center justify-start">
                        <div className="pr-3">
                          {tx.tx_status === 'success' ? (
                            <CheckIcon width={16} color="black" />
                          ) : (
                            <XIcon width={18} color="red" />
                          )}
                        </div>
                        <div>
                          {/* <p className="text-base font-medium text-gray-900 text-ellipsis overflow-hidden">
                            {tx.tx_id}
                          </p> */}
                          {tx.tx_type === 'smart_contract' ? (
                            <p className="text-sm text-gray-900">
                              {tx.smart_contract.contract_id.split('.')[1]}{' '}
                            </p>
                          ) : null}
                          <p className="text-xs text-gray-500">
                            {TransactionType[tx.tx_type]}
                          </p>
                          {/* <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                              {TransactionStatus[tx.tx_status]}
                            </p>
                          </div> */}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="flex items-center justify-start w-full text-md font-medium pb-3 px-4">
                  {transactions && transactions?.length < 1 ? (
                    'No Recent Transactions'
                  ) : (
                    <span className="text-xs">
                      <em className="font-bold not-italic">
                        {transactions?.length}
                      </em>{' '}
                      Transactions
                    </span>
                  )}
                  <a
                    className="ml-auto transition-all hover:underline hover:underline-offset-1 text-gray-700 text-xs"
                    href="https://explorer.stacks.co"
                  >
                    View All
                  </a>
                </div>
                {/* <div className="p-4 py-2 bg-gray-800 absolute bottom-0 left-0 right-0"> */}
                {/* <a
                    href="##"
                    className="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  >
                    <span className="flex items-center">
                      <span className="text-sm font-medium text-blue-400">
                        All Transactions
                      </span>
                    </span>
                    <span className="block text-sm text-gray-100">
                      View account activity on explorer
                    </span>
                  </a> */}
              </div>
              {/* </div> */}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
