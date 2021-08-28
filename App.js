import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Bird from './components/Bird';
import Obstacles from './components/Obstacles';

export default function App() {
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const birdLeft = screenWidth / 2
  const [ birdBottom, setBirdBottom ] = useState(screenHeight/2)
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth/2 + 30)
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0)
  const [score, setScore] = useState(0)
  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 200
  const gravity = 3
  let gameTimerId
  let obstaclesLeftTimerId
  let obstaclesLeftTimerIdTwo
  const [isGameOver, setIsGameOver] = useState(false)
  

  //start bird falling

  useEffect(() => {
    if (birdBottom > 0 ) {
      
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      }, 30)
      return () => {
        clearInterval(gameTimerId)
      }
    }
  }, [birdBottom])
  //need birdbottom to render the bird component
console.log(birdBottom)

const jump = () => {
  if(!isGameOver && (birdBottom < screenHeight))
  setBirdBottom(birdBottom => birdBottom + 50)
  console.log('jumped')
}
//start first obstacles
//when obstaclesLeft is smaller than 0, as in left the screen, we clear the interval with clearTimer
useEffect(() => {
  if(obstaclesLeft > -60) {
    obstaclesLeftTimerId = setInterval(() => {
      setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
    }, 30)
    return () => {
      clearInterval(obstaclesLeftTimerId)
    }
  } else {
    setObstaclesLeft(screenWidth)
    setObstaclesNegHeight( - Math.random() * 100)
    setScore(score => score + 1)
  }
}, [obstaclesLeft])

//second obstacles

useEffect(() => {
  if(obstaclesLeftTwo > -60) {
    obstaclesLeftTimerIdTwo = setInterval(() => {
      setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
    }, 30)
    return () => {
      clearInterval(obstaclesLeftTimerIdTwo)
    }
  } else {
    setObstaclesLeftTwo(screenWidth)
    setObstaclesNegHeightTwo( - Math.random() * 100)
    setScore(score => score + 1)

  }
}, [obstaclesLeftTwo])


//check for collisions
  useEffect(() => {
    if (
    ((birdBottom < (obstaclesNegHeight + obstacleHeight + 30) ||
    birdBottom > (obstaclesNegHeight + obstacleHeight + gap -30)) &&
    (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30)
    )

      ||

    ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) ||
    birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap -30)) &&
    (obstaclesLeftTwo> screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30)
      )) 
      
      {
      console.log('game over')
          gameOver();
      }
  })

  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(obstaclesLeftTimerId)
    clearInterval(obstaclesLeftTimerIdTwo)
    setIsGameOver(true)
  }

    return (
      <TouchableWithoutFeedback onPress={jump}>
          <View style={styles.container}>
            {isGameOver && <Text>{score}</Text>}
            <Bird 
              birdBottom={birdBottom}
              birdLeft={birdLeft}
            />
            <Obstacles
                color={'lavender'}
                obstacleWidth={obstacleWidth}
                obstacleHeight={obstacleHeight}
                randomBottom={obstaclesNegHeight}
                gap={gap}
                obstaclesLeft={obstaclesLeft}
              />
              <Obstacles
                color={'pink'}
                obstacleWidth={obstacleWidth}
                obstacleHeight={obstacleHeight}
                randomBottom={obstaclesNegHeightTwo}
                gap={gap}
                obstaclesLeft={obstaclesLeftTwo}
              />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });``
