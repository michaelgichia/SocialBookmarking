import constants from '../constants'

let initialState = {
	list: []
}

export default (state=initialState, action) => {
	let updatedState = {...state}

	switch(action.type) {

		case constants.PROFILES_RECEIVED:
			updatedState['list'] = action.profiles
			return updatedState

		case constants.PROFILE_CREATED:
			let updateList = [...updatedState.list]
			updateList.push(action.profile)
			updatedState['list'] = updateList
			return updatedState

		default:
			return state
	}
}