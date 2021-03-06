import About from '../../../Containers/About'
import SkeletonCommunities from '../../../Components/Skeleton/SkeletonCommunities'
import { selectCommunities } from './AsideSlice'
import { useSelector, useDispatch } from 'react-redux'
import NavCommunities from '../../../Components/NavLinkCommunities'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCommunities } from './AsideSlice'
import { getSearch } from '../SearchBar/SearchBarSlice'

export default function Aside() {
  const [moreCommunities, setMoreCommunities] = useState(false)
  const { term, community } = useParams()
  const communities = useSelector(selectCommunities)
  const dispatch = useDispatch()

  const dataCommunities = communities[community || term || 'home']?.slice(
    0,
    moreCommunities ? 25 : 10
  )
  const mapCommunities = dataCommunities?.map((community, index) => (
    <NavCommunities data={community} key={community.id} index={index + 1} />
  ))

  useEffect(() => {
    if (communities[community] === undefined) {
      dispatch(getSearch({ term: community, type: 'sr' }))
    }
    if (communities.home.length === 0) {
      dispatch(getCommunities())
    }
  }, [communities, community, dispatch])

  return (
    <aside className="aside">
      <div className="aside__communities">
        <h2 className="aside__communities__title">Communities</h2>
        <div className="aside__communities__container">
          {mapCommunities?.length > 0 ? (
            mapCommunities
          ) : (
            <SkeletonCommunities />
          )}
        </div>
        <div
          className="aside__communities__more-communities"
          onClick={() => setMoreCommunities(prev => !prev)}
        >
          {moreCommunities ? 'Less' : 'More'} Communities
        </div>
      </div>
      <div className="aside__about">
        <About />
      </div>
    </aside>
  )
}
