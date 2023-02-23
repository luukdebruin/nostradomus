export enum setting {
	Relays = 'nostradomus/relays',
	Account = 'nostradomus/account',
	Blocklist = 'nostradomus/blocklist',
	Blocktext = 'nostradomus/blocktext',
	Contacts = 'nostradomus/contacts',
	Lastseen = 'nostradomus/lastseen',
	Settings = 'nostradomus/settings',
}

export const allowedKeys = [
	setting.Relays.toString(),
	setting.Account.toString(),
	setting.Blocklist.toString(),
	setting.Blocktext.toString(),
	setting.Contacts.toString(),
	setting.Lastseen.toString(),
	setting.Settings.toString(),
]

export function getLocalJson(k: string) {
	if (!allowedKeys.includes(k)) {
		throw new Error('Key [' + k + '] should be one of the following: ' + allowedKeys.toString())
	}

	const data = localStorage.getItem(k)
	if (data) {
		try {
			return JSON.parse(data)
		} catch (e) {
			console.error('Local Storage is full, Please empty data', e)
		}
	}
	return null
}

export function setLocalJson(k: string, v: any) {
	if (!allowedKeys.includes(k)) {
		throw new Error('Key [' + k + '] should be one of the following: ' + allowedKeys.toString())
	}

	try {
		localStorage.setItem(k, JSON.stringify(v))
	} catch (e) {
		console.error('Local Storage is full, Please empty data', e)
	}
}
