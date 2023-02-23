import { TextNote } from 'global'
import { Relays } from 'global'
import {
	relayInit,
	getEventHash,
	signEvent,
	verifySignature,
	validateEvent,
	type Relay,
	type Event,
	type Filter,
	type Sub,
} from 'nostr-tools'
import { bindActionCreators } from 'redux'
import { getLocalJson, setLocalJson, setting } from 'src/lib/storage'
import { allActionCreators } from 'src/redux'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { Writable, writable } from 'svelte/store'
// import 'websocket-polyfill'

export const fallbackRelays: any = [
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

export const published: Writable<{ note: TextNote; relay: string }> = writable({ note: null, relay: '' })

export class RelayPool {
	relays: { [key: string]: Relay } = {}

	addRelay = (url: string) => {
		const relay = relayInit(url)
		if (!this.hasRelay(url)) this.relays[url] = relay
	}

	connect = async (relay: Relay) => {
		await relay.connect().catch((e) => console.log('Connect error: ', e))

		const url = relay.url

		relay.on('error', () => {
			console.log(`Failed to connect to ${url}`)
		})

		relay.on('connect', () => {
			console.log(`Connected to ${url}`)
		})

		relay.on('disconnect', () => {
			console.log(`Closing connection to ${url}`)
			if (relay.status === 3) relay.connect()
		})
	}

	start = async () => {
		for (const [url, relay] of Object.entries(this.relays)) {
			await this.connect(relay).catch((e) => console.log('Connect error', e))
		}
	}

	close = () => {
		for (const [url, relay] of Object.entries(this.relays)) {
			console.log(`Closing connection to ${url}`)
			relay.close()
		}
	}

	removeRelay = (url: string) => {
		if (this.hasRelay(url)) {
			this.relays[url].close()
			delete this.relays[url]
		}
	}

	publish = async (evt: Event) => {
		const relays = useAppSelector((state) => state.app.relays)

		const evtIds = []

		for (const [url, relay] of Object.entries(this.relays)) {
			const relay = Object.values(relays).find((r: Relay) => r.url === url)
			if (relay) {
				if (relay.status !== 1) {
					await waitForOpenConnection(relay)
				}
				const pub = relay.publish(evt)
				pub.on('ok', () => {
					console.log(`Publish: ${url} has accepted our event`, evt)
					if (evt && evt.id && evt.kind && !evtIds.includes(evt.id)) {
						// TODO: send event to Redux store
						evtIds.push(evt.id)
					}
				})
				pub.on('failed', (reason: any) => {
					console.log(`Publish: failed to publish to ${url}: ${reason}`, evt)
				})
			}
			if (relay.status !== 1) {
				console.error(
					`Not publishing: Relay ${url} has state ${relay.status} and should be 1 = OPEN (0 CONNECTING, 1 OPEN, 2 CLOSING, 3 CLOSE	)`
				)
			}
		}
	}

	getRelays = (): { [key: string]: Relay } => {
		return this.relays
	}

	hasRelay = (url: string) => {
		return this.relays && this.relays[url] ? true : false
	}
}

export const pool = new RelayPool()

export const waitForOpenConnection = (relay: Relay) => {
	return new Promise((resolve, reject) => {
		const maxNumberOfAttempts = 10
		let currentAttempt = 0

		const interval = setInterval(() => {
			if (currentAttempt > maxNumberOfAttempts - 1) {
				clearInterval(interval)
				reject(new Error(`Maximum number of attempts exceeded for relay ${relay.url}`))
			} else if (relay.status === 1) {
				clearInterval(interval)
				resolve(true)
			}
			if (relay.status === 2 || relay.status === 3) {
				relay.connect()
			}
			currentAttempt++
		}, 200)
	})
}

export const relays = writable(getLocalJson(setting.Relays) || [])
relays.subscribe(($relays) => {
	try {
		Object.keys(pool.getRelays()).forEach((url: string) => {
			if ($relays && !$relays.find((r: Relay) => r.url === url)) {
				pool.removeRelay(url)
			}
		})
	} catch (error) {
		console.error('Error: ', error)
	}

	if ($relays) {
		for (const relay of $relays) {
			if (!pool.hasRelay(relay.url)) {
				pool.addRelay(relay.url)
			}
		}
	}
	console.log($relays)
	setLocalJson(setting.Relays, $relays)
})

const storeRelays = useAppSelector((state) => state.app.relays)
export const updateRelays = (relays: Relays) => {
	return () => {
		try {
			Object.keys(pool.getRelays()).forEach((url) => {
				if (relays && !Object.values(relays).find((r) => r.url === url)) {
					pool.removeRelay(url)
				}
			})
		} catch (error) {
			console.log('error', error)
		}

		if (relays) {
			for (const relay of Object.values(relays)) {
				if (!pool.hasRelay(relay.url)) {
					pool.addRelay(relay.url)
				}
			}
		}
	}
}
// export const relays = updateRelays(storeRelays)
