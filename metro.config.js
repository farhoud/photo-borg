// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');


const defaultConfig = getDefaultConfig(__dirname);


module.exports = {
    ...defaultConfig,
    resolver: {
        extraNodeModules: {
            crypto: require.resolve('isomorphic-webcrypto')
        },
        sourceExts: ['jsx', 'js', 'ts', 'tsx']
    },
}
