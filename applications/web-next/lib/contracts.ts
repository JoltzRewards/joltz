// import { makeContractDeploy } from '@stacks/transactions'

type CreateContractPayload = {
  recipients: string[]
  sender: string
  price: number
  height: {
    start?: number
    end: number
  }
}

export function createContractFromPayload({
  recipients,
  sender,
  price,
  height,
}: CreateContractPayload) {
  return `
;; Constants - these fields will be hardcoded with values from contract-gui app:
(define-constant sender '${sender})   ;; in test script, this is both tx-sender and wallet_9
(define-constant receiver '${recipients[0]})  ;; in test script, this is wallet_8
  `
}
