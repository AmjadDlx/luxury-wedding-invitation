import { FaChampagneGlasses, FaChurch, FaRegGem } from 'react-icons/fa6'
import InfoCard from './InfoCard'
import useWeddingContent from '../context/useWeddingContent'

const icons = {
  ceremony: FaChurch,
  dress: FaRegGem,
  reception: FaChampagneGlasses,
}

function WeddingDetails() {
  const { content: weddingData } = useWeddingContent()
  return (
    <div className="mt-16 grid gap-5 md:grid-cols-3 lg:mt-20">
      {weddingData.countdown.details.map((detail) => (
        <InfoCard
          description={detail.description}
          Icon={icons[detail.icon]}
          key={detail.title}
          time={detail.time}
          title={detail.title}
        />
      ))}
    </div>
  )
}

export default WeddingDetails
