import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { GetPhotoRef } from '../../services/GooglePlaceApi';

export default function PlaceCard({ dayInfo, index }) {

    const [photoRefs, setPhotoRefs] = useState({}); // <-- store per-period photos

    useEffect(() => {
        fetchAllPhotos();
    }, []);

    const fetchAllPhotos = async () => {
        let refs = {};

        for (const [period, activity] of Object.entries(dayInfo)) {

            // skip non-object items
            if (typeof activity !== "object") continue;

            const nameToSearch = activity.activity;

            try {
                const result = await GetPhotoRef(nameToSearch);

                const ref =
                    result?.results?.[0]?.photos?.[0]?.photo_reference || null;

                refs[period] = ref;

            } catch (err) {
                console.log("PHOTO FETCH ERROR for", period, err);
                refs[period] = null;
            }
        }

        setPhotoRefs(refs);
    };

    // Build Google URL helper
    const getGooglePhotoUrl = (photoRef) =>
        photoRef
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
            : null;

    return (
        <View style={{ marginBottom: 30 }}>

            {/* Day Title */}
            <Text
                style={{
                    fontSize: 22,
                    fontFamily: 'outfit-bold',
                    marginBottom: 10,
                }}>
                Day {index + 1}
            </Text>

            {/* Render each period */}
            {Object.entries(dayInfo).map(([period, activity]) => {

                if (typeof activity !== "object") return null;

                const thisPhotoRef = photoRefs[period];
                const googleUrl = getGooglePhotoUrl(thisPhotoRef);

                return (
                    <View
                        key={period}
                        style={{
                            backgroundColor: Colors.WHITE,
                            padding: 12,
                            borderRadius: 12,
                            marginBottom: 15,
                            shadowColor: Colors.PEIMARY,
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 2,
                        }}>

                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: 'outfit-medium',
                                color: Colors.GRAY,
                                marginBottom: 6,
                            }}>
                            {period.toUpperCase()}
                        </Text>

                        {/* Image */}
                        <Image
                            source={
                                googleUrl
                                    ? { uri: googleUrl }
                                    : require('./../../assets/images/alorsetar.jpeg')
                            }
                            style={{
                                width: "100%",
                                height: 180,
                                borderRadius: 10,
                                marginBottom: 10,
                            }}
                        />

                        {/* Activity Name */}
                        <Text
                            style={{
                                fontSize: 18,
                                fontFamily: 'outfit-bold',
                                marginBottom: 4,
                            }}>
                            {activity.activity}
                        </Text>

                        {/* Details */}
                        <Text
                            style={{
                                fontSize: 14,
                                color: Colors.GRAY,
                                marginBottom: 10,
                            }}>
                            {activity.details}
                        </Text>

                        {/* Row: Time / Duration / Price */}
                        <View style={{ flexDirection: "row", gap: 20, width:170 }}>

                            <View>
                                <Text style={{ fontFamily: 'outfit-medium' }}>Time</Text>
                                <Text>{activity.time}</Text>
                            </View>

                            <View>
                                <Text style={{ fontFamily: 'outfit-medium' }}>Duration</Text>
                                <Text>{activity.duration}</Text>
                            </View>

                            <View>
                                <Text style={{ fontFamily: 'outfit-medium' }}>Price</Text>
                                <Text>{activity.price}</Text>
                            </View>

                        </View>

                        {/* Navigate Button */}
                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.LIGHT_GRAY,
                                padding: 10,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: Colors.GRAY,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 12,
                                gap: 10,
                            }}>
                            <Ionicons name="navigate" size={22} color="black" />
                            <Text
                                style={{
                                    fontFamily: 'outfit-medium',
                                    fontSize: 17,
                                }}>
                                Navigate
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            })}

        </View>
    );
}
