import Lottie from 'react-lottie'
import animations from 'config/animations'

const Animation = ({ loop, autoplay, animationName, height = 400, weight = 400 }) => {
  const file = animations[animationName]

  if (!file) {
    return null
  }

  const options = {
    loop: loop || false,
    autoplay: autoplay || false,
    animationData: file,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <Lottie
      options={options}
      height={height}
      weight={weight}
      isClickToPauseDisabled
    />
  )
}

export default Animation
