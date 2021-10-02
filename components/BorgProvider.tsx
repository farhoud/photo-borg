// import React, {useState, useEffect, createContext, useContext, ReactNode} from 'react';
// import crypto from "isomorphic-webcrypto";
// // @ts-ignore
// import {client} from '@functionland/borg'
// import {
//     registerGlobals
// } from 'react-native-webrtc';
//
// export type ContextValue = undefined| typeof createGraph;
// const BorgContext = createContext<ContextValue>(await createGraph);
// async function createGraph() {
//     process.nextTick = setImmediate
//
//     let onPeerDiscovery = async (peerId: { toB58String: () => any; }) => {
//         // console.log(peerId)
//         console.log(`Found peer ${peerId.toB58String()}`);
//     };
//
//     // Listen for new connections to peers
//     let onPeerConnect = async (connection: { remotePeer: { toB58String: () => any; }; }) => {
//         console.log(`Connected to ${connection.remotePeer.toB58String()}`);
//         // let foo = 'foo'
//         // let file = new File([foo], "foo.txt", {
//         //     type: "text/plain",
//         // });
//         //
//         // const id = await myGraph.sendFile(file)
//         // const refile = await myGraph.receiveFile(id)
//         // console.log(refile == foo)
//         // console.log(await myGraph.receiveMeta(id))
//     };
//
//     // Listen for peers disconnecting
//     let onPeerDisconnect = async (connection: { remotePeer: { toB58String: () => any; }; }) => {
//         console.log(`Disconnected from ${connection.remotePeer.toB58String()}`);
//     };
//     registerGlobals()
//     await crypto.ensureSecure()
//
//     // const peerId = await PeerId.create({bits: 2048, keyType: 'Ed25519'})
//     // @ts-ignore
//     const obj = await import('@functionland/borg')
//     // @ts-ignore
//     const borg = await obj.client();
//
//     await borg.connectionHandler('peer:connect', onPeerConnect);
//     await borg.connectionHandler('peer:disconnect', onPeerDisconnect);
//     await borg.nodeHandler('peer:discovery', onPeerDiscovery);
//     return borg
// }
//
//
// export type Props = {
//     children: ReactNode;
// };
// function BorgProvider(props:Props) {
//     const {children} = props
//     const [borg, setBorg] = useState({});
//
//
//
//     useEffect(() => {
//         (async () => {
//             const temp = await createGraph()
//             // @ts-ignore
//             // console.log(temp)
//             setBorg(temp)
//         })()
//     }, []);
//     return (
//         <BorgContext.Provider value={borg}>
//             {children}
//         </BorgContext.Provider>
//     )
// }
//
// const useBorg = () => useContext(BorgContext)
//
// export { BorgProvider, useBorg }