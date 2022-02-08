;; -----------------------------------------------
;;   Whitelister - the whitelist maintainer.
;; -----------------------------------------------
;;  1. Setters : capture parameters and add into list.
;;  2. Getters : returns list entries.
;;  3. App-specific logic:
;;       3.1 Attempt map insert and check for error.
;;       3.2 Limit map insert to contract deployer (?).
;;  4. Whitelist data is stored in a basic map:
;;       - key   = principal
;;       - value = boolean; consider tuple for expansion

;; Constants - from UI
;;(define-constant contract-owner '${contractOwner})  ;; will come from UI
(define-constant contract-owner 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM)  ;; will come from UI

;; Error codes
(define-constant err-unauthorized     (err u100))
(define-constant err-dup-map-key      (err u101)) ;; duplicate map key error when trying to insert
(define-constant err-already-active   (err u102)) ;; trying to activate but already in active status
(define-constant err-already-inactive (err u103)) ;; trying to deactivate but already in deactivated status
(define-constant err-is-not-active    (err u104)) ;; contract is not active
(define-constant err-unwrap-map       (err u105)) ;; error while unwrapping map

;; Whitelist data storage. Map with tuples.
(define-map whitelist
  {whitelister-id: principal}
  {whitelister-status: bool, whitelister-blk-ht: uint}
)

;; -------------------------------------
;;  Whitelist CRUD
;; -------------------------------------
;;  1. Add a new whitelister.
;;  2. Check if a principal is in the whitelist.
;;  3. Get a whitelister data
;;  4. Delete a whitelister
;;  5. Update a whitelister data

;; Add a whitelist entry. Authorized principal only?
(define-public (add-whitelist (new-entry principal))
  (begin
    (asserts! (is-contract-active) err-is-not-active)
    (asserts! (is-sender-authorized) err-unauthorized) 
    (asserts! (add-whitelist-private new-entry true) err-dup-map-key)
    (ok true)
  )
)

;; Actual insert to whitelist map.
;; Returns true if sucessful insert, returns false if principal key already exists.
(define-private (add-whitelist-private (new-entry principal) (entry-flag bool))
  (map-insert whitelist
       {whitelister-id: new-entry}          ;; key
       {whitelister-status: true,           ;; data
        whitelister-blk-ht: block-height}
  )
)

;; Check if a principal is in whitelist. Return true or false.
(define-public (check-whitelist-anyone (any-principal principal))
  (ok (check-whitelist any-principal)) 
)

;; Private function to do the actual whitelist map check 
(define-private (check-whitelist (any-principal principal))
  (is-some (map-get? whitelist {whitelister-id: any-principal}))  ;; is-some returns either 'true' or 'false'
)

;; Get whitelister data (tuple) from map
;; Returns 'some(tuple)' or 'none'. Caller of this function needs to unwrap result.
(define-read-only (get-whitelister (whitelister principal))
  (map-get? whitelist {whitelister-id: whitelister})  ;; map-get? returns either 'some' or 'none'
)

;; Unwrap whitelister.  Needs further refactoring.
(define-read-only (get-whitelister-unwrap (whitelister principal))
  (let ((whitelister-data (unwrap! (get-whitelister whitelister) err-unwrap-map)))
       (ok whitelister-data))
)

;; TO DO - return individual fields from whitelist map data.

;; TO DO - update individual fields of whitelist map data.

;; Delete a whitelist entry.  Authorized user only. Regardless of active flag.
(define-public (delete-whitelister (whitelister principal))
  (begin
    ;;(ok any-principal)
    ;;(asserts! (is-sender-authorized) err-unauthorized) 
    (map-delete whitelist {whitelister-id: whitelister})
    (ok true)
  )
)


;; --------------------
;;  Self service
;; --------------------
;;  1. Add self
;;  2. Check myself
;;  3. Get my map data
;;  4. Delete myself.
;;  5. Update my own data.

;; Add self. Allows anyone to add themselves?
(define-public (add-whitelist-self)
  (begin
    (asserts! (is-contract-active) err-is-not-active)
    (asserts! (add-whitelist-private tx-sender true) err-dup-map-key)
    (ok true)
  )
)

;; Check self (tx-sender) if listed in whitelist
(define-public (check-whitelist-self)
  (ok (check-whitelist tx-sender))
)


;; ------------------------------------------------------------------
;; Functions to activate and deactivate this contract.
;; ------------------------------------------------------------------

(define-data-var active-flag bool false)  ;; initial value is inactive. true=active, false=inactive

(define-private (set-active-flag (flag-value bool))
  (var-set active-flag flag-value)
)

(define-public (activate)
  (begin
    (asserts! (is-contract-inactive) err-already-active)  
    (asserts! (is-sender-authorized) err-unauthorized) 
    (set-active-flag true)
    (ok true)
  )
)

(define-public (deactivate)
  (begin
    (asserts! (is-contract-active) err-already-inactive)
    (asserts! (is-sender-authorized) err-unauthorized) 
    (set-active-flag false)
    (ok true)
  )
)

(define-read-only (is-contract-active)
  (is-eq (var-get active-flag) true)
)

(define-read-only (is-contract-inactive)
  (is-eq (not (is-contract-active)) true)
)


;; ------------------------------------------------------------------
;; Functions for checking authorized principals
;; ------------------------------------------------------------------

(define-read-only (is-sender-authorized)  ;; add into this function all future authorized wallets
  (is-eq tx-sender contract-owner)
)


;; ------------------------------------------------------------------
;; Functions to deactivate contract according to set block height (self destruct time bomb).
;; In case deployer/authorized wallet keys all gone missing.  :(
;; Deployer/authorized users can update block height anytime (while he has the key, of course).
;; ------------------------------------------------------------------
;; TBD


;; ------------------------------------------------------------------
;; For testing only
;; ------------------------------------------------------------------
(define-read-only (echo (shout-out (string-ascii 100))) (ok shout-out))  ;; echo - for testing purposes only
(define-read-only (get-contract-caller) (ok contract-caller ))           ;; returns contract-caller
(define-read-only (get-tx-sender) (ok tx-sender ))                       ;; returns tx-sender
(define-read-only (get-contract-owner) (ok contract-owner ))             ;; returns contract-owner
