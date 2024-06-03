import {ImageSourcePropType, StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';


export default function EmojiSticker({imageSize, stickerSource}: {
    imageSize: number,
    stickerSource: ImageSourcePropType
}) {
    const scaleImage = useSharedValue(imageSize);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const doubleTap = Gesture.Tap().numberOfTaps(2).onStart(() => {
        if (scaleImage.value === imageSize) {
            scaleImage.value = imageSize * 2;
        } else {
            scaleImage.value = imageSize;
        }
    });
    const panGesture = Gesture.Pan().onChange((event) => {
        translateX.value += event.changeX;
        translateY.value += event.changeY;
    })
    const imageStyles = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value)
        }
    });
    const viewStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: translateX.value},
                {translateY: translateY.value}
            ]
        }
    });
    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[viewStyles, styles.emojiStickerContainer]}>
                <GestureDetector gesture={doubleTap}>
                    <Animated.Image
                        source={stickerSource}
                        resizeMode="contain"
                        style={[{
                            width: imageSize,
                            height: imageSize
                        }, imageStyles]}
                    />
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    emojiStickerContainer: {
        top: -350
    }
})
