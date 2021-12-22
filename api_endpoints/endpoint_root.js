
function root(req, res) {
  const result = `<h1>My TheUsher ResourceServer</h1>
  This app provides arithmetic services to anyone with a TheUsher token.<P>
  Easy to use in tandem with <a href=https://my-theusher-client.glitch.me/>https://my-theusher-client.glitch.me/</a>.
  `
  res.status(200).send(result)
}


module.exports = {
    root
}
