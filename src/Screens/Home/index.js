import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  FlatList,
  Text,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'

import styles from './styles';

const Home = () => {
  const [value, setValue] = useState([]);
  const [addForm, setAddForm] = useState(false);
  const [itemType, setItemType] = useState('D');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [totalDespesas, setTotalDespesas] = useState('0,00');
  const [totalReceitas, setTotalReceitas] = useState('0,00');
  const [totalDiferenca, setTotalDiferenca] = useState('0,00');

  const buscaValue = async () => {
    setValue(JSON.parse(await AsyncStorage.getItem('@app-financas-dados')));
  };

  useEffect(() => {
    buscaValue();
  }, []);

  useEffect(() => {
    let despesas = 0;
    let receitas = 0;
    let diferenca = 0;
    if (value !== null && value.length > 0) {
      value.forEach((item) => {
        if (item.tipo == 'D') {
          despesas = despesas + parseFloat(item.valor.replace('.', '').replace(',', '.'));
        } else {
          receitas = receitas + parseFloat(item.valor.replace('.', '').replace(',', '.'));
        }
        diferenca = receitas - despesas;
      });
    }
    setTotalDespesas(formatNumber(despesas));
    setTotalReceitas(formatNumber(receitas));
    setTotalDiferenca(formatNumber(diferenca));
  }, [value]);

  const validaForm = async () => {
    if (descricao.trim() !== '' && valor.trim() !== '') {
      try {
        setValue(JSON.parse(await AsyncStorage.getItem('@app-financas-dados')));
        let DataAtual = moment().format('DD/MM/YYYY')
        let jsonValue = [];
        if (value !== null) {
          jsonValue = JSON.stringify([
            ...value,
            {
              id: (value !== null && value.length > 0 ? value.length : 0)  + 1,
              descricao,
              valor: formatNumber(valor),
              tipo: itemType,
              data: DataAtual
            },
          ]);
        } else {
          jsonValue = JSON.stringify([
            {
              id: (value !== null && value.length > 0 ? value.length : 0)  + 1,
              descricao,
              valor: formatNumber(valor),
              tipo: itemType,
              data: DataAtual
            },
          ]);
        }
        await AsyncStorage.setItem('@app-financas-dados', jsonValue);
        setValue(JSON.parse(jsonValue));
        setDescricao('');
        setValor('');
        setItemType('D');
      } catch (error) {
        console.log(error);
      }
      setAddForm(false);
    } else {
      Alert.alert('Oops...', 'Preencha o valor e a descrição!', [
        {
          text: 'OK',
          onPress: () => {},
        },
        {
          text: 'Voltar a Lista',
          onPress: () => setAddForm(false),
        },
      ]);
    }
  };

  const deletarItem = async (idItem) => {
    var newArray = value.filter((item) => item.id !== idItem);
    await AsyncStorage.setItem('@app-financas-dados', JSON.stringify(newArray));
    setValue(newArray);
  };

  const formatNumber = (
    amount,
    decimalCount = 2,
    decimal = ',',
    thousands = '.'
  ) => {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? '-' : '';

      let i = parseInt(
        (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
      ).toString();
      let j = i.length > 3 ? i.length % 3 : 0;

      return (
        negativeSign +
        (j ? i.substr(0, j) + thousands : '') +
        i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
        (decimalCount
          ? decimal +
            Math.abs(amount - i)
              .toFixed(decimalCount)
              .slice(2)
          : '')
      );
    } catch (e) {
      console.log(e);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={[
          styles.item,
          { backgroundColor: `${item.tipo === 'D' ? '#f56767' : '#abf27c'}` },
        ]}>
        <Text style={styles.texto}>Descrição: {item.descricao}</Text>
        <Text style={styles.texto}>Valor: {item.valor}</Text>
        <Text style={styles.texto}>Data: {item.data}</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            deletarItem(item.id);
          }}
          style={styles.delete}>
          <MaterialIcons name="delete" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>
    );
  };

  
  return (
    <>
      {!addForm && (
        <View style={styles.container}>
          <View style={styles.lista}>
            <FlatList
              data={value}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
          <View style={styles.rodape}>
            <View style={styles.infoRodape}>
              <Text>Despesas</Text>
              <Text style={{ color: '#f56767' }}>{totalDespesas}</Text>
            </View>
            <View style={styles.infoRodape}>
              <Text>Receitas</Text>
              <Text style={{ color: '#abf27c' }}>{totalReceitas}</Text>
            </View>
            <View style={styles.infoRodape}>
              <Text>Diferença</Text>
              <Text
                style={{ color: 'blue' }}>
                {totalDiferenca}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setAddForm(true)}
            style={styles.touchableOpacityStyle}>
            <Ionicons name="add" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
      )}
      {addForm && (
        <View style={styles.container}>
          <View style={styles.addFormContainer}>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setDescricao(value)}
              value={descricao}
              placeholder="Digite aqui uma descrição..."
              keyboardType="default"
            />
            <TextInput
              style={styles.input}
              onChangeText={(value) => setValor(value)}
              value={valor}
              placeholder="Digite aqui o valor..."
              keyboardType="numeric"
            />
            <Picker
              style={styles.picker}
              selectedValue={itemType}
              onValueChange={(itemValue, itemIndex) => setItemType(itemValue)}
              mode="dialog">
              <Picker.Item label="Despesa" value="D" />
              <Picker.Item label="Receita" value="R" />
            </Picker>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => validaForm()}
            style={styles.touchableOpacityStyle}>
            <Ionicons name="checkmark" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Home;
