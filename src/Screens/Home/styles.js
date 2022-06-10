import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: 'blue',
    borderRadius: 30,
  },
  addFormContainer: {
    flex: 1,
    padding: 20,
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 18,
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'black',
    marginTop: 20,
  },
  picker: {
    marginTop: 20,
  },
  item: {
    width: '90%',
    height: 200,
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 2,
    padding: 10
  },
  texto: {
    fontSize: 18,
    padding: 10,
  },
  delete: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderRadius: 20,
    alignSelf: 'flex-end'
  },
  lista: {
    width: '100%',
    height: '75%'
  },
  rodape: {
    marginTop: 10,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
  },
  infoRodape: {
    alignItems: 'center'
  }
});

export default styles;
