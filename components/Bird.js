import React from 'react';
import { View } from 'react-native';

const Bird = ({birdBottom, birdLeft}) => {
    const birdWidth = 50
    const birdHeight = 50
    return(
        <View style = {{
            position: 'absolute',
            backgroundColor: '#C9F5D9',
            width: birdWidth,
            height: birdHeight,
            left: birdLeft - (birdWidth/2),
            bottom: birdBottom - (birdHeight/2),
        }} />
        )
}

export default Bird;