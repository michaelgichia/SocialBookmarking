import constants from '../constants'

export default {
	profilesReceived: (profiles) => {
		return {
			type: constants.PROFILES_RECEIVED,
			profiles: profiles
		}
	},

	profileCreated: (profile) => {
		return {
			type: constants.PROFILE_CREATED,
			profile: profile
		}
	}

}