import React from 'react'
import { io } from 'socket.io-client'
import CreateableSelect from 'react-select/async-creatable'
import { ActionMeta, OnChangeValue } from 'react-select'
import { CheckCircleIcon, XIcon } from '@heroicons/react/outline'
import { openContractDeploy } from '@stacks/connect'
import { AnchorMode } from '@stacks/transactions'
import { Transition } from '@headlessui/react'
import { connectWebSocketClient } from '@stacks/blockchain-api-client'

import { STXBlockHeightInput, Button, STXAddressInput } from '../../../components'
import { getUserData } from '../../../lib/auth'
import { IS_MAINNET, NETWORK, SOCKET_URL } from '../../../lib/constants'
import { createContractFromPayload } from '../../../lib/contracts'

export const ContractGui: React.FC = () => {
  const [isDeploying, setIsDeploying] = React.useState(false)
  const [error, setError] = React.useState<any | null>(null)
  const [isAlertVisible, setIsAlertVisible] = React.useState(false)
  const [txId, setTxId] = React.useState<string | null>(null)
  // const [txDetails, setTxDetails] = React.useState<any | null>(null)
  const userData = getUserData()
  const userAddress = IS_MAINNET
    ? userData.profile.stxAddress.mainnet
    : userData.profile.stxAddress.testnet
  const [recipients, setRecipients] = React.useState<{ label: string; value: string }[] | []>([])

  const handleChangeRecipients = (
    newValue: OnChangeValue<{ label: string; value: string }, true>,
    meta: ActionMeta<{ label: string; value: string }>,
  ) => {
    console.group('Value Changed')
    console.log(newValue)
    if (meta.action === 'create-option') {
      console.log('meta.action is "create-option"')
      setRecipients((recipients) => [...recipients, ...newValue])
    } else if (meta.action === 'remove-value') {
      setRecipients((recipients) => {
        return recipients.filter((r) => r.value !== meta.removedValue.value)
      })
    }
    console.log('meta', meta)
    console.groupEnd()
  }
  React.useEffect(() => {
    let sub
    let microBlockSub
    const subscribe = async (txId: string) => {
      const client = await connectWebSocketClient(
        // 'ws://stacks-node-api.blockstack.org/',
        SOCKET_URL,
      )
      microBlockSub = await client.subscribeMicroblocks((update) =>
        console.log('microblock update:', update),
      )
      sub = await client.subscribeTxUpdates(txId, (update) => {
        console.log('tx update:', update)
      })
      console.log({ client, sub, microBlockSub })
    }

    if (txId) {
      subscribe(txId)
    }
  }, [txId])
  // React.useEffect(() => {
  //   const subscribe = async (transactionId: string | null) => {
  //     if (transactionId) {
  //       console.info('transaction:', transactionId)

  //       // const client = await connectWebSocketClient(SOCKET_URL)
  //       const socket = io(SOCKET_URL, {
  //         query: {
  //           subscriptions: Array.from(
  //             new Set([`transaction:${transactionId}`]),
  //           ).join(','),
  //         },
  //       })
  //       const client = new stacks.StacksApiSocketClient(socket)

  //       socket.on('transaction', (e) => console.warn('event:\n', e))

  //       const { unsubscribe } = await client.subscribeTransaction(transactionId)

  //       return () => unsubscribe()
  //     }

  //     console.groupEnd()

  //     return null
  //   }

  //   subscribe(txId)
  // }, [txId])

  return (
    <>
      {error && error !== '' ? (
        <>
          {/* Global notification live region, render this permanently at the end of the document */}
          <div
            aria-live="assertive"
            className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
          >
            <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
              {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
              <Transition
                show={isAlertVisible}
                as={React.Fragment}
                enter="transform ease-out duration-300 transition"
                enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-gray-900">Successfully saved!</p>
                        <p className="mt-1 text-sm text-gray-500">
                          Anyone with a link can now view this file.
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0 flex">
                        <button
                          className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => {
                            setIsAlertVisible(false)
                          }}
                        >
                          <span className="sr-only">Close</span>
                          <XIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </>
      ) : null}
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h1 className="text-xl  leading-6 text-black-900">New Agreement</h1>
              <h3 className="text-sm font-medium leading-6 text-gray-500">Configure & Deploy</h3>
              <p className="mt-3 pr-4 text-sm text-gray-600">
                Provide the amount of STX you'd like to be paid, who the contract is being deployed
                on behalf of, who should be allowed to access, when the contract should go into
                effect, and when it should end.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 right-0 pr-2 pl-3 flex items-center justify-center pointer-events-none">
                          {/* <span className="text-gray-500 sm:text-sm">$</span> */}
                          <img src="/stacks-stx-logo.png" width="20" height="20" alt="STX" />
                          <span className="text-gray-500 sm:text-sm pl-2" id="price-currency">
                            STX
                          </span>
                        </div>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                          aria-describedby="price-currency"
                        />
                      </div>
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="recipients"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Recipients
                      </label>
                      <CreateableSelect
                        isMulti
                        onChange={handleChangeRecipients}
                        value={recipients}
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="sender" className="block text-sm font-medium text-gray-700">
                        Sender
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <STXAddressInput id="sender" initialValue={userAddress} />
                      </div>
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="start" className="block text-sm font-medium text-gray-700">
                        Starting Block Height
                      </label>
                      <STXBlockHeightInput id="start" />
                      <p className="mt-2 text-sm text-gray-500" id="start-description">
                        When should this contract begin?
                      </p>
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="end" className="block text-sm font-medium text-gray-700">
                        Ending Block Height
                      </label>
                      <STXBlockHeightInput id="end" />
                      <p className="mt-2 text-sm text-gray-500" id="end-description">
                        When should this contract end?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <Button
                    loading={isDeploying}
                    onClick={async (e) => {
                      e.preventDefault()

                      try {
                        setIsDeploying(true)

                        const contract = createContractFromPayload({
                          height: {
                            start: 20000,
                            end: 20001,
                          },
                          sender: userAddress,
                          recipients: [userAddress],
                          price: 200,
                        })

                        console.warn('contract', contract)

                        openContractDeploy({
                          contractName: `trubit-${Date.now().toString()}`,
                          codeBody: contract,
                          anchorMode: AnchorMode.Any,
                          network: NETWORK,
                          fee: '750n',
                          onCancel: async () => {
                            console.warn('canceled deploy')
                            return
                          },
                          appDetails: {
                            name: 'Contract Composer',
                            icon: `${window.location.origin}/trubit.svg`,
                          },
                          onFinish: (data) => {
                            setTxId(data.txId)
                            console.info('tx completed', {
                              tx: data.stacksTransaction,
                              tx_id: data.txId,
                              raw: data.txRaw,
                              url: `https://explorer.stacks.co/txid/${data.txId}`,
                            })
                          },
                        })
                      } catch (error) {
                        setError(error)
                      } finally {
                        setIsDeploying(false)
                      }
                    }}
                  >
                    Deploy
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
