// import 'expo-dev-client';
import 'fastestsmallesttextencoderdecoder';

import crypto from "isomorphic-webcrypto";
import {
    registerGlobals
} from 'react-native-webrtc';

(async function createGraph() {
    registerGlobals()
    process.nextTick = setImmediate

    let onPeerDiscovery = async (peerId) => {
        // console.log(peerId)
        console.log(`Found peer ${peerId.toB58String()}`);
    };

    // Listen for new connections to peers
    let onPeerConnect = async (connection) => {
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
    let onPeerDisconnect = async (connection) => {
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
})()
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import App from './App';
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
