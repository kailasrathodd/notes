import {View, Text, TouchableOpacity} from 'react-native';
import setVectorIcon from '../../Components/VectorComponents';
import {getFontSize} from '../../utility/responsive';
import {useDispatch, useSelector} from 'react-redux';

import React, {useState, useEffect, useRef} from 'react';
import {
  RideUpdateAPI,
  getBasicDetailsAPI,
} from '../../features/basicdetails/basicdetail';
import Header from '../../Components/HeaderComp';

import {resetPin, typeLocation} from '../../features/location/location';
import MapplsUIWidgets from 'mappls-search-widgets-react-native';

import MapplsPlacePicker from '../Map/MapplsPlacePicker';
import {Searchbar} from 'react-native-paper';
export default function SearchDashboard({navigation}, props) {
  const dispatch = useDispatch();
  const riderUpdate = useSelector(
    state => state.basicDetail?.riderUpdate?.Rider_Data,
  );
  const ploc = riderUpdate?.pickup_address.toString();
  const [query, setQuery] = useState(ploc);
  const basicDetail = useSelector(state => state.basicDetail?.basicDetail);
  const typeLoc = useSelector(state => state.location.typeLocation);
  console.log(ploc);
  const rider_id = useSelector(state => state.auth.user?._id);
  const timeoutRef = useRef(0);
  useEffect(() => {
    dispatch(
      getBasicDetailsAPI({
        rider_id: rider_id,
      }),
    );
    // dispatch(setPickAddress(null));
  }, []);
  const [address, setAddress] = useState('123 Main St');
  const [editMode, setEditMode] = useState(false);

  const handleAddressChange = newAddress => {
    setAddress(newAddress);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  // async function openSearchWidgetFunction() {
  //   try {
  //     const res = await MapplsUIWidgets.searchWidget({
  //       toolbarColor: '#ffffff',
  //       bridge: true,
  //     });
  //     console.log(res);

  //     setQuery(res);
  //     console.tron.log(res);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  async function openSearchWidgetFunction() {
    try {
      const res = await MapplsUIWidgets.searchWidget({
        toolbarColor: '#ffffff',
        bridge: true,
      });
      console.log(res);

      setQuery(res);
      if (typeLoc !== 'Drop') {
        dispatch(
          RideUpdateAPI({
            rider_id: this.props.ridr_id,
            pickup_address: res,
          }),
        );
      } else {
        dispatch(
          RideUpdateAPI({
            rider_id: this.props.ridr_id,
            pickup_address: res,
          }),
        );
      }
      console.tron.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  const onTextChange = async text => {
    try {
      const res = await MapplsUIWidgets.searchWidget({
        toolbarColor: '#ffffff',
        bridge: true,
      });
      console.log(res);
      setQuery(res);
      console.tron.log(res);
      setQuery(text);
    } catch (e) {
      console.log(e);
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      console.log('calling');
      // callAutoSuggest(text.trim());
    }, 2000);
  };
  return (
    <View
      style={{
        position: 'relative',
        height: '100%',
      }}>
      <View
        style={{
          width: '100%',
          height: '100%',
        }}>
        <MapplsPlacePicker />
      </View>

      <View
        style={{
          zIndex: 1,
          position: 'absolute',
          width: '100%',
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Header
          containerStyle={{
            width: '100%',
            alignSelf: 'center',
          }}
          title={''}
          backPress={() => {
            navigation.navigate('HomeScreen');
          }}
          {...this.props}
        />

        <View
          style={{
            height: 60,
            width: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity>
              {setVectorIcon({
                type: 'Ionicons',
                name: 'notifications',
                size: getFontSize(25),
                color: '#000',
              })}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: 40,
          paddingVertical: 20,
          backgroundColor: '#fff',
          borderRadius: 20,
          width: '90%',
          margin: 20,
          top: '10%',
          zIndex: 1,
          position: 'absolute',
        }}>
        <View>
          <Text
            style={{
              fontSize: getFontSize(14),
              fontWeight: '600',
              color: '#ddd',
              paddingLeft: 1,
              borderRadius: 50,
              backgroundColor: '#fff',
              flexDirection: 'row',
              justifyContent: 'center',
              margin: 1,
            }}>
            {setVectorIcon({
              type: 'Entypo',
              name: 'controller-record',
              size: getFontSize(15),
              color: '#000',
            })}{' '}
            Pickup Location
          </Text>
          <View
            style={{
              color: '#ddd',

              // borderRadius: 50,
              backgroundColor: '#fff',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                alignContent: 'center',
                alignSelf: 'center',
                // backgroundColor: '#ddd',
              }}
              onPress={() => {
                dispatch(typeLocation('PickUp'));
                openSearchWidgetFunction();
              }}>
              {setVectorIcon({
                type: 'Ionicons',
                name: 'search',
                size: getFontSize(30),
                color: '#000',
              })}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderColor: '#ddd',
                borderBottomWidth: 0.21,
                width: '100%',
                textAlign: 'left',
                fontSize: getFontSize(14),
                padding: 10,
              }}
              onPress={() => {
                dispatch(resetPin(true));
                dispatch(typeLocation('PickUp'));
                navigation.navigate('PickupSearch');
              }}>
              {basicDetail && riderUpdate.pickup_address !== null ? (
                <Text
                  style={{
                    color: '#000',
                    opacity: 0.51,
                    width: '100%',
                  }}>
                  {riderUpdate?.pickup_address || 'Enter Your Pickup Location'}
                </Text>
              ) : (
                <Text
                  style={{
                    color: '#000',
                    opacity: 0.51,
                    width: '100%',
                  }}>
                  {riderUpdate?.pickup_address || 'Enter Your Pickup Location'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: getFontSize(14),
              fontWeight: '600',
              color: '#ddd',
              paddingLeft: 1,
              borderRadius: 50,
              backgroundColor: '#fff',
              flexDirection: 'row',
              justifyContent: 'center',
              margin: 1,
            }}>
            {setVectorIcon({
              type: 'Entypo',
              name: 'controller-record',
              size: getFontSize(15),
              color: '#000',
            })}{' '}
            Drop Location
          </Text>
          <View
            style={{
              color: '#ddd',

              // borderRadius: 50,
              backgroundColor: '#fff',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                alignContent: 'center',
                alignSelf: 'center',
                // backgroundColor: '#ddd',
              }}
              onPress={() => {
                dispatch(resetPin(true));
                dispatch(typeLocation('Drop'));
                openSearchWidgetFunction();
              }}>
              {setVectorIcon({
                type: 'Ionicons',
                name: 'search',
                size: getFontSize(30),
                color: '#000',
              })}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderColor: '#ddd',
                borderBottomWidth: 0.21,
                width: '100%',
                // textAlign: 'left',
                fontSize: getFontSize(14),
                // borderRadius: 12,
                padding: 10,
                flexDirection: 'row',
              }}
              onPress={() => {
                dispatch(resetPin(true));
                dispatch(typeLocation('Drop'));
                navigation.navigate('DropSearch');
              }}>
              <Text
                style={{
                  color: '#000',
                  opacity: 0.51,
                  width: '100%',
                }}>
                {riderUpdate?.drop_address || 'Enter Your Drop Location'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
