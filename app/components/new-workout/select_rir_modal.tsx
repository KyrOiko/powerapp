import { useRef } from 'react';

import { Dimensions, StyleSheet, View } from 'react-native';

import { Modalize } from 'react-native-modalize';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

import { ThemedText } from '@/components/themed-text';
import { RIR } from '@/models/enums';

export default function SelectRIRModal({
  modalizeRef,
  onItemSelect,
}: {
  modalizeRef: React.RefObject<Modalize | null>;
  onItemSelect: (RIR: RIR) => void;
}) {
  const carouselRef = useRef<ICarouselInstance>(null);
  const width = Dimensions.get('window').width;
  return (
    <Modalize
      ref={modalizeRef}
      withHandle={false}
      modalStyle={styles.modal}
      modalHeight={150}
      scrollViewProps={{ scrollEnabled: false }}
    >
      <View style={styles.carouselContainer}>
        <ThemedText type="smallTitle">Select RIR</ThemedText>
        <Carousel
          width={width}
          height={80}
          ref={carouselRef}
          data={Object.keys(RIR)}
          mode="horizontal-stack"
          modeConfig={{
            snapDirection: 'left',
            stackInterval: (width - 40) / 5,
          }}
          renderItem={({ item }: { item: RIR }) => (
            <View
              style={{
                width: (width - 40) / 5,
                height: 60,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 5,
                backgroundColor: '#1a1a1a',
              }}
            >
              <ThemedText style={{ textAlign: 'center', fontSize: 24 }}>{item}</ThemedText>
            </View>
          )}
          pagingEnabled={false}
          snapEnabled={true}
          onSnapToItem={(index: number) => {
            onItemSelect(Object.values(RIR)[index] as RIR);
          }}
        />
      </View>
    </Modalize>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#121212',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    flexDirection: 'column',
    gap: 10,
  },
  carouselContainer: {
    flex: 1,
  },
});
