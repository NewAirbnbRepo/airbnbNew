import { supabase } from "@/lib/supabase";
import { useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";

interface Place {
    userid: any;
    title: any;
    availability_start_date: any;
    availability_end_date: any;
    price_per_year: any;
    hostPhoneNumber: any;
    shared_room_amount: any;
    images: string[];
    discription: any;
    university: any;
    private_room: any;
    private_room_amount: any;
    shared_room: any;
    typeofplace: any;
    address1: any;
    address2: any;
    essenetials: any;
    heater: any;
    closetdrawers: any;
    tv: any;
    airConditioning: any;
    parking: any;
    fridge: any;
    roomdesk: any;
    smoking: any;
    pets: any;
    noise: any;
    children: any;
    infants: any;
    events: any;
    stairs: any;
    noparking: any;
    additionalrules1: any;
    additionalrules2: any;
    additionalrules3: any;
    additionalrules4: any;
    additionalrules5: any;

}
const [property, setProperty] = useState<any[]>([]);
const [amenities, setAmenities] = useState<any[]>([]);
const [hiverules, setHiverules] = useState<any[]>([]);

const ListingsComponent = () => {
    useEffect(() => {
         const fetchData = async () => {
            const {data: {user}} = await supabase.auth.getUser();
            if (!user) {
            Alert.alert('User not logged in');
            return;
            }    

            const { data: property, error } = await supabase
                .from('property')
                .select('userid, title, availability_start_date, availability_end_date, price_per_year, hostPhoneNumber, shared_room_amount, discription, university, private_room, private_room_amount, shared_room, shared_room_amount, typeofplace, address1, address2');

            if (error) {
                console.error('Error fetching data:', error);
                return ;
            }
            if (!property) {
                console.error('No data returned from the query');
                return ;
            }
            setProperty(property || []);
            
            const { data:amenities, error: amenitiesError } = await supabase
            .from('amenities')
            .select('essenetials, heater, closetdrawers, tv, airConditioning, parking, fridge, roomdesk');
            if (!amenities) {
                console.error('No data returned from the query');
                return ;
            }
            if (amenitiesError) {
                console.error('Error fetching amenities data:', amenitiesError);
                return;
              }
            setAmenities(amenities || []);

            const {data:hiverules, error: hiverulesError } = await supabase
            .from('hiverules')
            .select('smoking, pets, noise, children, infants, events, stairs, noparking, additionalrules1,additionalrules2, additionalrules3, additionalrules4, additionalrules5');
            if (!hiverules) {
                console.error('No data returned from the query');
                return ;
            }
            if (hiverulesError) {
                console.error('Error fetching hiverules data:', hiverulesError);
                return;
              }
            setHiverules(hiverules || []);
            };

            fetchData();
        }, []);

            return [
                {
                    userid: property[0].userid,
                    title: property[0].title,
                    availability_start_date: property[0].availability_start_date,
                    availability_end_date: property[0].availability_end_date,
                    price_per_year: property[0].price_per_year,
                    hostPhoneNumber: property[0].hostPhoneNumber,
                    shared_room_amount: property[0].shared_room_amount,
                    images: [],
                    discription: property[0].discription,
                    university: property[0].university,
                    private_room: property[0].private_room,
                    private_room_amount: property[0].private_room_amount,
                    shared_room: property[0].shared_room,
                    typeofplace: property[0].typeofplace,
                    address1: property[0].address1,
                    address2: property[0].address2,
                    essenetials: amenities[0].essenetials,
                    heater: amenities[0].heater,
                    closetdrawers: amenities[0].closetdrawers,
                    tv: amenities[0].tv,
                    airConditioning: amenities[0].airConditioning,
                    parking: amenities[0].parking,
                    fridge: amenities[0].fridge,
                    roomdesk: amenities[0].roomdesk,
                    smoking: hiverules[0].smoking,
                    pets: hiverules[0].pets,
                    noise: hiverules[0].noise,
                    children: hiverules[0].children,
                    infants: hiverules[0].infants,
                    events: hiverules[0].events,
                    stairs: hiverules[0].stairs,
                    noparking: hiverules[0].noparking,
                    additionalrules1: hiverules[0].additionalrules1,
                    additionalrules2: hiverules[0].additionalrules2,
                    additionalrules3: hiverules[0].additionalrules3,
                    additionalrules4: hiverules[0].additionalrules4,
                    additionalrules5: hiverules[0].additionalrules5,
                }= {} as Place
            ]
    }


export default ListingsComponent;