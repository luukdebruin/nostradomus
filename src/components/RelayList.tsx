import React, { useState } from 'react'
import { bindActionCreators } from 'redux'
import { allActionCreators } from 'src/redux'
import { useAppDispatch } from 'src/redux/hooks'
import { TbTrash, TbPlus } from 'react-icons/tb'
import { pool, relays } from 'src/nostr/relay'
import { Relay } from 'nostr-tools'

/* eslint-disable */
const WSS_REGEX = /^wss?:\/\/[\w.:\/-]+$/
const HTTP_REGEX = /^http?:\/\/[\w.:\/-]+$/
/* eslint-enable */

const RelayList = () => {
	const dispatch = useAppDispatch()
	const { setTooltip } = bindActionCreators(
		{
			setTooltip: allActionCreators.setTooltip,
		},
		dispatch
	)
	const [url, setUrl] = useState<string>('')
	const [read, setRead] = useState<boolean>(true)
	const [write, setWrite] = useState<boolean>(true)

	const addRelay = () => {
		setUrl(url.trim())
		if (!url.match(WSS_REGEX) && !url.match(HTTP_REGEX)) {
			setTooltip({ name: 'Please start websocket url with wss://', type: 'error' })
			return
		}
		const relayExists = Object.values(pool.relays).find((relay) => relay.url === url)

		if (relayExists) {
			setTooltip({ name: `${url} already exists`, type: 'warning' })
		}

		if (!relayExists) {
			relays.update((data) => {
				if (!data) data = []
				const result = data.find((d: Relay) => d.url === url)
				if (!result) {
					data.push({ url: url, read: read, write: write })
					return data
				}
				return data
			})
			setTooltip({ name: `Succesfully added ${url}`, type: 'default' })
		}
	}

	const deleteRelay = (url: string) => {
		relays.update((data) => {
			data = data.filter((d: Relay) => {
				return d.url !== url
			})
			return data
		})
		setTooltip({ name: `Succesfully removed ${url}`, type: 'default' })
	}

	return (
		<div className="p-4 rounded-lg bg-slate-200 mt-2">
			{Object.values(pool.getRelays()).map((relay: Relay, i: number) => {
				return (
					<div key={i} className={` flex justify-center items-center ${i > 0 ? 'mt-2' : ''}`}>
						<input
							type="text"
							className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1"
							value={relay.url}
							disabled
						/>
						<div
							className="p-2 bg-slate-50 rounded-md cursor-pointer ml-2 hover:bg-red-300 duration-200 ease-in-out"
							onClick={() => deleteRelay(relay.url)}
						>
							<TbTrash />
						</div>
					</div>
				)
			})}
			<div className="flex justify-center items-center mt-2">
				<input
					type="text"
					className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1"
					value={url}
					placeholder="wss://..."
					onChange={(e) => setUrl(e.target.value)}
				/>
				<div
					className="p-2 bg-slate-50 rounded-md cursor-pointer ml-2 hover:bg-indigo-300 duration-200 ease-in-out"
					onClick={() => {
						addRelay(), setUrl('')
					}}
				>
					<TbPlus />
				</div>
			</div>
		</div>
	)
}

export default RelayList
