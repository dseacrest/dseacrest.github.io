module.exports = {
  
  publicPath:
    process.env.NODE_ENV === "production" ? "/dseacrest.github.io/" : "/",

  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false
    }
  },

  transpileDependencies: ["quasar"],
};
