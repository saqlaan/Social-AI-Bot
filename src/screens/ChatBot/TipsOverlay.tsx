import React from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from 'rnprototype/src/utils/scale';
import CloseIcon from '../../theme/assets/images/close.png';

const ListDot = () => <Text style={styles.listDot}>{'\u2022'}</Text>;

const TipsOverlay = ({ visible, handleOnPressClose }) => {
  const { top } = useSafeAreaInsets();

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={[{ paddingTop: top }, styles.modalContent]}>
          <Pressable style={styles.closeButton} onPress={handleOnPressClose}>
            <Image style={styles.closeIcon} source={CloseIcon} />
          </Pressable>
          <View style={styles.headerSpace} />
          <View style={[styles.section]}>
            <Text style={[styles.textHeading]}>
              You can always ask me anything...
            </Text>
            <Text style={styles.listText}>
              {<ListDot />} {'Why?'}
            </Text>
            <Text style={styles.listText}>
              {<ListDot />} {'How?'}
            </Text>
            <Text style={styles.listText}>
              {<ListDot />} {'can you give me an example?'}
            </Text>
          </View>
          <View style={[styles.section]}>
            <Text style={[styles.textHeading]}>
              Or just let me know what you’re thinking...
            </Text>
            <Text style={styles.listText}>
              {<ListDot />} {'I’m feeling stuck'}
            </Text>
            <Text style={styles.listText}>
              {<ListDot />} {'I don’t have time for this'}
            </Text>
            <Text style={styles.listText}>
              {<ListDot />} {'I’m not comfortable making videos'}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TipsOverlay;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#cccccc',
  },
  headerSpace: {
    marginVertical: scale(10),
  },
  listDot: {
    fontSize: scale(30),
  },
  modalContent: {
    padding: scale(20),
    borderRadius: scale(10),
  },
  textHeading: {
    fontSize: scale(26),
    marginBottom: scale(5),
    fontWeight: '500',
  },
  section: {
    marginBottom: scale(30),
  },
  listText: {
    fontSize: scale(24),
    fontWeight: '400',
  },
  closeIcon: {
    width: scale(30),
    height: scale(30),
  },
  closeButton: {
    marginTop: 5,
    alignItems: 'flex-end',
  },
});
