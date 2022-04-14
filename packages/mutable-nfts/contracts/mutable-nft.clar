(impl-trait .nft-trait.nft-trait)

(define-non-fungible-token Trubit-Mutable-NFT uint)

;; Storage
(define-map token-count principal uint)
(define-map market uint {price: uint, commission: principal})
(define-map nft-identifiers uint (string-ascii 80))
(define-map nft-sequence uint {background: uint, layer: uint, seal: uint})

;; Define Constants
(define-constant CONTRACT-OWNER tx-sender)
(define-constant ERR-SOLD-OUT (err u300))
(define-constant ERR-WRONG-COMMISSION (err u301))
(define-constant ERR-NOT-AUTHORIZED (err u401))
(define-constant ERR-NOT-FOUND (err u404))
(define-constant ERR-METADATA-FROZEN (err u505))
(define-constant ERR-MINT-ALREADY-SET (err u506))
(define-constant ERR-LISTING (err u507))
(define-constant NFT-LIMIT u2500)

;; Define Variables
(define-data-var last-id uint u0)
(define-data-var metadata-frozen bool false)
(define-data-var base-uri (string-ascii 80) "https://api.trubit.tech/nft/{id}")
(define-constant contract-uri "ipfs://QmaSFU43Zy9ApVu85P9Z2k8rmP4W1vUgCkefJatL8xLrD3")
(define-map mint-address bool principal)

;; Token count for account
(define-read-only (get-balance (account principal))
  (default-to u0
    (map-get? token-count account)))

;; Gets the component sequence for the token
(define-read-only (get-sequence (id uint))
  (default-to {background: u0, layer: u0, seal: u0}
    (map-get? nft-sequence id)))

;; Gets the Robot name
(define-read-only (get-name (id uint))
  (default-to ""
    (map-get? nft-identifiers id)))

;; Updates the nft-sequence mapping
(define-private (update-nft-sequence (id uint) (background uint) (layer uint) (seal uint))
  (map-set nft-sequence id {
    background: background
    layer: layer
    seal: seal
  }))

;; upgrade-nft-sequence
(define-public (upgrade (id uint) (mouth uint) (jewellery uint) (head uint) (eyes uint) (ears uint) (body uint) (background uint) (name (string-ascii 80)))
(let ((sequence-mapping (get-sequence id)))
(begin
    (asserts! (called-by-operator id) ERR-NOT-AUTHORIZED)
    (asserts! (is-none (map-get? market id)) ERR-LISTING)
    (try! (contract-call? .mutable-component-nft valid-sequence background layer seal))
    (and (not (is-eq (get seal sequence-mapping) seal)) (> seal u0) (try! (contract-call? .mutable-component-nft burn seal tx-sender)))
    (and (not (is-eq (get layer sequence-mapping) layer)) (> layer u0) (try! (contract-call? .mutable-component-nft burn layer tx-sender)))
    (and (not (is-eq (get background sequence-mapping) background)) (> background u0) (try! (contract-call? .mutable-component-nft burn background tx-sender)))
    (update-nft-sequence id mouth jewellery head eyes ears body background)
    (and (not (is-eq (get-name id) name)) (map-set nft-identifiers id name))
    (ok true))))

(define-private (trnsfr (id uint) (sender principal) (recipient principal))
  (match (nft-transfer? Trubit-Mutable-NFT id sender recipient)
        success
          (let
            ((sender-balance (get-balance sender))
            (recipient-balance (get-balance recipient)))
              (map-set token-count
                    sender
                    (- sender-balance u1))
              (map-set token-count
                    recipient
                    (+ recipient-balance u1))
              (ok success))
        error (err error)))

;; SIP009: Transfer token to a specified principal
(define-public (transfer (id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (called-by-operator id) ERR-NOT-AUTHORIZED)
    (asserts! (is-none (map-get? market id)) ERR-LISTING)
    (trnsfr id sender recipient)))

;; SIP009: Get the owner of the specified token ID
(define-read-only (get-owner (id uint))
  (ok (nft-get-owner? Trubit-Mutable-NFT id)))

;; SIP009: Get the last token ID
(define-read-only (get-last-token-id)
  (ok (var-get last-id)))

;; SIP009: Get the token URI. You can set it to any other URI
(define-read-only (get-token-uri (id uint))
  (ok (some (var-get base-uri))))

(define-read-only (get-contract-uri)
  (ok contract-uri))

;; Mint new NFT
;; can only be called from the Mint
(define-public (mint (new-owner principal))
    (let ((next-id (+ u1 (var-get last-id))))
      (asserts! (called-from-mint) ERR-NOT-AUTHORIZED)
      (asserts! (< (var-get last-id) ROBOT-LIMIT) ERR-SOLD-OUT)
      (match (nft-mint? Trubit-Mutable-NFT next-id new-owner)
        success
        (let
        ((current-balance (get-balance new-owner)))
          (begin
            (var-set last-id next-id)
            (map-set token-count
              new-owner
              (+ current-balance u1)
            )
            (ok true)))
        error (err (* error u10000)))))

(define-private (called-by-operator (id uint))
  (let ((owner (unwrap! (nft-get-owner? Megapont-Robot id) false)))
    (or (is-eq tx-sender owner) (is-eq contract-caller owner))))

;; Set base uri
(define-public (set-base-uri (new-base-uri (string-ascii 80)))
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (asserts! (not (var-get metadata-frozen)) ERR-METADATA-FROZEN)
    (var-set base-uri new-base-uri)
    (ok true)))

;; Freeze metadata
(define-public (freeze-metadata)
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (var-set metadata-frozen true)
    (ok true)))

;; Manage the Mint
(define-private (called-from-mint)
  (let ((the-mint
          (unwrap! (map-get? mint-address true)
                    false)))
    (is-eq contract-caller the-mint)))

;; can only be called once
(define-public (set-mint-address)
  (let ((the-mint (map-get? mint-address true)))
    (asserts! (and (is-none the-mint)
              (map-insert mint-address true tx-sender))
                ERR-MINT-ALREADY-SET)
    (ok tx-sender)))

;; Used to rename robots that might have otherwise offensive names
;; Not particulary web3, but required to avoid abuse
(define-public (override-name (id uint))
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (map-set nft-identifiers id "MALFUNCTION")
    (ok true)))

;; Used to override the robot sequence this is may never be required
;; but in the event something goes wrong we want to be able to fix
;; the sequence.
(define-public (override-sequence (id uint) (background uint) (layer uint) (seal uint))
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (update-nft-sequence id background layer seal)
    (ok true)))

;; set the mutable nft contract as the burner for components
(as-contract (contract-call? .mutable-component-nft set-burner-address))