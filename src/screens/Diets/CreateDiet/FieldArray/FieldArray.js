import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useFieldArray} from 'react-hook-form';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  HStack,
} from '@gluestack-ui/themed';
import {
  faChevronDown,
  faChevronUp,
  faTrashCan,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

import TextBase from '../../../../components/Base/TextBase';
import DropDownIcon from '../../../../components/Collapsible/components/DropDownIcon';
import {NestedArray} from '../NestedArray/NestedArray';
import {colorByDiets} from '../../../../utils/colorDiets';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {COLORS} from '../../../../style/style';

export const FieldArray = ({control, errors}) => {
  const {fields, update} = useFieldArray({
    control,
    name: 'meals',
  });

  const changeMealStatus = (mealName, status) => {
    const index = fields.findIndex(field => field.name === mealName);
    if (index !== -1) {
      update(index, {
        ...fields[index],
        enabled: status,
      });
    }
  };

  return (
    <>
      {fields?.map((item, index) => {
        return (
          <View key={item.id} style={{marginHorizontal: 10}}>
            <Accordion
              width="100%"
              size="md"
              backgroundColor={COLORS.dark.background}
              variant="filled"
              type="multiple"
              marginVertical={10}
              isCollapsible={true}
              isDisabled={false}>
              <AccordionItem
                value={item.name}
                marginVertical={5}
                borderRadius={10}
                padding={12}
                backgroundColor={`${
                  item.enabled ? COLORS.dark.backgroundCard : '#1d1d1d'
                }`}>
                <AccordionHeader>
                  <AccordionTrigger>
                    {({isExpanded}) => {
                      return (
                        <HStack
                          justifyContent="space-between"
                          width={'100%'}
                          style={{
                            alignItems: 'center',
                          }}>
                          <View>
                            <TextBase
                              text={item.name}
                              color={colorByDiets(item.name)}
                              size={16}
                              fontFamily={'AirbnbCereal_W_Bd'}
                              style={{
                                opacity: item.enabled ? 1 : 0.5,
                                width: 115,
                              }}
                            />
                            {errors?.meals?.[index]?.food && item.enabled && (
                              <TextBase
                                color={COLORS.dark.error}
                                size={16}
                                fontFamily={'AirbnbCereal_W_Bd'}
                                style={{marginTop: 6}}
                                text={'Requerido'}
                              />
                            )}
                          </View>
                          {item.enabled ? (
                            <TouchableOpacity
                              onPress={() => {
                                changeMealStatus(item.name, false);
                              }}>
                              <FontAwesomeIcon
                                icon={faTrashCan}
                                color={'#cd2f2f'}
                                size={20}
                              />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() => changeMealStatus(item.name, true)}>
                              <FontAwesomeIcon
                                icon={faPlus}
                                color={'#ffffff'}
                                size={20}
                              />
                            </TouchableOpacity>
                          )}
                          {item.enabled ? (
                            isExpanded ? (
                              <DropDownIcon
                                icon={faChevronUp}
                                backgroundColor={colorByDiets(item.name)}
                              />
                            ) : (
                              <DropDownIcon
                                icon={faChevronDown}
                                backgroundColor={colorByDiets(item.name)}
                              />
                            )
                          ) : undefined}
                        </HStack>
                      );
                    }}
                  </AccordionTrigger>
                </AccordionHeader>
                {item.enabled && (
                  <AccordionContent>
                    <View
                      style={{
                        height: 20,
                      }}>
                      <Text
                        style={{
                          color: COLORS.dark.error,
                          fontSize: 12,
                          paddingLeft: 10,
                        }}>
                        {errors?.meals?.[index]?.food &&
                          'Complete todos los campos de la comida'}
                      </Text>
                    </View>
                    <NestedArray
                      nestIndex={index}
                      control={control}
                      errors={errors}
                      enabled={item.enabled}
                    />
                  </AccordionContent>
                )}
              </AccordionItem>
            </Accordion>
          </View>
        );
      })}
    </>
  );
};
