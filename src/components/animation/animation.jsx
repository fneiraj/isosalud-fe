import Lottie from "react-lottie";

import noRecordsFound from '../../assets/animations/no-records-found.json';
import notFound404 from '../../assets/animations/error-404-not-found.json';

const Animation = ({loop, autoplay, animationName}) => {

    let file;

    switch (animationName) {
        case "no-records-found":
            file = noRecordsFound;
            break;
        case "404-not-found":
            file = notFound404;
            break;
    }

    const options = {
        loop: loop ? loop : false,
        autoplay: autoplay ? autoplay : false,
        animationData: file,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    return (
        <Lottie
            options={options}
            height={400}
            weight={400}
            isClickToPauseDisabled={true}
        />
    )
}

export default Animation;