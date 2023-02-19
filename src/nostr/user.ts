import { nip19 } from 'nostr-tools'
const { npubEncode, decode } = nip19

export type ProfilePointer = {
	pubkey: string // hex
	relays?: string[]
}

export type EventPointer = {
	id: string // hex
	relays?: string[]
}

export function getNpub(key: string | undefined): string {
	if (!key) return ''
	if (isPublicKey(key)) return key

	try {
		return npubEncode(key)
	} catch {
		console.log('Error encoding')
	}

	return key
}

export function getNip19Key(nip19: string): string | null {
	let result = null

	try {
		const decoded = decode(nip19)
		if (decoded.type === 'nprofile') {
			const data = decoded.data as ProfilePointer
			result = data.pubkey
		} else if (decoded.type === 'nevent') {
			const data = decoded.data as EventPointer
			result = data.id
		} else {
			result = decoded.data as string
		}
	} catch (e) {
		console.log('Error decoding getNip19Key', e)
	}

	return result
}

export function isPrivateKey(nip19: string): boolean {
	return /^(nsec1).*/.test(nip19)
}

export function isPublicKey(nip19: string): boolean {
	return /^(npub1|nprofile1).*/.test(nip19)
}
