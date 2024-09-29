// app.config.ts

import { ExpoConfig, ConfigContext } from 'expo/config';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import path from 'path';

export default ({ config }: ConfigContext): ExpoConfig => {
    // Determine the current environment
    const ENV = process.env.APP_ENV || 'development';

    // Build the path to the correct .env file
    const envFilePath = path.resolve(__dirname, `.env.${ENV}`);

    // Load the environment variables from the .env file
    const envConfig = dotenv.config({ path: envFilePath });
    dotenvExpand.expand(envConfig);

    // Access the environment variables
    const {
        EXPO_PUBLIC_SLUG,
        EXPO_PUBLIC_NAME,
        EXPO_PUBLIC_PROJECT_ID,
        EXPO_PUBLIC_ENV,
        EXPO_PUBLIC_API_URL,
        EXPO_PUBLIC_IOS_BUNDLE_IDENTIFIER,
        EXPO_PUBLIC_IOS_ANDROID_PACKAGE,
    } = process.env;

    // Validate required environment variables
    if (!EXPO_PUBLIC_SLUG) {
        throw new Error('EXPO_PUBLIC_SLUG is not defined');
    }

    // Construct the Expo configuration
    return {
        ...config,
        slug: EXPO_PUBLIC_SLUG || '',
        name: EXPO_PUBLIC_NAME || '',
        ios: {
            ...config.ios,
            bundleIdentifier: EXPO_PUBLIC_IOS_BUNDLE_IDENTIFIER,
            buildNumber: '1',
        },
        android: {
            ...config.android,
            package: EXPO_PUBLIC_IOS_ANDROID_PACKAGE,
            versionCode: 1,
        },
        updates: {
            url: `https://u.expo.dev/${EXPO_PUBLIC_PROJECT_ID}`,
        },
        extra: {
            ...config.extra,
            eas: { projectId: EXPO_PUBLIC_PROJECT_ID },
            ENV: EXPO_PUBLIC_ENV,
            API_URL: EXPO_PUBLIC_API_URL,
        },
    };
};
