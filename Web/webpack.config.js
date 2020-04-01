const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
	mode: "development",
	entry: {
		index: "./src/index.tsx"
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 8000,
		headers: { "Access-Control-Allow-Origin": "*" },
		hotOnly: true,

	},
	devtool: "eval-source-map",
	plugins: [
		new CleanWebpackPlugin(["dist"]),
		new HtmlWebpackPlugin({
			title: "Neon Tower Defence",
			template: path.join(__dirname, 'index.html')

		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({ log: (t) => console.log(t) }),
	],
	module: {
		rules: [
			// { test: /\.(png|svg|jpg|gif)$/, include: [path.join(__dirname, 'src')], use: "file-loader" },
			{ test: /\.(js|jsx|ts|tsx)?/, include: [path.join(__dirname, 'src')], use: { loader: 'babel-loader' } },
		]
	},
	resolve: {
		enforceExtension: false,
		extensions: [".jsx", ".js", ".tsx", ".ts", ".json", ".png"],
		alias: {
			"~": path.resolve(__dirname, 'src/'),
		},
	}
}
