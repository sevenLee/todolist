import { combineReducers } from 'redux';

const createRanking = (eventCode) => {
    const rankings = (state=null, action) => {
        /*eslint-disable no-console*/
        // console.log('~~ eventCode:', eventCode)
        // console.log('~~ action.eventCode:', action.eventCode)
        // console.log('~~ End ~~')
        if(action.type !== 'RESET_HISTORY_RANKING' && eventCode !== action.eventCode){
            return state
        }

        let limit = 10
        switch(action.type) {
            case 'FETCHED_ONE_OF_RANKINGS': {
                return action.response.payload
                    .filter(() => {
                        let nullflag = true
                        if(nullflag){
                            limit -= 1
                        }
                        if(limit < 0){
                            nullflag = false
                        }
                        return nullflag
                    })
                    .map((ranking, index) => {
                        return {...ranking, rankingIndex: index + 1}
                    })
            }
            case 'RESET_HISTORY_RANKING': {
                return null
            }
            default:
                return state
        }
    }
    const isFetching = (state=false, action) => {
        if(action.type !== 'RESET_HISTORY_RANKING' && eventCode !== action.eventCode){
            return state
        }
        switch(action.type) {
            case 'FETCHING_ONE_OF_RANKINGS':
                return true
            case 'FETCHED_ONE_OF_RANKINGS':
                return false
            case 'FETCH_ONE_OF_RANKINGS_ERROR':
            {
                /*eslint-disable no-console*/
                // console.log('@@@ ~~ FETCH_ONE_OF_RANKINGS_ERROR')
                return false
            }

            case 'RESET_HISTORY_RANKING': {
                return false
            }
            default:
                return state
        }
    }

    const fetchError = (state='', action) => {
        if(action.type !== 'RESET_HISTORY_RANKING' && eventCode !== action.eventCode){
            return state
        }
        switch (action.type) {
            case 'FETCHING_ONE_OF_RANKINGS':
                return ''
            case 'FETCHED_ONE_OF_RANKINGS':
                return ''
            case 'FETCH_ONE_OF_RANKINGS_ERROR':
                return action.error
            default:
                return state
        }
    }

    return combineReducers({
        rankings,
        isFetching,
        fetchError
    });
}

export default createRanking;

export const getIsFetching = (state) => state.isFetching
export const getRankings = (state) => state.rankings
export const getIsFetchError = (state) => state.fetchError

