import React, {useEffect, useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {TextInput, Button} from 'react-native';
import {StyleSheet} from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import crypto from "isomorphic-webcrypto";

export default function TabOneScreen({navigation}: RootTabScreenProps<'TabOne'>) {
    const [borg, setBorg] = useState({});

    async function createGraph() {
        process.nextTick = setImmediate

        let onPeerDiscovery = async (peerId: { toB58String: () => any; }) => {
            // console.log(peerId)
            console.log(`Found peer ${peerId.toB58String()}`);
        };

        // Listen for new connections to peers
        let onPeerConnect = async (connection: { remotePeer: { toB58String: () => any; }; }) => {
            console.log(`Connected to ${connection.remotePeer.toB58String()}`);
            // let foo = 'foo'
            // let file = new File([foo], "foo.txt", {
            //     type: "text/plain",
            // });
            //
            // const id = await myGraph.sendFile(file)
            // const refile = await myGraph.receiveFile(id)
            // console.log(refile == foo)
            // console.log(await myGraph.receiveMeta(id))
        };

        // Listen for peers disconnecting
        let onPeerDisconnect = async (connection: { remotePeer: { toB58String: () => any; }; }) => {
            console.log(`Disconnected from ${connection.remotePeer.toB58String()}`);
        };
        // registerGlobals()
        await crypto.ensureSecure()

        // const peerId = await PeerId.create({bits: 2048, keyType: 'Ed25519'})
        // @ts-ignore
        const obj = await import('@functionland/borg')
        // @ts-ignore
        const borg = await obj.client();

        await borg.connectionHandler('peer:connect', onPeerConnect);
        await borg.connectionHandler('peer:disconnect', onPeerDisconnect);
        await borg.nodeHandler('peer:discovery', onPeerDiscovery);
        return borg
    }

    const [serverId, setServerId] = useState('QmVYZsjTgm3hBWkkSBugNJYYLPmGTACfoc4HGfqqE6TMcT')
    const onSubmit = (e: any)=>{
        console.log(borg)
        try {
            borg.connect(serverId)
        }catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        (async () => {
            const temp = await createGraph()
            // @ts-ignore
            // console.log(temp)
            setBorg(temp)
        })()
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
            <EditScreenInfo path="/screens/TabOneScreen.tsx"/>
            <TextInput
                defaultValue={serverId}
                onChangeText={(text)=>setServerId(text)}
            />

            <Button title="Submit" onPress={onSubmit}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
