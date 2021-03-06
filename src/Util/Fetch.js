/* eslint-disable import/no-anonymous-default-export */
const API_URL = 'https://www.reddit.com'

export const getAllSubReddits = async subreddits => {
  try {
    const response = await fetch(`${API_URL}/${subreddits}.json`)
    if (response.ok) {
      const { data } = await response.json()
      const refactoredData = data.children.map(({ data }) => ({
        title: data.title,
        subRedditName: data.subreddit_name_prefixed,
        author: data.author,
        score: data.score,
        comments: data.num_comments,
        thumbnail: data.thumbnail,
        id: data.id,
        permalink: data.permalink,
        created_utc: data.created_utc,
      }))
      return {
        subreddits: subreddits ? subreddits : 'best',
        refactoredData: refactoredData,
      }
    }

    throw new Error('All subreddits Request failed!')
  } catch (error) {
    console.log(error)
  }
}

const getAllCommunities = async () => {
  try {
    const response = await fetch(`${API_URL}/subreddits.json`)
    if (response.ok) {
      const { data } = await response.json()
      const refactoredData = data.children.map(({ data }) => ({
        icon: data.icon_img,
        communityName: data.display_name_prefixed,
        subscribers: data.subscribers,
        id: data.id,
      }))
      return refactoredData
    }

    throw new Error('All Communities Request failed!')
  } catch (error) {
    console.log(error)
  }
}

const getSearch = async (term, type) => {
  try {
    const response = await fetch(
      `${API_URL}/search/.json?q=${term}&type=${type}`
    )
    if (response.ok) {
      const { data } = await response.json()
      const refactoredData = data.children.map(({ data, kind }) => ({
        title: data.title,
        subRedditName: data.subreddit_name_prefixed,
        author: data.author,
        score: data.score,
        comments: data.num_comments,
        thumbnail: data.thumbnail,
        icon: data.icon_img,
        communityName: data.display_name_prefixed,
        subscribers: data.subscribers,
        id: data.id,
        type: kind,
        term: term,
        permalink: data.permalink,
        created_utc: data.created_utc,
      }))
      return refactoredData
    }

    throw new Error('Search request failed!')
  } catch (error) {
    console.log(error)
  }
}

const getSingleSubReddit = async url => {
  try {
    const response = await fetch(`${API_URL}${url}.json`)

    if (response.ok) {
      const data = await response.json()
      const refactoredData = {
        subReddit: data[0].data.children[0].data,
        comments: data[1].data.children,
        id: data[0].data.children[0].data.id,
      }
      return refactoredData
    }

    throw new Error('get single subreddit request failed!')
  } catch (error) {
    console.log(error)
  }
}

export default {
  getAllSubReddits,
  getAllCommunities,
  getSearch,
  getSingleSubReddit,
}
