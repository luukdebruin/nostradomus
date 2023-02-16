import React, { MutableRefObject, useRef } from 'react'
import { useNostrEvents, dateToUnix } from 'nostr-react'

const GlobalFeed = () => {
	const ids: string[] | undefined = undefined
	const since: MutableRefObject<Date> = useRef<Date>(new Date())
	const authors: string[] | undefined = undefined

	const { events } = useNostrEvents({
		filter: {
			ids,
			since: dateToUnix(since.current),
			kinds: [1],
			authors,
		},
	})

	const orderedEvents = events.sort((a, b) => b.created_at - a.created_at)

	return (
		<>
			{orderedEvents.map((event) => (
				<div className="p-4 bg-slate-200 rounded-xl mb-2 flex flex-col w-full overflow-hidden" key={event.id}>
					<p className="text-sm text-slate-400 inline-block text-ellipsis overflow-hidden ...">{event.pubkey}</p>
					<p className="text-slate-800 inline-block text-ellipsis overflow-hidden ...">{event.content}</p>
				</div>
			))}
		</>
	)
}

export default GlobalFeed
