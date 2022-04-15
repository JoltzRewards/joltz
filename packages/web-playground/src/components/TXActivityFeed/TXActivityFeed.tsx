import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { getContractName, truncateMiddle } from '@stacks/ui-utils'
import { CollectionIcon, CheckIcon, XIcon, ArrowSmRightIcon } from '@heroicons/react/outline'
import cx from 'classnames'
import fetch from 'cross-fetch'
import {
  connectWebSocketClient,
  Subscription,
  AccountsApi,
  Configuration,
  TransactionsApi,
} from '@stacks/blockchain-api-client'
import { Spinner } from '@stacks/ui'
import { AddressTransactionWithTransfers } from '@stacks/stacks-blockchain-api-types'

import { Auth } from '../../modules'
import { API_URL, SOCKET_URL } from '../../lib/constants'
import { AnimatedPing } from '../AnimatedPing'

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

const apiConfig = new Configuration({
  fetchApi: fetch,
  basePath: API_URL,
})

export const TXActivityFeed = () => {
  const { wallet } = Auth.useAuth()
  const [isFetching, setIsFetching] = React.useState(true)
  const subscription = React.useRef<Subscription | null>(null)
  const [transactions, setTransactions] = React.useState<AddressTransactionWithTransfers[] | []>([])

  const accountApi = React.useMemo(() => new AccountsApi(apiConfig), [])

  const txApi = React.useMemo(() => new TransactionsApi(apiConfig), [])

  React.useEffect(() => {
    async function getTransactions() {
      if (!wallet) return

      const response = await accountApi.getAccountTransactionsWithTransfers({
        principal: wallet,
        limit: 50,
      })

      setTransactions(response.results as AddressTransactionWithTransfers[])
      setIsFetching(false)
    }

    getTransactions()
  }, [accountApi, wallet])

  React.useEffect(() => {
    async function getSubscription() {
      const client = await connectWebSocketClient(SOCKET_URL)

      const sub = await client.subscribeAddressTransactions(wallet!, async (tx) => {
        const txDetails = (await txApi.getTransactionById({
          txId: tx.tx_id,
        })) as AddressTransactionWithTransfers

        console.info(txDetails)

        setTransactions((transactions) => [...transactions, txDetails])
      })

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
  }, [wallet, subscription, txApi])

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
              <CollectionIcon width={16} className="text-gray-600 group-hover:text-gray-500" />
            )}
            <AnimatedPing animating color="green-400" />
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
                <div className="relative flex flex-col items-stretch justify-start max-h-80 overflow-scroll">
                  {transactions?.map((tx) => (
                    <a
                      key={tx.tx.tx_id}
                      href={`https://explorer.stacks.co/txid/${tx.tx.tx_id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-start p-4 py-3 block hover:bg-gray-50l transition ease-in-out duration-150"
                    >
                      {console.info(tx)}
                      <div className="w-full flex items-stretch justify-end">
                        <div className="pr-3 flex items-center w-8">
                          {tx.tx.tx_status === 'success' ? (
                            <CheckIcon width={16} opacity={0.6} />
                          ) : (
                            <XIcon width={18} color="red" />
                          )}
                        </div>
                        <div className="py-0.25 grow">
                          {tx.tx.tx_type === 'token_transfer' ? (
                            <div className="font-medium flex items-center justify-start">
                              <span className="text-sm text-gray-700">
                                {Number(tx.tx.token_transfer.amount) / 1000000} STX
                              </span>
                              <span className="px-1">
                                <ArrowSmRightIcon width={12} />
                              </span>
                              <span className="text-sm">
                                {truncateMiddle(tx.tx.token_transfer.recipient_address, 5)}
                              </span>
                            </div>
                          ) : null}
                          {tx.tx.tx_type === 'smart_contract' ? (
                            <p className="text-sm font-medium text-gray-700">
                              {getContractName(tx.tx.smart_contract.contract_id)}{' '}
                            </p>
                          ) : null}
                          <p className="text-sm text-gray-500">{TransactionType[tx.tx.tx_type]}</p>
                        </div>
                        <div className="flex items-center flex">
                          <span className="text-xs">{truncateMiddle(tx.tx.tx_id, 3)}</span>
                        </div>
                        {/* <p className="text-gray-500 text-xs mt-1">
                          {dayjs(tx.burn_block_time_iso).format('M/D/YYYY')}
                        </p> */}
                      </div>
                    </a>
                  ))}
                </div>
                <div className="bg-gray-50 flex items-center justify-start w-full text-md font-medium py-3 px-4">
                  {transactions && transactions?.length < 1 ? (
                    'No Recent Transactions'
                  ) : (
                    <span className="text-xs">
                      <em className="font-bold not-italic">{transactions?.length}</em> Transactions
                    </span>
                  )}
                  <a
                    className="ml-auto transition-all hover:underline hover:underline-offset-1 text-gray-500 text-xs"
                    href="https://explorer.stacks.co"
                  >
                    View All
                  </a>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
