import React, { useState } from 'react'
import { bindActionCreators } from 'redux'
import { allActionCreators } from 'src/redux'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { TbTrash, TbPlus } from 'react-icons/tb'
import { v4 } from 'uuid'

const RelayList = () => {
	const dispatch = useAppDispatch()
	const { addRelay, removeRelay, updateRelay } = bindActionCreators(
		{
			addRelay: allActionCreators.addRelay,
			removeRelay: allActionCreators.removeRelay,
			updateRelay: allActionCreators.updateRelay,
		},
		dispatch
	)
	const relays = useAppSelector((state) => state.app.relays)
	const [newRelay, setNewRelay] = useState<string>('')

	return (
		<div className="p-4 rounded-lg bg-slate-200 mt-2">
			{relays.map((relay: Relay, i: number) => {
				return (
					<div key={relay.id} className={` flex justify-center items-center ${i > 0 ? 'mt-2' : ''}`}>
						<input
							type="text"
							className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1"
							value={relay.address}
							disabled
						/>
						<div
							className="p-2 bg-slate-50 rounded-md cursor-pointer ml-2 hover:bg-red-300 duration-200 ease-in-out"
							onClick={() => removeRelay(relay.id)}
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
					value={newRelay}
					placeholder="wss://..."
					onChange={(e) => setNewRelay(e.target.value)}
				/>
				<div
					className="p-2 bg-slate-50 rounded-md cursor-pointer ml-2 hover:bg-indigo-300 duration-200 ease-in-out"
					onClick={() => {
						addRelay({ id: v4(), address: newRelay }), setNewRelay('')
					}}
				>
					<TbPlus />
				</div>
			</div>
		</div>
	)
}

export default RelayList
