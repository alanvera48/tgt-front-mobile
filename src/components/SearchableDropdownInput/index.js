import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Keyboard,
  Text,
} from 'react-native';
import {VStack} from '@gluestack-ui/themed';
import TextBase from '../../components/Base/TextBase';
import {COLORS} from '../../style/style';

export const SearchableDropdownInput = ({
  items,
  labelText,
  placeholder,
  onValueChange,
  value,
  error,
  styles,
  disabled = false,
  searchPlaceholder = 'Buscar...',
  noResultsText = 'No se encontraron resultados',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [dropdownLayout, setDropdownLayout] = useState({});
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Filtrar items basado en el texto de búsqueda
  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item =>
        item.label.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredItems(filtered);
    }
  }, [searchText, items]);

  // Encontrar el label del valor seleccionado
  const getSelectedLabel = () => {
    const selectedItem = items.find(item => item.value === value);
    return selectedItem ? selectedItem.label : '';
  };

  // Manejar la apertura del dropdown
  const handlePress = () => {
    if (disabled) return;

    containerRef.current?.measure((fx, fy, width, height, px, py) => {
      setDropdownLayout({
        top: py + height,
        left: px,
        width: width,
      });
    });

    setIsOpen(true);
    setSearchText('');
  };

  // Manejar la selección de un item
  const handleSelectItem = item => {
    onValueChange(item.value);
    setIsOpen(false);
    setSearchText('');
  };

  // Cerrar dropdown
  const handleClose = () => {
    setIsOpen(false);
    setSearchText('');
    Keyboard.dismiss();
  };

  // Renderizar cada item del dropdown
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[
        dropdownStyles.item,
        value === item.value && dropdownStyles.selectedItem,
      ]}
      onPress={() => handleSelectItem(item)}>
      <TextBase
        text={item.label}
        style={[
          dropdownStyles.itemText,
          value === item.value && dropdownStyles.selectedItemText,
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <View style={[{width: '100%'}, styles]}>
      <View
        style={{
          alignItems: 'flex-start',
          width: '100%',
          height: 20,
        }}>
        {error && <TextBase text={error.message} style={style.error} />}
      </View>

      <VStack
        ref={containerRef}
        style={[
          style.containerPicker,
          {
            borderColor: error
              ? COLORS.dark.error
              : COLORS.dark.backgroundInput,
          },
        ]}>
        <TextBase text={labelText} style={style.labelPicker} />

        <TouchableOpacity
          style={style.touchableInput}
          onPress={handlePress}
          disabled={disabled}>
          <Text
            style={[
              style.inputText,
              {
                color: getSelectedLabel()
                  ? '#ffff'
                  : error
                  ? COLORS.dark.error
                  : COLORS.dark.gray,
              },
            ]}>
            {getSelectedLabel() || placeholder}
          </Text>

          {/* Icono de dropdown */}
          <View style={style.dropdownIcon}>
            <TextBase text={isOpen ? '▲' : '▼'} style={style.iconText} />
          </View>
        </TouchableOpacity>
      </VStack>

      {/* Modal del dropdown */}
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={handleClose}>
        <TouchableOpacity
          style={dropdownStyles.overlay}
          activeOpacity={1}
          onPress={handleClose}>
          <View
            style={[
              dropdownStyles.dropdown,
              {
                top: dropdownLayout.top,
                left: dropdownLayout.left,
                width: dropdownLayout.width,
                // maxHeight: Math.min(
                //   maxHeight,
                //   DEVICE_HEIGHT - dropdownLayout.top - 50,
                // ),
              },
            ]}>
            {/* Campo de búsqueda */}
            <View style={dropdownStyles.searchContainer}>
              <TextInput
                ref={inputRef}
                style={dropdownStyles.searchInput}
                placeholder={searchPlaceholder}
                placeholderTextColor={COLORS.dark.gray}
                value={searchText}
                onChangeText={setSearchText}
                autoFocus={true}
              />
            </View>

            {/* Lista de items */}
            {filteredItems.length > 0 ? (
              <FlatList
                data={filteredItems}
                renderItem={renderItem}
                keyExtractor={item => item.value.toString()}
                style={dropdownStyles.list}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
              />
            ) : (
              <View style={dropdownStyles.noResults}>
                <TextBase
                  text={noResultsText}
                  style={dropdownStyles.noResultsText}
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  error: {
    color: COLORS.dark.error,
    fontSize: 12,
    width: '100%',
  },
  labelPicker: {
    position: 'absolute',
    top: 10,
    left: 5,
    backgroundColor: 'transparent',
    zIndex: 1,
    paddingHorizontal: 5,
    color: COLORS.dark.textPrimary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  containerPicker: {
    // flex: 1,
    height: 72,
    width: '100%',
    marginBottom: 15,
    // flexBasis: 'auto',
    justifyContent: 'center',
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  touchableInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  inputText: {
    flex: 1,
    fontSize: 18,
    width: '200%',
  },
  dropdownIcon: {
    marginLeft: 10,
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});

const dropdownStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: COLORS.dark.backgroundInput,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  searchContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  searchInput: {
    backgroundColor: '#1C1C1E',
    color: '#FFFFFF',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#444',
  },
  list: {
    maxHeight: 200,
  },
  item: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  selectedItem: {
    backgroundColor: COLORS.dark.primary,
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  selectedItemText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  noResults: {
    padding: 20,
    alignItems: 'center',
  },
  noResultsText: {
    color: COLORS.dark.gray,
    fontSize: 16,
    fontStyle: 'italic',
  },
});
