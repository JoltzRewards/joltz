;; -----------------------------------------------------------------
;;   STX Sender
;; -----------------------------------------------------------------
;;  1. Setters : capture parameters and set variables accordingly.
;;       - Payment Amount
;;       - Sender
;;       - Receiver
;;       - Block height
;;  2. Getters : returns all fields.
;;  3. App-specific logic:
;;       3.1 Should the funds be held/escrowed in the contract temporarily, until block height is reached?
;;       3.2 tbd

;; Constants
(define-constant err-unauthorized (err u100))

;; Constants - these fields will be hardcoded with values from contract-gui app:
(define-constant sender   'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6)   ;; in test script, this is both tx-sender and wallet_9
(define-constant receiver 'ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5N7R21XCP)  ;; in test script, this is wallet_8
(define-constant amount   u16002)  ;; amount
(define-constant target-block-height u2) ;; target block height; input from UI

;; Transfer STX from sender to receiver
(define-public (send-stx-when-its-time)
  (begin
    (asserts! (check-target-height) (err u777))
    (asserts! (>= (stx-get-balance sender) amount) (err u666))  ;; is this needed? is it cheaper if i just attempt an stx-transfer?
    (stx-transfer? amount sender receiver)  ;; STX transfer attempt
  )
)

;; Return true if current block height is greater than or equal to target block height
(define-read-only (check-target-height)
  (>= block-height target-block-height)
)

;; For testing only - Clarinet, Devnet, Testnet.
(define-read-only (echo (shout-out (string-ascii 100))) (ok shout-out))    ;; echo - for testing purposes only
(define-read-only (get-balance-sender)   (ok (stx-get-balance sender)))    ;; return sender wallet balance
(define-read-only (get-balance-receiver) (ok (stx-get-balance receiver)))  ;; return receiver wallet balance
(define-read-only (block-height-please)  (ok block-height))                ;; return current block-height

;; Note about stx-transfer? function:
;;   returns (ok true) if the transfer is successful
;;   (err u1) -- sender does not have enough balance to transfer
;;   (err u2) -- sender and recipient are the same principal
;;   (err u3) -- amount to send is non-positive 
;;   (err u4) -- the sender principal is not the current tx-sender

;; Potential problems:
;; 1. What happens if the contract deployer or owner lost the wallet key?
;;     - Redirect locked STX into TRUBIT vault (unclaimed STX)?
;;     - Enforce multisig contract?
;;     - tbd
;; 2. tbd