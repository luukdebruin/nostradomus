import { Relay, relayInit } from 'nostr-tools'

export const relayUrls: Relays = [
	{ id: '4D3BAE98-0FAD-4659-A4FF-EFD8B75DC559', address: 'wss://nostr.zebedee.cloud', active: true },
	{ id: '709D8449-4094-46F7-87DF-3A0A0F782E26', address: 'wss://nostr.openchain.fr', active: true },
	// 'wss://relay.nostr.ch',
	// 'wss://nostr-relay.alekberg.net',
	// 'wss://nostr.bitcoiner.social',
	// 'wss://nostr.openchain.fr',
	// 'wss://nostr.zebedee.cloud',
	// 'wss://nostr.chaker.net',
	// 'wss://relay.cryptocculture.com',
	// 'wss://nostr.coollamer.com',
	// 'wss://relay.nostrich.de',
	// 'wss://no-str.org',
	// 'wss://relay.nostr.scot',
	// 'wss://jiggytom.ddns.net',
	// '/wss://nostr.nodeofsven.com',
	// 'wss://nostr.drss.io',
	// 'wss://relay.damus.io',
	// 'wss://nostr.p2sh.co',
	// 'wss://nostr.yael.at',
	// 'wss://relay.taxi',
]

export function connectRelay(url: string): Relay {
	const relay = relayInit(url)

	relay.on('connect', () => {
		console.log(`Connected ${relay.url}`)
	})

	relay.on('disconnect', () => {
		console.log(`Disconnected ${relay.url}`)
	})

	relay.on('error', () => {
		console.error(`Error ${relay.url}`)
	})

	relay.on('notice', () => {
		console.warn(`Notice ${relay.url}`)
	})

	relay.connect()
	return relay
}
