import * as apiFactory from '../../../apis';
import apiService from '../../../services/apiService'
// import {delay} from '../../../services/apiService'
// import mockData from './mockData'
import { getIsFetching, getOneRankingIsFetchingByEventCode } from '../../reducers/ranking'


const fetchingRanking = () => ({
    type: 'FETCHING_RANKING'
})

const fetchedRanking = (response) => ({
    type: 'FETCHED_RANKING',
    response
});

const fetchRankingError = (error) => ({
    type: 'FETCH_RANKING_ERROR',
    error
})

export const fetchRanking = (searchObj) => (dispatch, getState) => {
    /*eslint-disable no-console*/
    if(getIsFetching(getState())) {
        return Promise.resolve()
    }

    dispatch(fetchingRanking())

    // let promise = delay(mockData)

    let promise = apiService(dispatch, apiFactory.Ranking.fetchRanking(), 'get', searchObj)
        .then(res => {
            if(res) {
                /*eslint-disable no-console*/
                dispatch(fetchedRanking(res))
                return Promise.resolve(res)
            }
        }).catch((err) => {
            let msg = err
            if(err.reason)(
                msg = err.reason
            )
            dispatch(fetchRankingError(msg))
            return Promise.reject(msg)
        })
    return promise
}

export const findUser = (userid) => ({
    type: 'FIND_USER',
    userid
})

export const updatePage = (currentPageNum) => ({
    type: 'UPDATE_PAGE',
    currentPageNum
})

// Fetch OneRanking

export const resetHistoryRankings = () => ({
    type: 'RESET_HISTORY_RANKING'
})

const fetchingOneRanking = (eventCode) => ({
    type: 'FETCHING_ONE_OF_RANKINGS',
    eventCode
})

const fetchedOneRanking = (response, eventCode) => ({
    type: 'FETCHED_ONE_OF_RANKINGS',
    response,
    eventCode
});

const fetchOneRankingError = (error, eventCode) => ({
    type: 'FETCH_ONE_OF_RANKINGS_ERROR',
    error,
    eventCode
})

export const fetchOneRanking = (searchObj) => (dispatch, getState) => {
    /*eslint-disable no-console*/
    const eventCode = searchObj.eventCode.substr(11, 8)
    // console.log('###1 eventCode:', eventCode)

    if(getOneRankingIsFetchingByEventCode(getState(), eventCode)) {
        return Promise.resolve()
    }


    dispatch(fetchingOneRanking(eventCode))

    // let promise = delay(mockData)

    let promise = apiService(dispatch, apiFactory.Ranking.fetchRanking(), 'get', searchObj)
        .then(res => {
            if(res) {
                /*eslint-disable no-console*/
                dispatch(fetchedOneRanking(res, eventCode))
                return Promise.resolve(res)
            }
        }).catch((err) => {
            // console.log('@@@ Action fetchOneRanking:', err)
            let msg = err
            if(err.reason)(
                msg = err.reason
            )

            /*eslint-disable no-console*/
            dispatch(fetchOneRankingError(msg, eventCode))
            return Promise.reject(msg)
        })
    return promise
}