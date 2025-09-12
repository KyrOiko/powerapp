import { StyleSheet, View } from "react-native";
import { Modalize, type ModalizeProps } from "react-native-modalize";

export type ThemedSelectionModalProps = ModalizeProps & {
    children: React.ReactNode;
    modalizeRef: React.RefObject<Modalize | null>;
}

export function ThemedSelectionModal({ children, modalizeRef, ...props }: ThemedSelectionModalProps) {
    return (
        <Modalize modalStyle={styles.modal} ref={modalizeRef} {...props}>
            <View style={styles.modalContent}>
                {children}
            </View>
        </Modalize>
    )
}


const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 20,
    },
    modalContent: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 10,
    },
});
