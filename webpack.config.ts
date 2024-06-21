import path from "path";
import { BannerPlugin, type Configuration } from "webpack";

export default {
    entry: "./index.ts",
    mode: "production",
    target: "node",
    module: {
        rules: [
            {
                test: /\.([cm]?ts|tsx)$/,
                loader: "ts-loader",
                exclude: [/generated/, /__tests__/],
                options: {
                    configFile: "tsconfig.build.json",
                },
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: ["node_modules"],
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [new BannerPlugin({ banner: "#!/usr/bin/env node", raw: true })],
} as Configuration;
