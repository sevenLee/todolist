import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import createRanking, * as fromCreateRanking from './createRanking'

import Config from '../../../config'

const rankings = (state=null, action) => {
    let limit = 100
    switch(action.type){
        case 'FETCHED_RANKING':{
            /*eslint-disable no-console*/
            return action.response.payload
                .filter((r, index) => {
                    let nullflag = true
                    for(var p in r){
                        if(r[p] === null){
                            //nullflag = false
                            /*eslint-disable no-console*/
                        }
                    }
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
        default:
            return state
    }
}

const isFetching = (state=false, action) => {
    switch(action.type) {
        case 'FETCHING_RANKING':
            return true
        case 'FETCHED_RANKING':
            return false
        case 'FETCH_RANKING_ERROR':
            return false
        default:
            return state
    }
}

const fetchError = (state='', action) => {
    switch (action.type) {
        case 'FETCHING_RANKING':
            return ''
        case 'FETCHED_RANKING':
            return ''
        case 'FETCH_RANKING_ERROR':
            return action.error
        default:
            return state
    }
}

const findUser = (state = '', action) => {
    switch (action.type) {
        case 'FIND_USER':
            return action.userid
        default:
            return state
    }
}

const pageNumber = (state=1, action) => {
    switch(action.type) {
        case 'UPDATE_PAGE':
            return action.currentPageNum
        case 'FIND_USER':
            return 1
        default:
            return state
    }
}



const createRankingListByEventCode = (eventCodeList) => {
    return combineReducers(eventCodeList.reduce((result,eventCode) => {
        result[eventCode] = createRanking(eventCode)
        return result
    }, {}))

}


// todo: replace testTimeList to timeList
const rankingListByEventCode = createRankingListByEventCode(Config.testTimeList.filter(elm => elm.val !== 'All').map(t => t.val))
// eventCodeList: ['16:00:00', '17:00:00', '18:00:00', ... , '01:00:00']
/*
 rankingListByEventCode: {
    '16:00:00': {},
    '17:00:00': {},
    '18:00:00': {},
    ...
}
*/
const ranking = combineReducers({
    rankings,
    rankingListByEventCode,
    isFetching,
    fetchError,
    findUser,
    pageNumber
})

export default ranking

export const getFindUser = (state) => state.ranking.findUser
export const getRankings = (state) => {return state.ranking.rankings}
export const getIsFetching = state => state.ranking.isFetching
export const getIsFetchError = (state) => state.ranking.fetchError
export const getPageNumber = (state) => state.ranking.pageNumber
export const getOneRankingIsFetchingByEventCode = (state, props) => {
    let eventCode = props

    if(props.eventObject && props.eventObject.eventCode){
        eventCode = props.eventObject.eventCode
        eventCode = eventCode.substr(11, 8)
    }
    // e.g.: 2017-09-18T01:00:00

    /*eslint-disable no-console*/
    // console.log('$$$ selector getIsFetching:', fromCreateRanking.getIsFetching(state.ranking.rankingListByEventCode[eventCode]))
    // console.log('$$$ selector eventCode:', eventCode)
    return fromCreateRanking.getIsFetching(state.ranking.rankingListByEventCode[eventCode])
}

export const getOneRankingFetchErrorByEventCode = (state, props) => {
    let eventCode = props

    if(props.eventObject && props.eventObject.eventCode){
        eventCode = props.eventObject.eventCode
        eventCode = eventCode.substr(11, 8)
    }

    return fromCreateRanking.getIsFetchError(state.ranking.rankingListByEventCode[eventCode])
}

export const makeGetOneRankingIsFetching = () => {
    return createSelector(
        getOneRankingIsFetchingByEventCode,
        isFetching => isFetching
    )
}

export const getOneRankingsByEventCode = (state, props) => {
    /*eslint-disable no-console*/
    let eventCode = props

    if(props.eventObject && props.eventObject.eventCode){
        eventCode = props.eventObject.eventCode
        eventCode = eventCode.substr(11, 8)
    }
    return fromCreateRanking.getRankings(state.ranking.rankingListByEventCode[eventCode])
}

export const makeRankingList = () => {
    return createSelector(
        getRankings,
        getFindUser,
        getPageNumber,
        (rankings, findUser, pageNumber) => {
            if (rankings === null) {
                return null
            }
            const filter_re = new RegExp(findUser)
            /*eslint-disable no-console*/

            return rankings.filter((row, index) => {
                if(findUser === ''){
                    const maxIndex = 10 * pageNumber - 1
                    const minIndex = maxIndex - 10 + 1

                    if(index < minIndex || index > maxIndex){
                        return false
                    }else{
                        return true
                    }
                }else{
                    return filter_re.test(row.userid)
                }
            })
            .map((r) => {
                return {
                    ...r,
                    orderBy: ''
                }
            })
        }
    )
}

export const makeOneRankingList = () => {
    return createSelector(
        getOneRankingsByEventCode,
        (rankings) => {
            if (rankings === null) {
                return null
            }
            // const filter_re = new RegExp(findUser)
            /*eslint-disable no-console*/
            // console.log('[makeRankingList]findUser:', findUser)

            return rankings.map((r) => {
                    return {
                        ...r,
                        orderBy: ''
                    }
            })
        }
    )
}

// export const makeRankingList = () => {
//     return createSelector(
//         getRankings,
//         getFindUser,
//         (rankings, findUser) => {
//             if (rankings === null) {
//                 return null
//             }
//             const filter_re = new RegExp(findUser)
//             /*eslint-disable no-console*/
//             console.log('[makeRankingList]findUser:', findUser)
//
//             return rankings.filter((row) => {
//                 if(findUser === ''){
//                     return true
//                 }else{
//                     return filter_re.test(row.userid)
//                 }
//             })
//         }
//     )
// }

